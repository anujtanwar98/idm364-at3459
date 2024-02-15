<svelte:head>
	<title>Edit & Delete</title>
	<meta name="description" content="All Products" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
    import { db } from '../../firebase.js';

    let products = [];
	let deleteMessage = '';

    onMount(async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
	async function deleteProduct(productId) {
		await deleteDoc(doc(db, "products", productId));
		// Refresh the products list after deletion
		const querySnapshot = await getDocs(collection(db, "products"));
		products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

		deleteMessage = 'Product deleted successfully';
    
		// Optionally, clear the message after a few seconds
		setTimeout(() => deleteMessage = '', 3000);
	}
</script>

{#if deleteMessage !== ''}
    <p class="delete_message">{deleteMessage}</p>
{/if}
{#each products as product}
    <div class="main_box">
        <div class="title_box">
			<h2 class="product_title">{product.name}</h2>
		</div>
		<div class="image_box">
			<img class="product_image" src={product.productImage1} alt={product.name} />
		</div>
        <div>
			<a class="edit_link" href={`/editDetail?id=${product.id}`}>
				<p>edit</p>
			</a>
			<button class="delete_link" on:click={() => deleteProduct(product.id)}>
                Delete
            </button>
		</div>
    </div>
{/each}

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
	.image_box {
		width: 100px;
		height: 100px;
		overflow: hidden;
		object-fit: contain;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.product_image {
		width: 100%;
		height: 100%;
		max-width: 40px;
		object-fit: contain;
	}
</style>
