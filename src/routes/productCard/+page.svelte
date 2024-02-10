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
	<div class="main-display-image">
		<img src={mainImage} alt="Main Display Image">
	</div>
	<div class="product-details">
		<h1>Product Name</h1>
		<p>Description of the product...</p>
		<p>Price: $XX.XX</p>
	</div>
	<div class="product-images">
		<div class="product-extra-images">
			<img class="image-product" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png" alt="Product Image 1" on:click={() => openImage('https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png')} style="width: 50px;">
		</div>
		<div class="product-extra-images">
			<img class="image-product" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705526871/svelte%20app/device_converted_h96ux2.png" alt="Product Image 2" on:click={() => openImage('https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705526871/svelte%20app/device_converted_h96ux2.png')} style="width: 50px;">
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #121212; /* Dark theme background */
		color: #E0E0E0; /* Light text for contrast */
		font-family: Arial, sans-serif;
	}

	.product-page {
		display: grid;
		grid-template-columns: 60% 40%;
		gap: 20px;
		padding: 20px;
	}
	/* .product-images {
		border-radius: 20px;
		display: flex;
		flex-direction: row;
	}
	.product-extra-images {
		margin-right: 10px;
		background-color: #ffffff;
		border-radius: 100px;
		max-width: 300px;
		overflow: hidden;
	}
	.image-product {
		width: 100%;
		height: auto;
		cursor: pointer;
		object-fit: contain;
	} */

	.product-images {
		display: flex;
		flex-wrap: wrap; /* Allows images to wrap to next line if they don't fit */
		gap: 10px; /* Adds space between the square image containers */
	}
	.product-extra-images {
		width: 100px; /* Set the width of the square */
		height: 100px; /* Set the height of the square to match the width, creating a square */
		border-radius: 10px; /* Optional: Adds rounded corners to your square containers */
		overflow: hidden; /* Ensures the image does not overflow the square container */
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff; /* Adds a background color to the square container */
		border: 1px solid #ddd; /* Optional: Adds a border to the square container */
	}

	.image-product {
		max-width: 100%; /* Ensures the image does not exceed the container's width */
		max-height: 100%; /* Ensures the image does not exceed the container's height */
		object-fit: cover; /* Ensures the image covers the square area, might crop some parts of the image */
	}
	.product-images img {
		width: 100%;
		height: auto;
		object-fit: cover; /* Adjust this as needed */
		max-width: 400px;
		cursor: pointer;
	}
	/* .main-display-image {
		background-color: beige;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.main-display-image img {
		width: 100%;
		height: auto;
		object-fit: cover;
		max-width: 400px;
		margin: 40px;
	} */
	.main-display-image {
		background-color: beige;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 600px; /* Fixed width */
		height: 600px; /* Fixed height */
		overflow: hidden; /* Ensures the image does not overflow the container */
	}

	.main-display-image img {
		width: 100%;
		height: 100%;
		object-fit: contain; /* Ensures the image maintains its aspect ratio within the container */
		max-width: 400px;
		margin: 40px;
	}
	@media (max-width: 768px) {
		.product-page {
			grid-template-columns: 1fr; /* Stack the elements on smaller screens */
		}
	}
</style>

