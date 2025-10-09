// BrandCrafters JS
window.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 800);

  // Product Data
  const products = [
    {
      id: 1,
      title: "Maasai Beaded Necklace",
      category: "Jewelry",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Kikoi Scarf",
      category: "Fashion",
      price: 900,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Soapstone Carving",
      category: "Home Decor",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "African Print Tote Bag",
      category: "Fashion",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      title: "Ebony Wood Salad Servers",
      category: "Kitchen",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      title: "Shuka Blanket",
      category: "Home Decor",
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 7,
      title: "Kiondo Basket",
      category: "Baskets",
      price: 1700,
      image:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 8,
      title: "Handmade Leather Sandals",
      category: "Footwear",
      price: 1300,
      image:
        "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 9,
      title: "Banana Fiber Wall Art",
      category: "Wall Art",
      price: 2100,
      image:
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 10,
      title: "Beaded Keychain",
      category: "Accessories",
      price: 400,
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
  ];

  // Category Data
  const categoryIcons = {
    Jewelry: "fa-gem",
    Fashion: "fa-tshirt",
    "Home Decor": "fa-couch",
    Kitchen: "fa-utensils",
    Baskets: "fa-shopping-basket",
    Footwear: "fa-shoe-prints",
    "Wall Art": "fa-image",
    Accessories: "fa-key",
  };

  // Render Categories
  function renderCategories() {
    const categories = [...new Set(products.map((p) => p.category))];
    const grid = document.getElementById("categoryGrid");
    grid.innerHTML = "";
    categories.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.innerHTML = `<div class="category-icon"><i class="fas ${
        categoryIcons[cat] || "fa-gift"
      }"></i></div>${cat}`;
      card.addEventListener("click", () => filterByCategory(cat));
      grid.appendChild(card);
    });
  }

  // Render Products
  function renderProducts(list) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";
    if (!list.length) {
      grid.innerHTML =
        '<div style="grid-column: 1/-1; text-align:center; color:#888;">No products found.</div>';
      return;
    }
    list.forEach((prod) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${prod.image}" alt="${
        prod.title
      }" class="product-image" loading="lazy">
        <div class="product-title">${prod.title}</div>
        <div class="product-category">${prod.category}</div>
        <div class="product-price">Ksh ${prod.price.toLocaleString()}</div>
        <button class="add-to-cart-btn">Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  }

  // Filter by Category
  function filterByCategory(category) {
    renderProducts(products.filter((p) => p.category === category));
    document.getElementById(
      "productsTitle"
    ).textContent = `Products in "${category}"`;
  }

  // Search
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearSearchBtn");
  function doSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      renderProducts(products);
      document.getElementById("productsTitle").textContent =
        "Featured Products";
      clearBtn.style.display = "none";
      return;
    }
    const results = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
    renderProducts(results);
    document.getElementById(
      "productsTitle"
    ).textContent = `Search Results (${results.length})`;
    clearBtn.style.display = "inline-block";
  }
  searchBtn.addEventListener("click", doSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    doSearch();
  });
  searchInput.addEventListener("input", () => {
    clearBtn.style.display = searchInput.value ? "inline-block" : "none";
  });

  // Shop Now Button
  document.getElementById("shopNowBtn").addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });

  // Initial Render
  renderCategories();
  renderProducts(products);
});
