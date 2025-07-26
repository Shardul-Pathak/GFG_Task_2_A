const products = document.getElementById('products');

async function getProduct() {
    const response=await fetch('/api/products');
    products.innerHTML = '';
    const product= await response.json();
    product.forEach(item => {
        console.log(item);
        updateList(item);
    });
}

function updateList(item) {
    products.innerHTML += `
        <img src="${item.imageURL}" alt="${item.productName}" class="w-16 h-16 rounded-lg">
        <div>
            <h2 class="text-lg font-semibold">${item.productName}</h2>
            <p class="text-gray-600">${item.description}</p>
            <p class="text-green-600 font-bold">$${item.price}</p>
        </div>
    `;
}