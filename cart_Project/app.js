let cart = [];
const storedCart = localStorage.getItem("cart");
if(storedCart){
    cart = JSON.parse(storedCart)
}


let products = [{
    id: 1,
    name: "mobile",
    price: 1200
},
{
    id: 2,
    name: "laptop",
    price: 5200
},
{
    id: 3,
    name: "tv",
    price: 5000
},
]
const productsDiv = document.getElementById('products')
const cartDiv = document.getElementById('cart')
const totalSpan = document.getElementById('total')

function renderProducts () {
    productsDiv.innerHTML = '';

    products.forEach((p) => {
        const div = document.createElement('div');
        div.innerHTML = `${p.name} - ${p.price}
        <button onclick="addToCart(${p.id})"> add </button>`
        productsDiv.appendChild(div)
    })
}

function renderCart () {
    cartDiv.innerHTML = '';

    cart.forEach((p) => {
        const div = document.createElement('div');
        div.innerHTML = `${p.name} - ${p.price}
        <button onclick="addToCart(${p.id})"> + </button>
        <span>${p.quantity}</span>
        <button onclick="decreaseQuantity(${p.id})"> - </button>
        <button onclick="removeFromCart(${p.id})"> ❌ </button>`
        cartDiv.appendChild(div)
    })
    totalSpan.innerText = getCartTotal()
}

renderProducts();
updateCart();

function updateCart () {
    renderCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}





function addToCart(itemId) {
    const cartItem = cart.find(i => i.id === itemId);

    if (cartItem) {
        cartItem.quantity += 1
    } else {
        const item = products.find(i => i.id === itemId);
        if (!item) return;
        cart.push({ ...item, quantity: 1 })
    }
    updateCart();
}

function decreaseQuantity(itemId) {
    let item = cart.find(i => i.id === itemId);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(i => i.id !== itemId)
    }
    updateCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCart();
}

function getCartTotal() {

    //     function getCartTotal() {
    //     return cart.reduce((total, item) => {
    //         return total + (item.price * item.quantity);
    //     }, 0);
    // }

    let total = 0
    cart.forEach((i) => {
        total = total + (i.price * i.quantity)
    })
    return total;
}

