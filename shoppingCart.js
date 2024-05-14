function addToCart(itemName, price) {
    const cartItems = document.getElementById('cart-items');
    const existingItem = cartItems.querySelector(`[data-name="${itemName}"]`);

    if (existingItem) {
        const qtyElement = existingItem.querySelector('.qty');
        qtyElement.innerText = parseInt(qtyElement.innerText) + 1;
    } else {
        const newItem = document.createElement('div');
        newItem.setAttribute('data-name', itemName);
        newItem.classList.add('cart-item');
        newItem.innerHTML = `${itemName} <span class="qty">1</span> x ${price}원 <button onclick="decreaseQuantity(this)">-</button><button onclick="increaseQuantity(this.parentElement)">+</button>`;
        cartItems.appendChild(newItem);
    }

    updateTotal();
    saveCartItems();
}

function increaseQuantity(itemElement) {
    const qtyElement = itemElement.querySelector('.qty');
    qtyElement.innerText = parseInt(qtyElement.innerText) + 1;
    updateTotal();
    saveCartItems();
}

function decreaseQuantity(buttonElement) {
    const itemElement = buttonElement.parentElement;
    const qtyElement = itemElement.querySelector('.qty');
    let quantity = parseInt(qtyElement.innerText);

    if (quantity > 1) {
        qtyElement.innerText = quantity - 1;
    } else {
        itemElement.remove();
    }

    updateTotal();
    saveCartItems();
}

function updateTotal() {
    const total = Array.from(document.querySelectorAll('#cart-items > div')).reduce((acc, item) => {
        const qty = parseInt(item.querySelector('.qty').innerText, 10);
        const price = parseInt(item.innerText.split(' x ')[1].replace('원', ''), 10);
        return acc + (qty * price);
    }, 0);

    document.getElementById('total-price').innerText = total;
}

function checkout() {
    alert('결제 페이지로 이동합니다.');
    // 결제 페이지로 이동하는 로직을 여기에 구현
    // 예: window.location.href = 'checkout.html';
}

function saveCartItems() {
    const cartItems = document.querySelectorAll('#cart-items .cart-item');
    const items = Array.from(cartItems).map(item => {
        return {
            name: item.getAttribute('data-name'),
            quantity: parseInt(item.querySelector('.qty').innerText),
            price: parseInt(item.innerText.split(' x ')[1].replace('원', ''))
        };
    });
    localStorage.setItem('cart', JSON.stringify(items));
}

function loadCartItems() {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
        const cartItems = document.getElementById('cart-items');
        items.forEach(item => {
            const newItem = document.createElement('div');
            newItem.setAttribute('data-name', item.name);
            newItem.classList.add('cart-item');
            newItem.innerHTML = `${item.name} <span class="qty">${item.quantity}</span> x ${item.price}원 <button onclick="decreaseQuantity(this)">-</button><button onclick="increaseQuantity(this.parentElement)">+</button>`;
            cartItems.appendChild(newItem);
        });
        updateTotal();
    }
}

function clearCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    updateTotal();
    localStorage.removeItem('cart');
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    document.getElementById('clear-cart').addEventListener('click', clearCart);
});
