import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create a simple chair using boxes and cylinders
export function createProduct() {
  const group = new THREE.Group();

  // Chair seat
  const seatGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
  const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.y = 1;
  group.add(seat);

  // Chair back
  const backGeometry = new THREE.BoxGeometry(1.5, 1, 0.2);
  const backMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D });
  const back = new THREE.Mesh(backGeometry, backMaterial);
  back.position.set(0, 1.6, -0.65);
  group.add(back);

  // Chair legs
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
  const legPositions = [
    [0.6, 0.5, 0.6],
    [-0.6, 0.5, 0.6],
    [0.6, 0.5, -0.6],
    [-0.6, 0.5, -0.6],
  ];
  legPositions.forEach(([x, y, z], i) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y, z);
    group.add(leg);
    leg.name = `Chair leg ${i+1}`;
  });

  // Name parts for interaction
  seat.name = 'Chair seat';
  back.name = 'Chair back';

  // Center the group at the origin
  group.position.set(0, 0, 0);

  return group;
}
