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
        title: "VGGT Visual SLAM",
        description: "I'm working on utilizing the new VGGT model to implement a new Visual SLAM algorithm that relies solely on visual data. Not even IMU data is used.",
        category: "Software",
        date: "4/12/2025",
        relevant: true,
        skills: ["Python", "SLAM"]
    },
    {
        title: "SLAM from Scratch",
        description: "I developed a custom ROS2 node to implement the SLAM algorithm from the ground up, utilizing odometry and LIDAR data from the TurtleBot3 library.",
        category: "Software",
        date: "3/19/2025",
        relevant: true,
        skills: ["ROS2", "Python", "Linux", "SLAM"]
    },
    {
        title: "MNIST Classifier",
        description: "I created a linear MNIST classifier from scratch in Python. I include derivations for linear and quadratic loss gradients.",
        category: "Software",
        date: "10/21/2024",
        relevant: true,
        skills: ["Python", "Computer Vision"]
    },
    {
        title: "Raw Pixel Data RL",
        description: "I compared CNNs and ViTs on their ability to function as the neural network backbone of a RL agent with raw pixels as observations. Experimented on OpenAI's Atari environments.",
        category: "Machine Learning",
        date: "12/7/2024",
        relevant: true,
        skills: ["Python", "PyTorch", "RL", "CNN", "ViT", "Computer Vision"]
    },
    {
        title: "MC Data Experiments",
        description: "I trained CNNs on the Minecraft Dataset I made and compared their performance to foundation models.",
        category: "Machine Learning",
        date: "12/3/2024",
        relevant: true,
        skills: ["Python", "PyTorch", "CNN", "Computer Vision"]
    },
    {
        title: "Bullet Hopper PPO",
        description: "I implemented the PPO (Proximal Policy Optimization) algorithm in PyTorch and trained it on the Bullet Hopper environment.",
        category: "Machine Learning",
        date: "11/18/2024",
        relevant: false,
        skills: ["Python", "PyTorch", "RL"]
    },
    {
        title: "YOLO in PyTorch",
        description: "I implemented the YOLO (You Only Look Once) real time object detection model in PyTorch.",
        category: "Machine Learning",
        date: "5/29/2024",
        relevant: true,
        skills: ["Python", "PyTorch", "CNN", "Computer Vision"]
    },
    {
        title: "Minecraft Dataset",
        description: "I made a dataset of 20,000+ screenshots of minecraft with full depth and semantic annotations.",
        category: "Machine Learning",
        date: "10/21/2024",
        skills: ["Java", "Computer Vision"]
    },
    {
        title: "Arduino Galactica",
        description: "I made a simple version of Galactica using AVR C++ as the final project for my Embedded Systems class.",
        category: "Electrical",
        date: "6/9/2024",
        relevant: true,
        skills: ["C++", "Game Dev", "Electrical", "Embedded Systems"],
    },
    {
        title: "Geometry Dash RL",
        description: "I made a bot that learned to play a simplified version of geometry dash with machine learning.",
        category: "Machine Learning",
        date: "8/4/2023",
        skills: ["Python", "PyTorch", "RL", "Game Dev"]
    },
    {
        title: "Website",
        description: "I made this website using AngularJS to act as a professional portfolio.",
        category: "General SW",
        date: "9/17/2022"
    },
    {
        title: "Piano Tiles Player",
        description: "Python/C# application to get as high of a score in piano tiles as possible.",
        category: "Game Bot",
        date: "9/21/2022"
    },
    {
        title: "Chess Player",
        description: "Python application to play chess on chess.com by reading the screen and moving accordingly. Uses Stockfish chess engine.",
        category: "Game Bot",
        date: "11/22/2022"
    },
    {
        title: "Jurassic World Player",
        description: "Using Tesseract from google, I made a bot to read the current state of the battle and move accordingly.",
        category: "Game Bot",
        date: "9/28/2022"
    },
    {
        title: "3D Modeling with blender",
        description: "Created various 3d models in blender mainly for use in game development.",
        category: "Game Dev",
        date: "11/15/2022"
    },
    {
        title: "Random Map Generator",
        description: "Created random dungeons using cellular automation and perlin noise.",
        category: "Game Dev",
        date: "12/18/2022"
    },
];

