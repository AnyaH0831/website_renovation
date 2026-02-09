import { useState } from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import ProjectCard from './components/ProjectCard';
import { heroData, timelineItems, sideProjects } from './data/portfolioData';

function App() {
  return (
    <div className="min-h-screen bg-black font-mono">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-mono text-raspberry-plum drop-shadow-[0_0_2px_#f72585]" style={{WebkitTextStroke: '1px #4cc9f0'}}>
            Anya Huang
          </h1>
          
          <div className="flex items-center gap-6">
            <a href="#hero" className="text-sky-aqua hover:text-neon-pink transition-colors">Home</a>
            <a href="#timeline" className="text-sky-aqua hover:text-neon-pink transition-colors">Journey</a>
            <a href="#projects" className="text-sky-aqua hover:text-neon-pink transition-colors">Projects</a>
            <a href="#contact" className="text-sky-aqua hover:text-neon-pink transition-colors">Contact</a>
          </div>
        </div>
        {/* Animated gradient border */}
        <div 
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, #f72585, #4361ee, #4cc9f0, #4361ee, #f72585)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 4s ease infinite'
          }}
        ></div>
      </nav>

      {/* Hero Section */}
      <div id="hero">
        <Hero data={heroData} />
      </div>

      {/* Timeline Section */}
      <div id="timeline">
        <Timeline items={timelineItems} />
      </div>

      {/* Side Projects Section */}
      <section id="projects" className="bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-sapphire to-sky-aqua">
              Side Projects
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sideProjects.map(function(project) {
              return <ProjectCard key={project.id} project={project} />;
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-electric-sapphire">
              Get In Touch
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`mailto:${heroData.links.email}`}
              className="px-8 py-4 bg-neon-pink text-white rounded-lg hover:bg-raspberry-plum transition-colors text-lg font-mono"
            >
              Send Email
            </a>
            <a
              href={heroData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-electric-sapphire text-white rounded-lg hover:bg-blue-energy transition-colors text-lg font-mono"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 text-center border-t border-gray-800">
        <p className="text-gray-500">
          © 2026 Anya Huang. Built with React + Vite + Tailwind CSS
        </p>
      </footer>
    </div>
  )
}

export default App
