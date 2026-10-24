/**
 * Shared floating widgets (WhatsApp + AI assistant) - EstateMark website
 *
 * One script, included on every page, so the markup lives in a single place.
 *  - WhatsApp icon: bottom-left by default, tooltip "WhatsApp", draggable (js/whatsapp-float.js)
 *  - AI robot icon: bottom-right by default, draggable (js/assistant.js)
 * Neither position is persisted, so both icons return to their default
 * corners whenever the page is refreshed.
 */
(function () {
  'use strict';
  if (document.getElementById('aiAssistantContainer')) return; // already present

  var MARKUP = `
  <!-- Draggable WhatsApp Floating Icon -->
  <div id="whatsappFloatingWrapper" class="whatsapp-floating-wrapper wa-align-left">
    <a href="https://wa.me/918186035869?text=Hello%20Estatemark%20team%2C%20I%20would%20like%20to%20know%20more"
       class="whatsapp-floating-btn"
       target="_blank"
       rel="noopener noreferrer"
       draggable="false"
       aria-describedby="waTooltip"
       aria-label="Chat on WhatsApp: +91 81860 35869">
      <i class="fa fa-whatsapp" aria-hidden="true"></i>
    </a>
    <span class="wa-tooltip" id="waTooltip" role="tooltip">WhatsApp</span>
  </div>

  <!-- Showcase AI Assistant -->
  <div id="aiAssistantContainer" class="ai-assistant-container" role="region" aria-label="EstateMark AI Assistant Widget">
    <!-- Trigger Button & Floating Hover Tooltip (Draggable to every corner) -->
    <div class="ai-trigger-wrapper" id="aiTriggerWrapper">
      <button id="aiAssistantToggle" class="ai-assistant-btn robot-mode" aria-haspopup="dialog" aria-expanded="false"
        aria-controls="aiAssistantWindow" aria-label="Ask AI" aria-describedby="aiRobotCallout">
        <!-- Robot Icon with Blinking Eyes and Friendly Waving Hand -->
        <span class="ai-btn-icon-open">
          <svg class="robot-avatar-svg" width="34" height="34" viewBox="0 0 52 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- Antenna with glowing orb -->
            <line x1="24" y1="5" x2="24" y2="11" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
            <circle cx="24" cy="4.5" r="2.8" fill="#38bdf8" class="robot-antenna-tip"/>

            <!-- Left audio node / ear -->
            <rect x="5" y="17" width="3.5" height="10" rx="1.8" fill="#93c5fd"/>
            <circle cx="6.8" cy="22" r="1.3" fill="#38bdf8"/>

            <!-- Right audio node / ear -->
            <rect x="39.5" y="17" width="3.5" height="10" rx="1.8" fill="#93c5fd"/>
            <circle cx="41.2" cy="22" r="1.3" fill="#38bdf8"/>

            <!-- Robot Head Chassis -->
            <rect x="8" y="11" width="32" height="26" rx="9" fill="#ffffff" stroke="#e0e7ff" stroke-width="1.5"/>

            <!-- Screen / Visor -->
            <rect x="12" y="15" width="24" height="18" rx="6" fill="#0b1329"/>

            <!-- Blinking Digital Eyes -->
            <ellipse class="robot-eye robot-eye-left" cx="18" cy="22.5" rx="2.8" ry="3.8" fill="#38bdf8"/>
            <ellipse class="robot-eye robot-eye-right" cx="30" cy="22.5" rx="2.8" ry="3.8" fill="#38bdf8"/>
            <circle class="robot-eye-glint robot-glint-left" cx="19" cy="21.2" r="1" fill="#ffffff"/>
            <circle class="robot-eye-glint robot-glint-right" cx="31" cy="21.2" r="1" fill="#ffffff"/>

            <!-- Friendly Tech Smile -->
            <path d="M21 28 Q24 30.5 27 28" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" fill="none"/>

            <!-- Tech Sensor Cheek Accents -->
            <circle cx="15" cy="27" r="0.7" fill="#38bdf8" opacity="0.6"/>
            <circle cx="33" cy="27" r="0.7" fill="#38bdf8" opacity="0.6"/>

            <!-- Base Neck Connector -->
            <rect x="21" y="37" width="6" height="3" rx="1.5" fill="#cbd5e1"/>

            <!-- Friendly Waving Hand and Arm (Lifts and waves smoothly on hover) -->
            <g class="robot-waving-arm" id="robotWavingArm">
              <path d="M 39 34 Q 44 31 46.5 24" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" fill="none"/>
              <circle cx="46.8" cy="21" r="3" fill="#ffffff" stroke="#e0e7ff" stroke-width="1"/>
              <circle cx="46.8" cy="21" r="1.2" fill="#38bdf8"/>
              <circle cx="44.5" cy="17.6" r="0.9" fill="#93c5fd"/>
              <circle cx="47" cy="17" r="0.9" fill="#93c5fd"/>
              <circle cx="49.5" cy="18" r="0.9" fill="#93c5fd"/>
            </g>
          </svg>
        </span>
        <span class="ai-btn-icon-close" style="display:none;" aria-hidden="true">&times;</span>
        <span class="ai-badge-pulse" aria-hidden="true"></span>
      </button>

      <!-- Hover Tooltip Pill (Hidden by default; appears as "Ask AI" on hover) -->
      <span class="ai-btn-label ai-robot-callout" id="aiRobotCallout" role="tooltip" aria-hidden="true">
        <span class="ai-callout-sparkle" aria-hidden="true">✨</span>
        <span class="ai-callout-text">Ask AI</span>
      </span>
    </div>

    <!-- Chat Modal Window -->
    <div id="aiAssistantWindow" class="ai-chat-window" role="dialog" aria-modal="false"
      aria-labelledby="aiChatTitle" style="display: none;">
      <!-- Header -->
      <div class="ai-chat-header">
        <div class="ai-chat-header-info">
          <div class="ai-chat-avatar">
            <img src="images/logo-avatar.jpg" alt="EstateMark Logo">
          </div>
          <div>
            <h3 id="aiChatTitle" class="ai-chat-title">EstateMark Assistant</h3>
            <span class="ai-chat-badge">Showcase AI &bull; Interactive Demo</span>
          </div>
        </div>
        <div class="ai-chat-header-actions">
          <button id="aiChatClear" class="ai-chat-action-btn" title="Reset conversation" aria-label="Clear chat history">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </button>
          <button id="aiChatClose" class="ai-chat-action-btn" aria-label="Close Assistant">
            &times;
          </button>
        </div>
      </div>

      <!-- Messages Thread -->
      <div id="aiChatMessages" class="ai-chat-messages" role="log" aria-live="polite">
        <!-- Seeded dynamically by assistant.js -->
      </div>

      <!-- Suggested Question Chips -->
      <div id="aiChatSuggestions" class="ai-chat-suggestions" aria-label="Suggested Questions">
        <span class="suggestion-heading">Suggested questions:</span>
        <div class="suggestion-chips">
          <button type="button" class="ai-chip" data-query="How does EstateMark manage plot layouts?">Plots &amp; Layouts</button>
          <button type="button" class="ai-chip" data-query="How does EstateMark manage flat availability?">Flats &amp; Apartments</button>
          <button type="button" class="ai-chip" data-query="How does villa inventory and booking work?">Villa Management</button>
          <button type="button" class="ai-chip" data-query="How does real-time sync prevent double booking?">Zero Double Booking</button>
          <button type="button" class="ai-chip" data-query="How can I request a live demo?">Schedule Demo</button>
        </div>
      </div>

      <!-- Chat Input Form -->
      <form id="aiChatForm" class="ai-chat-input-form" onsubmit="return false;">
        <div class="ai-input-wrapper">
          <textarea id="aiChatInput" class="ai-chat-input" placeholder="Ask about plots, flats, villas, or features..." rows="1" aria-label="Type your message"></textarea>
          <button id="aiChatSend" type="submit" class="ai-chat-send-btn" aria-label="Send message">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
        <div class="ai-chat-disclaimer">
          Demonstration assistant &bull; For live consultation, <a href="#" onclick="openPopupArgs('https://docs.google.com/forms/u/0/d/e/1FAIpQLSf7RcqfMHILnU_fDAV8c212EniR1pbsdqpi6rxOKt4ytL_M5g/formResponse', 'entry.1639588951', 'entry.941023126', 'entry.1095327185', 'entry.1040563809', 'entry.80962579'); return false;">Request a Demo</a>.
        </div>
      </form>
    </div>
  </div>


`;

  // Resolve sibling scripts relative to this file, so pages in any folder work.
  var base = '';
  if (document.currentScript && document.currentScript.src) {
    base = document.currentScript.src.replace(/[^\/]*$/, '');
  } else {
    base = 'js/';
  }

  function loadScript(name, done) {
    var s = document.createElement('script');
    s.src = base + name;
    s.onload = done || null;
    document.body.appendChild(s);
  }

  function init() {
    // Older pages shipped a fixed, non-draggable WhatsApp link; remove it so
    // there is only one WhatsApp icon (done at runtime so page markup is untouched).
    document.querySelectorAll('a.whatsapp-float').forEach(function (el) {
      el.parentNode.removeChild(el);
    });

    document.body.insertAdjacentHTML('beforeend', MARKUP);

    // "Request a Demo" link inside the chat uses the Google-Form popup when the
    // page has it; otherwise fall back to the Contact page (no dead link).
    var demo = document.querySelector('.ai-chat-disclaimer a');
    if (demo && typeof window.openPopupArgs !== 'function') {
      demo.removeAttribute('onclick');
      demo.setAttribute('href', 'contact.htm');
    }

    loadScript('assistant.js', function () { loadScript('whatsapp-float.js'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