export const Career = [
    {
        title: 'Robotics Engineer',
        company: 'Duality AI',
        link: 'https://www.duality.ai/',
        date: 'Sep 2025 - Present',
        description: 'Integrating robots into a digital twin simulator.',
        skills: ['Python', 'ROS2', 'UE5'],
        image: 'assets/timeline-images/duality.jpg',
    },
    {
        title: 'Content Creator',
        company: 'Vibe Engineering',
        link: 'https://www.youtube.com/@vibe-engineering-10',
        date: 'Dec 2025 - Present',
        description: 'Making videos about robotics and engineering. Check out my channel!',
        skills: ['Robotics', 'Engineering', 'Video Editing'],
        image: 'assets/timeline-images/vibe-engineering.png',
    },
    {
        title: 'Robotics Engineer',
        company: 'Pursuit Robotics',
        link: 'https://www.pursuitrobotics.com/',
        date: 'June 2025 - Sep 2025',
        description: 'Pre-seed robotics startup building autonomous security robots.',
        skills: ['C++', 'Python', 'ROS1', 'ROS2'],
        image: 'assets/timeline-images/pursuit.jpg',
    },
    {
        title: "Autonomy Lead/Co-Founder",
        company: "Aviat'r",
        link: 'https://aviatr.ucrhighlanders.org/',
        date: 'Nov 2024 - June 2025 | 8 mos',
        description: "Manages the computer vision and autonomous navigation subteams (6 members) at UCR's drone club.",
        skills: ['C++', 'Python'],
        image: 'assets/timeline-images/aviatr.jpg',
    },
    {
        title: 'Graduate Research Assistant',
        company: 'TASL',
        link: 'https://tasl.ucr.edu/',
        date: 'Oct 2024 - June 2025 | 9 mos',
        description: 'Trustworthy Autonomous Systems Laboratory. Advised by Prof. Jiachen Li.',
        skills: ['C++', 'Python', 'ROS2'],
        image: 'assets/timeline-images/tasl.png',
    },
    {
        title: 'R&D Intern',
        company: 'Standard Biotools',
        link: 'https://www.standardbio.com/',
        date: 'Jun 2024 - Sep 2024 | 4 mos',
        description: 'Worked on various data science and electrical engineering projects for a mass cytometry instrument.',
        skills: ['C++', 'Python'],
        image: 'assets/timeline-images/stdbio.jpg',
    },
    {
        title: 'Software Engineer (Part-Time)',
        company: 'Seer',
        link: 'https://seer.bio/',
        date: 'Oct 2022 - Sep 2023 | 1 yr',
        description: 'Continued my work as a part time employee while attending classes.',
        skills: ['C#', 'HTML', 'CSS', 'JavaScript'],
        image: 'assets/timeline-images/seer.jpg',
    },
    {
        title: 'R&D Intern',
        company: 'Seer',
        link: 'https://seer.bio/',
        date: 'Jun 2022 - Sep 2022 | 4 mos',
        description: 'Developed a customer facing UI for biotech instruments.',
        skills: ['C#', 'HTML', 'CSS', 'JavaScript'],
        image: 'assets/timeline-images/seer.jpg',
    },
    {
        title: 'R&D Intern',
        company: 'Fluidigm Corp.',
        link: 'https://www.standardbio.com/',
        date: 'Jun 2020 - Sep 2021 | 1 yr 4 mos',
        description: 'Built an internal dev tool used by engineers to run scripts and perform operations on the product.',
        skills: ['C#', 'C++', 'Python'],
        image: 'assets/timeline-images/fluidigm.png',
    }
];

export const Coursework = {
    graduate: [
        'EE 227 - Reinforcement Learning',
        'EE 228 - Deep Learning',
        'EE 230 - Applied Linear Algebra for Engineering',
        'EE 231 - Advanced Digital Image Processing',
        'EE 243 - Advanced Computer Vision',
        'EE 245 - Robot Navigation',
        'EE 246 - Intelligent Transportation Systems',
        'EE 260 - Trustworthy Autonomous Systems',
    ],
    undergrad: [
        'Math 031, 131 - Linear Algebra',
        'Math 135A, 135B - Numerical Analysis',
        'Math 146A, 146B, 146C - ODEs and PDEs',
        'Phys 130A, 130B - Classical Mechanics',
        'Phys 135A, 135B - Electromagnetism',
        'Phys 136 - Electromagnetic Waves',
        'EE 120A, 120B - Embedded Systems',
        'EE 148 - Robotics and AI',
    ]
};

export const Papers = [
    {
        title: 'VGGT-SLAM: Purely Vision Based SLAM',
        link: 'VGGT-SLAM',
        date: 'May 2025',
    },
    {
        title: 'Evaluating π0 on Long-horizon Manipulation Tasks',
        link: 'EvaluatingPi0',
        date: 'March 2025',
    },
    {
        title: 'Context Aware GAN Image Compression',
        link: 'ImageCompression',
        date: 'March 2025',
    },
    {
        title: 'Synthetic Depth and Semantic Dataset Generation from Minecraft',
        link: 'MCData',
        date: 'November 2024',
    },
    {
        title: 'Deep RL Models with Raw Pixel Data',
        link: 'RawPixelRL',
        date: 'November 2024',
    },
];

export const Phrases = [
    "Robotics & Machine Learning Engineer",
    "Autonomous Systems Enthusiast",
    "Full-Stack Developer",
    "Lifelong Learner"
];
