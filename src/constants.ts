export interface CardItem {
    title: string;
    description: string;
    category: string;
    date: string;
    skills?: string[];
    highlighted?: boolean;
    relevant?: boolean;
}

export const Projects: CardItem[] = [
    {
        title: "Business Club Website",
        description: "Built and maintained a Website for my club, making school history by being the first ever club to have a website.~100 members use it for attending club events.",
        category: "Software",
        date: "3/5/2026",
        relevant: true,
        skills: ["HTML", "TailwindCSS", "CSS", "Javascript"],
        link: "https://shebaww.github.io/Business_Club_Website",
    },
    {
        title: "Ipod Video Converter",
        description: "I own an iPod Classic with Rockbox and got tired of finding the right ffmpeg settings. Built a wrapper that handles resolution, bitrate, and codec selection automatically. Used it to convert my movie collection.",
        category: "Software",
        date: "3/19/2026",
        relevant: true,
        skills: ["Linux", "Bash"],
        link: "https://github.com/shebaww/Ipod-Converter",
    },
    {
        title: "Nexus AI",
        description: "AI-powered email assistant with a conversational interface. Users describe the email they want, and the AI drafts subject + content. Built with front-end stack and EmailJS for seamless sending. Clean UI inspired by OpenWebUI.",
        category: "Software",
        date: "02/10/2026",
        relevant: true,
        skills: ["HTML", "CSS", "Javascript", "EmailJS"],
        link: "https://github.com/shebaww/Nexus-AI",
    },
    {
        title: "The Andinet Website",
        description: "I built Andinet Newspaper to serve as a digital news hub, lightweight, fast, and accessible to readers on any device. The site reflects a commitment to clean design and functional content presentation, making it ideal for sharing Ethiopian news, culture, and diaspora stories. Hosted on Netlify, it loads quickly and scales easily as readership grows.",
        category: "Software",
        date: "03/02/2026",
        relevant: true,
        skills: ["Front-end", "TailwindCSS", "React", "Firebase", "SEO"],
        link: "https://andinet-newspaper.netlify.app",
    },
    {
        title: "Addis Asqual Website",
        description: "I maintained the Addis Asqual Wesbite during my internship, debugged runtime errors, fixed chache issues, fixed cookie issues and expanded their viisibility using modern Search Engine Optimization.",
        category: "Software",
        date: "03/06/2026",
        relevant: true,
        skills: ["Front-end", "TailwindCSS", "React", "SEO", "Backend"],
        link: "https://asqualaddis.com",
    },
    {
        title: "Website",
        description: "I made this website using React to act as a professional portfolio.",
        category: "General SW",
        date: "3/19/2026"
    },
    {
        title: "Portfolio Website for my Sister",
        description: "I made a proffesional portoflio website for my sister using React.",
        category: "General SW",
        date: "4/28/2026",
        link: "https://shebaww.github.io/biluPortfolio"
    },
    {
        title: "3D Modeling with blender",
        description: "Created various 3d models in blender mainly for use in game development.",
        category: "Game Dev",
        date: "11/15/2023"
    },
];

export const Career = [
    {
        title: 'Intern',
        company: 'Addis Asqual',
        link: 'https://www.addisasqual.com',
        date: 'Mar 2026 - Present',
        description: 'Website Administrator',
        skills: ['HTML', 'CSS', 'Javascript'], // Add all stacks 
        image: 'assets/details-images/addis.jpg',
    },
    {
        title: 'Intern',
        company: 'Nib International Bank',
        link: 'https://www.nibbanksc.com',
        date: 'Mar 2026 - Present',
        description: 'Shadowed Analytics team, gaining exposure to banking operations and financial data management.',
        skills: ['Data Analysis'],
        image: 'assets/details-images/nib-bank.png',
    },
];

export const Coursework = {
    graduate: [
        'Math',
        'Physics',
        'Chemistry',
        'Biology',
        'English',
        'ICT',
    ],
    undergrad: [
        'Linear Algebra for ML',
        'Calculus I-III',
        'Harvard - CS50 - Introduction to Computer Science',
        'Website Development - freecodecamp',
        'Python',
        'Firebase'
    ],
};

export const Awards = [
    {
        title: 'Best Delegate',
        description: 'Maarif MUN Conference · Top 5% of 80+ delegates',
        link: '/assets/awards/Best.pdf',
        date: 'May 2024',
    },
    {
        title: 'Outstanding Delegate (2x)',
        description: 'AIS MUN Conference',
        link: '/assets/awards/Outstanding.pdf',
        date: 'Dec 2024 & Dec 2025',
    },
    {
        title: 'Honourable Mention',
        description: 'AIS MUN Conference',
        link: '/assets/awards/Honourable.pdf',
        date: 'Mar 2024',
    },
    {
        title: '3rd Place',
        description: 'Ideeza Hackathon · 1,000 birr prize for co-founded business club',
        link: '/assets/awards/3rd.pdf',
        date: 'Dec 2024 & Dec 2025',
    },
    {
        title: 'Winner, Grade Debate Competition ',
        description: 'Grades 9 & 10',
        link: '/assets/awards/Debate.pdf',
        date: 'April 2023 & April 2024',
    },
    {
        title: 'Science Fair Coordinator',
        description: 'Certificate of Appreciation',
        link: '/assets/awards/Science.pdf',
        date: 'April 2026',
    },
];

export const Phrases = [
    "Aspiring Quant Developer",
    "Ambitious Student",
    "Best Delegate",
    "Business Club Co-Founder"
];
