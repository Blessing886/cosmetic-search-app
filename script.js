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
function searchProducts(query) {
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${query}`)
    .then(res => res.json())
    .then(products => {
        console.log("API Response:", products);
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
        productLink.addEventListener('click', () => showProductDetails(product));

        resultDiv.appendChild(img);
        resultDiv.appendChild(productLink);
        searchResDiv.appendChild(resultDiv);
        });
}

//show product details
function showProductDetails(product) {
    const productDetDiv = document.getElementById('product-detail');
    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');
    const ingredientList = document.getElementById('ingredient-list');

    productName.textContent = product.name;
    productDescription.textContent = product.description;

    ingredientList.innerHTML = '';//clear list
    if (product.product_colors && product.product_colors.length > 0) {
        product.product_colors.forEach(color => {
            const li = document.createElement('li');
            li.textContent = color.colour_name;
            ingredientList.appendChild(li);
        });
    }
    productDetDiv.style.display = 'block';
}