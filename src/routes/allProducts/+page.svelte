<svelte:head>
	<title>All Products</title>
	<meta name="description" content="All Products" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from '../../firebase.js';

    let products = [];

    onMount(async () => {
        const querySnapshot = await getDocs(collection(db, "devices"));
        products = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const firstImageUrl = data.variants && data.variants.length > 0 && data.variants[0].imageUrls.length > 0
                ? data.variants[0].imageUrls[0]
                : '';
            return { id: doc.id, ...data, firstImageUrl };
        });
    });
</script>

<section class="main-section">
    <div class="info-devices">
        <div class="info-device-wrapper">
            <div class="device-info-text-box">
                <h1 class="device-info-text">Welcome to the era of spatial computing</h1>
            </div>
            <div class="device-info-image">
                <video class="device-image" autoplay loop>
                    <source src="https://res.cloudinary.com/dr8jiwn4u/video/upload/v1707539969/svelte%20app/vision-pro-video_pdahfc.mp4">
                </video>
                <div class="intro_new_product">
                    <div class="intro_new_product_wrapper">
                        <div class="intro_new_product_text">
                            <h1 class="intro_new_product_text_title">Introducing the Vision Pro</h1>
                            <p class="subtitle">
                                The Vision Pro is a new era of spatial computing. It is a wearable device that allows you to interact with the digital world in the same way you interact with the physical world. It is a new way to experience the world around you, and it is the future of computing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="learn-more">
        <div class="learn-more-wrapper">
            <div class="two-learn-more-boxes">
                <div class="learn-more-box">
                    <div class="learn-more-box-image">
                        <img class="image-learn-box" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1706907494/svelte%20app/sensors_all__dp0a8e4y4u4i_large_2x_yavywe.png" alt="">
                    </div>
                    <div class="learn-more-box-title">
                        <h1>A sophisticated sensor array</h1>
                    </div>
                    <div class="learn-more-box-para">
                        <p>A pair of high-resolution cameras transmit over one billion pixels per second to the displays so you can see the world around you clearly. The system also helps deliver precise head and hand tracking and real-time 3D mapping, all while understanding your hand gestures from a wide range of positions.</p>
                    </div>
                </div>
                <div class="learn-more-box">
                    <div class="learn-more-box-image">
                        <img class="image-learn-box" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1706911984/svelte%20app/eye_tracking_on__ln11reqs6mi6_large_2x_iub7le.png" alt="">
                    </div>
                    <div class="learn-more-box-title">
                        <h1>Responsive, precision eye tracking</h1>
                    </div>
                    <div class="learn-more-box-para">
                        <p>A high-performance eye-tracking system of LEDs and infrared cameras projects invisible light patterns onto each eye. This advanced system provides ultraprecise input without your needing to hold any controllers, so you can accurately select elements just by looking at them.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
        {#each products as product}
        <div class="col-2">
            <a class="product-link" href="/productCard?id={product.id}">
            <div class="card card-block card-1">
                <div class="image-box">
                    <img class="card-img-top" src={product.firstImageUrl} alt="Card image cap">
                </div>
                <div class="text-box">
                    <p class="card-title">
                        {product.name}
                    </p>
                </div>
            </div>
            </a>
        </div>
        {/each}
    </div>
    <div class="main-Wrapper">
        <div class="main-wrapper-box">
            <h1 class="main-wrapper-text">Crafted for Creativity: Innovate, Integrate, Ascend</h1>
        </div>
    </div>
</section>


<style>
    .main-Wrapper{
        background-color: #000000;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main-wrapper-text {
        color: #5e5f60;
        font-size: 2.5em;
        font-weight: 700;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        padding: 20px;
    }
    .scrolling-wrapper{
        overflow-x: auto;
        margin: 10px;
    }
    .pt-2 {
        padding-top: 1.5rem !important;
    }
    .main-section{
        background-color: #212529;
    }
    .scrolling-wrapper::-webkit-scrollbar-track {
        background-color: #000000;
        border-radius: 10px;
    }
    .scrolling-wrapper::-webkit-scrollbar-thumb {
        background-color: #E74151;
        border-radius: 10px;
    }
    .scrolling-wrapper::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    h1{
        font-weight: 700;
        font-size: 3.4em;
    }
    .subtitle{
        font-size: 1.25rem;
        opacity: 0.65;
    }
    .card-block{
        height: 180px;
        width: 150px;
        border: none;
        background-position: center;
        background-size: cover;
        transition: all 0.2s ease-in-out !important;
        border-radius: 24px;
        justify-content: center;
        align-items: center;
        transition: transform 0.2s ease-in-out;
        &:hover{
            transform: translateY(-5px);
            box-shadow: none;
            opacity: 0.9;
        }
    }
    .card {
        background-color: transparent;
    }
    .card-img-top{
        max-width: 100%;
        max-height: 100%;
        width: 120px;
        object-fit: contain;
    }
    .image-box {
        padding: 10px;
        text-align: center;
        width: 140px;
        height: 140px;
        display: flex;
        justify-content: center;
    }
    .text-box {
        padding: 10px;
        text-align: center;
    }
    .card-title{
        font-size: 0.75rem;
        color: #ff8787;
    }
    .col-2 {
       width: 15%;
    }
    @media (max-width: 1000px) {
        .col-2 {
            margin-left: 20px;
            margin-right: 20px;
        }
    }
    @media (max-width: 470px) {
        .col-2 {
            margin-left: 30px;
            margin-right: 30px;
        }
    }
    @media (max-width: 850px) {
        .col-2 {
            margin-left: 10px;
            margin-right: 10px;
        }
    }
    @media (max-width: 770px) {
        .card-block{
            height: 130px;
            width: 100px;
            margin: 10px;
        }
        .image-box {
            padding: 10px;
            text-align: center;
            width: 100px;
            height: 100px;
        }
        .col-2 {
            margin-left: 10px;
            margin-right: 10px;
        }
        .main-wrapper-text {
            font-size: 1.5em;
        }
        .device-info-text {
            font-size: 1.5rem;
        }
        .intro_new_product {
            opacity: 0;
        }
        .intro_new_product_wrapper {
            display: none;
        }
    }
    @media (max-width: 600px) {
        .col-2 {
            margin-left: 10px;
            margin-right: 10px;
            width: 17%;
        }
        .device-info-text {
            font-size: 1.25rem;
        }
        .learn-more-box-title h1{
            font-size: 2rem;
        }
    }
    .intro_new_product_text_title{
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
    }
    .info-devices{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background-color: #000000;
    }
    .info-device-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #000000;
        border-radius: 20px;
    }
    .device-info-image{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 20px;
        background-color: #000000;
        position: relative;
        text-align: center;
        color: white;
    }
    .device-image{
        max-width: 100%;
        width: 100%;
        height: auto;
        filter: brightness(0.8) contrast(120%) blur(1px);
    }
    .device-info-text-box{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
    .device-info-text{
        color: #ffffff;
        font-size: 2.25rem;
        font-weight: 700;
    }
    .learn-more{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000000;
    }
    .learn-more-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #000000;
        border-radius: 20px;
        max-width: 1200px;
        padding: 20px;
        margin: 20px;
        background-color: #000000;
    }
    .image-learn-box{
        max-width: 500px;
        max-height: 250px;
        width: 100%;
        object-fit: contain;
    }
    .learn-more-box-title{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        font-size: 1rem;
        color: #ffffff;
        max-width: 700px;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
    }
    .learn-more-box-para{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        font-size: 1rem;
        color: #86868b;
        max-width: 700px;
        text-align: center;
        font-weight: 400;
    }
    .intro_new_product{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 20px;
        max-width: 1200px;
        padding: 20px;
        margin: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        width: 80%;
        max-width: 800px;
        text-align: center;
    }
    .product-link{
        text-decoration: none;
    }
</style>
