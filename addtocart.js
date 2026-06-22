const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
    ...scrollRevealOption,
    origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
    ...scrollRevealOption,
    delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
    ...scrollRevealOption,
    delay: 1000,
});

ScrollReveal().reveal(".order__card", {
    ...scrollRevealOption,
    interval: 500,
});

ScrollReveal().reveal(".event__content", {
    duration: 1000,
});

function goToCart() {
    window.location.href = "addtocart.html"
}

const products = [
    { "id": 1, "name": "Mighty Zinger", "price": 800, "image": "order1.png" },
    { "id": 2, "name": "Family Meal", "price": 3000, "image": "order2.png" },
    { "id": 3, "name": "Kentucky Burger", "price": 800, "image": "order3.png" },
    { "id": 4, "name": "3 Pc Chicken", "price": 500, "image": "order4.png" },
    { "id": 5, "name": "Chicken and Chips", "price": 800, "image": "order5.png" },
    { "id": 6, "name": "Twister", "price": 800, "image": "order6.png" },
    { "id": 7, "name": "Malai Tikka", "price": 800, "image": "order7.png" },
    { "id": 8, "name": "Chicken Tikka", "price": 800, "image": "order8.png" },
    { "id": 9, "name": "Chicken Botti", "price": 850, "image": "order9.png" },
    { "id": 10, "name": "Malai Boti", "price": 900, "image": "order10.png" },
    { "id": 11, "name": "Chicken Reshmi Kabab", "price": 900, "image": "order11.png" },
    { "id": 12, "name": "BBQ Spicy Chargha", "price": 800, "image": "order12.png" },
    { "id": 13, "name": "Grilled Fish Fillet", "price": 900, "image": "order13.png" },
    { "id": 14, "name": "Fried Finger Fish", "price": 800, "image": "order14.png" },
    { "id": 15, "name": "Fried Fish and Chips", "price": 800, "image": "order15.png" },
    { "id": 16, "name": "Chicken Handi", "price": 1000, "image": "order16.png" },
    { "id": 17, "name": "Makhni Handi", "price": 1000, "image": "order17.png" },
    { "id": 18, "name": "Fish Handi", "price": 1000, "image": "order18.png" },
    { "id": 19, "name": "Chicken Chatni Roll", "price": 350, "image": "order19.png" },
    { "id": 20, "name": "Chicken Garlic Mayo Roll", "price": 300, "image": "order20.png" },
    { "id": 21, "name": "Malai Boti Roll", "price": 300, "image": "order21.png" },
    { "id": 22, "name": "Puri Paratha", "price": 200, "image": "order22.png" },
    { "id": 23, "name": "Garlic Naan", "price": 200, "image": "order23.png" },
    { "id": 24, "name": "Naan", "price": 100, "image": "order24.png" },
    { "id": 25, "name": "Water (Large)", "price": 300, "image": "order25.png" },
    { "id": 26, "name": "Cold Drink", "price": 200, "image": "order26.png" },
    { "id": 27, "name": "Water (Small)", "price": 100, "image": "order27.png" }
];


let cart = JSON.parse(localStorage.getItem("cart")) || Array(products.length).fill(0);

function addItem(id) {
    cart[id - 1]++;
    localStorage.setItem("cart", JSON.stringify(cart));
    display();
    updateFloatingCart();
}


function removeItem(id) {
    cart[id - 1]--;
    localStorage.setItem("carts", JSON.stringify(cart));
    display();
    updateFloatingCart();
}


function deleteItem(id) {
    cart[id - 1] = 0;
    display()
    saveAndDisplay();
}

function saveAndDisplay() {
    localStorage.setItem("cart", JSON.stringify(cart));
    display();
}

function goToCart() {
    window.location.href = "addtocart.html";
}

function goToPage() {
    window.location.href = "restaurant2.html";
}
function goToCheckout() {
    window.location.href = "checkout.html";
}


function display() {
    const cartDisplay = document.getElementById("cartDisplay");
    if (!cartDisplay) return;

    let html = "";
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i] > 0) {
            const product = products[i];
            const subtotal = product.price * cart[i];
            total += subtotal;
            html += `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" />
                    <div>
                        <p>${product.name} (x${cart[i]}) - Rs. ${subtotal}</p>
                        <div class="cart-buttons">
                            <button onclick="addItem(${product.id})">+</button>
                            <button onclick="removeItem(${product.id})">-</button>
                            <button onclick="deleteItem(${product.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    if (html === "") html = "<p>Your cart is empty.</p>";

    html += `<div class="cart-total">Total: Rs. ${total}</div>`;
    cartDisplay.innerHTML = html;
}

const page = window.location.pathname.split("/").pop();
if (page === "addtocart.html") {
    display();
}

function updateFloatingCart() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += products[i].price * cart[i];
    }

    const btn = document.getElementById("floatingCartBtn");
    if (btn) {
        btn.innerText = `Cart: Rs. ${total}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    display();
    updateFloatingCart();
});
