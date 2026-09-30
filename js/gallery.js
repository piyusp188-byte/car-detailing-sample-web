/**
 * USACARDETAILING - FEATURED WORK GALLERY
 * Interactive service filter, bento grid display, and accessible modal lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. GALLERY DATA (Single source of truth for photo replacement)
  // ==========================================================================
  const galleryItems = [
    /* 🔄 SWAP 1: Paint Correction - Featured Bento Slot */
    {
      id: 'gw-01',
      src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Gloss black luxury sports coupe with multi-stage paint correction and mirror-finish reflection under studio lighting',
      tag: 'Paint Correction',
      caption: 'Multi-stage paint correction on a Porsche 911 GT3 — 100% swirl removal with mirror reflection.',
      featured: true,
      cardClass: 'featured-card'
    },

    /* 🔄 SWAP 2: Ceramic Coating */
    {
      id: 'gw-02',
      src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
      alt: 'Porsche 911 in deep metallic blue protected with 5-year ceramic coating',
      tag: 'Ceramic Coating',
      caption: '5-Year 9H ceramic coating applied over high-metallic blue clearcoat for extreme hydrophobics.',
      featured: false,
      cardClass: ''
    },

    /* 🔄 SWAP 3: Interior Deep Clean */
    {
      id: 'gw-03',
      src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80',
      alt: 'Immaculate leather steering wheel and clean dashboard console after steam extraction',
      tag: 'Interior Deep Clean',
      caption: 'Complete interior extraction, leather conditioning, and ozone odor elimination.',
      featured: false,
      cardClass: ''
    },

    /* 🔄 SWAP 4: Headlight Restoration */
    {
      id: 'gw-04',
      src: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80',
      alt: 'Crystal clear restored headlight lens with UV sealant on luxury sedan',
      tag: 'Headlight Restoration',
      caption: 'Multi-grit wet sand and UV-cure ceramic sealant restoring factory optical clarity.',
      featured: false,
      cardClass: ''
    },

    /* 🔄 SWAP 5: Wheel Detailing - Featured Slot */
    {
      id: 'gw-05',
      src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Forged multi-spoke alloy wheel and ceramic coated brake calipers deep cleaned and protected',
      tag: 'Wheel Detailing',
      caption: 'Wheels-off deep decon, iron removal, and high-temp ceramic coating on barrel & calipers.',
      featured: true,
      cardClass: 'featured-wide'
    },

    /* 🔄 SWAP 6: Ceramic Coating */
    {
      id: 'gw-06',
      src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
      alt: 'Mercedes-AMG GT with graphene ceramic coating and high-gloss slick finish',
      tag: 'Ceramic Coating',
      caption: 'Graphene ceramic coating package delivering deep gloss and year-round UV shield.',
      featured: false,
      cardClass: ''
    },

    /* 🔄 SWAP 7: Paint Correction */
    {
      id: 'gw-07',
      src: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=900&q=80',
      alt: 'Ferrari Rosso Corsa deep red clearcoat leveled and polished to perfection',
      tag: 'Paint Correction',
      caption: 'Precision dual-action compound and micro-polish on delicate clear coat.',
      featured: false,
      cardClass: ''
    },

    /* 🔄 SWAP 8: Interior Deep Clean */
    {
      id: 'gw-08',
      src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
      alt: 'Luxury vehicle interior detailing with pristine perforated leather seats and matte trim',
      tag: 'Interior Deep Clean',
      caption: 'Full cabin sanitize, hot-water carpet extraction, and anti-static UV matte dressing.',
      featured: false,
      cardClass: ''
    }
  ];

  // ==========================================================================
  // 2. DOM REFERENCES
  // ==========================================================================
  const galleryGrid = document.getElementById('gallery-grid');
  const filterToolbar = document.getElementById('gallery-filters');
  const filterChips = filterToolbar ? filterToolbar.querySelectorAll('.gallery-chip') : [];
  const cards = galleryGrid ? galleryGrid.querySelectorAll('.gallery-card') : [];

  // Lightbox DOM elements
  const lightbox = document.getElementById('lightbox');
  const lightboxInner = document.getElementById('lightbox-inner');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxCounter = document.getElementById('lightbox-counter');

  // Background regions to hide from assistive tech when modal is open
  const mainEl = document.querySelector('main');
  const headerEl = document.getElementById('site-header');
  const footerEl = document.querySelector('.site-footer');

  let activeFilter = 'All';
  let currentVisibleItems = [...galleryItems];
  let currentLightboxIndex = 0;
  let lastFocusedElement = null;

  // ==========================================================================
  // 3. FILTERING LOGIC & CHIP INTERACTIONS
  // ==========================================================================
  function applyFilter(selectedTag) {
    activeFilter = selectedTag;

    // Update filter chip ARIA states
    filterChips.forEach((chip) => {
      const isSelected = chip.dataset.filter === selectedTag;
      chip.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    // Update visible items array for lightbox navigation
    if (selectedTag === 'All') {
      currentVisibleItems = [...galleryItems];
    } else {
      currentVisibleItems = galleryItems.filter((item) => item.tag === selectedTag);
    }

    // Toggle card visibility classes with smooth fade
    cards.forEach((card) => {
      const cardTag = card.dataset.tag;
      const shouldShow = selectedTag === 'All' || cardTag === selectedTag;

      if (shouldShow) {
        card.classList.remove('gallery-card--hidden');
        card.removeAttribute('inert');
      } else {
        card.classList.add('gallery-card--hidden');
        card.setAttribute('inert', '');
      }
    });
  }

  if (filterToolbar) {
    // Click delegation for filter chips
    filterToolbar.addEventListener('click', (e) => {
      const chip = e.target.closest('.gallery-chip');
      if (!chip) return;
      applyFilter(chip.dataset.filter);
    });

    // Roving keyboard navigation for filter chips
    filterToolbar.addEventListener('keydown', (e) => {
      const chipArray = Array.from(filterChips);
      const currentIndex = chipArray.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % chipArray.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + chipArray.length) % chipArray.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = chipArray.length - 1;
      }

      if (nextIndex !== null) {
        chipArray[nextIndex].focus();
      }
    });
  }

  // ==========================================================================
  // 4. LIGHTBOX LOGIC
  // ==========================================================================
  function updateLightboxContent(itemIndex) {
    if (!currentVisibleItems.length) return;
    currentLightboxIndex = (itemIndex + currentVisibleItems.length) % currentVisibleItems.length;
    const item = currentVisibleItems[currentLightboxIndex];

    if (!item) return;

    // Cross-fade image
    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        lightboxImg.style.opacity = '1';
      }, 120);
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = item.caption;
    }

    if (lightboxTag) {
      lightboxTag.textContent = item.tag;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} of ${currentVisibleItems.length}`;
    }
  }

  function openLightbox(itemId) {
    lastFocusedElement = document.activeElement;

    // Find index in current visible set
    const indexInVisible = currentVisibleItems.findIndex((item) => item.id === itemId);
    const targetIndex = indexInVisible !== -1 ? indexInVisible : 0;

    updateLightboxContent(targetIndex);

    if (lightbox) {
      lightbox.removeAttribute('hidden');
    }

    // Lock page scroll & mark outside regions aria-hidden
    document.body.style.overflow = 'hidden';
    if (mainEl) mainEl.setAttribute('aria-hidden', 'true');
    if (headerEl) headerEl.setAttribute('aria-hidden', 'true');
    if (footerEl) footerEl.setAttribute('aria-hidden', 'true');

    // Toggle nav buttons visibility if only 1 item visible
    const hasMultiple = currentVisibleItems.length > 1;
    if (lightboxPrev) lightboxPrev.style.display = hasMultiple ? '' : 'none';
    if (lightboxNext) lightboxNext.style.display = hasMultiple ? '' : 'none';

    // Focus close button for accessibility
    setTimeout(() => {
      if (lightboxClose) lightboxClose.focus();
    }, 50);
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hasAttribute('hidden')) return;

    lightbox.setAttribute('hidden', '');

    // Reset image to empty data URI to release memory
    if (lightboxImg) {
      lightboxImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";
    }

    // Restore page scroll & assistive tech visibility
    document.body.style.overflow = '';
    if (mainEl) mainEl.removeAttribute('aria-hidden');
    if (headerEl) headerEl.removeAttribute('aria-hidden');
    if (footerEl) footerEl.removeAttribute('aria-hidden');

    // Return focus to triggering card button
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function nextLightbox() {
    updateLightboxContent(currentLightboxIndex + 1);
  }

  function prevLightbox() {
    updateLightboxContent(currentLightboxIndex - 1);
  }

  // Open triggers on cards
  if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.gallery-open-btn');
      if (!openBtn) return;
      const itemId = openBtn.dataset.lightboxTarget;
      if (itemId) {
        openLightbox(itemId);
      }
    });
  }

  // Close triggers
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextLightbox);
  }

  // Backdrop click to close (only if clicking the backdrop itself, not modal dialog)
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation & Focus trapping
  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.hasAttribute('hidden')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextLightbox();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevLightbox();
    } else if (e.key === 'Tab') {
      // Focus trap within modal
      const focusableElements = [lightboxClose, lightboxPrev, lightboxNext].filter(Boolean);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxInner) {
    lightboxInner.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxInner.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        nextLightbox();
      } else {
        prevLightbox();
      }
    }
  }
});
