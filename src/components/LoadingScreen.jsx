import React, { useState, useRef, useEffect } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [clickCount, setClickCount] = useState(0);
  const [jitter, setJitter] = useState({ x: 0, y: 0 });
  const [flashOpacity, setFlashOpacity] = useState(0);
  const canvasRef = useRef(null);
  const maxClicks = 2; 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Setup Hit Map
    const hitCanvas = document.createElement("canvas");
    const hitCtx = hitCanvas.getContext("2d", { willReadFrequently: true });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      hitCanvas.width = canvas.width;
      hitCanvas.height = canvas.height;
      
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      hitCtx.fillStyle = "black";
      hitCtx.fillRect(0, 0, hitCanvas.width, hitCanvas.height);
    };

    // FIXED: Added isWall parameter
    const drawSegment = (x1, y1, x2, y2, strength, isWall = false) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${strength})`;
      const baseWidth = strength * 2.5;
      ctx.lineWidth = Math.max(0.2, baseWidth + (Math.random() - 0.5));
      ctx.stroke();

      if (isWall) {
        hitCtx.beginPath();
        hitCtx.lineWidth = 4; 
        hitCtx.strokeStyle = 'white';
        hitCtx.moveTo(x1, y1);
        hitCtx.lineTo(x2, y2);
        hitCtx.stroke();
      }
    };

// Add allowBranching to the parameters (default to true for main cracks)
const createCrack = (startX, startY, startAngle, startStrength, depth = 0, origin, canBeStopped = false, allowBranching = true) => {
  if (!origin) origin = { x: startX, y: startY };

  let x = startX;
  let y = startY;
  let angle = startAngle;
  let strength = startStrength;

  let segmentsInThisFrame = 0;
  while (segmentsInThisFrame < 20) {
    if (strength < 0.01 || depth > 600) return;
    if (x < -100 || x > canvas.width + 100 || y < -100 || y > canvas.height + 100) return;

    const segmentLength = Math.random() * 8 + 4;
    const nextX = x + Math.cos(angle) * segmentLength;
    const nextY = y + Math.sin(angle) * segmentLength;

    if (canBeStopped && depth > 5) {
      const pixel = hitCtx.getImageData(Math.floor(nextX), Math.floor(nextY), 1, 1).data;
      if (pixel[0] > 0) {
        drawSegment(x, y, nextX, nextY, strength, false);
        return; 
      }
    }

    drawSegment(x, y, nextX, nextY, strength, !canBeStopped);

    if (allowBranching && depth % 2 === 0) {
    const dist = Math.hypot(nextX - origin.x, nextY - origin.y);
    const energy = Math.max(0, 1 - dist / 800);
    const outwardAngle = Math.atan2(nextY - origin.y, nextX - origin.x);

    // 1. INDEPENDENT CROSS-LINK LOGIC (Increasing these)
    // We use a high base (0.4) but keep the cubed falloff for clustering
    const crossLinkProb = 0.3 * Math.pow(Math.max(0, 1 - dist / 500), 3);
    if (Math.random() < crossLinkProb) {
        const side = Math.random() > 0.5 ? 1 : -1;
        const branchAngle = outwardAngle + (Math.PI / 1.85) * side;
        // Spawn cross-link: canBeStopped = true, allowBranching = false
        createCrack(nextX, nextY, branchAngle, strength * 0.7, depth + 1, origin, true, false);
    }

    // 2. INDEPENDENT FORK LOGIC (Keeping these limited)
    // Lower probability (0.05) ensures forks stay rare
    if (Math.random() < 0.03 * energy) {
        const branchAngle = angle + (outwardAngle - angle) * 0.4 + (Math.random() - 0.5) * 0.3;
        // Spawn fork: canBeStopped = true, allowBranching = false
        createCrack(nextX, nextY, branchAngle, strength * 0.65, depth + 1, origin, true, false);
    }
    }

    x = nextX;
    y = nextY;
    angle += (Math.random() - 0.5) * 0.1; 
    strength *= 0.993;
    depth++;
    segmentsInThisFrame++;
  }

  requestAnimationFrame(() => {
    // Pass allowBranching into the next animation frame
    createCrack(x, y, angle, strength, depth, origin, canBeStopped, allowBranching);
  });
};

    let firstClickOrigin = null;

    const applyJitter = (intensity = 10, duration = 300) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          const decay = 1 - progress;
          const offsetX = (Math.random() - 0.5) * intensity * decay;
          const offsetY = (Math.random() - 0.5) * intensity * decay;
          setJitter({ x: offsetX, y: offsetY });
          requestAnimationFrame(animate);
        } else {
          setJitter({ x: 0, y: 0 });
        }
      };
      animate();
    };

    const handleMouseDown = (e) => {
      const { clientX: x, clientY: y } = e;

      setClickCount((prev) => {
        const newCount = prev + 1;
        
        if (newCount === 1) {
          // First click: create initial cracks from click point
          applyJitter(8, 250);
          firstClickOrigin = { x, y };
          const zones = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

          zones.forEach((zoneAngle) => {
            const cracksInZone = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < cracksInZone; i++) {
              const angle = zoneAngle + Math.random() * (Math.PI / 2);
              createCrack(x, y, angle, 0.8, 0, { x, y }, false, true);
            }
          });
        } else if (newCount === 2) {
          // Second click: extend existing cracks by creating branches from the hit map
          applyJitter(15, 400);
          
          // Trigger white flash after jitter
          setTimeout(() => {
            setFlashOpacity(1);
            setTimeout(() => {
              setFlashOpacity(0);
            }, 5);
          }, 100);
          
          const imageData = hitCtx.getImageData(0, 0, hitCanvas.width, hitCanvas.height);
          const crackPoints = [];
          
          // Sample points from existing cracks
          for (let y = 0; y < hitCanvas.height; y += 10) {
            for (let x = 0; x < hitCanvas.width; x += 10) {
              const index = (y * hitCanvas.width + x) * 4;
              if (imageData.data[index] > 0) {
                crackPoints.push({ x, y });
              }
            }
          }
          
          // Create new cracks from random existing crack points
          const numNewCracks = Math.min(30, crackPoints.length);
          for (let i = 0; i < numNewCracks; i++) {
            const randomPoint = crackPoints[Math.floor(Math.random() * crackPoints.length)];
            const angle = Math.random() * Math.PI * 2;
            createCrack(randomPoint.x, randomPoint.y, angle, 0.6, 0, firstClickOrigin, true, false);
          }
        }
        
        if (newCount >= maxClicks && onComplete) {
          setTimeout(onComplete, 1000);
        }
        return newCount;
      });
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousedown", handleMouseDown);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [onComplete]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", background: "#000" }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: "block", 
          cursor: "pointer",
          transform: `translate(${jitter.x}px, ${jitter.y}px)`,
          transition: "transform 0.05s ease-out"
        }} 
      />
      {/* White flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "white",
          opacity: flashOpacity,
          pointerEvents: "none"
        }}
      />
    </div>
  );
};