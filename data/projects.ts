export interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Color Palette Generator",
    summary: "Transforms abstract keywords into visual color data using Gemini AI, generating technically perfect and aesthetically beautiful palettes through geometric color harmony algorithms (Delta E) and K-Means clustering...",
    description: "Transforms abstract keywords into visual color data using Gemini AI. Generates technically perfect and aesthetically beautiful palettes through geometric color harmony algorithms (Delta E) and K-Means clustering.",
    techStack: ["Next.js", "TypeScript", "Gemini API", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/jiwonjae-svg/color-palette-generator",
    liveUrl: "https://github.com/jiwonjae-svg/color-palette-generator/releases",
  },
  {
    id: 2,
    title: "Croquis",
    summary: "Beyond a simple timer — corrects practice habits and visualizes achievements. Features a GitHub-style heatmap for practice history and AES-128 encryption based on device-specific keys...",
    description: "Beyond a simple timer — corrects practice habits and visualizes achievements. Features a GitHub-style heatmap for practice history and an AES-128 encryption system based on device-specific keys, thoroughly protecting precious practice data in a local environment.",
    techStack: ["Python", "PyQt6", "Fernet (AES-128)", "Pillow", "PyInstaller"],
    githubUrl: "https://github.com/jiwonjae-svg/croquis",
    liveUrl: "https://github.com/jiwonjae-svg/croquis/releases",
  },
  {
    id: 3,
    title: "ParticleVerse",
    summary: "Combines real-time hand gesture recognition via MediaPipe with Three.js GPU-accelerated shaders to create a world of tens of thousands of particles that physically respond to user movement...",
    description: "Combines real-time hand gesture recognition via MediaPipe with Three.js GPU-accelerated shaders to create a world of tens of thousands of particles that physically respond to user movement. Experience extreme graphic performance and a touchless UX interface in a web environment.",
    techStack: ["Three.js", "React Three Fiber", "MediaPipe", "GLSL Shaders", "TypeScript"],
    githubUrl: "https://github.com/jiwonjae-svg/particle-verse",
    liveUrl: "https://particle-verse.vercel.app/",
  },
  {
    id: 4,
    title: "SVG Converter",
    summary: "Converts images to high-quality SVG through a 2-Pass grid sampling algorithm entirely in the browser, with no server transmission. Optimizes Canvas API and luminance filtering...",
    description: "Converts images to high-quality SVG through a 2-Pass grid sampling algorithm entirely in the browser, with no server transmission. Optimizes Canvas API and luminance filtering to achieve both privacy protection and conversion speed.",
    techStack: ["Next.js", "TypeScript", "Canvas API", "SVG", "Vercel"],
    githubUrl: "https://github.com/jiwonjae-svg/svg-converter",
    liveUrl: "https://imagetosvg.vercel.app/",
  },
  {
    id: 5,
    title: "Paste Guardian",
    summary: "Monitors the system clipboard in real-time and manages sensitive copy history with AES-128 encryption. A security utility achieving OS-level optimization through direct Win32 API control...",
    description: "Monitors the system clipboard in real-time and manages sensitive copy history with AES-128 encryption. A security utility that achieves OS-level optimization — system tray residence, multi-instance prevention, and more — through direct Win32 API control.",
    techStack: ["Python", "CustomTkinter", "Win32 API", "Fernet (AES-128)", "PyInstaller"],
    githubUrl: "https://github.com/jiwonjae-svg/paste-guard",
    liveUrl: "https://github.com/jiwonjae-svg/paste-guard/releases",
  },
  {
    id: 6,
    title: "Word Cube",
    summary: "A game combining sophisticated 3D matrix operations via Three.js with real-time word search algorithms. Provides fresh intellectual entertainment through Firebase real-time leaderboards and seed-based puzzle generation...",
    description: "A game combining sophisticated 3D matrix operations via Three.js with real-time word search algorithms. Provides fresh intellectual entertainment every time through Firebase real-time leaderboards and seed-based puzzle generation logic.",
    techStack: ["Three.js", "React", "Firebase", "TypeScript", "Zustand"],
    githubUrl: "https://github.com/jiwonjae-svg/word-cube",
    liveUrl: "https://wordcube.web.app/",
  },
];
