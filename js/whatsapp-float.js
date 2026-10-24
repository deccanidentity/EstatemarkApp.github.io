/**
 * Draggable WhatsApp Floating Icon
 * EstateMark Website
 * 
 * Provides draggable functionality for the WhatsApp floating button
 * Similar to the AI assistant draggable implementation
 */

(function () {
  'use strict';

  function initDraggableWhatsApp() {
    const wrapper = document.getElementById('whatsappFloatingWrapper');
    if (!wrapper) return;

    let isPointerDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    const dragThreshold = 6;
    let suppressClick = false;

    function clampPosition(left, top) {
      const margin = 16;
      const btn = wrapper.querySelector('.whatsapp-floating-btn') || wrapper;
      const width = btn.offsetWidth || 52;
      const height = btn.offsetHeight || 52;
      const minX = margin;
      const maxX = Math.max(minX, window.innerWidth - width - margin);
      const minY = margin;
      const maxY = Math.max(minY, window.innerHeight - height - margin);

      return {
        x: Math.min(Math.max(left, minX), maxX),
        y: Math.min(Math.max(top, minY), maxY)
      };
    }

    function updateAlignment(left, top) {
      const midX = window.innerWidth / 2;
      const midY = window.innerHeight / 2;

      if (left < midX) {
        wrapper.classList.add('wa-align-left');
      } else {
        wrapper.classList.remove('wa-align-left');
      }

      if (top < midY) {
        wrapper.classList.add('wa-align-top');
      } else {
        wrapper.classList.remove('wa-align-top');
      }
    }

    function onPointerDown(e) {
      if (e.button !== 0 && e.type === 'mousedown') return;

      isPointerDown = true;
      isDragging = false;
      startX = e.clientX || e.touches[0].clientX;
      startY = e.clientY || e.touches[0].clientY;
      initialLeft = wrapper.offsetLeft;
      initialTop = wrapper.offsetTop;

      wrapper.style.transition = 'none';
    }

    function onPointerMove(e) {
      if (!isPointerDown) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      if (!clientX || !clientY) return;

      const dx = clientX - startX;
      const dy = clientY - startY;

      if (!isDragging && Math.hypot(dx, dy) > dragThreshold) {
        isDragging = true;
        wrapper.classList.add('is-dragging');
      }

      if (isDragging) {
        e.preventDefault();
        const newPos = clampPosition(initialLeft + dx, initialTop + dy);
        wrapper.style.left = newPos.x + 'px';
        wrapper.style.top = newPos.y + 'px';
        wrapper.style.bottom = 'auto';
        wrapper.style.right = 'auto';
        updateAlignment(newPos.x, newPos.y);
      }
    }

    function onPointerUp(e) {
      if (!isPointerDown) return;

      isPointerDown = false;
      wrapper.classList.remove('is-dragging');
      wrapper.style.transition = 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1), top 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        // A drag must never open WhatsApp: swallow the click that follows the release
        suppressClick = true;
        setTimeout(function () { suppressClick = false; }, 300);
        isDragging = false;
      }
    }

    // Block the click that follows a drag, and the browser's native link-drag ghost
    wrapper.addEventListener('click', function (e) {
      if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    wrapper.addEventListener('dragstart', function (e) { e.preventDefault(); });

    wrapper.addEventListener('mousedown', onPointerDown);
    wrapper.addEventListener('touchstart', onPointerDown, { passive: false });

    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('touchmove', onPointerMove, { passive: false });

    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchend', onPointerUp);

    // Keep the icon inside the visible screen if the window is resized
    window.addEventListener('resize', function () {
      if (!wrapper.style.left) return; // still at its CSS default corner
      const pos = clampPosition(wrapper.offsetLeft, wrapper.offsetTop);
      wrapper.style.left = pos.x + 'px';
      wrapper.style.top = pos.y + 'px';
      updateAlignment(pos.x, pos.y);
    });

    // No position is set here: until it is dragged the icon stays anchored to its
    // default bottom-left corner by CSS (and nothing is persisted across refreshes).
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDraggableWhatsApp);
  } else {
    initDraggableWhatsApp();
  }
})();
