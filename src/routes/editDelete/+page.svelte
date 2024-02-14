<svelte:head>
	<title>Edit & Delete</title>
	<meta name="description" content="All Products" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from '../../firebase.js';

    let products = [];

    onMount(async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
</script>

{#each products as product}
    <div class="main_box">
        <div class="title_box">
			<h2 class="product_title">{product.name}</h2>
		</div>
        <div>
			<a class="edit_link" href={`/editDetail?id=${product.id}`}>
				<p>edit</p>
			</a>
		</div>
    </div>
{/each}

<style>
	.main_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		margin: 10px;
		border: 1px solid #000;
	}
	.product_title {
		margin: 0;
		font-size: 1.25rem;
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
		text-decoration: none;
	}
	.delete_link button {
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		background-color: #E74151;
		color: #fff;
		cursor: pointer;
	}
	.delete_link button:hover {
		background-color: #ff2d46;
		color: #000;
	}
</style>
