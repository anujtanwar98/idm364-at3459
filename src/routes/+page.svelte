<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home page of this E commerce webApp" />
</svelte:head>
<script>
  import { onMount } from 'svelte';
  // import ScrollMagic from 'scrollmagic';

  onMount(async () => {
    if (typeof window !== 'undefined') {
      // Dynamically import ScrollMagic only on the client side
      const ScrollMagic = await import('scrollmagic');


    const controller = new ScrollMagic.Controller();

    // Use setTimeout to ensure the DOM elements are rendered
    setTimeout(() => {
      const revealElements = document.querySelectorAll('.ani5');
      const images = document.querySelectorAll('.Image');

      revealElements.forEach((elem, index) => {
        new ScrollMagic.Scene({
          triggerElement: elem,
          triggerHook: 0,
          duration: '100%'
        })
          .setPin(images[index])
          .addTo(controller);
      });
    }, 0);
  }
  });
</script>

<div class="blank_row h-100 w-100 align-items-center d-flex justify-content-center ">Scroll Me</div>
<div class="section_box  flex-wrap w-100 animation_5" style="padding: 0; height: auto;">
  <!-- <h2>Trigger Image On Scroll</h2> -->
  <div class="boxes w-100 flex-wrap animation_box" style="overflow: visible;">
    <div class="items bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 1</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100">
        <img src="https://images.unsplash.com/photo-1587181972975-ff4ecddeb30b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGhvdHdoZWVsc3xlbnwwfHwwfHx8MA%3D%3D" alt="">
      </div>
    </div>
    <div class="items  bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 2</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100">
        <img src="https://images.unsplash.com/photo-1572434800306-2fce3c108eaf?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
      </div>
    </div>
    <div class="items bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 3</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100">
        <img src="https://images.unsplash.com/photo-1642374386978-9d5befc7af96?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
      </div>
    </div>
    <div class="items bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 4</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100">
        <img src="https://images.unsplash.com/photo-1625687095627-70abbf6cf29b?q=80&w=1340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
      </div>
    </div>
    <div class="items bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 5</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100">
        <img src="https://images.unsplash.com/photo-1620976714520-5515df9aa02d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
      </div>
    </div>

  </div>
</div>

<div class="blank_row h-100 w-100 align-items-center d-flex justify-content-center ">Scroll Me</div>

<style>
    .flex-wrap {
  flex-wrap: wrap;
}
.bg_blue {
    background: #2196F3;
}
.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.align-items-strech {
  align-items: stretch;
}

.align-items-center {
  align-items: center;
}

.h-100 {
  height: 100vh;
}

.w-50 {
  width: 50%;
}
.Image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ani5 {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.animation_5 .boxes {
  width: 100%;
  height: 100%;
}

.boxes {
  width: 100%;
  height: 90%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
}

.section_box {
  border: 0px solid #000;
  background: #fff;
  padding: 20px 20px;
  align-items: stretch;
}

.Fixed_img .Image {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50%;
  z-index: 1;
}

.blank_row {
  background:   url(https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705003449/svelte%20app/Hot_Wheels_car%20future.png) no-repeat;
  margin: 0;
  font-size: 3rem;
  position: relative;
  z-index: 1;
  padding: 20px 0;
  background-size: cover;
  background-position: center;
}
</style>