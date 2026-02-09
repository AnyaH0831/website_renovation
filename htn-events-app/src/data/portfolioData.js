export const heroData = {
  name: "Anya Huang",
  tagline: "Full Stack Developer | Problem Solver | Tech Enthusiast",
  bio: "Building elegant solutions to complex problems. Passionate about creating impactful user experiences.",
  links: {
    github: "https://github.com/AnyaH0831",
    linkedin: "https://linkedin.com/in/anyahuang07",
    email: "anyahuang0831@gmail.com",
    resume: "/resume.pdf"
  }
};

export const timelineItems = [
  {
    id: 1,
    type: "work",
    title: "Software Developer Intern",
    company: "Royal Bank of Canada (RBC)",
    date: "July 2025 - August 2025",
    shortDescription: "Automate internal tools.",
    fullDescription: "",
    technologies: ["Java", "JavaScript", "HTML/CSS", "Git", "MongoDB"],
    image: "/rbc_2.jpg",
    achievements: [
      "Developed reusable component library used across 5+ projects",
      "Reduced page load time by 40% through optimization",
      "Collaborated with team of 8 developers using Agile methodology"
    ]
  },
  {
    id: 2,
    type: "project",
    title: "Hackathon Global Inc. Events Platform",
    company: "Personal Project",
    date: "Feb 2026",
    shortDescription: "Full-featured event management platform with authentication and real-time search",
    fullDescription: "Built a complete event management system with user authentication, fuzzy search, pagination, and responsive design. Implemented advanced features including cross-page navigation, debounced search, and animated UI elements. Deployed on Vercel with CI/CD pipeline.",
    technologies: ["React", "Vite", "Fuse.js", "Tailwind CSS", "Vercel"],
    image: "/htn-project.jpg",
    achievements: [
      "Implemented fuzzy search with 300ms debounce for optimal UX",
      "Built cross-page navigation system for related events",
      "Created responsive design with mobile-first approach"
    ],
    links: {
      github: "https://github.com/AnyaH0831/htn-frontend-challenge",
      demo: "https://htn-frontend-challenge-sepia.vercel.app/"
    }
  },
  {
    id: 3,
    type: "work",
    title: "Previous Position",
    company: "Another Company",
    date: "Jun 2024 - Dec 2024",
    shortDescription: "Your role description here",
    fullDescription: "Detailed description of your work, accomplishments, and technologies used...",
    technologies: ["JavaScript", "Node.js", "MongoDB"],
    image: "/work2.jpg",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3"
    ]
  }
];

export const sideProjects = [
  {
    id: 1,
    title: "Side Project 1",
    description: "Brief description of what this project does and the problem it solves",
    technologies: ["React", "Express", "PostgreSQL"],
    image: "/project1.jpg",
    github: "https://github.com/AnyaH0831/project1",
    demo: "https://project1-demo.com"
  },
  {
    id: 2,
    title: "Side Project 2",
    description: "Another interesting project showcasing different skills",
    technologies: ["Python", "Flask", "React"],
    image: "/project2.jpg",
    github: "https://github.com/AnyaH0831/project2",
    demo: "https://project2-demo.com"
  }
];
