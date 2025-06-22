import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let autoRotate = true;
let lastUserInteraction = 0;

export function animateCamera(camera, controls, productGroup, time) {
  // Auto-rotate unless user recently interacted
  const now = performance.now();
  if (autoRotate && productGroup) {
    const radius = 6;
    const speed = 0.0005; // radians per ms
    const angle = speed * now;
    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(productGroup.position);
    controls.update();
  }
}

// Optional: Pause auto-rotation on user interaction
export function setupAutoRotatePause(controls) {
  controls.addEventListener('start', () => {
    autoRotate = false;
    lastUserInteraction = performance.now();
  });
  controls.addEventListener('end', () => {
    setTimeout(() => {
      // Resume auto-rotate after 3 seconds of inactivity
      if (performance.now() - lastUserInteraction > 3000) {
        autoRotate = true;
      }
    }, 3000);
  });
}
