
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface InteractiveLogoProps {
  imageUrl: string;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: number;
  glowIntensity?: number;
  glowRadius?: number;
  baseBrightness?: number;
}

const InteractiveLogo: React.FC<InteractiveLogoProps> = ({
  imageUrl,
  className = '',
  style = {},
  glowColor = 0x9333EA, // Purple glow by default
  glowIntensity = 1.8,
  glowRadius = 0.3,
  baseBrightness = 1.0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const isInitialized = useRef<boolean>(false);
  const pointerPosition = useRef<{ x: number, y: number }>({ x: 0.5, y: 0.5 });
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Effect for image preloading
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = imageUrl;
  }, [imageUrl]);

  // Main effect for Three.js setup
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const container = containerRef.current;
    if (container && !isInitialized.current) {
      const updateDimensions = () => {
        const { width, height } = container.getBoundingClientRect();
        setDimensions({ width, height });
        return { width, height };
      };

      const { width, height } = updateDimensions();
      
      // Set up Three.js scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Set up orthographic camera for 2D rendering
      const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 1000);
      camera.position.z = 1;
      cameraRef.current = camera;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create shader material for the logo with lighting effect
      const material = new THREE.ShaderMaterial({
        uniforms: {
          logoTexture: { value: new THREE.TextureLoader().load(imageUrl) },
          pointerPosition: { value: new THREE.Vector2(0.5, 0.5) },
          glowRadius: { value: glowRadius },
          glowColor: { value: new THREE.Color(glowColor) },
          glowIntensity: { value: glowIntensity },
          baseBrightness: { value: baseBrightness },
          time: { value: 0.0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform sampler2D logoTexture;
          uniform vec2 pointerPosition;
          uniform float glowRadius;
          uniform vec3 glowColor;
          uniform float glowIntensity;
          uniform float baseBrightness;
          uniform float time;

          void main() {
            // Calculate distance from current fragment to pointer position
            float distance = distance(vUv, pointerPosition);
            
            // Base color from texture
            vec4 texColor = texture2D(logoTexture, vUv);
            
            // Add glow effect based on distance to pointer
            float glowFactor = max(0.0, 1.0 - distance / glowRadius) * glowIntensity;
            
            // Apply glow only where the logo exists (non-transparent areas)
            glowFactor *= texColor.a;
            
            // Mix base color with glow color
            vec3 finalColor = mix(
              texColor.rgb * baseBrightness, 
              glowColor, 
              glowFactor
            );
            
            // Subtle pulsing effect
            float pulse = 0.05 * sin(time * 0.5) * texColor.a;
            finalColor += pulse * glowColor * texColor.a;
            
            gl_FragColor = vec4(finalColor, texColor.a);
          }
        `,
        transparent: true
      });
      materialRef.current = material;

      // Create plane geometry for the logo
      const geometry = new THREE.PlaneGeometry(1, 1);
      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      // Handle pointer/mouse movements
      const handlePointerMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        pointerPosition.current = {
          x: (event.clientX - rect.left) / rect.width,
          y: 1 - (event.clientY - rect.top) / rect.height
        };
        
        if (materialRef.current) {
          materialRef.current.uniforms.pointerPosition.value.set(
            pointerPosition.current.x,
            pointerPosition.current.y
          );
        }
      };

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
        
        const { width, height } = updateDimensions();
        rendererRef.current.setSize(width, height);
      };

      // Animation loop
      let animationFrameId: number;
      const clock = new THREE.Clock();
      
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        if (materialRef.current) {
          materialRef.current.uniforms.time.value = clock.getElapsedTime();
        }
        
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };

      // Add event listeners
      window.addEventListener('resize', handleResize);
      container.addEventListener('mousemove', handlePointerMove);
      
      // Start animation
      animate();
      isInitialized.current = true;

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousemove', handlePointerMove);
        cancelAnimationFrame(animationFrameId);
        
        if (rendererRef.current?.domElement) {
          container.removeChild(rendererRef.current.domElement);
        }
        
        if (plane) scene.remove(plane);
        geometry.dispose();
        material.dispose();
        
        isInitialized.current = false;
      };
    }
  }, [isLoaded, imageUrl, glowColor, glowIntensity, glowRadius, baseBrightness]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {!isLoaded && (
        <img
          src={imageUrl}
          alt="TheraSpark Logo"
          className="w-full h-full object-contain opacity-0"
          style={{ visibility: 'hidden' }}
        />
      )}
    </div>
  );
};

export default InteractiveLogo;
