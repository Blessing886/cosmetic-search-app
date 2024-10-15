const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResDiv = document.getElementById('search-results')

//eventListener for submission
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const inputProduct = searchInput.value.trim();
    console.log("Input Product:", inputProduct);
    if (inputProduct) {
        searchProducts(inputProduct);
    }
});

//function to search products
function searchProducts(inputProduct) {
    fetch(`${'http://makeup-api.herokuapp.com/api/v1/products.json'}?product_type=${inputProduct}`)
    .then(res => res.json())
    .then(products => {
        searchResDiv.innerHTML = '';
        displayResults(products);
    })
    .catch(error => console.error('error fetching products:', error))
}
//display results
function displayResults(products) {
    if (products.length === 0) {
        searchResDiv.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('search-res');

        const img = document.createElement('img')
        img.src = product.image_link;
        img.alt = product.name;

        const productLink = document.createElement('a');
        productLink.href = '#';
        productLink.textContent = product.name;

        //product-details click eventListener
        productLink.addEventListener('click', () => productDetails(product));

        resultDiv.appendChild(img);
        resultDiv.appendChild(productLink);
        searchResDiv.appendChild(resultDiv);
        });
}

