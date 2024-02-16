<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import mylogo from '$lib/images/mylogo.png';
</script>

<header>
	<nav class="navbar navbar-expand-lg my-mob-nav" style="background-color:#000000">
		<div class="container-fluid">
		  <button class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="toggler-icon top-bar"></span>
			<span class="toggler-icon middle-bar"></span>
			<span class="toggler-icon bottom-bar"></span>
		  </button>
		  <a class="navbar-brand" href="/">
			<img src={mylogo} alt="Logo" width="60" height="me-auto" class="d-inline-block align-text-center">
		  </a>
		  <a href="/cart"><i class="fas fa-shopping-cart fa-2x shopping-cart"></i>
		  </a>
		  <div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a class="nav-link active nav-link-color" href="/">Home</a>
				</li>
				<li class="nav-item" aria-current={$page.url.pathname === '/allProducts' ? 'page' : undefined}>
					<a class="nav-link active nav-link-color" href="/allProducts">All Products</a>
				</li>
				<li class="nav-item" aria-current={$page.url.pathname.startsWith('/admin') ? 'page' : undefined}>
					<a class="nav-link active nav-link-color" href="/admin">Add Products</a>
				</li>
				<li class="nav-item" aria-current={$page.url.pathname.startsWith('/editDelete') ? 'page' : undefined}>
					<a class="nav-link active nav-link-color" href="/editDelete">Edit & Delete</a>
				</li>
			</ul>
		  </div>
		</div>
	  </nav>
	  
	  
	  <nav class="navbar navbar-expand-lg my-desk-nav" style="background-color:#000000">
		<div class="container-fluid my-desk-nav-items">
			<a class="text-decoration-none my-main-title" href="/">
			<img src={mylogo} alt="Logo" width="60" height="me-auto" class="d-inline-block align-text-center">
			</a>
			<button class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="toggler-icon top-bar"></span>
			<span class="toggler-icon middle-bar"></span>
			<span class="toggler-icon bottom-bar"></span>
			</button>
			<div class='collapse navbar-collapse' id='navbarNav'>
			<ul class='navbar-nav ms-auto'>
				<li class="nav-item nav-item-hover" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a class="nav-link active nav-link-color" href="/">Home</a>
				</li>
				<li class="nav-item nav-item-hover" aria-current={$page.url.pathname === '/allProducts' ? 'page' : undefined}>
					<a class="nav-link active nav-link-color" href="/allProducts">All Products</a>
				</li>
				<li class="nav-item nav-item-hover" aria-current={$page.url.pathname.startsWith('/admin') ? 'page' : undefined}>
					<a class="nav-link active nav-link-color" href="/admin">Add Products</a>
				</li>
				<li class="nav-item nav-item-hover" aria-current={$page.url.pathname.startsWith('/editDelete') ? 'page' : undefined}>
					<a class="nav-link active nav-link-color" href="/editDelete">Edit & Delete</a>
				</li>
			</ul>
			</div>
			<a href="/cart"><i class="fas fa-shopping-cart fa-2x shopping-cart"></i></a>
		</div>
		</nav>
</header>

<style>
	body{
    overflow-x: hidden;
	}

	:root{
    --main-color: #000000;
    --purple-medium: #C0BCD3;
    --sec-color: #000;
    --ter-color: #FFF1D9;
    --fourth-color: #FFFCF7;
    --white-color: #fff;
    --black-color: #000;
    --grey-color: #7C7C7C;
	--hover-color: #E74151;
	}

	nav {
		/* box-shadow: #C0BCD3; */
		box-shadow: 0px 3px 9px 0px rgba(231, 65, 81, 1);
	}
	.my-desk-nav {
		display:none;
	}
	.my-desk-nav-items {
		max-width: 1500px;
		margin: 0 auto;
	}
	.nav-link-color {
		color: var(--white-color);
	}
	.nav-link-color:hover {
		color: var(--hover-color);
	}
	.nav-item-hover:hover {
		color: var(--hover-color);
		transition: background-color .3s ease-in-out;
		border-radius: 10px;
	}

	@media screen and (min-width: 992px) {
		.my-desk-nav {
			display: block;
		}
		.my-mob-nav {
			display: none;
		}
	}

	.navbar-toggler {
		width: 30px;
		height: 20px;
		position: relative;
		transition: .5s ease-in-out;
	}

	.navbar-toggler, 
	.navbar-toggler:focus,
	.navbar-toggler:active,
	.navbar-toggler-icon:focus {
		outline: none;
		border: none;
		box-shadow: none;
	}

	.navbar-toggle span {
		margin: 0;
		padding: 0;
	}

	.toggler-icon {
		display: block;
		position: absolute;
		width: 100%;
		height: 3px;
		background-color: var(--white-color);
		border-radius: 1px;
		opacity: 1;
		left: 0;
		transform: rotate(0deg);
		transition: .25s ease-in-out;
	}

	.middle-bar {
		margin-top: 0px;
	}

	.navbar-toggler .top-bar {
		margin-top: 0;
		transform: rotate(135deg);
	}

	.navbar-toggler .middle-bar {
		opacity: 0;
	}

	.navbar-toggler .bottom-bar {
		margin-top: 0;
		transform: rotate(-135deg);
	}

	.navbar-toggler.collapsed .top-bar {
		margin-top: -20px;
		transform: rotate(0deg);
	}

	.navbar-toggler.collapsed .middle-bar {
		margin-top: 0;
		opacity: 1;
	}

	.navbar-toggler.collapsed .bottom-bar {
		margin-top: 20px;
		transform: rotate(0deg);
	}
	.shopping-cart {
		position: relative;
		display: inline-block;
		cursor: pointer;
		color: var(--white-color);
	}
	.shopping-cart:hover {
		color: var(--hover-color);
	}
</style>
