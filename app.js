import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// Camera
const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 13;

// Scene
const scene = new THREE.Scene();

// First model (Ranger)
let ranger;
const loader = new GLTFLoader();
loader.load("./models/intersteller_ranger.glb",
  function (gltf) {
    ranger = gltf.scene;
    ranger.scale.set(0.1, 0.1, 0.1);
    ranger.position.set(-1.5, -0.8, 0);
    ranger.rotation.set(-12, -5.5, 0);
    scene.add(ranger);
  }
);

// Second model (Example: Endurance spaceship)
let endurance;
loader.load("./models/intersteller_endurance.glb",
  function (gltf) {
    endurance = gltf.scene;
    endurance.scale.set(0.01, 0.01, 0.01);
    endurance.position.set(1.5, -0.5, 0); // Place it somewhere else so it’s not overlapping
    endurance.rotation.set(0, Math.PI / 4, 0);
    scene.add(endurance);
  }
);

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Animation loop
const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  renderer.render(scene, camera);
};
reRender3D();

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
