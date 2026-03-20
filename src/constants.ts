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
        skills: ["HTML", "TailwindCSS", "CSS", "Javascript"]
    },
    {
        title: "Ipod Video Converter",
        description: "I own an iPod Classic with Rockbox and got tired of finding the right ffmpeg settings. Built a wrapper that handles resolution, bitrate, and codec selection automatically. Used it to convert my movie collection.",
        category: "Software",
        date: "3/19/2026",
        relevant: true,
        skills: ["Linux", "Bash"]
    },
    {
        title: "Nexus AI",
        description: "AI-powered email assistant with a conversational interface. Users describe the email they want, and the AI drafts subject + content. Built with front-end stack and EmailJS for seamless sending. Clean UI inspired by OpenWebUI.",
        category: "Software",
        date: "02/10/2026",
        relevant: true,
        skills: ["HTML", "CSS", "Javascript", "EmailJS"]
    },
    {
        title: "Website",
        description: "I made this website using React to act as a professional portfolio.",
        category: "General SW",
        date: "3/19/2026"
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
        image: '/public/assets/details-images/addis.jpg',
    },
    {
        title: 'Intern',
        company: 'Nib International Bank',
        link: 'https://www.nibbanksc.com',
        date: 'Mar 2025 - Present',
        description: 'Helping in anyway i can',
        skills: ['File arrangement'],
        image: '/Portfolio/public/assets/details-images/nib-bank.png',
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
        'Linear Algebra I',
        'Calculus I',
        'Harvard - CS50 - Introduction to Computer Science',
        'Website Development - freecodecamp',
        'Python for Data Analysis',
        'React Native',
        'Backend Website Development', // Finish and link everything you wrote and plan to write and other courses
    ],
};

export const Papers = [
    {
        title: 'Python Data Analysis',
        link: 'python-paper', // Add proper Research paper
        date: 'May 2025',
    },
];

export const Phrases = [
    "Algorithmic Trader",
    "Enthusiastic Student",
    "Full-Stack Developer",
    "Lifelong Learner"
];
