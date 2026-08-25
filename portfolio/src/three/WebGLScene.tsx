import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { heroVertexShader, heroFragmentShader, particleVertexShader, particleFragmentShader } from './shaders';

interface WebGLSceneProps {
  scrollProgress?: number;
  scrollVelocity?: number;
  mousePosition?: { x: number; y: number };
}

export const WebGLScene: React.FC<WebGLSceneProps> = ({
  scrollProgress = 0,
  scrollVelocity = 0,
  mousePosition = { x: 0, y: 0 },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const heroObjectRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Fog for depth
    scene.fog = new THREE.FogExp2(0x050505, 0.03);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050505, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create hero object (icosahedron with custom shader)
    const geometry = new THREE.IcosahedronGeometry(1.5, 4);
    const material = new THREE.ShaderMaterial({
      vertexShader: heroVertexShader,
      fragmentShader: heroFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uColor: { value: new THREE.Color(0x6699cc) },
        uHover: { value: 0 },
      },
      wireframe: false,
    });

    const heroObject = new THREE.Mesh(geometry, material);
    scene.add(heroObject);
    heroObjectRef.current = heroObject;

    // Create particle system
    const particleCount = 3000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();

      scales[i] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
    particleGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uSize: { value: 2 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x6699cc, 1);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;

      // Update hero object uniforms
      if (heroObject && heroObject.material instanceof THREE.ShaderMaterial) {
        heroObject.material.uniforms.uTime.value = timeRef.current;
        heroObject.material.uniforms.uScroll.value = scrollProgress;
        heroObject.material.uniforms.uMouse.value.set(
          mousePosition.x / window.innerWidth,
          1 - mousePosition.y / window.innerHeight
        );
      }

      // Rotate hero object
      if (heroObject) {
        heroObject.rotation.y += 0.002 + scrollVelocity * 0.01;
        heroObject.rotation.x += 0.001;

        // Mouse influence
        heroObject.rotation.x += (mousePosition.y / window.innerHeight - 0.5) * 0.1;
        heroObject.rotation.y += (mousePosition.x / window.innerWidth - 0.5) * 0.1;
      }

      // Update particles
      if (particles && particles.material instanceof THREE.ShaderMaterial) {
        particles.material.uniforms.uTime.value = timeRef.current;
        particles.material.uniforms.uScroll.value = scrollProgress;
      }

      // Camera movement based on scroll
      if (camera) {
        camera.position.z = 5 - scrollProgress * 2;
        camera.position.x += (mousePosition.x / window.innerWidth - 0.5) * 0.5;
        camera.position.y += (-mousePosition.y / window.innerHeight + 0.5) * 0.5;
        camera.lookAt(scene.position);
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      // Dispose geometries and materials
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  // Update uniforms on prop changes
  useEffect(() => {
    if (heroObjectRef.current && heroObjectRef.current.material instanceof THREE.ShaderMaterial) {
      heroObjectRef.current.material.uniforms.uScroll.value = scrollProgress;
    }

    if (particlesRef.current && particlesRef.current.material instanceof THREE.ShaderMaterial) {
      particlesRef.current.material.uniforms.uScroll.value = scrollProgress;
    }

    if (cameraRef.current) {
      cameraRef.current.position.z = 5 - scrollProgress * 2;
    }
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      id="webgl-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
};
