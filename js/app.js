// Café Porkotinii - Client & Pitch Interactivity Logic (Using Real Local Image Files)

const menuData = [
  {
    id: 1,
    name: "Naga Smoked Pork with Bamboo Shoot",
    category: "northeast",
    price: "₹380",
    spice: "Spicy",
    badge: "Bestseller",
    imgSrc: "images/naga_smoked_pork.svg",
    desc: "Authentic Naga delicacy made with fermented bamboo shoots, spicy chili mash, and slow-smoked tender pork cuts."
  },
  {
    id: 2,
    name: "Pork Khorika (Assamese Skewers)",
    category: "northeast",
    price: "₹340",
    spice: "Medium",
    badge: "Signature",
    imgSrc: "images/pork_khorika.svg",
    desc: "Traditional Assamese charcoal-grilled pork skewers marinated in mustard oil, garlic, and wild herbs."
  },
  {
    id: 3,
    name: "Manipuri Pork Thongba",
    category: "northeast",
    price: "₹360",
    spice: "Medium",
    badge: "Chef's Special",
    imgSrc: "images/manipuri_thongba.svg",
    desc: "A rich Manipuri curry slow-cooked with seasonal greens, maroi napaak (chives), and ginger."
  },
  {
    id: 4,
    name: "Mizo Style Fried Pork",
    category: "northeast",
    price: "₹350",
    spice: "Hot",
    badge: "Crispy",
    imgSrc: "images/mizo_pork.svg",
    desc: "Sliced pork belly pan-fried to crisp perfection with red mustard paste and crushed local peppers."
  },
  {
    id: 5,
    name: "Crispy Honey Chili Pork",
    category: "starters",
    price: "₹320",
    spice: "Mild",
    badge: "Popular",
    imgSrc: "images/naga_smoked_pork.svg",
    desc: "Crispy battered pork wok-tossed in dark soy sauce, pure honey, sesame seeds, and spring onion."
  },
  {
    id: 6,
    name: "Pork Steamed Momos (8 Pcs)",
    category: "starters",
    price: "₹220",
    spice: "Medium",
    badge: "Crowd Favorite",
    imgSrc: "images/pork_momos.svg",
    desc: "Juicy pork dumplings infused with ginger and scallions, served with spicy Naga chili garlic chutney."
  },
  {
    id: 7,
    name: "Smoked Bacon & Cheese Burger",
    category: "starters",
    price: "₹290",
    spice: "Mild",
    badge: "Gourmet",
    imgSrc: "images/pork_khorika.svg",
    desc: "Handcrafted smoked pork patty topped with melted cheddar, crispy bacon, caramelized onions, and house aioli."
  },
  {
    id: 8,
    name: "Northeast Raja Mirchi Cooler",
    category: "drinks",
    price: "₹180",
    spice: "Spicy Twist",
    badge: "Refreshing",
    imgSrc: "images/raja_mirchi_cooler.svg",
    desc: "Refreshing lime cooler infused with a sliver of Bhut Jolokia pepper and mint over crushed ice."
  },
  {
    id: 9,
    name: "Smoked Honey Ginger Ale",
    category: "drinks",
    price: "₹160",
    spice: "Sweet & Spicy",
    badge: "Signature",
    imgSrc: "images/raja_mirchi_cooler.svg",
    desc: "House-crafted ginger reduction blended with wild honey, sparkling soda, and smoked oak aroma."
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

  // Render Menu Items with Local Images
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
          <p>Try searching for Naga Smoked Pork, Khorika, or Momos</p>
        </div>
      `;
      return;
    }

    menuContainer.innerHTML = items.map(item => `
      <div class="menu-item-card">
        <div class="menu-item-thumb">
          <img src="${item.imgSrc}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="menu-badge">${item.badge}</span>
          <span class="spice-tag"><i class="fa-solid fa-pepper-hot"></i> ${item.spice}</span>
        </div>
        <div class="menu-item-body">
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
            <span class="menu-item-price">${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.desc}</p>
          <div class="menu-item-footer">
            <span style="font-size: 0.82rem; color: var(--accent-gold);"><i class="fa-solid fa-circle-check"></i> Fresh Daily</span>
            <button class="order-btn" onclick="openOrderModal('${item.name}', '${item.price}')">Order Now <i class="fa-solid fa-arrow-right"></i></button>
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

  // Reservation Form Simulation
  const reservationForm = document.getElementById("table-reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("res-name").value;
      const guests = document.getElementById("res-guests").value;
      const date = document.getElementById("res-date").value;
      const time = document.getElementById("res-time").value;

      showModal("Table Reserved Successfully!", `Thank you ${name}! We have reserved a table for ${guests} guests on ${date} at ${time}. Instant SMS confirmation sent to your phone.`);
      reservationForm.reset();
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("mobile-open");
      // Update the icon
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });

    // Close mobile menu when a link is clicked
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
  showModal(`Direct Order Request: ${itemName}`, `Order request initialized for ${itemName} (${itemPrice}). In production, this directly forwards to WhatsApp or opens Swiggy/Zomato!`);
}

function showPitchDetails() {
  showModal("Website ROI Proposal for Cafe Porkotinii Owner", "This official site boosts Cafe Porkotinii's brand value by: 1) Capturing direct table reservations 24/7, 2) Reducing Swiggy/Zomato commission costs via direct WhatsApp ordering, 3) Placing Cafe Porkotinii #1 on Google search for 'Pork Cafes in Kolkata'. Ready to launch on cafeporkotinii.com!");
}
