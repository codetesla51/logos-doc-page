<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

  // Flat 2D pipes living on a plane you can tilt in 3D space.
  // The pipes themselves stay 2D — only the viewpoint rotates.
  let wrap = $state(null);

  const SHADES = ["#52525b", "#71717a", "#a1a1aa"];
  const CELL = 16;
  const DIRS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const PW = 640;
  const PH = 400;

  onMount(() => {
    // --- flat 2D pipes on an offscreen canvas ---
    const flat = document.createElement("canvas");
    flat.width = PW;
    flat.height = PH;
    const g = flat.getContext("2d");
    g.lineCap = "round";

    let pipes = [];
    function spawnPipe() {
      const side = Math.floor(Math.random() * 4);
      const cols = Math.floor(PW / CELL);
      const rows = Math.floor(PH / CELL);
      let x, y, dir;
      if (side === 0) {
        x = Math.floor(Math.random() * cols);
        y = 0;
        dir = 2;
      } else if (side === 1) {
        x = Math.floor(Math.random() * cols);
        y = rows - 1;
        dir = 0;
      } else if (side === 2) {
        x = 0;
        y = Math.floor(Math.random() * rows);
        dir = 1;
      } else {
        x = cols - 1;
        y = Math.floor(Math.random() * rows);
        dir = 3;
      }
      return {
        x,
        y,
        dir,
        age: 0,
        color: SHADES[Math.floor(Math.random() * SHADES.length)],
      };
    }

    function stepFlat() {
      const cols = Math.floor(PW / CELL);
      const rows = Math.floor(PH / CELL);
      for (let i = 0; i < pipes.length; i++) {
        const p = pipes[i];
        const px = p.x * CELL + CELL / 2;
        const py = p.y * CELL + CELL / 2;
        if (Math.random() < 0.18) {
          p.dir = (p.dir + (Math.random() < 0.5 ? 1 : 3)) % 4;
        }
        p.x += DIRS[p.dir][0];
        p.y += DIRS[p.dir][1];
        p.age++;
        if (
          p.x < 0 ||
          p.y < 0 ||
          p.x >= cols ||
          p.y >= rows ||
          p.age > 500
        ) {
          pipes[i] = spawnPipe();
          continue;
        }
        g.strokeStyle = p.color;
        g.lineWidth = 5;
        g.beginPath();
        g.moveTo(px, py);
        g.lineTo(p.x * CELL + CELL / 2, p.y * CELL + CELL / 2);
        g.stroke();
      }
    }

    function resetFlat() {
      g.clearRect(0, 0, PW, PH);
      pipes = [spawnPipe(), spawnPipe(), spawnPipe()];
    }
    resetFlat();

    // --- plane in 3D space ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.2, 11);

    const texture = new THREE.CanvasTexture(flat);
    texture.colorSpace = THREE.SRGBColorSpace;
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry((PW / PH) * 7, 7),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
    );
    scene.add(plane);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minAzimuthAngle = -0.6;
    controls.maxAzimuthAngle = 0.6;
    controls.minPolarAngle = 1.0;
    controls.maxPolarAngle = 2.1;
    controls.target.set(0, 0, 0);

    // Gentle auto-sway after 3s idle. Any drag takes over instantly.
    let lastTouch = -Infinity;
    const markTouch = () => {
      lastTouch = performance.now();
    };
    controls.addEventListener("start", markTouch);

    const swayOffset = new THREE.Vector3();
    const swaySph = new THREE.Spherical();
    const swayPos = new THREE.Vector3();
    function sway(now) {
      if (now - lastTouch < 3000) return;
      swayOffset.copy(camera.position).sub(controls.target);
      swaySph.setFromVector3(swayOffset);
      swaySph.theta = Math.sin(now / 1000 / 2) * 0.38;
      swayPos.setFromSpherical(swaySph).add(controls.target);
      camera.position.copy(swayPos);
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function resize() {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let tickTimer = null;
    let resetTimer = null;
    if (reduceMotion) {
      for (let i = 0; i < 220; i++) stepFlat();
      texture.needsUpdate = true;
      renderer.render(scene, camera);
    } else {
      const loop = () => {
        raf = requestAnimationFrame(loop);
        sway(performance.now());
        controls.update();
        renderer.render(scene, camera);
      };
      loop();
      tickTimer = setInterval(() => {
        stepFlat();
        texture.needsUpdate = true;
      }, 50);
      resetTimer = setInterval(() => {
        resetFlat();
        texture.needsUpdate = true;
      }, 18000);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (tickTimer) clearInterval(tickTimer);
      if (resetTimer) clearInterval(resetTimer);
      window.removeEventListener("resize", resize);
      controls.removeEventListener("start", markTouch);
      controls.dispose();
      plane.geometry.dispose();
      plane.material.map.dispose();
      plane.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  });
</script>

<div
  bind:this={wrap}
  class="h-56 w-full cursor-grab overflow-hidden bg-[#0a0a0a] active:cursor-grabbing sm:h-72 lg:h-full lg:min-h-[380px]"
></div>
