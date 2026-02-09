function Hero({ data }) {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-neon-pink via-electric-sapphire to-sky-aqua p-1">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="/hero_image.jpg" 
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-electric-sapphire to-sky-aqua">
              {data.name}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-sky-aqua mb-6 font-mono">
            {data.tagline}
          </p>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            {data.bio}
          </p>
        </div>
        
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href={data.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-electric-sapphire text-white rounded-lg hover:bg-blue-energy transition-colors font-mono"
          >
            GitHub
          </a>
          <a
            href={data.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-neon-pink text-white rounded-lg hover:bg-raspberry-plum transition-colors font-mono"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${data.links.email}`}
            className="px-6 py-3 bg-gray-800 text-white border-2 border-sky-aqua rounded-lg hover:bg-gray-700 transition-colors font-mono"
          >
            Contact Me
          </a>
          {data.links.resume && (
            <a
              href={data.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 text-white border-2 border-electric-sapphire rounded-lg hover:bg-gray-700 transition-colors font-mono"
            >
              Resume
            </a>
          )}
        </div>
        
        <div className="mt-16 animate-bounce">
          <svg className="w-8 h-8 mx-auto text-sky-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
