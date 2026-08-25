// Project data for portfolio

export interface Project {
  id: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  description: string;
  role: string;
  technologies: string[];
  image: string;
  gallery?: string[];
  url?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'AETHER',
    slug: 'aether',
    year: '2026',
    category: 'Interactive WebGL Experience',
    description: 'An immersive journey through abstract digital landscapes. AETHER combines real-time rendering with procedural generation to create an ever-evolving visual experience.',
    role: 'Creative Developer, 3D Artist',
    technologies: ['Three.js', 'GLSL', 'React', 'WebGL'],
    image: '/projects/aether.jpg',
    gallery: ['/projects/aether-1.jpg', '/projects/aether-2.jpg', '/projects/aether-3.jpg'],
    url: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'NEXUS',
    slug: 'nexus',
    year: '2025',
    category: 'Product Visualization',
    description: 'A cutting-edge product configurator built with WebGL. Users can customize and visualize products in real-time with photorealistic rendering.',
    role: 'Lead Developer',
    technologies: ['Three.js', 'TypeScript', 'Next.js', 'R3F'],
    image: '/projects/nexus.jpg',
    gallery: ['/projects/nexus-1.jpg', '/projects/nexus-2.jpg'],
    url: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'CHRONOS',
    slug: 'chronos',
    year: '2025',
    category: 'Interactive Timeline',
    description: 'A scroll-driven narrative experience that takes users through a journey in time. Built with custom shaders and smooth scroll interactions.',
    role: 'Creative Developer',
    technologies: ['Three.js', 'GSAP', 'Lenis', 'GLSL'],
    image: '/projects/chronos.jpg',
    gallery: ['/projects/chronos-1.jpg', '/projects/chronos-2.jpg'],
    url: '#',
    featured: false,
  },
  {
    id: '4',
    title: 'VOID',
    slug: 'void',
    year: '2024',
    category: 'Generative Art',
    description: 'An experimental generative art piece exploring the concept of emptiness. Uses particle systems and custom noise algorithms.',
    role: 'Artist & Developer',
    technologies: ['Three.js', 'GLSL', 'p5.js', 'JavaScript'],
    image: '/projects/void.jpg',
    gallery: ['/projects/void-1.jpg', '/projects/void-2.jpg', '/projects/void-3.jpg'],
    url: '#',
    featured: false,
  },
  {
    id: '5',
    title: 'LUMINA',
    slug: 'lumina',
    year: '2024',
    category: 'Brand Experience',
    description: 'A brand website featuring interactive light simulations. The entire site responds to user interaction with dynamic lighting effects.',
    role: 'Technical Director',
    technologies: ['Three.js', 'React', 'WebGL', 'Post-processing'],
    image: '/projects/lumina.jpg',
    gallery: ['/projects/lumina-1.jpg', '/projects/lumina-2.jpg'],
    url: '#',
    featured: true,
  },
  {
    id: '6',
    title: 'ECHO',
    slug: 'echo',
    year: '2023',
    category: 'Audio Visualizer',
    description: 'Real-time audio visualization using Web Audio API and Three.js. Creates stunning visuals synchronized with music.',
    role: 'Developer',
    technologies: ['Three.js', 'Web Audio API', 'JavaScript', 'GLSL'],
    image: '/projects/echo.jpg',
    gallery: ['/projects/echo-1.jpg', '/projects/echo-2.jpg'],
    url: '#',
    featured: false,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};
