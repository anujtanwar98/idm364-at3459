<h1>hello</h1>
<div class="container">
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Pixel 8 Rose2</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Buy</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Pixel 8 Rose2</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Buy</a>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://res.cloudinary.com/dr8jiwn4u/image/upload/v1705343309/svelte%20app/pixel-8-Rose2_iiigrb.png" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Pixel 8 Rose2</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Buy</a>
        </div>
    </div>
</div>

<style>
    .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin: 0 auto;
    padding: 20px;
    max-width: 1000px;
    }
    .card {
    width: 18rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin: 20px 20px;
}

.card-img-top {
    width: 100%;
    height: auto;
    display: block;
    max-width: 100px;
    margin: 0 auto;
    padding: 10px;
}

.card-body {
    padding: 1px 0 0 15px;
    background-color: #ff89
}

.card-title {
    margin-bottom: 10px;
    font-size: 1.25rem; /* 20px if base font size is 16px */
    font-weight: bold;
}

.card-text {
    margin-bottom: 15px;
    font-size: 1rem; /* 16px if base font size is 16px */
    color: #333;
}

.btn {
    display: inline-block;
    padding: 10px 15px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 5px 0 10px 0;

}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}

</style>