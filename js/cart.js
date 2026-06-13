/* ============================================================
   LOYAL CLOTHING — Cart Module
   localStorage-backed cart with drawer UI interactions.
   ============================================================ */

const CART_KEY = 'loyal_cart';

/**
 * Get cart from localStorage
 * @returns {object[]}
 */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Save cart to localStorage
 * @param {object[]} cart
 */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

/**
 * Add item to cart
 * @param {object} product - Product data object
 * @param {string} size - Selected size
 * @param {string} color - Selected color name
 * @param {number} quantity - Quantity to add (default 1)
 */
function addToCart(product, size, color, quantity = 1) {
  const cart = getCart();
  const key = `${product.id}-${size}-${color}`;

  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      color,
      quantity,
      image: product.images[0]
    });
  }

  saveCart(cart);
  openCartDrawer();
  bumpCartIcon();
}

/**
 * Trigger spring bounce feedback on the header cart button
 */
function bumpCartIcon() {
  const cartBtn = document.getElementById('cart-toggle');
  if (cartBtn) {
    cartBtn.classList.add('is-bumped');
    setTimeout(() => {
      cartBtn.classList.remove('is-bumped');
    }, 400); // Duration matches animation scale cycles
  }
}

/**
 * Remove item from cart by key
 * @param {string} key
 */
function removeFromCart(key) {
  const cart = getCart().filter(item => item.key !== key);
  saveCart(cart);
}

/**
 * Animate the removal of a cart item with transitions before deleting from state
 * @param {string} key
 */
function animateRemoveFromCart(key) {
  const itemEl = document.querySelector(`.cart-item[data-key="${key}"]`);
  if (itemEl) {
    itemEl.classList.add('is-leaving');
    setTimeout(() => {
      removeFromCart(key);
      renderCartItems();
    }, 350); // Matches CSS height/opacity collapse transition
  } else {
    removeFromCart(key);
    renderCartItems();
  }
}

/**
 * Update item quantity
 * @param {string} key
 * @param {number} delta - Change in quantity (+1 or -1)
 */
function updateQuantity(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(key);
    return;
  }

  saveCart(cart);
}

/**
 * Handle quantity updates with custom animation triggers on removals
 * @param {string} key
 * @param {number} delta
 */
function handleQuantityChange(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;

  if (item.quantity + delta <= 0) {
    animateRemoveFromCart(key);
  } else {
    updateQuantity(key, delta);
    renderCartItems();
  }
}

/**
 * Get total number of items in cart
 * @returns {number}
 */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Get cart subtotal
 * @returns {number}
 */
function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/* ── Cart Drawer UI ──────────────────────────────────────── */

function openCartDrawer() {
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (drawer) drawer.classList.add('is-open');
  if (overlay) overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCartDrawer() {
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (drawer) drawer.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

/**
 * Update the cart count badge in the header
 */
function updateCartUI() {
  const count = getCartCount();
  const badge = document.querySelector('.header__cart-count');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('is-visible', count > 0);
  }
}

/**
 * Render cart items inside the drawer
 */
function renderCartItems() {
  const container = document.querySelector('.cart-drawer__items');
  const subtotalEl = document.querySelector('.cart-drawer__subtotal-value');
  const cart = getCart();

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-drawer__empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p>Your bag is empty</p>
        <a href="shop.html" class="btn btn--secondary btn--small">Continue Shopping</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₹0';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <div class="cart-item__image">
        <img src="${item.image}" alt="${item.name}" class="img-cover">
      </div>
      <div class="cart-item__details">
        <span class="cart-item__name">${item.name}</span>
        <span class="cart-item__meta">${item.size} / ${item.color}</span>
        <div class="cart-item__bottom">
          <div class="cart-item__quantity">
            <button onclick="handleQuantityChange('${item.key}', -1);" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button onclick="handleQuantityChange('${item.key}', 1);" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item__price">${formatPrice(item.price * item.quantity)}</span>
        </div>
        <button class="cart-item__remove" onclick="animateRemoveFromCart('${item.key}');">Remove</button>
      </div>
    </div>
  `).join('');

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(getCartSubtotal());
  }

  // Trigger staggered slide-in transitions
  const items = container.querySelectorAll('.cart-item');
  items.forEach((item, index) => {
    item.classList.add('is-entering');
    requestAnimationFrame(() => {
      setTimeout(() => {
        item.classList.remove('is-entering');
      }, 50 + (index * 60));
    });
  });
}

/* ── Initialize Cart ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  // Close drawer listeners
  const overlay = document.querySelector('.cart-overlay');
  const closeBtn = document.querySelector('.cart-drawer__close');

  if (overlay) overlay.addEventListener('click', closeCartDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

  // Open drawer from header cart button
  const cartBtn = document.getElementById('cart-toggle');
  if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
});
