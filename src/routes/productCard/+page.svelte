<svelte:head>
	<title>Product</title>
	<meta name="description" content="All Products" />
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let mainImage = '';

	onMount(() => {
		mainImage = 'https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png';
	});

	function openImage(imageUrl) {
		mainImage = imageUrl;
	}
</script>

<div class="product-page">
	<div class="main_wrapper">
		<div class="main-display-image">
			<img src={mainImage} alt="Main Display Image">
		</div>
		<div class="product-images">
			<div class="product-extra-images" on:click={() => openImage('https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png')}>
				<img class="image-product" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png" alt="Product Image 1" style="width: 40px;">
			</div>
			<div class="product-extra-images" on:click={() => openImage('https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705526871/svelte%20app/device_converted_h96ux2.png')}>
				<img class="image-product" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705526871/svelte%20app/device_converted_h96ux2.png" alt="Product Image 2" style="width: 40px;">
			</div>
		</div>
	</div>
	<div class="product-details">
        <h1>Product Name</h1>
        <p>Description of the product...</p>
        <p>Price: $XX.XX</p>
		<button class="add_to_cart_button">Add to Cart</button>
    </div>
</div>

<style>
    :global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
		color: #ffffff;
		font-family: Arial, sans-serif;
	}
    .product-page {
        display: flex;
        flex-direction: row;
        gap: 100px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
    }
    .main_wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 60%;
    }
    .main-display-image {
        background-color: #212529;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 600px;
        height: 600px;
        overflow: hidden;
    }
    .main-display-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        max-width: 400px;
        margin: 40px;
    }
    .product-images {
        display: flex;
        /* flex-direction: row; */
        flex-wrap: wrap;
        gap: 20px;
    }
    .product-extra-images {
        width: 80px;
        height: 80px;
        border-radius: 100px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #212529;
        border: 1px solid #ddd;
		cursor: pointer;
    }
    .image-product {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    .product-images img {
		width: 100%;
		height: auto;
		object-fit: cover;
		max-width: 400px;
		cursor: pointer;
	}
    .product-details {
        width: 40%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .product-details h1 {
        font-size: 2rem;
    }
    .product-details p {
        font-size: 1.2rem;
    }
    .product-details p:last-child {
        font-size: 1.5rem;
        font-weight: bold;
    }
	.add_to_cart_button {
		padding: 10px 20px;
		border: none;
		border-radius: 10px;
		background-color: #E74151;
		color: #ffffff;
		font-size: 1.2rem;
		cursor: pointer;
	}
	.add_to_cart_button:hover {
		background-color: #ff5a6e;
	}
	/* add on click */
	.add_to_cart_button:active {
		transform: scale(0.95);
	}
    @media (max-width: 1024px) {
        .product-page {
            flex-direction: column;
        }
        .main_wrapper {
            width: 100%;
        }
        .main-display-image {
            width: 100%;
            height: 400px;
        }
        .product-details {
            width: 100%;
        }
    }
    @media (max-width: 768px) {
        .product-page {
            flex-direction: column;
        }
        .main_wrapper {
            width: 100%;
        }
        .main-display-image {
            width: 100%;
            height: 400px;
        }
        .product-details {
            width: 100%;
        }
    }
</style>
