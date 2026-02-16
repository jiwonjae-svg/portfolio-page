export interface TechDetail {
  name: string;
  category: 'language' | 'framework' | 'library' | 'tool' | 'api' | 'infrastructure';
}

export interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  techStack: TechDetail[];
  technicalChallenge: {
    problem: string;
    solution: string;
  };
  architecture: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  thumbnails?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Color Palette Generator",
    summary: "AI-powered desktop app that transforms abstract keywords into visual color data. Gemini LLM interprets color semantics, while Delta E color-difference algorithms and K-Means clustering generate technically precise and aesthetically beautiful palettes.",
    description: "Performs semantic color recommendation from natural language keywords (e.g., 'autumn evening sunset') using the Google Gemini API. Instead of random generation, applies geometric color harmony algorithms (Complementary, Triadic, Analogous, etc.) based on the HSV color space to produce mathematically balanced palettes. Extracts representative colors from images via K-Means clustering and precisely calculates perceptual distance between colors using the Delta E (CIE2000) formula. User settings and palette data are protected with Fernet (AES-128) encryption, with device-specific keys separated into external files for enhanced security.",
    techStack: [
      { name: "Python 3.12+", category: "language" },
      { name: "CustomTkinter", category: "framework" },
      { name: "Pillow (PIL)", category: "library" },
      { name: "colorsys", category: "library" },
      { name: "cryptography (Fernet/AES-128)", category: "library" },
      { name: "Google Gemini API", category: "api" },
      { name: "K-Means Clustering", category: "library" },
      { name: "Delta E (CIE2000)", category: "library" },
      { name: "PyInstaller", category: "tool" },
      { name: "JSON / Base64 Encoding", category: "tool" },
    ],
    technicalChallenge: {
      problem: "The Gemini API occasionally returned invalid HEX codes or unexpected JSON structures in its free-form text responses, causing frequent parsing failures. Additionally, adding the first color to an empty palette (0 colors) triggered a UI flicker.",
      solution: "Built a multi-stage regex-based parsing pipeline: JSON parsing → Regex HEX extraction → Fallback default colors, safely handling all response variants. Resolved the empty palette flicker by adding conditional rendering logic that explicitly handles the empty state during initial render. In v1.0.1, separated the embedded encryption key into an external secret.key file and re-encrypted all data to strengthen security.",
    },
    architecture: `[User Input (Keyword / Image)]
    ↓
[AI Module] ← Google Gemini API
    ↓ (Natural Language → HEX Color Conversion)
[Color Generation Engine]
    ├── HSV Color Harmony Algorithms (Complementary, Triadic, Analogous...)
    ├── K-Means Clustering (Image → Representative Color Extraction)
    └── Delta E CIE2000 Color Difference Calculation
    ↓
[Palette Data]
    ↓
[File Handler] ← Fernet (AES-128) Encryption + secret.key
    ├── config.dat (Settings)
    ├── preset_palettes.dat (Presets)
    └── custom_harmonies.dat (Custom Harmonies)
    ↓
[CustomTkinter UI] ← Language Manager (KO/EN)
    ├── Main Dashboard (Palette View)
    ├── Color Adjustment Panel (Warmth, Contrast, HSV Sliders)
    ├── Preset Browser
    └── Image Recoloring`,
    githubUrl: "https://github.com/jiwonjae-svg/color_palette",
    liveUrl: "https://github.com/jiwonjae-svg/color_palette/releases",
    thumbnails: ["/images/CPG1.png", "/images/CPG2.png", "/images/CPG3.png"],
    metrics: [
      { label: "Languages", value: "KO/EN" },
      { label: "Encryption", value: "AES-128" },
    ],
  },
  {
    id: 2,
    title: "Croquis",
    summary: "More than a simple timer — a drawing practice management system. Corrects practice habits with a modern PyQt6 UI, visualizes achievements via a GitHub-style heatmap, and thoroughly protects practice data with AES-128 device-specific key encryption.",
    description: "An image-viewer-based drawing practice timer that integrates alarm services, keyboard shortcuts, and image navigation into a comprehensive practice tool — far beyond a simple countdown. Designed with an event-driven architecture leveraging PyQt6's signal-slot mechanism, with a window management system that remembers position even in multi-monitor setups. Practice history is managed through structured model classes and securely protected with Fernet (AES-128) encryption in the local environment. Includes an Inno Setup-based Windows installer with user data preservation logic for install/upgrade/uninstall scenarios.",
    techStack: [
      { name: "Python 3.10+", category: "language" },
      { name: "PyQt6", category: "framework" },
      { name: "Pillow (PIL)", category: "library" },
      { name: "cryptography (Fernet/AES-128)", category: "library" },
      { name: "keyboard (Hotkeys)", category: "library" },
      { name: "CSV-based i18n System", category: "tool" },
      { name: "PyInstaller", category: "tool" },
      { name: "Inno Setup (Windows Installer)", category: "tool" },
      { name: "threading (Alarm Service)", category: "library" },
      { name: "QResource System", category: "framework" },
    ],
    technicalChallenge: {
      problem: "When building a single .exe with PyInstaller, PyQt6's resource system (QResource) and translation CSV files were not properly bundled, causing missing icons and translations at runtime. Additionally, encryption key changes during installer upgrades made existing data undecryptable — a migration issue.",
      solution: "Explicitly configured datas and hiddenimports in the PyInstaller spec file, and created a qt_resource_loader utility to dynamically resolve resource paths at runtime. For the data migration issue, documented an Export → Re-import workflow in the release notes and planned an automatic migration script for future versions.",
    },
    architecture: `[User]
    ↓
[Image Viewer Window] ← PyQt6 GUI
    ├── Image Navigation (Previous / Next / Random)
    ├── Timer Controls (Play / Pause / Stop)
    └── Keyboard Shortcuts (Key Manager)
    ↓
[Core Layer]
    ├── Alarm Service ← threading (Background Notifications)
    ├── Models (Practice Session / History Data Structures)
    └── Key Manager (Global Hotkey Registration)
    ↓
[Utils Layer]
    ├── Language Manager ← translations.csv (KO/EN/JA)
    ├── Log Manager (Logging System)
    └── QResource Loader (Resource Path Resolution)
    ↓
[Data Persistence]
    ├── Practice History ← JSON + Fernet (AES-128) Encryption
    └── User Settings ← JSON Serialization
    ↓
[Distribution]
    ├── PyInstaller → Single .exe (~48MB)
    └── Inno Setup → Windows Installer (Install / Upgrade / Uninstall)`,
    githubUrl: "https://github.com/jiwonjae-svg/Croquis",
    liveUrl: "https://github.com/jiwonjae-svg/Croquis/releases",
    thumbnails: ["/images/Croquis1.png", "/images/Croquis2.png", "/images/Croquis3.png"],
    metrics: [
      { label: "Languages", value: "KO/EN/JA" },
      { label: "Build Size", value: "~48MB" },
      { label: "Encryption", value: "AES-128" },
      { label: "Installer", value: "Inno Setup" },
    ],
  },
  {
    id: 3,
    title: "ParticleVerse",
    summary: "Combines MediaPipe real-time hand gesture recognition with Three.js GPU-accelerated GLSL shaders, creating an interactive 3D visualization where tens of thousands of particles physically respond to user hand movements. Achieves extreme graphic performance and touchless UX in the browser.",
    description: "Implements a multi-source input system that converts images, text, and 3D models (GLTF/GLB) into particles. Custom GLSL Vertex/Fragment shaders compute particle position, size, and color directly on the GPU, rendering 50,000+ particles at 60fps without CPU bottlenecks. Applies Bloom and Vignette post-processing effects via @react-three/postprocessing, and extracts 21 real-time hand landmarks through MediaPipe Hands for physics-based particle interaction. Supports smooth transitions between 11 particle effects (Wave, Spiral, Explosion, Vortex, Galaxy, DNA, etc.) and 5 color modes. Built-in WebM video recording is also included.",
    techStack: [
      { name: "TypeScript 5", category: "language" },
      { name: "GLSL (Custom Vertex/Fragment)", category: "language" },
      { name: "Next.js 14 (App Router)", category: "framework" },
      { name: "React 18", category: "framework" },
      { name: "Three.js r160", category: "library" },
      { name: "React Three Fiber (R3F)", category: "library" },
      { name: "@react-three/postprocessing", category: "library" },
      { name: "MediaPipe Hands", category: "api" },
      { name: "Zustand (State Management)", category: "library" },
      { name: "Tailwind CSS", category: "library" },
      { name: "Framer Motion", category: "library" },
      { name: "WebM Recording API", category: "api" },
      { name: "Vercel (Edge Deployment)", category: "infrastructure" },
    ],
    technicalChallenge: {
      problem: "When rendering tens of thousands of particles simultaneously with real-time hand tracking, updating particle positions on the CPU every frame caused severe performance degradation (below 10fps). Additionally, higher MediaPipe camera resolutions accumulated hand tracking latency, making particle responses feel unnatural.",
      solution: "Fully offloaded particle computation to GLSL shaders, achieving GPU-parallel processing. Custom Vertex shaders receive time (uTime), hand position (uHandPosition), and effect type (uEffectType) as uniforms and perform all particle transformations on the GPU. On mobile, adaptive DPR (Device Pixel Ratio) reduction, Bloom attenuation, and camera resolution downscaling optimize performance. Color mode transitions are also handled at the shader level with lerp-based smooth interpolation, eliminating frame drops during transitions.",
    },
    architecture: `[Input Sources]
    ├── Image Upload → Pixels → Float32Array (Positions + Colors)
    ├── Text Input → Canvas Rendering → Pixel Sampling
    ├── Cubemap → 6 Faces → Particle Mapping
    └── 3D Model (GLTF/GLB) → Vertex Extraction
    ↓
[particleGenerator.ts] → Float32Array (positions + colors)
    ↓
[ParticleSystem.tsx] ← React Three Fiber
    ├── BufferGeometry (position, color attributes)
    ├── ShaderMaterial (Custom GLSL)
    │   ├── Vertex Shader: uTime, uEffectType, uHandPosition → Particle Transform
    │   └── Fragment Shader: uColorMode → Color Computation
    └── 11 Effects (Wave, Spiral, Galaxy, DNA, Vortex...)
    ↓
[Scene.tsx] ← Canvas + Camera + OrbitControls
    ├── @react-three/postprocessing (Bloom, Vignette)
    └── WebM Recording
    ↓
[HandTracker.tsx] ← MediaPipe Hands
    ├── Webcam → 21 Landmark Extraction
    └── Hand Position → Zustand Store → Shader Uniform Delivery
    ↓
[UIOverlay.tsx] ← 7 Settings Panels
    └── Zustand (useAppStore) → Real-time Parameter Sync`,
    githubUrl: "https://github.com/jiwonjae-svg/particle-verse",
    liveUrl: "https://particle-verse.vercel.app/",
    thumbnails: ["/images/ParticleVerse1.png", "/images/ParticleVerse2.png"],
    metrics: [
      { label: "Particles", value: "50,000+" },
      { label: "Effects", value: "11 Types" },
      { label: "Target FPS", value: "60fps" },
      { label: "Color Modes", value: "5 Types" },
    ],
  },
  {
    id: 4,
    title: "SVG Converter",
    summary: "Browser-only app that converts images to high-quality SVG via a 2-Pass Grid Sampling algorithm. Optimizes conversion speed with Canvas API and Luminance filtering while protecting privacy with zero server transmission.",
    description: "A fully client-side image-to-SVG conversion app processing entirely within the browser. The 2-Pass Grid Sampling algorithm divides the image into a low-resolution grid in Pass 1 to analyze regional color distribution, then reinforces detail with a fine grid in Pass 2. Extracts pixel data via Canvas API and removes unnecessary backgrounds through Luminance filtering. SVG output is generated as combinations of basic shapes (<rect>, <circle>, etc.) with vector compression optimization to minimize file size. Manages conversion state with Zustand and supports 4 languages (KO/EN/JA/ZH). Includes built-in web security validation utilities for XSS, CSRF, and clickjacking prevention.",
    techStack: [
      { name: "TypeScript", category: "language" },
      { name: "React 18", category: "framework" },
      { name: "Vite", category: "tool" },
      { name: "Canvas API", category: "api" },
      { name: "SVG DOM Generation", category: "api" },
      { name: "Zustand (State Management)", category: "library" },
      { name: "CSS Modules", category: "library" },
      { name: "i18n (KO/EN/JA/ZH)", category: "tool" },
      { name: "Security Utils (XSS/CSRF Prevention)", category: "tool" },
      { name: "Vercel (Deployment)", category: "infrastructure" },
    ],
    technicalChallenge: {
      problem: "When loading high-resolution images (4000x3000px+) into Canvas for pixel-by-pixel processing, a single-pass traversal of all pixels blocked the main thread for several seconds, freezing the browser. Additionally, the number of generated SVG elements exploded, causing severe DOM rendering performance degradation.",
      solution: "Reduced computation with 2-Pass Grid Sampling from O(W×H) to O((W/g1)×(H/g1) + (W/g2)×(H/g2)). Pass 1 captures the overall structure with a large grid (g1), and Pass 2 reinforces fine detail with a small grid (g2). For SVG element optimization, merged adjacent same-color regions and automatically removed background areas below the Luminance threshold, reducing output SVG size by 60%+.",
    },
    architecture: `[Image Input]
    ├── Drag & Drop (Dropzone Component)
    ├── File Selection
    └── Security Validation (File Type / Size / XSS Filtering)
    ↓
[Canvas API]
    ├── drawImage() → Image Loading
    └── getImageData() → Pixel Array Extraction
    ↓
[2-Pass Grid Sampling Algorithm]
    ├── Pass 1: Low-Resolution Grid → Regional Representative Color Extraction
    └── Pass 2: High-Resolution Grid → Detail Reinforcement
    ↓
[SVG Generation Engine]
    ├── Luminance Filtering (Background Removal)
    ├── Adjacent Region Merging (Element Optimization)
    └── SVG DOM Element Creation (<rect>, <circle>...)
    ↓
[Result Output]
    ├── SVG Preview (Results Component)
    ├── Download (SVG / PNG / JPEG)
    └── Quality Settings (Settings Component)
    ↓
[Zustand Store] ← Global State Management
    └── Conversion Progress, Settings, Image List`,
    githubUrl: "https://github.com/jiwonjae-svg/svg-converter",
    liveUrl: "https://imagetosvg.vercel.app/",
    thumbnails: ["/images/SVG Converte.png"],
    metrics: [
      { label: "Processing", value: "100% Client-Side" },
      { label: "Languages", value: "4 Languages" },
      { label: "SVG Reduction", value: "~60% Smaller" },
      { label: "Security", value: "XSS/CSRF Prevention" },
    ],
  },
  {
    id: 5,
    title: "Paste Guardian",
    summary: "Security utility that monitors the system clipboard in real-time and manages sensitive copy history with AES-128 encryption. Achieves OS-level optimization through direct Win32 API control — system tray residence, multi-instance prevention, and process monitoring.",
    description: "A security tool that continuously monitors the Windows clipboard and displays confirmation popups when suspicious content is copied (script injection, excessively long text, image-embedded data, etc.). Hooks clipboard change events by directly calling Win32 API (win32clipboard, win32gui, win32process), and collects active process information via psutil to track which app performed the copy. Intercepts paste (Ctrl+V) key events via the keyboard library and blocks paste operations when threats are detected. All clipboard history is encrypted with AES-128 (Fernet) and stored locally. Features a modern dark-mode UI built with CustomTkinter and a Windows installer created with Inno Setup.",
    techStack: [
      { name: "Python 3.10+", category: "language" },
      { name: "CustomTkinter", category: "framework" },
      { name: "Win32 API (clipboard, gui, process)", category: "api" },
      { name: "pyperclip", category: "library" },
      { name: "keyboard (Key Intercept)", category: "library" },
      { name: "psutil (Process Monitoring)", category: "library" },
      { name: "Pillow (Image Clipboard)", category: "library" },
      { name: "cryptography (Fernet/AES-128)", category: "library" },
      { name: "PyInstaller", category: "tool" },
      { name: "Inno Setup (Installer)", category: "tool" },
    ],
    technicalChallenge: {
      problem: "Polling clipboard changes via Win32 API caused persistently high CPU usage. The keyboard library's global hotkey hooking conflicted with certain security software, causing missed key events. Additionally, multiple instances simultaneously monitoring the clipboard caused data race conditions.",
      solution: "Implemented adaptive polling intervals — short intervals (200ms) during active use and long intervals (1000ms) during idle — to minimize CPU load. Added exception handling and retry logic to key event interception, and prevented multi-instance conflicts with OS-level named mutex patterns. Ensured atomic clipboard access with Win32 OpenClipboard/CloseClipboard pairs, resolving race conditions.",
    },
    architecture: `[System Clipboard] ← Win32 API Hooking
    ↓
[Clipboard Monitor] ← threading (Background Monitoring)
    ├── win32clipboard → Text/Image Change Detection
    ├── pyperclip → Cross-Platform Text Access
    ├── psutil → Source Process Identification
    └── keyboard → Ctrl+V Intercept
    ↓
[Security Service]
    ├── Threat Analysis (Script Patterns, Length, Encoding)
    ├── AES-128 (Fernet) Encrypt/Decrypt
    └── Encrypted History Storage
    ↓
[Notification Service]
    ├── Risk-Level Alerts (INFO / WARNING / DANGER / CRITICAL)
    └── User Action Callbacks
    ↓
[UI Layer] ← CustomTkinter
    ├── Confirmation Popup (Paste Confirm / Block)
    ├── Settings Window (Configuration Management)
    └── System Tray (Background Residence)
    ↓
[History Service]
    ├── Clipboard History Management
    └── Encrypted Local Storage (JSON + Fernet)`,
    githubUrl: "https://github.com/jiwonjae-svg/paste-guard",
    liveUrl: "https://github.com/jiwonjae-svg/paste-guard/releases",
    thumbnails: ["/images/PasteGuardian1.png", "/images/PasteGuardian2.png"],
    metrics: [
      { label: "Security Layers", value: "4 Levels" },
      { label: "CPU Optimization", value: "Adaptive Polling" },
      { label: "Encryption", value: "AES-128" },
      { label: "Instance", value: "Singleton" },
    ],
  },
  {
    id: 6,
    title: "Word Cube",
    summary: "A puzzle game combining sophisticated Three.js-based 3D matrix operations with real-time word search algorithms. Delivers fresh intellectual entertainment every time through Firebase Firestore real-time leaderboards and seed-based puzzle generation.",
    description: "A puzzle game where players find words from alphabet letters placed on each face of a 3D cube. Implements 3D interaction including cube rotation, face selection, and character highlighting via Three.js, with face exploration through drag/click. A seed-based pseudo-random generator ensures identical puzzles from the same seed for fair competition. Word validation performs real-time dictionary lookup, Firebase Authentication supports anonymous/Google login, and Firestore synchronizes scores and timer data in real-time. Optimized for mobile touch with responsive CSS.",
    techStack: [
      { name: "JavaScript (ES6+)", category: "language" },
      { name: "HTML5 / CSS3", category: "language" },
      { name: "Three.js", category: "library" },
      { name: "Firebase Authentication", category: "api" },
      { name: "Cloud Firestore", category: "api" },
      { name: "Firestore Security Rules", category: "tool" },
      { name: "Seed-based RNG", category: "library" },
      { name: "Dictionary Search Algorithm", category: "library" },
      { name: "Firebase Hosting", category: "infrastructure" },
      { name: "Responsive CSS (Mobile Touch)", category: "library" },
    ],
    technicalChallenge: {
      problem: "Validating whether a cell sequence selected on the 3D cube's 6 faces forms a valid word required real-time verification against a large dictionary (tens of thousands of words). Linear search on every input caused noticeable delay on mobile. Additionally, Three.js raycasting became inaccurate when clicking individual cells on cube faces depending on rotation state.",
      solution: "Indexed the word dictionary with a Trie (prefix tree) structure, reducing search complexity from O(n) to O(m) (m = word length). For raycasting accuracy, created individual Meshes per cube face and assigned unique userData to each cell, enabling precise cell identification via Raycaster.intersectObjects(). Implemented server-side score validation with Firestore Security Rules to prevent cheating.",
    },
    architecture: `[User Input]
    ├── Mouse/Touch → Three.js Raycaster
    └── Keyboard → Word Input
    ↓
[Cube Module] ← Three.js
    ├── 3D Cube Rendering (6 Faces × N×N Cells)
    ├── Rotation/Zoom Controls
    ├── Cell Selection Highlight
    └── Raycasting → Individual Cell Identification (userData)
    ↓
[Game Module]
    ├── Seed-based Puzzle Generation (Pseudo-Random)
    ├── Word Validation (Trie Dictionary Search)
    ├── Score Calculation Logic
    └── Game State Management
    ↓
[Timer Module]
    └── Precision Timer (Countdown / Stopwatch)
    ↓
[Auth Module] ← Firebase Authentication
    ├── Anonymous Login
    └── Google OAuth
    ↓
[Firebase Firestore]
    ├── Real-time Leaderboard (onSnapshot)
    ├── User Score Recording
    └── Firestore Security Rules (Anti-Cheat)`,
    githubUrl: "https://github.com/jiwonjae-svg/word-cube",
    liveUrl: "https://wordcube.web.app/",
    thumbnails: ["/images/WordCube1.png", "/images/WordCube2.png"],
    metrics: [
      { label: "3D Engine", value: "Three.js" },
      { label: "Auth", value: "Firebase Auth" },
      { label: "Search", value: "Trie O(m)" },
      { label: "Security", value: "Firestore Rules" },
    ],
  },
];
