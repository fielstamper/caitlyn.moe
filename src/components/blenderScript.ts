import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const container = document.getElementById("blender-container")!;
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

scene.background = new THREE.Color(0x7E92A7);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

camera.position.z = 5;

const loader = new GLTFLoader();
loader.load('/assets/models/zutomayo.glb', function (gltf) {
    const model = gltf.scene;
    model.name = 'girl';

    if (window.innerWidth <= 768) {
        model.position.set(0, -2.3, 0);
    } else {
        model.position.set(0, -2.75, 0);
    }

    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    renderer.render(scene, camera);
}

function adjustCameraAndRenderer() {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

adjustCameraAndRenderer();
window.addEventListener('resize', adjustCameraAndRenderer);

renderer.setAnimationLoop(animate);