<script>
    import { onMount } from 'svelte';
    import { doc, getDoc } from 'firebase/firestore';
    import { db } from '../../firebase.js';
    import { cart } from '../stores/cartStore.js';

    let mainImage = '';
    let product = {};
    let productImages = [];
    let variantColors = [];
    let selectedVariantIndex = 0;

    onMount(async () => {
        const useParams = new URLSearchParams(window.location.search);
        const productId = useParams.get('id');

        if (productId) {
            const productDocRef = doc(db, 'devices', productId);
            const productDocSnap = await getDoc(productDocRef);

            if (productDocSnap.exists()) {
                product = { ...productDocSnap.data(), id: productDocSnap.id };

                // Initialize with the first three images of the first variant
                if (product.variants && product.variants.length > 0) {
                    productImages = product.variants[0].imageUrls.slice(0, 3);
                    mainImage = productImages[0]; // Set the main image to the first image of the first variant

                    // Store colors of all variants
                    variantColors = product.variants.map(variant => variant.color);
                }
            } else {
                console.log('Product not found!');
            }
        }
    });

    function openImage(imageUrl) {
        mainImage = imageUrl;
    }

    function formatPrice(price) {
        const numericPrice = parseInt(price, 10);
        let formattedPrice = numericPrice.toString();
        formattedPrice = formattedPrice.slice(0, -2) + "." + formattedPrice.slice(-2);
        return `$${formattedPrice}`;
    }
    function selectVariant(index) {
    if (product.variants && product.variants[index]) {
        productImages = product.variants[index].imageUrls.slice(0, 3);
        mainImage = productImages[0]; // Update the main image to the first image of the selected variant
    }
}

function addToCart() {
    cart.update(items => {
        const existingItem = items.find(item => item.id === product.id);

        // Get details of the selected variant
        const selectedVariant = product.variants[selectedVariantIndex];
        const variantDetails = {
            color: selectedVariant.color,
            imageUrl: selectedVariant.imageUrls[0], // Assuming you want the first image
        };

        if (existingItem) {
            // Update existing item in cart (if needed to include variant details)
            return items.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1, ...variantDetails } : item
            );
        } else {
            // Add new item to cart with variant details
            return [...items, { ...product, quantity: 1, ...variantDetails }];
        }
    });
}


</script>

<div class="product-page">
    <div class="main_wrapper">
        <div class="main-display-image">
            <img src={mainImage} alt="Main Display Image">
        </div>
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
        <div class="variant-colors">
            {#each variantColors as color, index}
                <button class="color_select_button" on:click={() => selectVariant(index)}>{color}</button>
            {/each}
        </div>
        <button class="add_to_cart_button" on:click="{addToCart}">Add to Cart</button>
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
        width: 500px;
        height: 500px;
        overflow: hidden;
    }
    .main-display-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        max-width: 400px;
        margin: 40px;
        margin-right: auto;
        margin-left: auto;
        max-height: 100%;
        max-width: 100%;
        padding: 40px;
    }
    .product-images {
        display: flex;
        /* flex-direction: row; */
        flex-wrap: wrap;
        gap: 20px;
    }
    .product-extra-images {
        width: 100px;
        height: 100px;
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
    .color_select_button {
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        background-color: #515151;
        color: #ffffff;
        font-size: 1.2rem;
        cursor: pointer;
        margin: 10px;
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
