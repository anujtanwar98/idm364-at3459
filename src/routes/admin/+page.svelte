<svelte:head>
	<title>Admin</title>
	<meta name="description" content="Admin" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { collection, addDoc } from 'firebase/firestore';
    import { db } from '../../firebase.js'
    let name, deviceColor, price, productImage1, productImage2, productImage3;
    let submissionMessage = '';

    // Function to check if a string is a valid URL
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Sanitize text inputs
    const sanitizeText = (text) => text.trim().replace(/<\/?[^>]+(>|$)/g, "");
    // Sanitize price to ensure it is a valid number
    const sanitizePrice = (price) => {
        const sanitizedPrice = parseFloat(price);
        return !isNaN(sanitizedPrice) && isFinite(price) ? sanitizedPrice : 0;
    };

    const sanitizeImageUrl = (url) => {
        if (!isValidUrl(url)) return ''; // Return empty if not a valid URL

        const parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) return ''; // Ensure valid protocol

        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const extension = parsedUrl.pathname.split('.').pop().toLowerCase();
        if (!validExtensions.includes(`.${extension}`)) return ''; // Check extension

        return url; // Return the original URL if all checks pass
    };
     const handleSubmit = async e => {
        e.preventDefault();
        // Sanitize inputs
        const sanitizedPrice = sanitizePrice(price);
        const sanitizedPriceAsString = sanitizedPrice.toString();
        const sanitizedProductName = sanitizeText(name);
        const sanitizedColor = sanitizeText(deviceColor);
        // Sanitize and validate image URLs
        const sanitizedProductImage1 = sanitizeImageUrl(productImage1);
        const sanitizedProductImage2 = sanitizeImageUrl(productImage2);
        const sanitizedProductImage3 = sanitizeImageUrl(productImage3);
        await addDoc(collection(db, "products"), {
            name: sanitizedProductName,
            deviceColor: sanitizedColor,
            price: sanitizedPriceAsString,
            productImage1: sanitizedProductImage1,
            productImage2: sanitizedProductImage2,
            productImage3: sanitizedProductImage3,
            Id: crypto.randomUUID()
        });
        // Set the submission message
        submissionMessage = "Product added successfully!";
        
        // Clear the input fields
        name = '';
        deviceColor = '';
        price = '';
        productImage1 = '';
        productImage2 = '';
        productImage3 = '';

        // Optional: Hide the message after a few seconds
        setTimeout(() => {
            submissionMessage = '';
        }, 3000); // Hide after 3 seconds
    }
</script>
<form on:submit={handleSubmit}>
    <!-- <input type="text"  bind:value={input} placeholder="Product Name" /> -->
    <input type="text" bind:value={name} placeholder="Product Name" required />
    <input type="text" bind:value={deviceColor} placeholder="Color" required />
    <input type="number" bind:value={price} placeholder="Price only numbers" required />
    <input type="text" bind:value={productImage1} placeholder="Product Image 1 URL" required />
    <input type="text" bind:value={productImage2} placeholder="Product Image 2 URL" required />
    <input type="text" bind:value={productImage3} placeholder="Product Image 3 URL" required />
    <button type="submit">Add Product</button>
    {#if submissionMessage}
        <p>{submissionMessage}</p>
    {/if}
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
        margin: 0 auto;
        padding: 20px;
    }
    input {
        padding: 10px;
        border: none;
        border-radius: 10px;
        border: 1px solid #007bff;
    }
    button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: #ffffff;
        cursor: pointer;
    }
</style>