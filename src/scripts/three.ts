import * as THREE from "three";
import { GLTFLoader } from "three/addons";

function configureModelView(host: HTMLDivElement) {
	const modelPath = host.getAttribute("data-model")!;

	// scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x7e92a7);

	// camera
	const camera = new THREE.PerspectiveCamera();
	camera.fov = 55;
	camera.position.z = 5;
	camera.aspect = window.innerWidth / window.innerHeight;

	// renderer
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(host.offsetWidth, host.offsetHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	host.appendChild(renderer.domElement);

	// lighting
	const directionalLight = new THREE.DirectionalLight();
	directionalLight.color = new THREE.Color(0xffffff);
	directionalLight.intensity = 1;
	directionalLight.position.set(5, 5, 5);

	const ambientLight = new THREE.AmbientLight();
	ambientLight.color = new THREE.Color(0xffffff);
	ambientLight.intensity = 0.5;

	scene.add(directionalLight, ambientLight);

	// model loading
	const loader = new GLTFLoader();
	loader.load(
		modelPath,
		(gltf) => {
			const model = gltf.scene;
			model.name = "girl";

			if (window.innerWidth <= 768) {
				model.position.set(0, -2.3, 0);
			} else {
				model.position.set(0, -2.75, 0);
			}

			scene.add(model);
		},
		undefined,
		console.error,
	);

	// callbacks
	function animate() {
		renderer.render(scene, camera);
	}

	function adjustCameraAndRenderer() {
		const width = host.offsetWidth;
		const height = host.offsetHeight;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}

	adjustCameraAndRenderer();
	window.addEventListener("resize", adjustCameraAndRenderer);
	renderer.setAnimationLoop(animate);
}

document.addEventListener("astro:page-load", () => {
	document.querySelectorAll("[data-model]").forEach((host) => {
		configureModelView(host as HTMLDivElement);
	});
});
