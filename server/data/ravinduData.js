export const ravinduData = {
  personalInfo: {
    name: "Ravindu S Hemachandra",
    title: "Software Engineer",
    email: "ravindusdc@gmail.com",
    phone: "+94 77 602 7643",
    location: "451/7/C Gotabaya Mawatha Wanawasala, Kelaniya",
    linkedin: "https://linkedin.com/in/ravindu-hemachandra",
    github: "https://github.com/ravindusdc",
    medium: "https://medium.com/@ravindusdc",
    portfolio: "https://ravindu-portfolio.vercel.app",
    languages: ["English", "Sinhala"]
  },
  
  about: `I'm Ravindu S Hemachandra, a passionate Software Engineer currently pursuing my BSc (Hons) in Information Technology at SLIIT. 
          I have hands-on experience in full-stack development with expertise in modern web technologies. 
          Previously worked as a Banking Associate at National Development Bank, which gave me valuable insights into financial systems. 
          I'm proficient in building scalable applications using React, Next.js, Express.js, and various database technologies.`,
  
  education: [
    {
      degree: "BSc (Hons) in Information Technology",
      institution: "SLIIT",
      period: "2023 - 2027",
      status: "Currently pursuing"
    },
    {
      degree: "G.C.E A/level (Physical Science)",
      institution: "Sri Dharmaloka College",
      period: "2021/22",
      result: "3Cs"
    }
  ],
  
  experience: [
    {
      role: "Banking Associate",
      company: "National Development Bank",
      period: "May 2022 - Jan 2023",
      description: "Worked in banking operations, customer service, and financial transactions processing.",
      highlights: [
        "Handled customer banking operations",
        "Processed financial transactions",
        "Provided excellent customer service",
        "Worked with banking software systems"
      ]
    }
  ],
  
  projects: [
    {
      name: "Employee Management System",
      description: "A comprehensive system for managing employee data, attendance, and performance",
      technologies: ["React JS", "Tailwind CSS", "Express", "MongoDB", "Shadcn UI", "Bootstrap"],
      features: [
        "Employee CRUD operations",
        "Attendance tracking",
        "Performance monitoring",
        "Real-time dashboard",
        "Responsive design"
      ],
      highlights: "Built with modern tech stack focusing on user experience and scalability"
    },
    {
      name: "Online Vehicle Service and Fuel Station Management System",
      description: "Integrated system for managing vehicle services and fuel station operations",
      technologies: ["Java", "JavaScript", "MySQL", "HTML", "CSS"],
      features: [
        "Service booking system",
        "Fuel inventory management",
        "Customer management",
        "Billing and invoicing",
        "Reports generation"
      ],
      highlights: "Comprehensive solution for automotive service industry"
    },
    {
      name: "Boat Safari Trip Management System",
      description: "Booking and management system for boat safari operations",
      technologies: ["JavaScript", "CSS", "SQL", "PHP", "HTML"],
      features: [
        "Online booking system",
        "Trip scheduling",
        "Customer management",
        "Payment processing",
        "Admin dashboard"
      ],
      highlights: "Streamlined booking process for tourism industry"
    }
  ],
  
  skills: {
    programming: ["HTML", "CSS", "C", "C++", "JavaScript", "TypeScript", "PHP", "Java"],
    frontend: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "Shadcn UI"],
    backend: ["Express.js", "Django", ".NET", "Node.js"],
    databases: ["MySQL", "SQL Server", "MongoDB", "PostgreSQL"],
    cloud: ["Vercel", "Docker"],
    tools: ["GIT", "GitHub", "Postman", "Jira", "WordPress", "Figma", "Microsoft Office Suite"],
    os: ["Windows/Windows Server", "macOS", "Ubuntu Server"],
    soft: [
      "Adaptability",
      "Public Relations",
      "Teamwork",
      "Time Management",
      "Leadership",
      "Effective Communication",
      "Critical Thinking",
      "Digital Marketing"
    ]
  },
  
  certifications: [
    {
      name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
      issuer: "Oracle",
      year: "2025"
    },
    {
      name: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      year: "2024"
    },
    {
      name: "Python (Basic) Certificate",
      issuer: "HackerRank",
      year: "2024"
    },
    {
      name: "SQL (Basic) Certificate",
      issuer: "HackerRank",
      year: "2024"
    }
  ],
  
  availability: "Available for full-time opportunities, freelance projects, and interesting collaborations",
  
  interests: [
    "Full-stack Development",
    "Cloud Computing",
    "DevOps",
    "Open Source",
    "Machine Learning",
    "Financial Technology"
  ]
};

export function getContextualResponse(query) {
  const q = query.toLowerCase();
  
  // Build contextual information based on query
  let context = `You are an AI assistant representing ${ravinduData.personalInfo.name}, a ${ravinduData.personalInfo.title}. `;
  context += `Respond in first person as Ravindu. Be professional, friendly, and enthusiastic about technology.\n\n`;
  context += `About me: ${ravinduData.about}\n\n`;
  
  // Add relevant context based on query keywords
  if (q.includes('project') || q.includes('work') || q.includes('built')) {
    context += "My Projects:\n";
    ravinduData.projects.forEach(p => {
      context += `- ${p.name}: ${p.description}. Tech: ${p.technologies.join(', ')}. ${p.highlights}\n`;
    });
  }
  
  if (q.includes('skill') || q.includes('tech') || q.includes('language')) {
    context += "\nTechnical Skills:\n";
    context += `Programming: ${ravinduData.skills.programming.join(', ')}\n`;
    context += `Frontend: ${ravinduData.skills.frontend.join(', ')}\n`;
    context += `Backend: ${ravinduData.skills.backend.join(', ')}\n`;
    context += `Databases: ${ravinduData.skills.databases.join(', ')}\n`;
  }
  
  if (q.includes('experience') || q.includes('work') || q.includes('job')) {
    context += "\nWork Experience:\n";
    ravinduData.experience.forEach(e => {
      context += `${e.role} at ${e.company} (${e.period}): ${e.description}\n`;
    });
  }
  
  if (q.includes('education') || q.includes('study') || q.includes('degree')) {
    context += "\nEducation:\n";
    ravinduData.education.forEach(e => {
      context += `${e.degree} at ${e.institution} (${e.period})\n`;
    });
  }
  
  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    context += `\nContact: Email: ${ravinduData.personalInfo.email}, Phone: ${ravinduData.personalInfo.phone}\n`;
    context += `LinkedIn: ${ravinduData.personalInfo.linkedin}\n`;
    context += `GitHub: ${ravinduData.personalInfo.github}\n`;
  }
  
  if (q.includes('certif')) {
    context += "\nCertifications:\n";
    ravinduData.certifications.forEach(c => {
      context += `- ${c.name} (${c.issuer})\n`;
    });
  }
  
  context += `\nAvailability: ${ravinduData.availability}\n`;
  
  return context;
}
