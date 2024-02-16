<svelte:head>
    <title>Edit & Delete</title>
    <meta name="description" content="All Products" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
    import { db } from '../../firebase.js';

    let products = [];
    let deleteMessage = '';
    // let editProduct = null; // The product being edited

    onMount(async () => {
        await fetchProducts();
    });

    async function fetchProducts() {
        const querySnapshot = await getDocs(collection(db, "devices"));
        products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async function deleteProduct(productId) {
        await deleteDoc(doc(db, "devices", productId));
        await fetchProducts(); // Refresh the products list
        deleteMessage = 'Product deleted successfully';
        setTimeout(() => deleteMessage = '', 3000);
    }
	function formatPrice(price) {
        const numericPrice = parseInt(price, 10);
        let formattedPrice = numericPrice.toString();
        formattedPrice = formattedPrice.slice(0, -2) + "." + formattedPrice.slice(-2);
        return `$${formattedPrice}`;
    }

    // function startEditing(product) {
    //     editProduct = { ...product }; // Clone the product for editing
    // }

    // async function saveChanges() {
    //     const productRef = doc(db, "products", editProduct.id);
    //     await updateDoc(productRef, {
    //         ...editProduct // Update all product fields
    //     });
    //     await fetchProducts(); // Refresh the products list
    //     editProduct = null; // Clear the editing state
    // }

    // function cancelEditing() {
    //     editProduct = null; // Exit editing mode
    // }
</script>

{#if deleteMessage}
    <p class="message">{deleteMessage}</p>
{/if}

<div class="products">
    {#each products as product}
		<div class="main_box">
        <!-- <div class="product"> -->
            <!-- <h2>{product.name} - ${product.price}</h2> -->
			<div class="title_box">
				<h2 class="product_title">{product.name}</h2>
			</div>
			<div class="price_box">
				<h2 class="product_price">{formatPrice(product.price)}</h2>
			</div>
            <div>
				<a class="edit_link" href={`/editDetail?id=${product.id}`}>
                <!-- <button on:click={() => startEditing(product)}>Edit</button> -->
				<p>Edit</p>	
				</a>
                <button class="delete_link" on:click={() => deleteProduct(product.id)}>Delete</button>
            </div>
            <!-- {#if editProduct && editProduct.id === product.id}
                <form on:submit|preventDefault={saveChanges}>
                    <input type="text" bind:value={editProduct.name} />
                    <input type="number" bind:value={editProduct.price} />
                    <button type="submit">Save Changes</button>
                    <button type="button" on:click={cancelEditing}>Cancel</button>
                </form>
            {/if} -->
        </div>
    {/each}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
		color: #ffffff;
		font-family: Arial, sans-serif;
	}
	.main_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		margin: 10px;
		border: 1px solid #E74151;
		border-radius: 20px;
		margin: 20px;
		padding: 20px;
		background-color: #212529;
	}
	.product_title {
		margin: 0;
		font-size: 1.25rem;
		max-width: 100px;
	}
	.edit_link {
		text-decoration: none;
	}
	.edit_link p {
		padding: 5px 10px;
		color: #fff;
		border: none;
		cursor: pointer;
	}
	.edit_link p:hover {
		color: #E74151;
	}
	.delete_link {
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		background-color: #E74151;
		color: #fff;
		cursor: pointer;
	}
	.delete_link:hover {
		background-color: #ff001e;
		color: #000;
	}
	.delete_message {
		color: green;
		text-align: center;
		margin-top: 10px;
	}
	.price_box {
		width: 200px;
		/* height: 200px; */
		overflow: hidden;
		object-fit: contain;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.product_price {
		margin: 0;
		font-size: 1.25rem;
		max-width: 100px;
	}
</style>
