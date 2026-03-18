import { RevealOnScroll } from "../RevealOnScroll";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
  const timer = setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 0);
  
  return () => clearTimeout(timer);
}, []);

  return (
    <section
      id="home"
      className="sticky top-0 min-h-screen flex items-center justify-center z-0"
    >
      <RevealOnScroll>
<div className="flex flex-col gap-4 md:gap-8 text-left px-2">         
   <h1 className="text-[20vw] md:text-[22vw] font-bold font-poppins mb-1 bg-pink-400 bg-clip-text text-transparent leading-[1.1] py-2">
  Emily 
</h1>
<h1 className="text-[20vw] md:text-[22vw] font-bold font-poppins mb-1 bg-pink-400 bg-clip-text text-transparent leading-[1.1] py-2">
   Gibbons
</h1>
       
        </div>
      </RevealOnScroll>
    </section>
  );
};