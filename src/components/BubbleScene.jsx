import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BubbleScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#fff0f8", 0.022);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffc6d7, 1.2, 80);
    pointLight.position.set(8, 12, 15);
    scene.add(pointLight);

    const bubbles = new THREE.Group();
    const bubbleGeometry = new THREE.SphereGeometry(1, 24, 24);

    for (let i = 0; i < 18; i += 1) {
      const bubbleMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf7d1e4,
        transparent: true,
        opacity: 0.42,
        roughness: 0.16,
        metalness: 0.1,
        transmission: 0.85,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      });

      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      bubble.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );
      const scale = 0.8 + Math.random() * 1.4;
      bubble.scale.setScalar(scale);
      bubble.userData.speed = 0.0025 + Math.random() * 0.01;
      bubble.userData.phase = Math.random() * Math.PI * 2;
      bubbles.add(bubble);
    }

    scene.add(bubbles);

    let pointer = { x: 0, y: 0 };
    const handlePointerMove = (event) => {
      const { innerWidth, innerHeight } = window;
      pointer.x = (event.clientX / innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove);

    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let frameId = null;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      bubbles.children.forEach((bubble, index) => {
        bubble.position.y += bubble.userData.speed;
        bubble.rotation.x += 0.0015 + index * 0.0002;
        bubble.rotation.y += 0.002 + index * 0.0001;
        bubble.position.x += Math.sin(elapsed + bubble.userData.phase) * 0.0012;
        if (bubble.position.y > 8.5) bubble.position.y = -8.5;
      });

      bubbles.rotation.y += (pointer.x * 0.14 - bubbles.rotation.y) * 0.06;
      bubbles.rotation.x += (pointer.y * 0.1 - bubbles.rotation.x) * 0.06;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="bubbleCanvas" />;
}
