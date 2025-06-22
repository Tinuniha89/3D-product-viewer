import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function setupInteraction(renderer, camera, scene, productGroup) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let INTERSECTED = null;
  let CLICKED = null;
  let originalColor = null;
  let originalScale = null;
  const infoPanel = document.getElementById('infoPanel');

  // Helper: reset highlight
  function resetHighlight() {
    if (INTERSECTED) {
      INTERSECTED.material.emissive && (INTERSECTED.material.emissive.set(0x000000));
      INTERSECTED.scale.copy(originalScale);
      INTERSECTED = null;
      infoPanel.style.display = 'none';
    }
  }

  // Mouse move: highlight part
  renderer.domElement.addEventListener('mousemove', (event) => {
    // Calculate mouse position in normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(productGroup.children, false);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (INTERSECTED !== object) {
        resetHighlight();
        INTERSECTED = object;
        originalScale = object.scale.clone();
        object.scale.set(originalScale.x * 1.1, originalScale.y * 1.1, originalScale.z * 1.1);
        if (object.material.emissive) object.material.emissive.set(0x333333);
        // Show info panel
        infoPanel.textContent = object.name;
        infoPanel.style.display = 'block';
        infoPanel.style.left = event.clientX + 20 + 'px';
        infoPanel.style.top = event.clientY + 'px';
      } else {
        // Move info panel with mouse
        infoPanel.style.left = event.clientX + 20 + 'px';
        infoPanel.style.top = event.clientY + 'px';
      }
    } else {
      resetHighlight();
    }
  });

  // Mouse out: remove highlight
  renderer.domElement.addEventListener('mouseleave', () => {
    resetHighlight();
  });

  // Mouse click: feedback (color flash)
  renderer.domElement.addEventListener('click', (event) => {
    if (INTERSECTED) {
      CLICKED = INTERSECTED;
      originalColor = CLICKED.material.color.getHex();
      CLICKED.material.color.set(0xff0000);
      setTimeout(() => {
        CLICKED.material.color.set(originalColor);
      }, 200);
    }
  });
}
