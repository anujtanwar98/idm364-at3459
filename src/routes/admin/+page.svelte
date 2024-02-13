<svelte:head>
	<title>Admin</title>
	<meta name="description" content="Admin" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { collection, addDoc } from 'firebase/firestore';
    import db from '../../firebase.js'
    let name, price, productImage1, productImage2, productImage3;
     const handleSubmit = async e => {
        e.preventDefault();
        const priceAsString = price.toString();
        await addDoc(collection(db, "products"), {
            name,
            // price,
            price: priceAsString,
            productImage1,
            productImage2,
            productImage3,
            Id: crypto.randomUUID()
        });
    }
</script>
<form on:submit={handleSubmit}>
    <!-- <input type="text"  bind:value={input} placeholder="Product Name" /> -->
    <input type="text" bind:value={name} placeholder="Product Name" />
    <input type="number" bind:value={price} placeholder="Price" />
    <input type="text" bind:value={productImage1} placeholder="Product Image 1 URL" />
    <input type="text" bind:value={productImage2} placeholder="Product Image 2 URL" />
    <input type="text" bind:value={productImage3} placeholder="Product Image 3 URL" />
    <button type="submit">Add Product</button>
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