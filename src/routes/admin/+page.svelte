<svelte:head>
	<title>Admin</title>
	<meta name="description" content="Admin" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { collection, addDoc } from 'firebase/firestore';
    import { db } from '../../firebase.js'

    let name, price;
    let variants = [];
    let submissionMessage = '';

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

    const addVariant = () => {
        variants = [...variants, {
            color: '',
            imageUrls: ['', '', '']
        }];
    };

    const removeVariant = (index) => {
        variants = variants.filter((_, i) => i !== index);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const sanitizedPrice = sanitizePrice(price);
        const sanitizedProductName = sanitizeText(name);
        const sanitizedVariants = variants.map(variant => ({
            color: sanitizeText(variant.color),
            imageUrls: variant.imageUrls.map(url => sanitizeImageUrl(url)).filter(url => url !== '')
        }));

        await addDoc(collection(db, "devices"), {
            name: sanitizedProductName,
            price: sanitizedPrice,
            variants: sanitizedVariants,
        });

        submissionMessage = "Product added successfully!";

        name = '';
        price = '';
        variants = [];

        setTimeout(() => {
            submissionMessage = '';
        }, 3000);
    }

    onMount(() => {
        addVariant();
    });
</script>


<h1 class="Add_title">Add Products</h1>
<!-- <form on:submit={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" bind:value={name} placeholder="Product Name" required />

    <label for="price">Price:</label>
    <input type="number" bind:value={price} placeholder="Price only numbers" required />

    {#each variants as variant, index}
            <h2>Variant {index + 1}</h2>
            <label for={`color-${index}`}>Color:</label>
            <input type="text" bind:value={variant.color} placeholder="Color" required />

            <label for={`imageUrl1-${index}`}>Image URL 1:</label>
            <input type="text" bind:value={variant.imageUrls[0]} placeholder="Image URL 1" required />

            <label for={`imageUrl2-${index}`}>Image URL 2:</label>
            <input type="text" bind:value={variant.imageUrls[1]} placeholder="Image URL 2" required />

            <label for={`imageUrl3-${index}`}>Image URL 3:</label>
            <input type="text" bind:value={variant.imageUrls[2]} placeholder="Image URL 3" required />

            {#if variants.length > 1}
                <button class="remove_variant_button" type="button" on:click={() => removeVariant(index)}>Remove Variant</button>
            {/if}
    {/each}

    <button class="add_variant_button" type="button" on:click={addVariant}>Add Another Variant</button>
    <button type="submit">Add Product</button>

    {#if submissionMessage}
        <p>{submissionMessage}</p>
    {/if}
</form> -->
<h2 class="hiddenTitle">
    Access hidden for security reasons
</h2>


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
    .remove_variant_button {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background-color: #5b5b5b;
        color: #fff;
        cursor: pointer;
    }
    .add_variant_button {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background-color: #ffffff;
        color: #E74151;
        cursor: pointer;
    }
    .hiddenTitle {
        font-size: 1.5rem;
        text-align: center;
    }
</style>
