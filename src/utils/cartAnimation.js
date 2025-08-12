// Cart Animation Utility
export const createCartAnimation = (buttonElement, options = {}) => {
  // Get cart icon position
  const cartIcon = document.querySelector('.cart-info') || 
                   document.querySelector('[data-cart-icon]') || 
                   document.querySelector('.header-container .cart');
  
  if (!cartIcon || !buttonElement) return;

  // Default options
  const {
    emoji = '🛒',
    duration = 800,
    size = '20px',
    curve = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  } = options;

  // Create floating element
  const floatingItem = document.createElement('div');
  floatingItem.innerHTML = emoji;
  floatingItem.style.cssText = `
    position: fixed;
    z-index: 9999;
    font-size: ${size};
    pointer-events: none;
    transition: all ${duration}ms ${curve};
    user-select: none;
  `;

  // Get element positions
  const buttonRect = buttonElement.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  // Set initial position (center of button)
  floatingItem.style.left = buttonRect.left + buttonRect.width / 2 + 'px';
  floatingItem.style.top = buttonRect.top + buttonRect.height / 2 + 'px';
  floatingItem.style.transform = 'translate(-50%, -50%) scale(1)';

  document.body.appendChild(floatingItem);

  // Small delay to ensure element is rendered
  requestAnimationFrame(() => {
    // Animate to cart position
    floatingItem.style.left = cartRect.left + cartRect.width / 2 + 'px';
    floatingItem.style.top = cartRect.top + cartRect.height / 2 + 'px';
    floatingItem.style.transform = 'translate(-50%, -50%) scale(0.3)';
    floatingItem.style.opacity = '0.7';
  });

  // Remove element after animation completes
  setTimeout(() => {
    if (floatingItem.parentNode) {
      floatingItem.parentNode.removeChild(floatingItem);
    }
  }, duration);

  // Add a subtle bounce effect to cart icon
  if (cartIcon) {
    cartIcon.style.transition = 'transform 0.2s ease';
    cartIcon.style.transform = 'scale(1.1)';
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1)';
    }, 200);
  }
};

// Enhanced version with product image
export const createProductCartAnimation = (buttonElement, product, options = {}) => {
  // Get cart icon position
  const cartIcon = document.querySelector('.cart-info') || 
                   document.querySelector('[data-cart-icon]') || 
                   document.querySelector('.header-container .cart');
  
  if (!cartIcon || !buttonElement) return;

  // Default options
  const {
    duration = 800,
    size = '40px',
    curve = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  } = options;

  // Create floating element with product image or fallback
  const floatingItem = document.createElement('div');
  
  if (product?.image) {
    floatingItem.innerHTML = `
      <div style="
        width: ${size};
        height: ${size};
        border-radius: 8px;
        background: white;
        border: 2px solid #12b431;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      ">
        <img src="${product.image}" alt="" style="
          width: 80%;
          height: 80%;
          object-fit: cover;
          border-radius: 4px;
        " onerror="this.style.display='none'; this.parentNode.innerHTML='🛒';">
      </div>
    `;
  } else {
    floatingItem.innerHTML = '🛒';
    floatingItem.style.fontSize = '20px';
  }

  floatingItem.style.cssText += `
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    transition: all ${duration}ms ${curve};
    user-select: none;
  `;

  // Get element positions
  const buttonRect = buttonElement.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  // Set initial position (center of button)
  floatingItem.style.left = buttonRect.left + buttonRect.width / 2 + 'px';
  floatingItem.style.top = buttonRect.top + buttonRect.height / 2 + 'px';
  floatingItem.style.transform = 'translate(-50%, -50%) scale(1)';

  document.body.appendChild(floatingItem);

  // Small delay to ensure element is rendered
  requestAnimationFrame(() => {
    // Animate to cart position
    floatingItem.style.left = cartRect.left + cartRect.width / 2 + 'px';
    floatingItem.style.top = cartRect.top + cartRect.height / 2 + 'px';
    floatingItem.style.transform = 'translate(-50%, -50%) scale(0.2)';
    floatingItem.style.opacity = '0.7';
  });

  // Remove element after animation completes
  setTimeout(() => {
    if (floatingItem.parentNode) {
      floatingItem.parentNode.removeChild(floatingItem);
    }
  }, duration);

  // Add a subtle bounce effect to cart icon
  if (cartIcon) {
    cartIcon.style.transition = 'transform 0.2s ease';
    cartIcon.style.transform = 'scale(1.1)';
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1)';
    }, 200);
  }
};