import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Living room: floor, rug, chair, sofa, coffee table, TV, lamp
export function createProduct() {
  const group = new THREE.Group();

  // --- Floor (wood color) ---
  const floorGeometry = new THREE.PlaneGeometry(8, 8);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xc8b6a6 }); // light wood
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  group.add(floor);
  floor.name = 'Floor';

  // --- Simple Rug (one color) ---
  const rugGeometry = new THREE.CircleGeometry(2.2, 48);
  const rugMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 }); // light gray
  const rug = new THREE.Mesh(rugGeometry, rugMaterial);
  rug.rotation.x = -Math.PI / 2;
  rug.position.y = 0.01;
  group.add(rug);
  rug.name = 'Rug';

  // --- Chair (grouped and scaled down) ---
  const chairGroup = new THREE.Group();
  // Seat
  const seatGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
  const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x26a69a });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.y = 1;
  seat.name = 'Chair seat';
  chairGroup.add(seat);
  // Back
  const backGeometry = new THREE.BoxGeometry(1.5, 1, 0.2);
  const back = new THREE.Mesh(backGeometry, seatMaterial);
  back.position.set(0, 1.6, -0.65);
  back.name = 'Chair back';
  chairGroup.add(back);
  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x424242 });
  const legPositions = [
    [0.6, 0.5, 0.6], [-0.6, 0.5, 0.6],
    [0.6, 0.5, -0.6], [-0.6, 0.5, -0.6],
  ];
  legPositions.forEach(([x, y, z], i) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y, z);
    leg.name = `Chair leg ${i+1}`;
    chairGroup.add(leg);
  });
  // Scale and position the chair
  chairGroup.scale.set(0.55, 0.55, 0.55);
  chairGroup.position.set(2.2, 0, -0.5);
  chairGroup.rotation.y = -Math.PI / 6;
  chairGroup.name = 'Chair';
  group.add(chairGroup);

  // --- Sofa (modern, 2-seat) ---
  const sofaGroup = new THREE.Group();
  // Base and back
  const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.3, 0.8), new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
  sofaBase.position.set(0, 0.15, 0);
  sofaBase.name = 'Sofa base';
  sofaGroup.add(sofaBase);
  const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.6, 0.18), new THREE.MeshStandardMaterial({ color: 0xa1887f }));
  sofaBack.position.set(0, 0.55, -0.31);
  sofaBack.name = 'Sofa back';
  sofaGroup.add(sofaBack);
  // Arms
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.4, 0.8), sofaBase.material);
  armL.position.set(-1.01, 0.35, 0);
  armL.name = 'Sofa left arm';
  sofaGroup.add(armL);
  const armR = armL.clone();
  armR.position.x = 1.01;
  armR.name = 'Sofa right arm';
  sofaGroup.add(armR);
  // Cushions
  const cushionL = new THREE.Mesh(new THREE.BoxGeometry(1, 0.18, 0.7), new THREE.MeshStandardMaterial({ color: 0xfff9c4 }));
  cushionL.position.set(-0.5, 0.4, 0);
  cushionL.name = 'Sofa left cushion';
  sofaGroup.add(cushionL);
  const cushionR = cushionL.clone();
  cushionR.position.x = 0.5;
  cushionR.name = 'Sofa right cushion';
  sofaGroup.add(cushionR);
  // Place sofa
  sofaGroup.position.set(0, 0, -2.2);
  sofaGroup.name = 'Sofa';
  group.add(sofaGroup);

  // --- Coffee Table (with legs) ---
  const tableGroup = new THREE.Group();
  // Top
  const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.08, 32), new THREE.MeshStandardMaterial({ color: 0xbdbdbd }));
  tableTop.position.y = 0.3;
  tableTop.name = 'Coffee table top';
  tableGroup.add(tableTop);
  // Legs
  const tableLegGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 12);
  for (let i = 0; i < 3; i++) {
    const leg = new THREE.Mesh(tableLegGeo, tableTop.material);
    const angle = (i / 3) * Math.PI * 2;
    leg.position.set(0.5 * Math.cos(angle), 0.15, 0.5 * Math.sin(angle));
    leg.name = `Table leg ${i+1}`;
    tableGroup.add(leg);
  }
  tableGroup.position.set(0, 0, -0.2);
  tableGroup.name = 'Coffee Table';
  group.add(tableGroup);

  // --- TV on Stand ---
  const tvGroup = new THREE.Group();
  // Stand
  const tvStand = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 0.38), new THREE.MeshStandardMaterial({ color: 0x616161 }));
  tvStand.position.y = 0.175;
  tvStand.name = 'TV stand';
  tvGroup.add(tvStand);
  // TV
  const tv = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 0.05), new THREE.MeshStandardMaterial({ color: 0x212121 }));
  tv.position.y = 0.45;
  tv.name = 'TV';
  tvGroup.add(tv);
  // Position TV group
  tvGroup.position.set(0, 0, 2.5);
  tvGroup.rotation.y = Math.PI;
  tvGroup.name = 'TV unit';
  group.add(tvGroup);

  // --- Floor Lamp ---
  const lampGroup = new THREE.Group();
  // Base, Stand, Shade
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16), new THREE.MeshStandardMaterial({ color: 0x757575 }));
  lampBase.position.y = 0.02;
  lampBase.name = 'Lamp base';
  lampGroup.add(lampBase);
  const lampStand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 12), lampBase.material);
  lampStand.position.y = 0.57;
  lampStand.name = 'Lamp stand';
  lampGroup.add(lampStand);
  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.22, 8), new THREE.MeshStandardMaterial({ color: 0xfff176 }));
  lampShade.position.y = 1.18;
  lampShade.name = 'Lamp shade';
  lampGroup.add(lampShade);
  // Position lamp
  lampGroup.position.set(-2.2, 0, -1.2);
  lampGroup.name = 'Floor Lamp';
  group.add(lampGroup);

  // Move the entire scene group down slightly
  group.position.set(0, -0.5, 0);

  return group;
}
