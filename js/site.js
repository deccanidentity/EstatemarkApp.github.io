// Small navigation toggle script (no frameworks)
document.addEventListener('DOMContentLoaded', function () {
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    const navId = btn.getAttribute('aria-controls');
    const nav = document.getElementById(navId);
    if (!nav) return;

    function closeNav() {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }

    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    // Close nav on Escape key when open
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && 
          !nav.contains(e.target) && 
          !btn.contains(e.target)) {
        closeNav();
      }
    });
  });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('appRequestModal');
    const requestButtons = document.querySelectorAll('a[href*="Estatemark-Mobile"]');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('appRequestForm');
    
    // Form submission handler
    if (form) {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Create success message
          const successMsg = document.createElement('div');
          successMsg.className = 'success-message';
          successMsg.textContent = 'Your request has been submitted successfully!';
          
          // Replace form with success message
          form.style.display = 'none';
          form.parentNode.insertBefore(successMsg, form);
          
          // Close modal after 2 seconds
          setTimeout(() => {
              if (modal) modal.style.display = 'none';
              document.body.style.overflow = 'auto';
              // Reset form and remove success message
              form.reset();
              form.style.display = 'grid';
              successMsg.remove();
          }, 2000);
      });
    }
    
    // Modal open/close handlers
    if (modal) {
      requestButtons.forEach(btn => {
          btn.addEventListener('click', function(e) {
              e.preventDefault();
              modal.style.display = 'block';
              document.body.style.overflow = 'hidden';
          });
      });
      
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
      }
      
      window.addEventListener('click', function(e) {
          if (e.target === modal) {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
          }
      });
    }
});

// Publish the real header height as --header-h so full-viewport sections (home hero) fit exactly
(function () {
  function setHeaderHeight() {
    var h = document.querySelector('header');
    if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
  }
  document.addEventListener('DOMContentLoaded', setHeaderHeight);
  window.addEventListener('load', setHeaderHeight);
  window.addEventListener('resize', setHeaderHeight);
})();

// Header Download Icon Click Handler & Desktop Store Selector Modal
(function () {
  var PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.estatemark.app';
  var APP_STORE_URL = 'https://apps.apple.com/us/app/estatemark-property-booking/id6759548018';

  function isAndroid() {
    return /android/i.test(navigator.userAgent || '');
  }

  function isIOS() {
    var ua = navigator.userAgent || navigator.vendor || window.opera || '';
    return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function handleDownloadClick(e) {
    if (e) e.preventDefault();
    if (isAndroid()) {
      window.location.href = PLAY_STORE_URL;
    } else if (isIOS()) {
      window.location.href = APP_STORE_URL;
    } else {
      openDownloadStoreModal();
    }
  }

  function openDownloadStoreModal() {
    var modal = document.getElementById('downloadStoreModal');
    if (!modal) {
      modal = createDownloadModal();
    }
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeBtn = modal.querySelector('.download-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeDownloadStoreModal() {
    var modal = document.getElementById('downloadStoreModal');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  }

  function createDownloadModal() {
    var modal = document.createElement('div');
    modal.id = 'downloadStoreModal';
    modal.className = 'download-store-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'downloadModalTitle');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="download-store-modal-card">' +
        '<button type="button" class="download-modal-close" aria-label="Close dialog">&times;</button>' +
        '<div class="download-modal-header">' +
          '<h3 id="downloadModalTitle">Download EstateMark</h3>' +
          '<p>Select your platform to download the mobile app</p>' +
        '</div>' +
        '<div class="download-modal-options">' +
          '<a href="' + PLAY_STORE_URL + '" target="_blank" rel="noopener noreferrer" class="download-store-btn google-play" aria-label="Get it on Google Play">' +
            '<img src="images/GooglePlayStore_img.png" alt="Get it on Google Play">' +
          '</a>' +
          '<a href="' + APP_STORE_URL + '" target="_blank" rel="noopener noreferrer" class="download-store-btn app-store" aria-label="Download on the App Store">' +
            '<img src="images/iosStore.png" alt="Download on the App Store">' +
          '</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeDownloadStoreModal();
      }
    });

    var closeBtn = modal.querySelector('.download-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeDownloadStoreModal);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeDownloadStoreModal();
      }
    });

    return modal;
  }

  window.openDownloadStoreModal = openDownloadStoreModal;
  window.closeDownloadStoreModal = closeDownloadStoreModal;

  document.addEventListener('DOMContentLoaded', function () {
    var downloadLinks = document.querySelectorAll('.nav-download-link');
    downloadLinks.forEach(function (link) {
      link.addEventListener('click', handleDownloadClick);
    });

    // Mobile tap tooltip support for Call and Download action icons
    var actionLinks = document.querySelectorAll('.nav-call-link, .nav-download-link');
    actionLinks.forEach(function (el) {
      el.addEventListener('touchstart', function () {
        actionLinks.forEach(function (other) {
          if (other !== el) other.classList.remove('tooltip-active');
        });
        el.classList.add('tooltip-active');
        setTimeout(function () {
          el.classList.remove('tooltip-active');
        }, 2200);
      }, { passive: true });
    });

    document.addEventListener('touchstart', function (e) {
      actionLinks.forEach(function (el) {
        if (!el.contains(e.target)) {
          el.classList.remove('tooltip-active');
        }
      });
    }, { passive: true });
  });
})();
