<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  
    let container;
    let model;
  
    onMount(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  
      // WebGLRenderer with alpha set to true for a transparent background
      const renderer = new THREE.WebGLRenderer({ alpha: false });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x36454F); // Set the background color to salmon
      container.appendChild(renderer.domElement);
  
      // Lighting
      // Hemisphere light for soft ambient light
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
      scene.add(hemiLight);
  
      // Directional light from the front
      const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
      frontLight.position.set(0, 0, 1);
      scene.add(frontLight);
  
      // Directional light from the back
      const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
      backLight.position.set(0, 0, -1);
      scene.add(backLight);
  
      // Directional light from the left
      const leftLight = new THREE.DirectionalLight(0xffffff, 0.5);
      leftLight.position.set(-1, 0, 0);
      scene.add(leftLight);
  
      // Directional light from the right
      const rightLight = new THREE.DirectionalLight(0xffffff, 0.5);
      rightLight.position.set(1, 0, 0);
      scene.add(rightLight);
  
  
      // GLTF Loader
    const loader = new GLTFLoader();
    loader.load('/applevisionpro.glb', (gltf) => {
      console.log("Model loaded", gltf);
      model = gltf.scene; 
      model.scale.set(150, 150, 150); 
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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.003; // Slow rotation
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
  
  <div bind:this={container} style="width: 80%; height: 80vh;"></div>
  