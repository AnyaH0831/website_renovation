import { useState } from 'react';

function Timeline({ items }) {
  const [expandedId, setExpandedId] = useState(null);
  const [clickOrigin, setClickOrigin] = useState({ x: '50%', y: '50%' });

  const handleItemClick = function(id, event) {
    // Get the image element position
    const card = event.currentTarget;
    const imageElement = card.querySelector('img');
    
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setClickOrigin({ x: `${centerX}px`, y: `${centerY}px` });
    }
    
    setExpandedId(id);
  };

  const closeModal = function() {
    setExpandedId(null);
  };

  const expandedItem = items.find(function(item) {
    return item.id === expandedId;
  });

  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-mono">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-sky-aqua">
            My Journey
          </span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-pink via-electric-sapphire to-sky-aqua md:transform md:-translate-x-1/2"></div>

          {items.map(function(item, index) {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative mb-12 md:flex ${isLeft ? 'md:justify-end md:pr-[calc(50%+24px)]' : 'md:justify-start md:pl-[calc(50%+24px)]'}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 md:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${
                  item.type === 'work' ? 'bg-neon-pink' : 'bg-sky-aqua'
                } shadow-[0_0_15px_rgba(247,37,133,0.8)] z-10`}></div>

                {/* Compact card */}
                <div
                  onClick={function(e) { handleItemClick(item.id, e) }}
                  className="w-80 md:w-96 cursor-pointer ml-16 md:ml-2"
                >
                  <div className="bg-gray-900 rounded-full p-3 border-2 border-electric-sapphire hover:border-neon-pink hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-4">
                    {/* Circular Image */}
                    {item.image && (
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center 35%' }}
                        />
                      </div>
                    )}

                    {/* Info section */}
                    <div className="flex-1 min-w-0 pr-2">
                      {/* Type badge */}
                      <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-1 ${
                        item.type === 'work' 
                          ? 'bg-neon-pink text-white' 
                          : 'bg-sky-aqua text-black'
                      }`}>
                        {item.type === 'work' ? 'Work' : 'Project'}
                      </span>

                      {/* Title */}
                      <h3 className="text-base font-bold text-sky-aqua mb-0.5 font-mono line-clamp-1">
                        {item.title}
                      </h3>

                      {/* Company */}
                      <p className="text-neon-pink font-semibold text-sm mb-0.5 line-clamp-1">
                        {item.company}
                      </p>

                      {/* Date */}
                      <p className="text-blue-energy text-xs">
                        {item.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-screen Modal */}
      {expandedItem && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={closeModal}
        >
          {/* Background Image - Full Screen with fade-in */}
          {expandedItem.image && (
            <div 
              className="fixed inset-0 animate-bg-fade-in overflow-hidden"
              style={{ transformOrigin: `${clickOrigin.x} ${clickOrigin.y}` }}
            >
              <img 
                src={expandedItem.image} 
                alt={expandedItem.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 35%' }}
              />
              {/* Dark overlay for better text readability - fades in */}
              <div className="absolute inset-0 bg-black/40 opacity-0 animate-overlay-fade-in"></div>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={closeModal}
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-sm border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white transition-colors flex items-center justify-center text-2xl shadow-lg animate-fade-in"
          >
            ✕
          </button>

          {/* Translucent Content Card - Fades In with Delay */}
          <div 
            className="relative z-10 flex items-center justify-center min-h-screen p-4 py-20"
            onClick={function(e) { e.stopPropagation() }}
          >
            <div className="bg-black/75 backdrop-blur-md rounded-3xl border-2 border-neon-pink p-8 max-w-4xl w-full shadow-[0_0_50px_rgba(247,37,133,0.5)] animate-fade-in-delayed">
              {/* Content in the middle */}
              <div className="text-center mb-8">
                {/* Type badge */}
                <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4 ${
                  expandedItem.type === 'work' 
                    ? 'bg-neon-pink text-white' 
                    : 'bg-sky-aqua text-black'
                }`}>
                  {expandedItem.type === 'work' ? 'Work Experience' : 'Project'}
                </span>

                {/* Title */}
                <h2 className="text-4xl font-bold text-sky-aqua mb-3 font-mono">
                  {expandedItem.title}
                </h2>

                {/* Company */}
                <p className="text-2xl text-neon-pink font-semibold mb-2">
                  {expandedItem.company}
                </p>

                {/* Date */}
                <p className="text-lg text-blue-energy mb-6">
                  {expandedItem.date}
                </p>

                {/* Short description */}
                <p className="text-xl text-white mb-6">
                  {expandedItem.shortDescription}
                </p>

                {/* Full description */}
                {expandedItem.fullDescription && (
                  <p className="text-gray-200 leading-relaxed mb-8">
                    {expandedItem.fullDescription}
                  </p>
                )}
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-sky-aqua font-bold text-xl mb-4 text-center">Technologies</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {expandedItem.technologies.map(function(tech, techIndex) {
                    return (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-electric-sapphire/80 backdrop-blur-sm text-white rounded-full"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Achievements */}
              {expandedItem.achievements && expandedItem.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sky-aqua font-bold text-xl mb-4 text-center">Key Achievements</h3>
                  <ul className="space-y-3">
                    {expandedItem.achievements.map(function(achievement, achIndex) {
                      return (
                        <li key={achIndex} className="text-gray-200 flex items-start">
                          <span className="text-neon-pink mr-3 text-xl">▹</span>
                          <span className="text-lg">{achievement}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Links */}
              {expandedItem.links && (
                <div className="flex gap-4 justify-center">
                  {expandedItem.links.github && (
                    <a
                      href={expandedItem.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-electric-sapphire/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-energy transition-colors text-lg shadow-lg"
                    >
                      GitHub
                    </a>
                  )}
                  {expandedItem.links.demo && (
                    <a
                      href={expandedItem.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-neon-pink/90 backdrop-blur-sm text-white rounded-lg hover:bg-raspberry-plum transition-colors text-lg shadow-lg"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Timeline;
