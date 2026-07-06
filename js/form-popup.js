// Popup + Google Form bridge.
// Usage: openPopupArgs(actionUrl, entryNameForName, entryNameForEmail, entryNameForPlan, entryNameForPlatform)
// Example: onclick="openPopupArgs('https://docs.google.com/forms/.../formResponse','entry.1639588951','entry.1095327185','entry.1040563809','entry.80962579')"

document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('popup');
  const form = document.getElementById('googleForm');

  // Ensure popup and form exist before proceeding
  if (!popup || !form) return;

  // Default configuration for your Google Form fields
  const DEFAULT_CONFIG = {
    action: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSf7RcqfMHILnU_fDAV8c212EniR1pbsdqpi6rxOKt4ytL_M5g/formResponse',
    fields: {
      name: 'entry.1639588951',
      mobile: 'entry.941023126',
      email: 'entry.1095327185',
      pricingPlan: 'entry.1040563809',
      platform: 'entry.80962579'
    }
  };

  // Global config object (set by openPopupArgs)
  window.popupFormConfig = null;

  // Open popup with optional Google Form mapping
  window.openPopupArgs = function (actionUrl, entryName, entryMobile, entryEmail, entryPlan, entryPlatform) {
    if (actionUrl && entryName && entryMobile && entryEmail && entryPlan && entryPlatform) {
      window.popupFormConfig = {
        action: actionUrl,
        fields: {
          name: entryName,
          mobile: entryMobile,
          email: entryEmail,
          pricingPlan: entryPlan,
          platform: entryPlatform
        }
      };
    } else {
      window.popupFormConfig = DEFAULT_CONFIG;
    }

    popup.style.display = 'block';
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus the first input for accessibility
    const first = form.querySelector('input, select, textarea');
    if (first) first.focus();
  };

  // Close popup
  window.closePopup = function () {
    popup.classList.remove('show');
    popup.style.display = 'none';
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  };

  // Ensure hidden iframe exists for Google Form POST
  if (!document.getElementById('hidden_iframe')) {
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.id = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!window.popupFormConfig) window.popupFormConfig = DEFAULT_CONFIG;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Create a temporary form for POST (avoids CORS)
    const temp = document.createElement('form');
    temp.style.display = 'none';
    temp.method = 'POST';
    temp.action = window.popupFormConfig.action;
    temp.target = 'hidden_iframe';

    const localToField = { name: 'name', email: 'email', mobile: 'mobile', pricingPlan: 'pricingPlan', platform: 'platform' };

    for (const localId in localToField) {
      const el = document.getElementById(localId);
      if (!el) continue;
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = window.popupFormConfig.fields[localId];
      input.value = el.value;
      temp.appendChild(input);
    }

    document.body.appendChild(temp);

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Submit form via hidden iframe
    temp.submit();

    // Clear form inputs
    form.reset();

    // Show success popup
    showTemporaryPopup('✅ Your request has been submitted');

    // Re-enable button and close popup after delay
    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      temp.remove();
      closePopup();
    }, 1500);
  });

  // Temporary success popup
  function showTemporaryPopup(text) {
    const p = document.createElement('div');
    p.className = 'form-popup';
    p.style.position = 'fixed';
    p.style.top = '20px';
    p.style.right = '20px';
    p.style.zIndex = '1100';
    p.style.opacity = '0';
    p.style.transition = 'all 0.25s ease';
    p.innerHTML = `
      <div style="background:#4caf50;color:#fff;padding:12px;border-radius:6px;min-width:220px;box-shadow:0 6px 18px rgba(0,0,0,0.12)">
        ${text}
      </div>`;
    document.body.appendChild(p);

    requestAnimationFrame(() => { p.style.opacity = '1'; });
    setTimeout(() => {
      p.style.opacity = '0';
      setTimeout(() => p.remove(), 300);
    }, 3000);
  }
});

