import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeDiscTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function fibonacciSpherePositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    // Jitter the shell thickness slightly for a grainy, non-perfect surface.
    const shell = radius * (0.88 + Math.random() * 0.12);

    positions[i * 3] = x * shell;
    positions[i * 3 + 1] = y * shell;
    positions[i * 3 + 2] = z * shell;
  }

  return positions;
}

function explodedPositions(basePositions: Float32Array, minFactor: number, maxFactor: number) {
  const exploded = new Float32Array(basePositions.length);

  for (let i = 0; i < basePositions.length; i += 3) {
    const x = basePositions[i];
    const y = basePositions[i + 1];
    const z = basePositions[i + 2];
    const len = Math.sqrt(x * x + y * y + z * z) || 1;
    const dirX = x / len;
    const dirY = y / len;
    const dirZ = z / len;
    const factor = minFactor + Math.random() * (maxFactor - minFactor);
    const jitter = 1.1;

    exploded[i] = dirX * len * factor + (Math.random() - 0.5) * jitter;
    exploded[i + 1] = dirY * len * factor + (Math.random() - 0.5) * jitter;
    exploded[i + 2] = dirZ * len * factor + (Math.random() - 0.5) * jitter;
  }

  return exploded;
}

function smoothstep(t: number) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

function starfieldPositions(count: number, minRadius: number, maxRadius: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = minRadius + Math.random() * (maxRadius - minRadius);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

export default function ParticleGlobe({ pinRef }: { pinRef?: React.RefObject<HTMLElement> } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const globeCount = isMobile ? 1400 : 3200;
    const starCount = isMobile ? 400 : 1000;
    const globeRadius = 2.3;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const discTexture = makeDiscTexture();

    const isLight = () => document.documentElement.classList.contains("light");
    const globeColor = () => (isLight() ? 0x1a1a1a : 0xf4f4f4);
    const starColor = () => (isLight() ? 0x555555 : 0x9a9a9a);

    const globeBasePositions = fibonacciSpherePositions(globeCount, globeRadius);
    const globeDustPositions = explodedPositions(globeBasePositions, 1.3, 2.6);
    const globeWorkingPositions = globeBasePositions.slice();
    const baseGlobeSize = isMobile ? 0.045 : 0.038;

    // Per-particle drift signature so settled dust motes gently float in place
    // instead of freezing mid-air once the explosion finishes.
    const driftSeeds = new Float32Array(globeCount * 4);
    for (let i = 0; i < globeCount; i++) {
      driftSeeds[i * 4] = Math.random() * Math.PI * 2;
      driftSeeds[i * 4 + 1] = Math.random() * Math.PI * 2;
      driftSeeds[i * 4 + 2] = Math.random() * Math.PI * 2;
      driftSeeds[i * 4 + 3] = 0.6 + Math.random() * 0.8;
    }

    const globeGeometry = new THREE.BufferGeometry();
    globeGeometry.setAttribute("position", new THREE.BufferAttribute(globeWorkingPositions, 3));
    const globeMaterial = new THREE.PointsMaterial({
      size: baseGlobeSize,
      map: discTexture,
      transparent: true,
      opacity: 0.9,
      color: globeColor(),
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const globePoints = new THREE.Points(globeGeometry, globeMaterial);

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starfieldPositions(starCount, globeRadius * 1.3, globeRadius * 3.2), 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.028,
      map: discTexture,
      transparent: true,
      opacity: 0.5,
      color: starColor(),
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeometry, starMaterial);

    const globeGroup = new THREE.Group();
    globeGroup.add(globePoints);
    scene.add(globeGroup);
    scene.add(starPoints);

    const themeObserver = new MutationObserver(() => {
      globeMaterial.color.set(globeColor());
      starMaterial.color.set(starColor());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!isCoarsePointer && !reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    // Scroll progress through the pinned hero stage: 0 = pin just engaged (stuck to
    // viewport top), 1 = pin about to release. The hero stays pinned for this whole
    // range, so the grow → explode → hold → dissipate sequence always finishes before
    // the next section is allowed to scroll into view.
    let pinTarget = 0;
    let pinCurrent = 0;
    const handleScroll = () => {
      const progressEl = pinRef?.current ?? container;
      const rect = progressEl.getBoundingClientRect();
      const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
      pinTarget = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
    };
    if (!reduceMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
      handleScroll();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let isIntersecting = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    let rafId = 0;

    const renderStatic = () => renderer.render(scene, camera);

    if (reduceMotion) {
      renderStatic();
    } else {
      const positionAttr = globeGeometry.getAttribute("position") as THREE.BufferAttribute;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (!isIntersecting) return;

        globeGroup.rotation.y += 0.0018;
        starPoints.rotation.y += 0.0004;

        current.x += (target.x - current.x) * 0.04;
        current.y += (target.y - current.y) * 0.04;
        globeGroup.rotation.x = current.y * 0.18;
        globeGroup.rotation.z = -current.x * 0.12;

        // Smoothed scroll-driven progress, mapped across four beats within the pin's
        // range: grow (0-0.24) → explode into dust (0.21-0.6) → hold (0.6-0.8) →
        // dissipate to nothing (0.8-1.0), so the burst visibly disappears before release.
        pinCurrent += (pinTarget - pinCurrent) * 0.09;
        const growEase = smoothstep(pinCurrent / 0.24);
        const explodeEase = smoothstep((pinCurrent - 0.21) / 0.39);
        const dissipateEase = smoothstep((pinCurrent - 0.8) / 0.2);

        const elapsed = performance.now() * 0.001;
        for (let i = 0; i < globeCount; i++) {
          const ix = i * 3;
          const sx = globeBasePositions[ix] + (globeDustPositions[ix] - globeBasePositions[ix]) * explodeEase;
          const sy = globeBasePositions[ix + 1] + (globeDustPositions[ix + 1] - globeBasePositions[ix + 1]) * explodeEase;
          const sz = globeBasePositions[ix + 2] + (globeDustPositions[ix + 2] - globeBasePositions[ix + 2]) * explodeEase;

          // Settled dust motes drift slowly in place once fully exploded, and during
          // the final dissipate beat they keep drifting apart as they fade, selling
          // the illusion of the debris scattering away into nothing.
          const sIdx = i * 4;
          const speed = driftSeeds[sIdx + 3];
          const drift = explodeEase * 0.4 + dissipateEase * 0.9;
          const scatter = 1 + dissipateEase * 1.4;
          globeWorkingPositions[ix] = sx * scatter + Math.sin(elapsed * speed + driftSeeds[sIdx]) * drift;
          globeWorkingPositions[ix + 1] = sy * scatter + Math.sin(elapsed * speed * 0.8 + driftSeeds[sIdx + 1]) * drift;
          globeWorkingPositions[ix + 2] = sz * scatter + Math.sin(elapsed * speed * 1.2 + driftSeeds[sIdx + 2]) * drift;
        }
        positionAttr.needsUpdate = true;

        const growScale = 1 + growEase * 0.55 * (1 - explodeEase * 0.6);
        globeGroup.scale.setScalar(growScale);

        // Grow the dust motes rather than shrinking them, and hold opacity near-full
        // through the hold beat — then thin them out to nothing during the final
        // dissipate beat, so the explosion visibly disperses into thin air.
        globeMaterial.size = baseGlobeSize * (1 + explodeEase * 0.9) * (1 - dissipateEase * 0.85);
        globeMaterial.opacity = (0.9 + explodeEase * 0.1) * (1 - dissipateEase);
        starPoints.scale.setScalar(1 + explodeEase * 0.35);

        renderer.render(scene, camera);
      };
      animate();
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      globeGeometry.dispose();
      globeMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      discTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [pinRef]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}
