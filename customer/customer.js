// Store data
const stores = [
    {
        id: 1,
        name: "Fresh Groceries",
        description: "Your local fresh produce and grocery store with the best quality fruits and vegetables.",
        products: [
            { name: "Apples", price: "₹120" },
            { name: "Bananas", price: "₹60" },
            { name: "Tomatoes", price: "₹40" }
        ]
    },
    {
        id: 2,
        name: "Quick Mart",
        description: "Convenience store with daily essentials, snacks, and household items.",
        products: [
            { name: "Bread", price: "₹35" },
            { name: "Milk", price: "₹45" },
            { name: "Eggs", price: "₹60" }
        ]
    },
    {
        id: 3,
        name: "Local Pharmacy",
        description: "Your neighborhood pharmacy with medicines and healthcare products.",
        products: [
            { name: "Paracetamol", price: "₹50" },
            { name: "Vitamin C", price: "₹120" },
            { name: "Cough Syrup", price: "₹80" }
        ]
    },
    {
        id: 4,
        name: "Bakery Corner",
        description: "Freshly baked bread, pastries, and cakes made daily.",
        products: [
            { name: "Croissant", price: "₹45" },
            { name: "Chocolate Cake", price: "₹320" },
            { name: "Whole Wheat Bread", price: "₹55" }
        ]
    },
    {
        id: 5,
        name: "ElectroHub",
        description: "Latest electronics, gadgets, and accessories at competitive prices.",
        products: [
            { name: "Wireless Earbuds", price: "₹1,299" },
            { name: "Phone Case", price: "₹299" },
            { name: "Power Bank", price: "₹899" }
        ]
    },
    {
        id: 6,
        name: "Fashion Boutique",
        description: "Trendy clothing and accessories for men and women.",
        products: [
            { name: "Cotton T-Shirt", price: "₹499" },
            { name: "Denim Jeans", price: "₹1,299" },
            { name: "Summer Dress", price: "₹899" }
        ]
    }
];

// DOM Elements
const storesGrid = document.getElementById('storesGrid');
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// Render store cards
function renderStores(storesArray) {
    storesGrid.innerHTML = '';
    if (storesArray.length === 0) {
        noResults.style.display = 'block';
        productsGrid.innerHTML = '';
        return;
    }
    noResults.style.display = 'none';

    storesArray.forEach(store => {
        const storeCard = document.createElement('div');
        storeCard.className = 'store-card';
        storeCard.innerHTML = `
            <h3 class="store-name">${store.name}</h3>
            <p class="store-description">${store.description}</p>
        `;
        storesGrid.appendChild(storeCard);
    });
}

// Render all products from all stores (repo-aware image handling + safe placeholders)
function renderProducts(storesArray) {
  productsGrid.innerHTML = '';

  // basePath ends with no trailing slash, works on localhost and GitHub Pages (repo subpath)
  const basePath = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');

  storesArray.forEach(store => {
    store.products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      // Determine image URL:
      // 1) If product.image exists and is a full URL, use it.
      // 2) If product.image exists and looks like a local filename, treat it as repo-relative under /assets/images/
      // 3) Otherwise use a placeholder with URL-encoded product name.
      let imgSrc = '';
      if (product.image && typeof product.image === 'string') {
        const trimmed = product.image.trim();
        if (/^https?:\/\//i.test(trimmed)) {
          imgSrc = trimmed; // full external URL
        } else {
          // assume a repo-relative path (adjust folder if your images are elsewhere)
          imgSrc = `${basePath}/assets/images/${trimmed.replace(/^\/+/, '')}`;
        }
      } else {
        // placeholder with URL-encoded text (safe for spaces / special chars)
        const text = encodeURIComponent(product.name || 'product');
        imgSrc = `https://via.placeholder.com/300x180?text=${text}`;
      }

      // format price (basic)
      const priceText = product.price != null ? `₹${product.price}` : 'Price not set';

      productCard.innerHTML = `
        <img src="${imgSrc}" alt="${product.name || 'product'}" loading="lazy">
        <div class="product-details">
          <div class="product-name">${product.name || 'Unnamed product'}</div>
          <div class="product-description">${store.description || ''}</div>
          <div class="product-price">${priceText}</div>
          <button class="order-btn" data-product-name="${product.name || ''}" data-store-name="${store.name || ''}">
            <i class="fab fa-whatsapp"></i> Order
          </button>
        </div>
      `;

      productsGrid.appendChild(productCard);
    });
  });


    // WhatsApp order buttons
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product-name');
            const storeName = this.getAttribute('data-store-name');
            const message = encodeURIComponent(`Hello, I want to order ${productName} from ${storeName}.`);
            window.open(`https://wa.me/?text=${message}`, '_blank');
        });
    });
}

// Filter stores and products by search
function filterStores() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (!searchTerm) {
        renderStores(stores);
        renderProducts(stores);
        return;
    }
    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(searchTerm) ||
        store.description.toLowerCase().includes(searchTerm) ||
        store.products.some(p => p.name.toLowerCase().includes(searchTerm))
    );
    renderStores(filteredStores);
    renderProducts(filteredStores);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderStores(stores);
    renderProducts(stores);
    searchInput.addEventListener('input', filterStores);
});
