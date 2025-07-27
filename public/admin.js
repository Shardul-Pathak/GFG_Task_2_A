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
                <article class="w-64 flex-shrink-0 bg-gray-700 bg-opacity-70 p-4 rounded-xl shadow-md">
                    <img src="${item.imageURL}" alt="${item.productName}" class="w-full h-auto rounded-lg mb-3 min-h-40">
                    <h3 class="text-lg font-semibold text-gray-100 mb-1">${item.productName}</h3>
                    <p class="text-sm text-gray-300 mb-2">${item.description}</p>
                    <p class="text-base font-bold text-[#4CAF50]">Price: ₹${item.price}</p>
                </article>
            `;
            products.insertAdjacentHTML('beforeend', cardHtml);
        });
    updateScrollAmount();
}

window.addEventListener('load', () => {
    getProduct();
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
