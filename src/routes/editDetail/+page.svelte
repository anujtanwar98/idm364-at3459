<svelte:head>
	<title>{product.name} Edit Details</title>
	<meta name="description" content="All Products" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { doc, getDoc, updateDoc } from 'firebase/firestore';
    import { db } from '../../firebase.js';

    let product = {
        name: '',
        deviceColor: '',
        price: '',
        productImage1: '',
        productImage2: '',
        productImage3: ''
    };
    let productId;

    // Function to check if a string is a valid URL
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const sanitizeText = (text) => text.trim().replace(/<\/?[^>]+(>|$)/g, "");

    const sanitizePrice = (price) => {
        const sanitizedPrice = parseFloat(price);
        return !isNaN(sanitizedPrice) && isFinite(price) ? sanitizedPrice : 0;
    };

    const sanitizeImageUrl = (url) => {
        if (!isValidUrl(url)) return '';
        const parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) return '';
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const extension = parsedUrl.pathname.split('.').pop().toLowerCase();
        if (!validExtensions.includes(`.${extension}`)) return '';
        return url;
    };

    onMount(async () => {
        const useParams = new URLSearchParams(window.location.search);
        productId = useParams.get('id');

        if (productId) {
            const productRef = doc(db, 'products', productId);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
                product = productSnap.data();
            } else {
                console.error('Product not found!');
            }
        }
    });

    async function updateProduct(event) {
        event.preventDefault();

        // Sanitize inputs before updating
        product.name = sanitizeText(product.name);
        product.deviceColor = sanitizeText(product.deviceColor);
        product.price = sanitizePrice(product.price).toString(); // Convert sanitized price back to string if necessary
        product.productImage1 = sanitizeImageUrl(product.productImage1);
        product.productImage2 = sanitizeImageUrl(product.productImage2);
        product.productImage3 = sanitizeImageUrl(product.productImage3);

        const productRef = doc(db, 'products', productId);

        await updateDoc(productRef, {
            ...product
        });

        window.location.href = '/editDelete';
    }
</script>

<h1 class="Add_title">Edit Product Details</h1>

<form on:submit={updateProduct}>
    <label for="name">Name:</label>
    <input type="text" bind:value={product.name} placeholder="Product Name" required />

    <label for="deviceColor">Color:</label>
    <input type="text" bind:value={product.deviceColor} placeholder="Color" required />

    <label for="price">Price:</label>
    <input type="number" bind:value={product.price} placeholder="Price only numbers" required />

    <label for="productImage1">Product Image 1:</label>
    <input type="text" bind:value={product.productImage1} placeholder="Product Image 1 URL" required />

    <label for="productImage2">Product Image 2:</label>
    <input type="text" bind:value={product.productImage2} placeholder="Product Image 2 URL" required />

    <label for="productImage3">Product Image 3:</label>
    <input type="text" bind:value={product.productImage3} placeholder="Product Image 3 URL" required />

    <!-- Add inputs for other fields as necessary -->

    <button type="submit">Save Changes</button>
</form>

<a class="back_button" href="/editDelete">
    <p class="back_button_text">Back to products list</p>
</a>

<style>
    :global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
		color: #ffffff;
		font-family: Arial, sans-serif;
	}
    .Add_title {
        text-align: center;
        color: #E74151;
        padding-top: 20px;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
        margin: 0 auto;
    }
    input {
        padding: 10px;
        border: none;
        border-radius: 10px;
        border: 1px solid #E74151;
        background-color: #212529;
        color: #ffffff;
    }
    button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #E74151;
        color: #ffffff;
        cursor: pointer;
    }
    .back_button {
        text-decoration: none;
        color: #E74151;
        text-align: center;
    }
    .back_button_text {
        padding-top: 20px;
    }
</style>
