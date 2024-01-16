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
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100 product1">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343306/svelte%20app/iPhone15Pro-NaturalT2_y1eatk.png" alt="">
      </div>
    </div>
    <div class="items  bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 2</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100 product2">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343304/svelte%20app/iPhone15Pro-BlackT2_x3mpsm.png" alt="">
      </div>
    </div>
    <div class="items bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 3</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100 product3">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343304/svelte%20app/iPhone15Pro-BlackT2_x3mpsm.png" alt="">
      </div>
    </div>
    <div class="items bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 4</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100 product4">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343304/svelte%20app/iPhone15Pro-BlackT2_x3mpsm.png" alt="">
      </div>
    </div>
    <div class="items bg_blue w-100 h-100 d-flex align-items-strech justify-content-center ani5">
      <div class="text w-50 d-flex justify-content-center align-items-center h-100">
        <h2>Product 5</h2>
      </div>
      <div class="Image w-50 d-flex justify-content-center align-items-center h-100 product5">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343304/svelte%20app/iPhone15Pro-BlackT2_x3mpsm.png" alt="">
      </div>
    </div>

  </div>
</div>

<div class="blank_row h-100 w-100 align-items-center d-flex justify-content-center ">Scroll Me</div>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  
  }


  .flex-wrap {
  flex-wrap: wrap;
  }
  h2 {
  color: #fff;
  }
.bg_blue {
    background: #000000;
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
.product1 {
    background-color: #7393B3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product2 {
    background-color: #B2BEB5; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product3 {
    background-color: #36454F; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product4 {
    background-color: #A9A9A9; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product5 {
    background-color: #6082B6; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
.Image img {
  max-width: 80%;
    max-height: 80vh;
  object-fit: contain;
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