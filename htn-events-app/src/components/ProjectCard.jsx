function ProjectCard({ project }) {
  return (
    <div className="bg-gray-900 border-2 border-electric-sapphire rounded-lg p-6 hover:border-neon-pink transition-all hover:scale-105 transform duration-300">
      {/* Project image placeholder */}
      <div className="bg-gray-800 rounded-lg mb-4 h-48 flex items-center justify-center text-4xl">
        🚀
      </div>

      <h3 className="text-xl font-bold text-sky-aqua mb-2 font-mono">
        {project.title}
      </h3>

      <p className="text-gray-300 mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map(function(tech, index) {
          return (
            <span
              key={index}
              className="px-2 py-1 bg-electric-sapphire text-white text-xs rounded-full"
            >
              {tech}
            </span>
          );
        })}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-800 border border-electric-sapphire text-white text-center rounded hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-neon-pink text-white text-center rounded hover:bg-raspberry-plum transition-colors"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
