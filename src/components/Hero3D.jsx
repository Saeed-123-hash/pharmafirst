import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.2);
    dirLight2.position.set(-5, -4, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 20);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // 1. Central Pharmaceutical 3D Capsule
    const capsuleGroup = new THREE.Group();
    mainGroup.add(capsuleGroup);

    // Half Capsule Top (Deep Blue)
    const capTopGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.2, 32);
    const capTopMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });
    const capTop = new THREE.Mesh(capTopGeo, capTopMat);
    capTop.position.y = 0.6;
    capsuleGroup.add(capTop);

    const sphereTopGeo = new THREE.SphereGeometry(0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const sphereTop = new THREE.Mesh(sphereTopGeo, capTopMat);
    sphereTop.position.y = 1.2;
    capsuleGroup.add(sphereTop);

    // Half Capsule Bottom (Glossy White)
    const capBottomGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.2, 32);
    const capBottomMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 0.9,
    });
    const capBottom = new THREE.Mesh(capBottomGeo, capBottomMat);
    capBottom.position.y = -0.6;
    capsuleGroup.add(capBottom);

    const sphereBottomGeo = new THREE.SphereGeometry(
      0.7,
      32,
      16,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 2
    );
    const sphereBottom = new THREE.Mesh(sphereBottomGeo, capBottomMat);
    sphereBottom.position.y = -1.2;
    capsuleGroup.add(sphereBottom);

    // Golden/Emerald Band
    const bandGeo = new THREE.TorusGeometry(0.705, 0.035, 16, 64);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.6,
      roughness: 0.2,
    });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.rotation.x = Math.PI / 2;
    capsuleGroup.add(band);

    // Initial tilt of capsule
    capsuleGroup.rotation.z = THREE.MathUtils.degToRad(-32);
    capsuleGroup.rotation.x = THREE.MathUtils.degToRad(18);

    // 2. Floating Molecular Nodes & Orbiting Particles
    const moleculeGroup = new THREE.Group();
    mainGroup.add(moleculeGroup);

    const atomGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const atomMatCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.3,
    });
    const atomMatEmerald = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      roughness: 0.2,
      metalness: 0.3,
    });

    const atomPositions = [
      [-1.9, 1.6, -0.6, atomMatCyan],
      [2.2, 1.2, -0.4, atomMatEmerald],
      [-2.1, -1.3, 0.5, atomMatEmerald],
      [1.8, -1.8, 0.2, atomMatCyan],
      [0.2, 2.4, -0.8, atomMatCyan],
    ];

    const atoms = [];
    atomPositions.forEach(([x, y, z, mat]) => {
      const atom = new THREE.Mesh(atomGeo, mat);
      atom.position.set(x, y, z);
      moleculeGroup.add(atom);
      atoms.push(atom);
    });

    // Orbiting rings
    const ringGeo = new THREE.RingGeometry(2.3, 2.32, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.3;
    orbitRing.rotation.y = Math.PI / 6;
    mainGroup.add(orbitRing);

    // Secondary Floating Medicine Tablets
    const tabletGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.15, 24);
    const tabletMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
    });

    const tablet1 = new THREE.Mesh(tabletGeo, tabletMat);
    tablet1.position.set(2.0, 0.2, 0.6);
    tablet1.rotation.set(0.6, 0.4, 0.8);
    mainGroup.add(tablet1);

    const tablet2 = new THREE.Mesh(tabletGeo, tabletMat);
    tablet2.position.set(-1.8, 0.5, -0.4);
    tablet2.rotation.set(-0.5, 0.9, -0.3);
    mainGroup.add(tablet2);

    // Mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = mouseX;
      mainGroup.rotation.x = -mouseY;

      if (!prefersReducedMotion) {
        // Floating gentle oscillation
        capsuleGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
        capsuleGroup.rotation.y = elapsedTime * 0.4;

        tablet1.position.y = 0.2 + Math.sin(elapsedTime * 1.8 + 1) * 0.08;
        tablet1.rotation.y += 0.008;

        tablet2.position.y = 0.5 + Math.cos(elapsedTime * 1.4) * 0.08;
        tablet2.rotation.x += 0.006;

        orbitRing.rotation.z = elapsedTime * 0.15;

        atoms.forEach((atom, idx) => {
          atom.position.y += Math.sin(elapsedTime * 2 + idx) * 0.003;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[500px] flex items-center justify-center">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Medical Badges */}
      <div className="absolute top-6 right-6 glass-panel px-4 py-2.5 rounded-2xl shadow-lg border border-sky-100/60 hidden sm:flex items-center gap-2.5 animate-float pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-slate-800">Direct GDP Wholesale</span>
      </div>

      <div
        className="absolute bottom-8 left-4 glass-panel px-4 py-2.5 rounded-2xl shadow-lg border border-sky-100/60 hidden sm:flex items-center gap-2.5 animate-float pointer-events-none"
        style={{ animationDelay: '2s' }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
        <span className="text-xs font-semibold text-slate-800">Verified Cold-Chain Assured</span>
      </div>
    </div>
  );
}
