// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 1999,
        description: "High-quality wireless headphones with noise cancellation",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 1899,
        description: "Track your fitness goals with this advanced smartwatch",
        image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 3,
        name: "Casual Cotton T-Shirt",
        category: "fashion",
        price: 1299,
        description: "Comfortable and stylish cotton t-shirt for everyday wear",
        image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 4,
        name: "Designer Handbag",
        category: "fashion",
        price: 4199,
        description: "Elegant designer handbag perfect for any occasion",
        image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 5,
        name: "Coffee Maker Machine",
        category: "home",
        price: 6399,
        description: "Brew perfect coffee at home with this automatic coffee maker",
        image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 6,
        name: "Indoor Plant Set",
        category: "home",
        price: 2679,
        description: "Beautiful set of indoor plants to brighten your home",
        image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 7,
        name: "Programming Fundamentals",
        category: "books",
        price: 3199,
        description: "Learn the basics of programming with this comprehensive guide",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 8,
        name: "Wireless Mouse",
        category: "electronics",
        price: 1399,
        description: "Ergonomic wireless mouse for comfortable computing",
        image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 9,
        name: "Running Shoes",
        category: "fashion",
        price: 5199,
        description: "Comfortable running shoes for your daily exercise",
        image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 10,
        name: "Desk Lamp",
        category: "home",
        price: 1799,
        description: "Modern LED desk lamp with adjustable brightness",
        image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 11,
        name: "Cookbook Collection",
        category: "books",
        price: 1999,
        description: "Master chef cookbook with 200+ delicious recipes",
        image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 12,
        name: "Portable Speaker",
        category: "electronics",
        price: 2399,
        description: "High-quality portable Bluetooth speaker with bass boost",
        image: "https://images.pexels.com/photos/374720/pexels-photo-374720.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
];

// Shopping cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const subtotal = document.getElementById('subtotal');
const tax = document.getElementById('tax');
const total = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const backToCart = document.getElementById('backToCart');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutItems = document.getElementById('checkoutItems');
const checkoutTotal = document.getElementById('checkoutTotal');
const successModal = document.getElementById('successModal');
const continueShopping = document.getElementById('continueShopping');
const orderId = document.getElementById('orderId');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const clearFilters = document.getElementById('clearFilters');

// Initialize the application
function init() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', openCheckoutModal);
    closeCheckout.addEventListener('click', closeCheckoutModal);
    backToCart.addEventListener('click', () => {
        closeCheckoutModal();
        toggleCart();
    });
    checkoutForm.addEventListener('submit', handleCheckout);
    continueShopping.addEventListener('click', closeSuccessModal);
    searchInput.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', handleFilters);
    priceFilter.addEventListener('change', handleFilters);
    clearFilters.addEventListener('click', handleClearFilters);

    // Close modals when clicking outside
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckoutModal();
    });
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeSuccessModal();
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target) && cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    });
}

// Render products
function renderProducts() {
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
            </div>
        `;
        setTimeout(() => {
            productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-light);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No products found matching your criteria.</p>
                </div>
            `;
        }, 500);
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card fade-in">
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    saveCart();
    showAddToCartAnimation();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            saveCart();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Update cart items
    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';
        cartItems.innerHTML = '';
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';
        renderCartItems();
        updateCartTotals();
    }
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update cart totals
function updateCartTotals() {
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * 0.08; // 8% tax
    const totalAmount = subtotalAmount + taxAmount;

    subtotal.textContent = `₹${subtotalAmount.toLocaleString('en-IN')}`;
    tax.textContent = `₹${taxAmount.toLocaleString('en-IN')}`;
    total.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
    checkoutTotal.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    if (cartSidebar.classList.contains('open')) {
        cartSidebar.classList.add('slide-in-right');
    }
}

// Open checkout modal
function openCheckoutModal() {
    checkoutModal.classList.add('open');
    renderCheckoutItems();
    updateCartTotals();
}

// Close checkout modal
function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
}

// Render checkout items
function renderCheckoutItems() {
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
        </div>
    `).join('');
}

// Handle checkout form submission
function handleCheckout(e) {
    e.preventDefault();
    
    // Generate order ID
    const orderNumber = 'ORD-' + Date.now();
    orderId.textContent = orderNumber;
    
    // Clear cart
    cart = [];
    updateCartUI();
    saveCart();
    
    // Show success modal
    closeCheckoutModal();
    successModal.classList.add('open');
    
    // Reset form
    checkoutForm.reset();
}

// Close success modal
function closeSuccessModal() {
    successModal.classList.remove('open');
    toggleCart(); // Close cart if open
}

// Show add to cart animation
function showAddToCartAnimation() {
    cartBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    applyFilters(searchTerm);
}

// Handle filters
function handleFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    applyFilters(searchTerm);
}

// Apply filters
function applyFilters(searchTerm = '') {
    const categoryValue = categoryFilter.value;
    const priceValue = priceFilter.value;

    filteredProducts = products.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm) ||
                            product.category.toLowerCase().includes(searchTerm);

        // Category filter
        const matchesCategory = !categoryValue || product.category === categoryValue;

        // Price filter
        let matchesPrice = true;
        if (priceValue) {
            const price = product.price;
            switch (priceValue) {
                case '0-50':
                    matchesPrice = price <= 2000;
                    break;
                case '50-100':
                    matchesPrice = price > 2000 && price <= 4000;
                    break;
                case '100-500':
                    matchesPrice = price > 4000 && price <= 6000;
                    break;
                case '500+':
                    matchesPrice = price > 6000;
                    break;
            }
        }

        return matchesSearch && matchesCategory && matchesPrice;
    });

    renderProducts();
}

// Clear all filters
function handleClearFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    priceFilter.value = '';
    filteredProducts = [...products];
    renderProducts();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle image loading errors
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.background = 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)';
        e.target.style.backgroundSize = '20px 20px';
        e.target.style.backgroundPosition = '0 0, 0 10px, 10px -10px, -10px 0px';
        e.target.alt = 'Image not available';
    }
}, true);

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (successModal.classList.contains('open')) {
            closeSuccessModal();
        } else if (checkoutModal.classList.contains('open')) {
            closeCheckoutModal();
        } else if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Add loading states for better UX
function showLoading() {
    productsGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Simulate API calls with loading states
function simulateApiCall(callback, delay = 500) {
    showLoading();
    setTimeout(callback, delay);
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateQuantity,
        products,
        cart
    };
}