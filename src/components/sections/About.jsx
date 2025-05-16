import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const frontendSkills = [
    "Java",
    "C",
    "React",
    "HTML",
    "CSS",
    "Typescript",
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-300 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-500 mb-6 text-center">
              I'm a passtionate developer with experience in team envinronments and a strong interest in software engineering.
              I'm ready to take on new challenges and learn new technologies.

            </p>

            {/* <div className="flex justify-center mb-6"> / image not showing :(
  <img
    src="/Users/emilygibbons/e10gb-website/src/components/sections/D4DA2C7D-DC83-45F6-A92E-2D3EE87D8E64_1_105_c.jpeg" // or use a public URL
    alt="Emily Rose Gibbons"
    className="w-40 h-40 rounded-full object-cover border-4 border-pink-500 shadow-lg hover:scale-105 transition-transform duration-300"
  />
</div> */}

            {/* Centered Frontend Skills Box */}
            <div className="flex justify-center">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all w-full max-w-md text-center">
                <h3 className="text-xl font-bold mb-4">My Tech Stack</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-pink-500/10 text-pink-500 py-1 px-3 rounded-full text-sm hover:bg-pink-500/20 
                                hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education & Work Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-pink-500/10 p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">Experience</h3>
              <ul className="list-disc list-inside text-gray-500 space-y-2">
                <p>
                  I currently work as a Customer Service Assistant at Auckland Airport.
                </p>
              </ul>
            </div>
            <div className="bg-pink-500/10 p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">Volunteering</h3>
              <div className="space-y-4 text-gray-500">
                <div>
                  <p>
                    In my spare time I volunteer for Robogals, inspring young women to pursue STEM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
