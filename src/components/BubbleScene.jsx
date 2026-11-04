import { useEffect, useRef } from "react";
import * as THREE from "three";

const PEARL_COUNT = 70;
const RISING_COUNT = 9;
// Lente larga: con un ángulo amplio las perlas de los bordes se verían ovaladas.
const FOV = 12;
const CAMERA_Z = 70;
const VIEW_HALF_HEIGHT = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z;

// Perlas de tapioca asentadas en el fondo del vaso; unas pocas suben por el té.
export default function BubbleScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return; // Sin WebGL la portada se ve bien igual, solo sin perlas.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
    camera.position.set(0, 0, CAMERA_Z);

    scene.add(new THREE.AmbientLight(0xfff1dd, 1.1));
    const light = new THREE.DirectionalLight(0xffffff, 3.2);
    light.position.set(-5, 9, 12);
    scene.add(light);

    const geometry = new THREE.SphereGeometry(1, 32, 24);
    const material = new THREE.MeshStandardMaterial({
      color: 0x24120b,
      roughness: 0.2,
      metalness: 0.05,
    });

    const pearls = [];
    for (let i = 0; i < PEARL_COUNT + RISING_COUNT; i += 1) {
      const pearl = new THREE.Mesh(geometry, material);
      const rising = i >= PEARL_COUNT;
      pearl.scale.setScalar(0.5 + Math.random() * 0.2);
      pearl.userData = {
        rising,
        u: Math.random() * 2 - 1,
        y: rising ? -7 + Math.random() * 4 : -7.2 + Math.random() ** 1.8 * 3,
        z: (Math.random() - 0.5) * 3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.006,
      };
      pearl.position.y = pearl.userData.y;
      pearl.position.z = pearl.userData.z;
      scene.add(pearl);
      pearls.push(pearl);
    }

    let halfWidth = 10;
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      halfWidth = VIEW_HALF_HEIGHT * camera.aspect;
    };
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    const clock = new THREE.Clock();
    let frameId = null;

    const draw = () => {
      const t = clock.getElapsedTime();
      pearls.forEach((pearl) => {
        const d = pearl.userData;
        if (d.rising) {
          d.y += d.speed;
          if (d.y > -1.6) d.y = -7;
        }
        pearl.position.x = d.u * halfWidth + Math.sin(t * 0.5 + d.phase) * 0.12;
        pearl.position.y = d.y + Math.sin(t * 0.8 + d.phase) * 0.07;
      });
      renderer.render(scene, camera);
    };

    const animate = () => {
      draw();
      frameId = requestAnimationFrame(animate);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw();
    } else {
      animate();
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="bubbleCanvas" aria-hidden="true" />;
}
