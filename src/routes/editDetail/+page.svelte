<svelte:head>
    <title>Edit {product.name} Details</title>
    <meta name="description" content="Edit Product Details" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { doc, getDoc, updateDoc } from 'firebase/firestore';
    import { db } from '../../firebase.js';

    let product = {
        name: '',
        price: '',
        variants: []
    };
    let productId;

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const sanitizeText = (text) => text.trim().replace(/<\/?[^>]+(>|$)/g, "");

    const sanitizePrice = (price) => parseFloat(price) || 0;

    const sanitizeImageUrl = (url) => isValidUrl(url) ? url : '';

    onMount(async () => {
        const useParams = new URLSearchParams(window.location.search);
        productId = useParams.get('id');

        if (productId) {
            const productRef = doc(db, 'devices', productId);
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

        product.name = sanitizeText(product.name);
        product.price = sanitizePrice(product.price);
        product.variants = product.variants.map(variant => ({
            color: sanitizeText(variant.color),
            imageUrls: variant.imageUrls.map(sanitizeImageUrl)
        }));

        const productRef = doc(db, 'devices', productId);

        await updateDoc(productRef, { ...product });

        window.location.href = '/editDelete'; // Redirect after update
    }

    function addVariant() {
        product.variants = [
            ...product.variants,
            { color: '', imageUrls: ['', '', ''] }
        ];
    }


    function removeVariant(index) {
        product.variants = product.variants.filter((_, i) => i !== index);
    }
</script>

<h1 class="Add_title">Edit Product Details</h1>

<!-- <form on:submit={updateProduct}>
    <label for="name">Name:</label>
    <input type="text" bind:value={product.name} placeholder="Product Name" required />

    <label for="price">Price:</label>
    <input type="number" bind:value={product.price} placeholder="Price only numbers" required />

    {#each product.variants as variant, index} -->

        <!-- <div class="variant"> -->

            <!-- <label for={`color-${index}`}>Color {index + 1}:</label>
            <input type="text" bind:value={variant.color} placeholder="Color" required />

            {#each variant.imageUrls as imageUrl, i}
                <label for={`imageUrl-${index}-${i}`}>Image URL {i + 1}:</label>
                <input type="text" bind:value={variant.imageUrls[i]} placeholder="Image URL" required />
            {/each}

            <button class="remove_variant_button" type="button" on:click={() => removeVariant(index)}>Remove Variant</button> -->

        <!-- </div> -->

    <!-- {/each}

    <button class="add_variant_button" type="button" on:click={addVariant}>Add Variant</button>
    <button type="submit">Save Changes</button>
</form> -->

<h2 class="hiddenTitle">
    Access hidden for security reasons
</h2>

<a class="back_button" href="/editDelete">
    <p class="back_button_text">Back to products list</p>
</a>

<style>
    :global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
		color: #ffffff;
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
        max-width: 400px;
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
