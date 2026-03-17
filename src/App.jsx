import { useState, useEffect, useRef } from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { Home2 } from "./components/sections/Home2";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import "./index.css";
import { Contact } from "./components/sections/Contact";

function App() {
  // Show loading screen on first load
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const aboutRef = useRef(null);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!aboutRef.current) return;
    const el = aboutRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Sticky show: once About reaches 20% visibility, show navbar and stop observing
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setShowNavbar(true);
            observer.disconnect();
          }
        });
      },
      { threshold: [0, 0.2, 0.5, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}{" "}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-white text-gray-500`}
      >
        {showNavbar && <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <Home2 />
        <div ref={aboutRef}>
          <About />
        </div>
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
