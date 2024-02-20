<svelte:head>
	<title>Cart</title>
	<meta name="description" content="Carts" />
</svelte:head>

<script>
	import { derived } from 'svelte/store';
    import { cart } from '../stores/cartStore.js';

    function formatPrice(price) {
        const numericPrice = parseInt(price, 10);
        let formattedPrice = numericPrice.toString();
        formattedPrice = formattedPrice.slice(0, -2) + "." + formattedPrice.slice(-2);
        return `$${formattedPrice}`;
    }
    function removeFromCart(itemId, itemColor) {
        cart.update(items => {
            return items.filter(item => !(item.id === itemId && item.color === itemColor));
        });
    }

    const total = derived(cart, $cart => {
        return $cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    });

    const tax = derived(total, $total => $total * 0.10);

    const finalAmount = derived([total, tax], ([$total, $tax]) => $total + $tax);

    function updateQuantity(itemId, itemColor, newQuantity) {
        cart.update(items => {
            return items.map(item => {
                if (item.id === itemId && item.color === itemColor) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    }

</script>

{#if $cart.length === 0}
    <div class="no_items_message">
        <h1>Your cart is empty</h1>
    </div>
    <div class="explore_products">
        <a class="explore_products_link" href="/allProducts">
            <button class="explore_products_button">Explore Products</button>
        </a>
    </div>
{:else}
{#each $cart as item (`${item.id}-${item.color}`)}
<div class="main_wrapper">
    <div class="main_image_box">
        <img src={item.imageUrl} alt="Main Display Image" />
    </div>
    <div class="other_info_box">
        <div class="main_title">
            <h2>{item.name}</h2>
        </div>
        <div class="main_price">
            <!-- <p>{formatPrice(item.price)}</p> -->
            <!-- <p>{item.quantity} x {formatPrice(item.price)}</p> -->
            <p>
                <select class="quantity_select" on:change="{(e) => updateQuantity(item.id, item.color, parseInt(e.target.value, 10))}">
                    {#each Array(10).fill().map((_, i) => i + 1) as quantity}
                        <option value="{quantity}" selected={quantity === item.quantity}>{quantity}</option>
                    {/each}
                </select>
                 x {formatPrice(item.price)}
            </p>
        </div>
        <div class="main_color">
            <p>Color: {item.color}</p>
        </div>
        <!-- <div class="main_quantity">
            <p>Quantity: 1</p>
        </div> -->
        <div class="remove_button">
            <button on:click={() => removeFromCart(item.id, item.color)}>X</button>
        </div>
        <!-- <div class="main_quantity">
            <select on:change="{(e) => updateQuantity(item.id, item.color, parseInt(e.target.value, 10))}">
                {#each Array(10).fill().map((_, i) => i + 1) as quantity}
                    <option value="{quantity}" selected={quantity === item.quantity}>{quantity}</option>
                {/each}
            </select>
        </div> -->
    </div>
</div>
{/each}
<div class="total_section">
    <div class="subtotal">
        <p>Subtotal: {$total ? formatPrice($total) : '$0.00'}</p>
    </div>
    <div class="tax">
        <p>Tax (10%): {$tax ? formatPrice($tax) : '$0.00'}</p>
    </div>
    <div class="final_amount">
        <p>Total: {$finalAmount ? formatPrice($finalAmount) : '$0.00'}</p>
    </div>
</div>
{/if}


<style>
    :global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
		color: #ffffff;
	}
    .main_wrapper {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 20px;
        padding: 20px;
        max-width: 1000px;
        margin: 0 auto;
        width: 100%;
        background-color: rgb(57, 57, 57);
        margin-top: 20px;
        border-radius: 20px;
    }
    .main_image_box {
        width: 50%;
        height: 200px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-color: #ffffff; */
    }
    .main_image_box img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        margin-right: auto;
        margin-left: auto;
        max-height: 100%;
        max-width: 100%;
    }
    .other_info_box {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 50%;
    }
    .main_title {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main_title h2 {
        font-size: 1rem;
    }
    .main_price {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main_color {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main_quantity {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* .remove_button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    } */
    .remove_button {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .remove_button button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #ff4747;
        color: #ffffff;
        cursor: pointer;
    }
    .remove_button button:hover {
        background-color: #ff0000;
        color: #000000;
    }
    .total_section {
        padding: 20px;
        max-width: 300px;
        margin: 20px auto;
        background-color: rgb(77, 77, 77);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ffffff;
    }
    .no_items_message {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        /* height: 100vh; */
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
    .quantity_select {
        -webkit-appearance: menulist;
        -moz-appearance: menulist;
        appearance: menulist;
        background-color: transparent;
        border: none;
        color: inherit;
        font-size: inherit;
        padding: 5px;
        margin-right: 5px;
        /* font-size: 1rem; */
        height: auto;
    }
    .quantity_select:focus {
        outline: none;
    }
</style>
