<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  let container;
  let model;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);

    // WebGLRenderer with alpha set to true for a transparent background
    const renderer = new THREE.WebGLRenderer({ alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(); // Set the background color
    container.appendChild(renderer.domElement);

    // Lighting
    // Hemisphere light for soft ambient light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
    scene.add(hemiLight);

    // Directional light from the front
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 1);
    scene.add(frontLight);

    // Directional light from the back
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, 0, -1);
    scene.add(backLight);

    // Directional light from the left
    const leftLight = new THREE.DirectionalLight(0xffffff, 1);
    leftLight.position.set(-1, 0, 0);
    scene.add(leftLight);

    // Directional light from the right
    const rightLight = new THREE.DirectionalLight(0xffffff, 1);
    rightLight.position.set(1, 0, 0);
    scene.add(rightLight);

    // Directional light from the bottom light
    const bottomLight = new THREE.DirectionalLight(0xffffff, 1);
    bottomLight.position.set(0, -1, 0); // Positioning it below the scene
    scene.add(bottomLight);

    // Directional light from the bottom light
    const topLight = new THREE.DirectionalLight(0xffffff , 1);
    topLight.position.set(0, 1, 0); // Positioning it above the scene
    scene.add(topLight);


    // GLTF Loader
  const loader = new GLTFLoader();
  loader.load('/errorcomp.glb', (gltf) => {
    console.log("Model loaded", gltf);
    model = gltf.scene; 
    // Detect if the user is on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      // Set smaller scale for mobile devices
      model.scale.set(12, 12, 12);
    } else {
      // Set larger scale for non-mobile devices
      model.scale.set(12, 12, 12);
    }
    scene.add(model);
  }, undefined, (error) => {
    console.error('An error happened', error);
  });

  camera.position.set(0, 1, 100);

  // OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.zoomSpeed = 10;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI;

  controls.minDistance = 100; // Minimum zoom distance change according based on object
  controls.maxDistance = 150; // Maximum zoom distance change according based on object

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    // Disable zoom and orbit controls for mobile devices
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;
  } else {
    // Enable zoom and other controls for non-mobile devices
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.enablePan = true;
  }

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    if (model) {
      model.rotation.y += 0.009; // Slow rotation
      model.rotation.x += 0.009; // Slow rotation
      model.rotation.z += 0.009; // Slow rotation
    }
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  });
</script>

<div bind:this={container} style="width: 80%; height: 60vh;"></div>
