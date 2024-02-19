<script>
    import { onMount } from 'svelte';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from '../../firebase.js';

    let allProducts = [];
    let filteredProducts = [];
    let searchQuery = '';

    onMount(async () => {
        const querySnapshot = await getDocs(collection(db, "devices"));
        allProducts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const firstImageUrl = data.variants && data.variants.length > 0 && data.variants[0].imageUrls.length > 0
                ? data.variants[0].imageUrls[0]
                : '';
            return { id: doc.id, ...data, firstImageUrl };
        });
    });
    function handleSearch() {
        if (!searchQuery.trim()) {
            filteredProducts = [];
            return;
        }
        filteredProducts = allProducts.filter(product => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }
</script>

<section>
    <h1 class="search_items_title">Search items</h1>
    <form class="d-flex" role="search" on:submit|preventDefault={handleSearch}>
        <input bind:value={searchQuery} class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn my_search_button" type="submit">Search</button>
    </form>
    <div class="search-results">
        {#each filteredProducts as product}
        <a class="product-link" href="/productCard?id={product.id}">
            <div class="search_results_image">
                <img src={product.firstImageUrl} alt={product.name} />
            </div>
            <div class="search_results_name">
                <p>{product.name}</p>
            </div>
        </a>
        {/each}
    </div>
</section>

<style>
    :global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
		color: #ffffff;
	}
    .search_items_title {
        font-size: 1.25rem;
        margin-bottom: 20px;
    }
    form {
        max-width: 500px;
    }
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
    .product-link {
        display: flex;
        padding: 10px;
        margin-bottom: 10px;
        text-decoration: none;
        color: #ffffff;
        align-items: center;
        max-width: 500px;
    }
    .product-link:hover {
        color: #E74151;
    }
    .my_search_button {
		background-color: var(--hover-color);
		border: none;
		color: var(--white-color);
	}
	.my_search_button:hover {
		background-color: var(--hover-color);
		color: var(--black-color);
	}
    .search-results {
        display: flex;
        flex-direction: column;
    }
    .search_results_image {
        width: 60px;
        height: 60px;
        overflow: hidden;
        margin-right: 10px;
    }
    .search_results_image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .search_results_name {
        flex: 1;
    }
    .search_results_name p {
        margin: 0;
    }
</style>
