import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-300 bg-clip-text text-transparent text-center">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2">On Route</h3>
              <p className="text-gray-500 mb-4">
                A rudimentary hackathon project to assist in safety when travelling.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "Node.js", "CSS", "HTML", "JSON"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-pink-500/10 text-pink-500 py-1 px-3 rounded-full text-sm hover:bg-pink-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/devs-sesa-hackathon-2025/template-repo-2.git"
                  className="text-pink-400 hover:text-pink-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>

            <div
              className="
              glass p-6 rounded-xl border border-white/10 
              hover:-translate-y-1 hover:border-pink-500/30
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">Activity Manager</h3>
              <p className="text-gray-500 mb-4">
                An activity manager designed to help organize activities with their locations and reviews.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Java"].map((tech, key) => (
                  <span
                    key={key}
                    className="
                      bg-pink-500/10 text-pink-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-pink-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/SOFTENG281-2025/assignment-1-e10gb.git"
                  className="text-pink-400 hover:text-pink-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
