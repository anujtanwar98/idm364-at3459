<svelte:head>
	<title>Product Details</title>
	<meta name="description" content="Details of Products" />
</svelte:head>

<script>
	import { onMount } from 'svelte';
    import { doc, getDoc } from 'firebase/firestore';
    import { db } from '../../firebase.js';

	let mainImage = '';
    let product = {};
    let productImages = [];

	// onMount(() => {
	// 	mainImage = 'https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png';
	// });
    onMount(async () => {
        const useParams = new URLSearchParams(window.location.search);
        const productId = useParams.get('id');

        if (productId) {
            const ProductDocRef = doc(db, 'products', productId);
            const ProductDocSnap = await getDoc(ProductDocRef);

            if (ProductDocSnap.exists()) {
                product = { ...ProductDocSnap.data(), id: ProductDocSnap.id };
                mainImage = product.productImage1 || ''; 
            // Create an array of available product images
            productImages = [
                    product.productImage1,
                    product.productImage2,
                    product.productImage3
                ].filter(Boolean); // Remove any undefined or null values
                
            } else {
                console.log('Product not found!');
            }
        }
    });

	function openImage(imageUrl) {
		mainImage = imageUrl;
	}

    function formatPrice(price) {
        // Convert the price string to a number
        const numericPrice = parseInt(price, 10);

        // Convert the number to a string and insert a decimal point before the last 2 digits
        let formattedPrice = numericPrice.toString();
        formattedPrice = formattedPrice.slice(0, -2) + "." + formattedPrice.slice(-2);

        // Add a dollar sign in front of the formatted price
        return `$${formattedPrice}`;
    }

</script>

<div class="product-page">
	<div class="main_wrapper">
		<div class="main-display-image">
			<img src={mainImage} alt="Main Display Image">
		</div>
		<!-- <div class="product-images">
			<div class="product-extra-images" on:click={() => openImage('https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png')}>
				<img class="image-product" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png" alt="Product Image 1" style="width: 40px;">
			</div>
			<div class="product-extra-images" on:click={() => openImage('https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705526871/svelte%20app/device_converted_h96ux2.png')}>
				<img class="image-product" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705526871/svelte%20app/device_converted_h96ux2.png" alt="Product Image 2" style="width: 40px;">
			</div>
		</div> -->
        <div class="product-images">
            {#each productImages as image, index}
                <div class="product-extra-images" on:click={() => openImage(image)} key={index}>
                    <img class="image-product" src={image} alt={`Product Image ${index + 1}`} style="width: 40px;">
                </div>
            {/each}
        </div>
	</div>
	<div class="product-details">
        <h1>{product.name}</h1>
        <p>{formatPrice(product.price)}</p>
        <p>{product.deviceColor}</p>
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
