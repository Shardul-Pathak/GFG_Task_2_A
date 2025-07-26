const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');
const cardsContainer = document.getElementById('cardsContainer');
const products = document.getElementById('products');

let scrollAmount = 300;
const updateScrollAmount = () => {
    const firstCard = products.querySelector('.flex-none');
        if (firstCard) {
            const cardStyle = window.getComputedStyle(firstCard);
            const cardWidth = firstCard.offsetWidth;
            const marginLeft = parseFloat(cardStyle.marginLeft);
            const marginRight = parseFloat(cardStyle.marginRight);
            scrollAmount = cardWidth + marginLeft + marginRight;
        }
};

async function getProduct() {
    const response=await fetch('/api/products');
    products.innerHTML = '';
    const product= await response.json();
    product.forEach(item => {
        const cardHtml = `
                <div class="m-4 flex-none w-72 flex-shrink-0 bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <img src="${item.imageURL}" alt="${item.productName}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg text-white font-bold mb-2">${item.productName}</h3>
                        <p class=" text-white text-m">${item.description}</p>
                        <button class="text-black bg-blue-300 text-sm rounded-3xl p-1 mt-2">Price: $${item.price}</button>
                    </div>
                 </div>
            `;
            products.insertAdjacentHTML('beforeend', cardHtml);
        });
    updateScrollAmount();
}

window.addEventListener('load', () => {
    generateCards();
    updateScrollAmount();
});
window.addEventListener('resize', updateScrollAmount);

scrollLeftBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});
scrollRightBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});
