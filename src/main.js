import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { animateCamera, setupAutoRotatePause } from './cameraAnimation.js';

let scene, camera, renderer, controls, productGroup;

function animate(time) {
  requestAnimationFrame(animate);

  animateCamera(camera, controls, productGroup, time);

  renderer.render(scene, camera);
}

function main() {
  // 1. Initialize scene, camera, renderer, controls
  ({ scene, camera, renderer, controls } = initScene());

  // 2. Create and add product
  productGroup = createProduct();
  scene.add(productGroup);

  // 3. Add lighting
  addLighting(scene);

  // 4. Setup interaction
  setupInteraction(renderer, camera, scene, productGroup);

  // 5. Setup auto-rotate pause on user interaction
  setupAutoRotatePause(controls);

  // 6. Start animation loop
  animate();
}

main();
