/* Shared JavaScript for BrandCrafters Website */

// Global Variables
let cart = JSON.parse(localStorage.getItem("brandcrafters_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("brandcrafters_wishlist")) || [];

// Product Database (shared across all pages)
const PRODUCTS_DB = [
  {
    id: 1,
    name: "Maasai Beaded Necklace",
    description:
      "Authentic handcrafted beaded necklace by Maasai artisans with traditional patterns",
    fullDescription:
      "This stunning piece is handcrafted by skilled Maasai women using traditional techniques passed down through generations. Each bead is carefully selected and arranged to create a unique pattern. The vibrant colors represent different aspects of Maasai culture - red for bravery, blue for energy, white for peace, and green for land.",
    price: 3500,
    deposit: 1050,
    depositPercent: 30,
    category: "Jewelry",
    icon: "gem",
    badge: "Trending",
    featured: true,
    inStock: true,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 2,
    name: "Kikuyu Kiondo Basket",
    description:
      "Traditional woven sisal bag, perfect for shopping and everyday use",
    fullDescription:
      "Hand-woven by skilled artisans from Central Kenya using natural sisal fibers and traditional techniques. These versatile baskets are both functional and stylish, perfect for market shopping, beach trips, or everyday use. Each basket supports local communities and preserves traditional weaving methods.",
    price: 2800,
    deposit: 840,
    depositPercent: 30,
    category: "Handicrafts",
    icon: "shopping-bag",
    badge: "Popular",
    featured: true,
    inStock: true,
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 3,
    name: "African Wooden Sculpture",
    description:
      "Hand-carved ebony wood elephant sculpture representing strength and wisdom",
    fullDescription:
      "Expertly carved from sustainable ebony wood by master craftsmen in Machakos County. This elegant elephant sculpture represents strength, wisdom, and good fortune in African culture. Each piece is unique with natural wood grain variations. Perfect for home or office decoration.",
    price: 5500,
    deposit: 1650,
    depositPercent: 30,
    category: "Home Decor",
    icon: "chess-rook",
    featured: false,
    inStock: true,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    name: "Batik Wall Hanging",
    description:
      "Colorful batik art depicting Kenyan wildlife with wooden frame included",
    fullDescription:
      "Created using traditional batik technique on high-quality cotton fabric. Features vibrant depictions of Kenya's iconic wildlife including elephants, giraffes, and lions. Each piece is signed by the artist and comes ready to hang with a beautiful wooden frame included.",
    price: 4200,
    deposit: 1260,
    depositPercent: 30,
    category: "Art & Paintings",
    icon: "image",
    badge: "New",
    featured: true,
    inStock: true,
    rating: 4.6,
    reviews: 74,
  },
  {
    id: 5,
    name: "Kanga Fabric Set",
    description:
      "Authentic cotton kanga with beautiful patterns and Swahili sayings",
    fullDescription:
      "Traditional East African cotton fabric featuring beautiful patterns and inspiring Swahili proverbs. Each kanga tells a story and carries cultural meaning. Can be worn as clothing, used as home decor, or given as a meaningful gift. Set includes two matching pieces.",
    price: 1800,
    deposit: 540,
    depositPercent: 30,
    category: "Traditional Wear",
    icon: "tshirt",
    featured: false,
    inStock: true,
    rating: 4.5,
    reviews: 127,
  },
  {
    id: 6,
    name: "Soapstone Figurine",
    description:
      "Hand-carved Kisii soapstone animal figurine with natural color variations",
    fullDescription:
      "Beautifully crafted from pink Kisii soapstone by talented artisans in Western Kenya. Each piece is unique with natural variations in color and pattern. The smooth finish and intricate details make this a perfect decorative piece or meaningful gift.",
    price: 2200,
    deposit: 660,
    depositPercent: 30,
    category: "Home Decor",
    icon: "chess-knight",
    featured: false,
    inStock: true,
    rating: 4.4,
    reviews: 95,
  },
  {
    id: 7,
    name: "Leather Sandals",
    description:
      "Handmade leather sandals with traditional Kenyan design patterns",
    fullDescription:
      "Crafted from premium genuine leather by skilled cobblers in Nairobi. Features traditional Kenyan design patterns and comfortable padding for all-day wear. Available in multiple sizes and colors. Each pair is handmade to order.",
    price: 3200,
    deposit: 960,
    depositPercent: 30,
    category: "Traditional Wear",
    icon: "shoe-prints",
    featured: false,
    inStock: true,
    rating: 4.3,
    reviews: 68,
  },
  {
    id: 8,
    name: "Beaded Bracelet Set",
    description:
      "Set of colorful beaded bracelets made by women's cooperatives",
    fullDescription:
      "Beautiful set of three handcrafted beaded bracelets made by women's cooperatives in rural Kenya. Each purchase directly supports women artisans and their families. Features traditional patterns and vibrant colors that complement any outfit.",
    price: 1500,
    deposit: 450,
    depositPercent: 30,
    category: "Jewelry",
    icon: "circle",
    badge: "Best Seller",
    featured: true,
    inStock: true,
    rating: 4.9,
    reviews: 312,
  },
];

// Utility Functions
const utils = {
  // Format currency
  formatCurrency: function (amount) {
    return `KSh ${amount.toLocaleString()}`;
  },

  // Debounce function for search
  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Show notification
  showNotification: function (message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
        `;

    // Find a container to append to, or create one
    let container = document.querySelector(".notification-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "notification-container";
      container.style.cssText =
        "position: fixed; top: 20px; right: 20px; z-index: 10000; max-width: 400px;";
      document.body.appendChild(container);
    }

    container.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  },

  // Get product by ID
  getProductById: function (id) {
    return PRODUCTS_DB.find((product) => product.id === parseInt(id));
  },

  // Filter products
  filterProducts: function (products, filters) {
    return products.filter((product) => {
      const categoryMatch =
        !filters.category ||
        filters.category === "All" ||
        product.category === filters.category;
      const priceMatch =
        product.price >= (filters.minPrice || 0) &&
        product.price <= (filters.maxPrice || Infinity);
      const searchMatch =
        !filters.search ||
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.search.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  },

  // Sort products
  sortProducts: function (products, sortBy) {
    const sortedProducts = [...products];

    switch (sortBy) {
      case "name-asc":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "rating":
        return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
        return sortedProducts.sort((a, b) => b.id - a.id);
      default:
        return sortedProducts.sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }
  },
};

// Cart Management
const cartManager = {
  // Add item to cart
  addToCart: function (productId, quantity = 1) {
    const product = utils.getProductById(productId);
    if (!product) {
      utils.showNotification("Product not found!", "error");
      return false;
    }

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity: quantity,
        addedAt: new Date().toISOString(),
      });
    }

    this.saveCart();
    this.updateCartUI();
    utils.showNotification(`${product.name} added to cart!`);
    return true;
  },

  // Remove item from cart
  removeFromCart: function (productId) {
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex > -1) {
      const product = cart[productIndex];
      cart.splice(productIndex, 1);
      this.saveCart();
      this.updateCartUI();
      utils.showNotification(`${product.name} removed from cart!`);
    }
  },

  // Update quantity
  updateQuantity: function (productId, quantity) {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartUI();
      }
    }
  },

  // Get cart total
  getCartTotal: function () {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  // Get total deposit required
  getTotalDeposit: function () {
    return cart.reduce(
      (total, item) => total + item.deposit * item.quantity,
      0
    );
  },

  // Get cart count
  getCartCount: function () {
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Save cart to localStorage
  saveCart: function () {
    localStorage.setItem("brandcrafters_cart", JSON.stringify(cart));
  },

  // Update cart UI elements
  updateCartUI: function () {
    // Update cart count badges
    const cartBadges = document.querySelectorAll(".badge, #cartCount");
    const count = this.getCartCount();

    cartBadges.forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    });

    // Trigger custom event for cart updates
    document.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: { cart, count, total: this.getCartTotal() },
      })
    );
  },
};

// Search Functionality
const searchManager = {
  // Initialize search
  init: function () {
    const searchInputs = document.querySelectorAll(
      'input[type="text"][placeholder*="Search"]'
    );
    const searchButtons = document.querySelectorAll(".search-btn");

    searchInputs.forEach((input) => {
      // Debounced search as user types
      input.addEventListener(
        "input",
        utils.debounce(() => {
          this.performSearch(input.value);
        }, 300)
      );

      // Search on Enter key
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.performSearch(input.value);
        }
      });
    });

    searchButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const input = button.parentElement.querySelector("input");
        if (input) {
          this.performSearch(input.value);
        }
      });
    });
  },

  // Perform search
  performSearch: function (query) {
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      return;
    }

    // If we're not on the shop page, redirect to shop with search
    if (!window.location.pathname.includes("shop.html")) {
      window.location.href = `shop.html?search=${encodeURIComponent(
        trimmedQuery
      )}`;
      return;
    }

    // If we're on shop page, trigger search event
    document.dispatchEvent(
      new CustomEvent("searchPerformed", {
        detail: { query: trimmedQuery },
      })
    );
  },
};

// URL Parameter Handling
const urlManager = {
  // Get URL parameters
  getParams: function () {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },

  // Update URL parameters
  updateParams: function (newParams) {
    const url = new URL(window.location);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        url.searchParams.set(key, newParams[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.replaceState({}, "", url);
  },
};

// Navigation Manager
const navigationManager = {
  // Initialize navigation
  init: function () {
    this.highlightCurrentPage();
    this.setupMobileMenu();
  },

  // Highlight current page in navigation
  highlightCurrentPage: function () {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const linkPath = new URL(link.href).pathname;

      if (
        currentPath === linkPath ||
        (currentPath.endsWith("/") && linkPath.includes("index.html"))
      ) {
        link.classList.add("active");
      }
    });
  },

  // Setup mobile menu if needed
  setupMobileMenu: function () {
    // Add mobile menu toggle functionality if needed
    const mobileMenuButton = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuButton && navMenu) {
      mobileMenuButton.addEventListener("click", () => {
        navMenu.classList.toggle("mobile-open");
      });
    }
  },
};

// Form Validation
const formValidator = {
  // Validate email
  isValidEmail: function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number (Kenyan format)
  isValidPhone: function (phone) {
    const phoneRegex = /^(\+254|0)?[7]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  },

  // Validate required fields
  validateRequired: function (form) {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        this.showFieldError(field, "This field is required");
        isValid = false;
      } else {
        this.clearFieldError(field);

        // Additional validation based on field type
        if (field.type === "email" && !this.isValidEmail(field.value)) {
          this.showFieldError(field, "Please enter a valid email address");
          isValid = false;
        } else if (field.type === "tel" && !this.isValidPhone(field.value)) {
          this.showFieldError(field, "Please enter a valid phone number");
          isValid = false;
        }
      }
    });

    return isValid;
  },

  // Show field error
  showFieldError: function (field, message) {
    this.clearFieldError(field);

    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.style.cssText =
      "color: #e74c3c; font-size: 12px; margin-top: 5px;";
    errorDiv.textContent = message;

    field.style.borderColor = "#e74c3c";
    field.parentNode.appendChild(errorDiv);
  },

  // Clear field error
  clearFieldError: function (field) {
    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = "";
  },
};

// Analytics & Tracking (placeholder)
const analytics = {
  // Track page view
  trackPageView: function (pageName) {
    console.log(`Page viewed: ${pageName}`);
    // Integration with Google Analytics or other tracking service would go here
  },

  // Track event
  trackEvent: function (category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Integration with tracking service would go here
  },

  // Track cart events
  trackCartEvent: function (action, product, quantity = 1) {
    this.trackEvent("Cart", action, `${product.name} (${quantity})`);
  },
};

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize managers
  navigationManager.init();
  searchManager.init();

  // Update cart UI
  cartManager.updateCartUI();

  // Handle URL parameters (for shop page)
  const params = urlManager.getParams();
  if (params.search) {
    const searchInputs = document.querySelectorAll(
      'input[type="text"][placeholder*="Search"]'
    );
    searchInputs.forEach((input) => {
      input.value = params.search;
    });
  }

  // Track page view
  const pageName = document.title.split(" - ")[0] || "Unknown Page";
  analytics.trackPageView(pageName);

  // Add smooth scrolling to internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add loading states to forms
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn && !form.hasAttribute("data-no-loading")) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        // Re-enable after 3 seconds (adjust based on actual processing time)
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  });
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    utils,
    cartManager,
    searchManager,
    urlManager,
    navigationManager,
    formValidator,
    analytics,
    PRODUCTS_DB,
  };
}

// Global functions for inline event handlers
window.addToCart = function (event, productId) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  return cartManager.addToCart(productId);
};

window.removeFromCart = function (productId) {
  return cartManager.removeFromCart(productId);
};

window.updateCartQuantity = function (productId, quantity) {
  return cartManager.updateQuantity(productId, quantity);
};

window.performSearch = function (query) {
  return searchManager.performSearch(query || "");
};
