import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-10 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent leading-tight">
  Hi, I'm Emily Gibbons
</h1>



          <p className="text-gray-800 text-lg mt-4 mb-8 max-w-lg mx-auto">
            I'm a passionate pre-penultimate software engineering student at the University of Auckland. Scroll down to learn more about me and my work!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#projects"
              className="bg-pink-500 text-white py-3 px-6 rounded font-bold transition-all duration-300 ease-in-out relative overflow-hidden hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="border border-pink-500/50 text-pink-500 py-3 px-6 rounded font-bold transition-all duration-300 ease-in-out
             hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-pink-500/10"
>
              Contact Me
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
