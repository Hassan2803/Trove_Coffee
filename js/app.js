// Trove Coffee & More - Interactivity Logic

const menuData = [
  {
    id: 1,
    name: "Mix Sauce Pizza",
    category: "mains",
    price: "₹395",
    spice: "Medium",
    badge: "Bestseller",
    imgSrc: "images/pizza_artisan.jpg",
    desc: "Our signature pizza with a perfect blend of tangy tomato and creamy white sauce, fresh mozzarella, and colorful veggies."
  },
  {
    id: 2,
    name: "Kunafa",
    category: "desserts",
    price: "₹345",
    spice: "Sweet",
    badge: "Must Try",
    imgSrc: "images/kunafa_dessert.jpg",
    desc: "Classic Middle Eastern dessert with crispy shredded phyllo dough, gooey cheese center, topped with sugar syrup and pistachios."
  },
  {
    id: 3,
    name: "Brownie Shake",
    category: "beverages",
    price: "₹245",
    spice: "Sweet",
    badge: "Popular",
    imgSrc: "images/brownie_shake.jpg",
    desc: "Rich chocolate milkshake blended with our house-baked fudgy brownie, topped with whipped cream and chocolate drizzle."
  },
  {
    id: 4,
    name: "Artisan Latte",
    category: "beverages",
    price: "₹185",
    spice: "Mild",
    badge: "Classic",
    imgSrc: "images/coffee_brownie.jpg",
    desc: "Smooth espresso pulled from premium Arabica beans, poured over steamed milk with beautiful latte art."
  },
  {
    id: 5,
    name: "Cream of Chicken Soup",
    category: "mains",
    price: "₹210",
    spice: "Mild",
    badge: "Comfort",
    imgSrc: "images/coffee_brownie.jpg", // Reusing image as placeholder
    desc: "Rich and creamy comforting soup with tender chicken pieces, served with toasted garlic bread."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // Sticky Navbar on Scroll
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Render Menu Items
  const menuContainer = document.getElementById("menu-grid-container");
  const categoryBtns = document.querySelectorAll(".category-btn");
  const searchInput = document.getElementById("menu-search-input");

  function renderMenuItems(items) {
    if (!menuContainer) return;
    if (items.length === 0) {
      menuContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px; color: var(--text-muted);">
          <i class="fa-solid fa-utensils" style="font-size: 3.5rem; margin-bottom: 18px; color: var(--primary-color);"></i>
          <h3>No matching dishes found</h3>
          <p>Try searching for Pizza, Kunafa, or Shake</p>
        </div>
      `;
      return;
    }

    menuContainer.innerHTML = items.map(item => `
      <div class="menu-item-card">
        <div class="menu-item-thumb">
          <img src="${item.imgSrc}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="menu-badge">${item.badge}</span>
        </div>
        <div class="menu-item-body">
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
            <span class="menu-item-price">${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.desc}</p>
          <div class="menu-item-footer">
            <span style="font-size: 0.82rem; color: var(--primary-color); font-weight: 600;"><i class="fa-solid fa-star"></i> Top Rated</span>
            <button class="order-btn" onclick="openOrderModal('${item.name}', '${item.price}')">Order <i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderMenuItems(menuData);

  // Category Filtering
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");

      let filtered = menuData;
      if (category !== "all") {
        filtered = menuData.filter(item => item.category === category);
      }
      renderMenuItems(filtered);
    });
  });

  // Search Filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = menuData.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.desc.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
      renderMenuItems(filtered);
    });
  }

  // Reservation Form
  const reservationForm = document.getElementById("table-reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("res-name").value;
      const guests = document.getElementById("res-guests").value;
      const date = document.getElementById("res-date").value;
      const time = document.getElementById("res-time").value;

      showModal("Table Reserved Successfully!", `Thank you ${name}! We have reserved a table for ${guests} guests on ${date} at ${time}. We look forward to hosting you at Trove.`);
      reservationForm.reset();
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("mobile-open");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        const icon = mobileToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });
  }
});

// Modal Logic
function showModal(title, text) {
  const modal = document.getElementById("custom-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  
  if (modal && modalTitle && modalText) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.add("active");
  }
}

function closeModal() {
  const modal = document.getElementById("custom-modal");
  if (modal) modal.classList.remove("active");
}

function openOrderModal(itemName, itemPrice) {
  showModal(`Direct Order: ${itemName}`, `Order request initialized for ${itemName} (${itemPrice}). Call us directly or find us on Swiggy to complete your order!`);
}

function showPitchDetails() {
  showModal("Website ROI Proposal for Trove Coffee & More", "This official site boosts brand value by: 1) Enhancing your premium aesthetic online, 2) Driving direct reservations, 3) Placing Trove #1 on Google for Park Street cafes. Ready to launch!");
}


  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
