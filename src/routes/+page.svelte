<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home page of this E commerce webApp" />
</svelte:head>
<script>
  import { onMount } from 'svelte';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { db } from '../firebase.js';
  import GLTFModel from './Threed.svelte';
  // import ScrollMagic from 'scrollmagic';

  let products = [];
  let bgColors = ['#FFD700', '#FF5733', '#33FF57', '#3357FF', '#FF33F4', '#00FFFF', '#FF4500', '#4B0082', '#FA8072'];

  onMount(async () => {
    const specificProductNames = ['Rabbit R1', 'Apple Vision Pro', 'Apple Watch Ultra 2', 'Google Pixel Fold', 'Meta Quest 3'];
    const productsData = [];

    for (const productName of specificProductNames) {
      const q = query(collection(db, "devices"), where("name", "==", productName));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const firstImageUrl = data.variants[0].imageUrls[0];

        productsData.push({
          id: doc.id,
          name: data.name,
          imageUrl: firstImageUrl
        });
      });
    }

    products = productsData;

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
<div class="my-3d-file">
  <GLTFModel />
</div>
<!-- <div class="blank_row height-scrolly-box w-100 scrolly-box-item-align scrolly-box-flex scrolly-box-justify ">Scroll Me</div> -->
<div class="section_box  scrolly-box-wrap w-100 animation_5" style="padding: 0; height: auto;">
  <!-- <h2>Trigger Image On Scroll</h2> -->
  <div class="boxes w-100 scrolly-box-wrap animation_box" style="overflow: visible;">
    {#each products as product}
      <div class="items scrolly-box-bg w-100 height-scrolly-box scrolly-box-flex scrolly-box-item-strech scrolly-box-justify ani5">
        <div class="text width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box">
          <div class="featured_title_shop_box">
            <div class="title_box">
              <h2>{product.name}</h2>
            </div>
            <div class="shop_now_box">
              <a class="product-link" href="/productCard?id={product.id}">
                <button class="shop_now_button">Shop Now</button>
              </a>
            </div>
          </div>
        </div>
        <div class="Image width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box" style="background-color: {bgColors[Math.floor(Math.random() * bgColors.length)]}">
          <img src={product.imageUrl} alt={product.name}>
        </div>
      </div>
    {/each}

    <!-- <div class="items scrolly-box-bg w-100 height-scrolly-box scrolly-box-flex scrolly-box-item-strech scrolly-box-justify ani5">
      <div class="text width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box">
        <h2>Product 1</h2>
      </div>
      <div class="Image width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box product1">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705526871/svelte%20app/device_converted_h96ux2.png" alt="">
      </div>
    </div>
    <div class="items  scrolly-box-bg w-100 height-scrolly-box scrolly-box-flex scrolly-box-item-strech scrolly-box-justify ani5">
      <div class="text width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box">
        <h2>Product 2</h2>
      </div>
      <div class="Image width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box product2">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343304/svelte%20app/iPhone15Pro-BlackT2_x3mpsm.png" alt="">
      </div>
    </div>
    <div class="items scrolly-box-bg w-100 height-scrolly-box scrolly-box-flex scrolly-box-item-strech scrolly-box-justify ani5">
      <div class="text width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box">
        <h2>Product 3</h2>
      </div>
      <div class="Image width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box product3">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343304/svelte%20app/iPhone15Pro-BlackT2_x3mpsm.png" alt="">
      </div>
    </div>
    <div class="items scrolly-box-bg w-100 height-scrolly-box scrolly-box-flex scrolly-box-item-strech scrolly-box-justify ani5">
      <div class="text width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box">
        <h2>Product 4</h2>
      </div>
      <div class="Image width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box product4">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343304/svelte%20app/iPhone15Pro-BlackT2_x3mpsm.png" alt="">
      </div>
    </div>
    <div class="items scrolly-box-bg w-100 height-scrolly-box scrolly-box-flex scrolly-box-item-strech scrolly-box-justify ani5">
      <div class="text width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box">
        <h2>Product 5</h2>
      </div>
      <div class="Image width-scrolly-box scrolly-box-flex scrolly-box-justify scrolly-box-item-align height-scrolly-box product5">
        <img src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343304/svelte%20app/iPhone15Pro-BlackT2_x3mpsm.png" alt="">
      </div>
    </div> -->

  </div>
</div>

<div class="blank_row height-scrolly-box w-100 scrolly-box-item-align scrolly-box-flex scrolly-box-justify ">
  <div class="view_all_products">
    <a class="view_all_products_link" href="/allProducts">
      <button class="view_all_products_button">View All Products</button>
    </a>
  </div>
</div>

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
  .scrolly-box-bg {
      background: #000000;
  }
  .scrolly-box-flex {
    display: flex;
  }

  .scrolly-box-justify {
    justify-content: center;
  }

  .scrolly-box-item-strech {
    align-items: stretch;
  }

  .scrolly-box-item-align {
    align-items: center;
  }

  .height-scrolly-box {
    height: 100vh;
  }

  .width-scrolly-box {
    width: 50%;
  }
  .product1 {
    background-color: #2a2a2a;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product2 {
    background-color: #3a3a3a; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product3 {
    background-color: #4a4a4a; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product4 {
    background-color: #3a3a3a; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product5 {
    background-color: #2a2a2a; 
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
    /* background:   url(https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705368083/svelte%20app/e-commerce_eaqe0m.jpg) no-repeat; */
    background-color: #000;
    margin: 0;
    position: relative;
    z-index: 1;
    padding: 20px 0;
    background-size: cover;
    background-position: center;
  }

  .my-3d-file{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #212529;
  }

  .title_box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .shop_now_box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
  }
  .product-link {
    text-decoration: none;
  }
  .shop_now_button {
    padding: 10px 20px;
    background-color: #212529;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  .shop_now_button:hover {
    background-color: #fff;
    color: #212529;
  }
  .view_all_products {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .view_all_products_link {
    text-decoration: none;
  }
  .view_all_products_button {
    padding: 10px 20px;
    background-color: #212529;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
    font-size: 1.25rem;
  }
  .view_all_products_button:hover {
    background-color: #fff;
    color: #212529;
  }
</style>
