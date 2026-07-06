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
    
    // Form submission handler
    const form = document.getElementById('appRequestForm');
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
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Reset form and remove success message
            form.reset();
            form.style.display = 'grid';
            successMsg.remove();
        }, 2000);
    });
    
    // Modal open/close handlers
    requestButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});