<svelte:head>
	<title>404 Error</title>
	<meta name="description" content="error page" />
</svelte:head>
<script>
    import GLTFModel from './ThreedError.svelte';
</script>
<div class="errorTitle">
   <h1>
        Error! This page doesn't exist...
   </h1>
</div>
<div class="explore_products">
    <a class="explore_products_link" href="/allProducts">
        <button class="explore_products_button">Explore Products</button>
    </a>
</div>

<div class="errorModel">
    <GLTFModel />
</div>

<style>
    .errorTitle {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .errorSubTitle {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .errorModel {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .explore_products {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .explore_products_link {
        text-decoration: none;
    }
    .explore_products_button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #E74151;
        color: #ffffff;
        cursor: pointer;
    }
    .explore_products_button:hover {
        background-color: #7c7c7c;
        color: #000000;
    }
    .explore_products_button {
        transition: background-color 0.5s ease;
    }
</style>
