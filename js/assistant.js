/**
 * EstateMark Showcase AI Assistant
 * DeccanIDentity Software Private Limited
 * 
 * Provides an interactive, client-side demonstration AI assistant
 * answering visitor queries regarding EstateMark's support for
 * plots, flats, villas, real-time synchronization, and scheduling demos.
 * 
 * Note: Modular response engine designed so genuine AI APIs (e.g. Gemini)
 * can be integrated via backend without rewriting the UI layer.
 */

(function () {
  'use strict';

  // Knowledge base for EstateMark showcase responses
  const KNOWLEDGE_BASE = [
    {
      id: 'plots',
      keywords: ['plot', 'plots', 'layout', 'layouts', 'land', 'farmland', 'survey', 'cad', 'svg', 'dimensions', 'facing', 'sqyd', 'square yard'],
      response: `<strong>EstateMark for Plotted Developments & Land Layouts:</strong><br><br>
• <strong>Interactive Master Layout:</strong> Converts static CAD/blueprint drawings into interactive, zoomable vector layouts on web and mobile.<br>
• <strong>Live Status Visibility:</strong> Every plot is color-coded in real time &mdash; <span style="color:#10b981;font-weight:600;">Available (Green)</span>, <span style="color:#f59e0b;font-weight:600;">On Hold (Amber)</span>, <span style="color:#2563eb;font-weight:600;">Booked (Blue)</span>, or <span style="color:#8b5cf6;font-weight:600;">Blocked (Purple)</span>.<br>
• <strong>15-Minute Temporary Holds:</strong> Sales executives on-site can lock a plot during negotiations to prevent double bookings.<br>
• <strong>Key Specs at a Glance:</strong> Instant visibility into plot area (Sq. Yds / Sq. Ft), cardinal facings (East, West, North, South), and road widths (30', 40', 60').`
    },
    {
      id: 'flats',
      keywords: ['flat', 'flats', 'apartment', 'apartments', 'tower', 'towers', 'floor', 'floors', 'bhk', '1bhk', '2bhk', '3bhk', 'penthouse', 'unit', 'units', 'high-rise', 'condo'],
      response: `<strong>EstateMark for Flats & Multi-Storey Apartments:</strong><br><br>
• <strong>Tower & Floor Matrix:</strong> View and navigate multi-tower projects with structured, floor-by-floor unit inventory grids.<br>
• <strong>Unit Type Tracking:</strong> Filter and monitor availability across 1BHK, 2BHK, 3BHK, duplexes, and penthouses in real time.<br>
• <strong>Sales Gallery & HQ Sync:</strong> Eliminates mismatched spreadsheets between on-site sales offices, channel partners, and headquarters.<br>
• <strong>Instant Status Updates:</strong> As soon as a flat is reserved or booked, all connected sales executives see the update in under a second.`
    },
    {
      id: 'villas',
      keywords: ['villa', 'villas', 'gated community', 'gated', 'duplex villa', 'triplex', 'bungalow', 'enclave', 'luxury home', 'row house'],
      response: `<strong>EstateMark for Luxury Villas & Gated Communities:</strong><br><br>
• <strong>Phase-Wise Mapping:</strong> Track gated villa layouts with plot-plus-villa inventory, elevation designs, and phased releases.<br>
• <strong>Construction Milestone Tracking:</strong> Follow booking progress alongside foundation, structure, and handover milestones.<br>
• <strong>High-Impact Presentation:</strong> Relationship managers can present community masterplans and villa orientations cleanly on tablets and mobile phones.<br>
• <strong>Approval Workflows:</strong> Controlled price discount permissions and executive authorizations for high-value sales.`
    },
    {
      id: 'double_booking',
      keywords: ['double book', 'double-book', 'conflict', 'conflicts', 'sync', 'synchronization', 'clash', 'concurrent', 'lock', 'locks', 'real time', 'real-time'],
      response: `<strong>Clash-Free Booking & Real-Time Sync:</strong><br><br>
• <strong>Sub-Second Cloud Sync:</strong> Any status change made by one agent propagates to all connected devices instantly.<br>
• <strong>Zero Double-Bookings:</strong> Temporary lockouts prevent two sales executives from taking advances on the same plot, flat, or villa simultaneously.<br>
• <strong>Audit Trails:</strong> Every status transition records who reserved the unit, timestamp, and customer reference for complete operational transparency.`
    },
    {
      id: 'roles',
      keywords: ['role', 'roles', 'permission', 'permissions', 'access', 'admin', 'manager', 'agent', 'hierarchy', 'security'],
      response: `<strong>Role-Based Access Control:</strong><br><br>
• <strong>Developers / Admins:</strong> Full authority over project creation, CAD layout imports, pricing setup, user permissions, and master audit logs.<br>
• <strong>Sales Managers:</strong> Review pipeline, approve price concessions, override temporary holds, and track team conversion metrics.<br>
• <strong>Field Sales Agents:</strong> Mobile-optimized view to inspect live inventory, present layouts to buyers, and apply temporary 15-minute holds.<br>
• <strong>Documentation Officers:</strong> Monitor token advances, payment milestones, and booking documentation.`
    },
    {
      id: 'mobile',
      keywords: ['mobile', 'app', 'apps', 'android', 'ios', 'iphone', 'ipad', 'play store', 'app store', 'download'],
      response: `<strong>Cross-Platform Mobile & Web Availability:</strong><br><br>
• <strong>Android:</strong> Available on Google Play Store for smartphones and tablets.<br>
• <strong>iOS:</strong> Available on Apple App Store for iPhone and iPad.<br>
• <strong>Web Portal:</strong> Accessible via any modern web browser without plugin installations.<br>
• Field agents can comfortably present layouts on-site without carrying paper maps or heavy files.`
    },
    {
      id: 'pricing',
      keywords: ['price', 'pricing', 'cost', 'plan', 'plans', 'free', 'pro', 'pro plus', 'subscription', 'fee'],
      response: `<strong>Flexible Plans for Real Estate Developers:</strong><br><br>
• <strong>Free Tier:</strong> Great for testing the platform and evaluating small layout workflows.<br>
• <strong>Pro Tier:</strong> Designed for active builders managing multi-project layouts, team synchronization, and standard reporting.<br>
• <strong>Pro Plus / Enterprise:</strong> Complete solution with multi-tower flat grids, villa milestone tracking, role hierarchies, and dedicated SLAs.<br><br>
Would you like a custom quote? Click <strong>Request Demo</strong> above to connect with our team!`
    },
    {
      id: 'demo',
      keywords: ['demo', 'request demo', 'trial', 'schedule', 'contact', 'call', 'talk', 'meeting', 'phone', 'email'],
      response: `<strong>Request a Live EstateMark Walkthrough:</strong><br><br>
• Click the <strong>'Request Demo'</strong> button at the top of this page to submit your details.<br>
• <strong>Direct Phone:</strong> <a href="tel:+919000035869" style="color:#0046ad;font-weight:600;">+91 90000 35869</a><br>
• <strong>Email:</strong> <a href="mailto:info@deccanidentity.com" style="color:#0046ad;font-weight:600;">info@deccanidentity.com</a><br>
• <strong>Office:</strong> Deccan IDentity Software Pvt. Ltd., Hyderabad, Telangana.<br><br>
Our product team typically arranges a personalized demonstration within 24 hours.`
    },
    {
      id: 'company',
      keywords: ['company', 'about', 'deccan', 'identity', 'deccanidentity', 'who made', 'developer', 'who are you', 'uptime', 'sla'],
      response: `<strong>About DeccanIDentity & EstateMark:</strong><br><br>
• EstateMark is developed by <strong>DeccanIDentity Software Private Limited</strong> in Hyderabad, India.<br>
• We build enterprise-grade software specifically for builders, real estate developers, and layout promoters.<br>
• Backed by an enterprise <strong>99.9% Uptime SLA</strong>, multi-device synchronization, and secure cloud infrastructure.`
    }
  ];

  // Fallback response for unhandled queries
  const FALLBACK_RESPONSE = `Thank you for your question! As the <strong>EstateMark Showcase Assistant</strong>, I specialize in explaining our real estate inventory & booking management capabilities.<br><br>
Here are common topics I can help you with:<br>
• <strong>Plots:</strong> How CAD layouts, road widths, and plot statuses are managed.<br>
• <strong>Flats:</strong> Floor-by-floor apartment matrices and multi-tower inventory.<br>
• <strong>Villas:</strong> Gated community phase tracking and milestone management.<br>
• <strong>Zero Double-Bookings:</strong> Sub-second cloud synchronization and 15-minute holds.<br>
• <strong>Requesting a Demo:</strong> Connecting with our product team for a live walkthrough.<br><br>
<em>Click one of the suggested buttons below or type your question!</em>`;

  /**
   * Modular response resolver.
   * Can be swapped with a fetch() call to a backend AI service if configured.
   */
  function resolveAssistantResponse(userText) {
    if (!userText || !userText.trim()) {
      return 'Please enter a question about plots, flats, villas, or EstateMark features.';
    }

    const clean = userText.toLowerCase().trim();

    // Check knowledge base
    let bestMatch = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (clean.includes(kw)) {
          // Weight longer keyword matches higher
          score += kw.length;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch.response;
    }

    return FALLBACK_RESPONSE;
  }

  // DOM Elements & Assistant State
  let container = null;
  let toggleBtn = null;
  let chatWindow = null;
  let messagesContainer = null;
  let chatForm = null;
  let chatInput = null;
  let closeBtn = null;
  let clearBtn = null;
  let isOpen = false;
  let isTyping = false;

  let wasDragged = false;
  let isDragging = false;  // outer-scope flag; shared between toggle handler and drag handler

  function initAssistant() {
    container = document.getElementById('aiAssistantContainer');
    toggleBtn = document.getElementById('aiAssistantToggle');
    chatWindow = document.getElementById('aiAssistantWindow');
    messagesContainer = document.getElementById('aiChatMessages');
    chatForm = document.getElementById('aiChatForm');
    chatInput = document.getElementById('aiChatInput');
    closeBtn = document.getElementById('aiChatClose');
    clearBtn = document.getElementById('aiChatClear');

    if (!toggleBtn || !chatWindow) return;

    function handleToggleClick(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (wasDragged || isDragging) return;
      toggleChat();
    }

    // Toggle button handler
    toggleBtn.addEventListener('click', handleToggleClick);

    // Wrapper click handler (fallback if event targets wrapper or SVG directly)
    const triggerWrapper = document.getElementById('aiTriggerWrapper');
    if (triggerWrapper) {
      triggerWrapper.addEventListener('click', function (e) {
        if (e.target.closest('#aiAssistantWindow')) return;
        if (e.target.closest('#aiAssistantToggle')) return;
        handleToggleClick(e);
      });
    }

    // Callout click handler
    const calloutEl = container.querySelector('#aiRobotCallout');
    if (calloutEl) {
      calloutEl.addEventListener('click', function (e) {
        handleToggleClick(e);
      });
    }

    // Close button handler
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeChat();
      });
    }

    // Clear chat handler
    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        clearChat();
      });
    }

    // Form submit handler
    if (chatForm) {
      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        handleUserSubmit();
      });
    }

    // Textarea Enter key handling (Enter = send, Shift+Enter = newline)
    if (chatInput) {
      chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleUserSubmit();
        }
      });

      // Auto-grow textarea up to 4 lines
      chatInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
      });
    }

    // Suggestion chips handler via event delegation
    const suggestionsContainer = document.getElementById('aiChatSuggestions');
    if (suggestionsContainer) {
      suggestionsContainer.addEventListener('click', function (e) {
        const chip = e.target.closest('.ai-chip');
        if (!chip) return;
        const query = chip.getAttribute('data-query');
        if (query) {
          addUserMessage(query);
          respondToQuery(query);
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    });

    // Initialize draggable movement
    initDraggableTrigger();

    // Seed initial greeting if empty
    if (messagesContainer && messagesContainer.children.length === 0) {
      seedGreeting();
    }
  }

  function positionChatWindow() {
    if (!chatWindow || !toggleBtn) return;

    if (window.innerWidth <= 480) {
      chatWindow.style.left = '12px';
      chatWindow.style.right = '12px';
      chatWindow.style.top = 'auto';
      chatWindow.style.bottom = '82px';
      chatWindow.style.width = 'calc(100vw - 24px)';
      chatWindow.style.maxHeight = 'calc(100vh - 100px)';
      return;
    }

    const triggerEl = document.getElementById('aiTriggerWrapper') || toggleBtn;
    const rect = triggerEl.getBoundingClientRect();
    const margin = 16;
    const chatWidth = 380;
    const gap = 14;

    // Horizontal placement: anchor near robot position
    if (rect.left < window.innerWidth / 2) {
      // Robot on left half: anchor chat window to left
      const targetLeft = Math.max(margin, Math.min(rect.left, window.innerWidth - chatWidth - margin));
      chatWindow.style.left = `${targetLeft}px`;
      chatWindow.style.right = 'auto';
    } else {
      // Robot on right half: anchor chat window to right
      const targetRight = Math.max(margin, Math.min(window.innerWidth - rect.right, window.innerWidth - chatWidth - margin));
      chatWindow.style.right = `${targetRight}px`;
      chatWindow.style.left = 'auto';
    }

    // Vertical placement: open above or below depending on robot quadrant
    if (rect.top > window.innerHeight / 2) {
      // Robot in bottom half -> open chat window ABOVE the robot
      const targetBottom = Math.max(margin, window.innerHeight - rect.top + gap);
      chatWindow.style.bottom = `${targetBottom}px`;
      chatWindow.style.top = 'auto';
      const availableHeight = rect.top - margin - gap;
      chatWindow.style.maxHeight = `${Math.min(580, Math.max(320, availableHeight))}px`;
    } else {
      // Robot in top half -> open chat window BELOW the robot
      const targetTop = Math.max(margin, rect.bottom + gap);
      chatWindow.style.top = `${targetTop}px`;
      chatWindow.style.bottom = 'auto';
      const availableHeight = window.innerHeight - rect.bottom - margin - gap;
      chatWindow.style.maxHeight = `${Math.min(580, Math.max(320, availableHeight))}px`;
    }
  }

  function initDraggableTrigger() {
    const triggerEl = document.getElementById('aiTriggerWrapper');
    if (!triggerEl) return;

    let isPointerDown = false;
    // isDragging is declared in outer scope so handleToggleClick can read it
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    const dragThreshold = 6;

    function clampPosition(left, top) {
      const margin = 16;
      const triggerBtn = triggerEl.querySelector('#aiAssistantToggle') || triggerEl;
      const width = triggerBtn.offsetWidth || 52;
      const height = triggerBtn.offsetHeight || 52;
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
        triggerEl.classList.add('ai-align-left');
      } else {
        triggerEl.classList.remove('ai-align-left');
      }

      if (top < midY) {
        triggerEl.classList.add('ai-align-top');
      } else {
        triggerEl.classList.remove('ai-align-top');
      }
    }

    function setPosition(x, y) {
      triggerEl.style.left = `${x}px`;
      triggerEl.style.top = `${y}px`;
      triggerEl.style.right = 'auto';
      triggerEl.style.bottom = 'auto';
      updateAlignment(x, y);
    }

    function resetToDefaultPosition() {
      triggerEl.style.left = 'auto';
      triggerEl.style.top = 'auto';
      triggerEl.style.right = '24px';
      triggerEl.style.bottom = '24px';
      triggerEl.classList.remove('ai-align-left');
      triggerEl.classList.remove('ai-align-top');
    }

    triggerEl.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (isOpen) return;

      isPointerDown = true;
      isDragging = false;  // reset outer-scope flag
      startX = e.clientX;
      startY = e.clientY;

      const rect = triggerEl.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      // Do NOT capture pointer here, so standard click events can fire naturally
    });

    // Listen on window (not the 52px button) so a fast drag never loses the pointer
    window.addEventListener('pointermove', function (e) {
      if (!isPointerDown) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDragging && Math.hypot(dx, dy) > dragThreshold) {
        isDragging = true;
        wasDragged = true;
        triggerEl.classList.add('is-dragging');
        document.body.style.userSelect = 'none';

        // Capture pointer now that user is actively dragging
        try {
          triggerEl.setPointerCapture(e.pointerId);
        } catch (err) {}
      }

      if (isDragging) {
        const newLeft = initialLeft + dx;
        const newTop = initialTop + dy;
        const clamped = clampPosition(newLeft, newTop);
        setPosition(clamped.x, clamped.y);
      }
    });

    function endDrag(e) {
      if (!isPointerDown) return;
      isPointerDown = false;

      if (isDragging) {
        try {
          if (e && e.pointerId) {
            triggerEl.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}

        document.body.style.userSelect = '';
        triggerEl.classList.remove('is-dragging');

        const rect = triggerEl.getBoundingClientRect();

        // Suppress click trigger after finishing a drag action
        setTimeout(() => {
          isDragging = false;
          wasDragged = false;
        }, 160);
      } else {
        wasDragged = false;
      }
    }

    triggerEl.addEventListener('pointerup', endDrag);
    triggerEl.addEventListener('pointercancel', endDrag);

    // Global listener fallback for high-speed mouse sweeps
    window.addEventListener('pointerup', function (e) {
      if (isPointerDown) endDrag(e);
    });

    window.addEventListener('resize', function () {
      if (triggerEl.style.left && triggerEl.style.top) {
        const currentLeft = parseFloat(triggerEl.style.left);
        const currentTop = parseFloat(triggerEl.style.top);
        const clamped = clampPosition(currentLeft, currentTop);
        setPosition(clamped.x, clamped.y);
      }
      if (isOpen) {
        positionChatWindow();
      }
    });
  }

  function seedGreeting() {
    if (!messagesContainer) return;
    messagesContainer.innerHTML = '';

    const greetingHTML = `
      <div class="ai-msg ai-msg-bot">
        <div class="ai-msg-avatar">
          <img src="images/logo.png" alt="EstateMark">
        </div>
        <div class="ai-msg-body">
          <div class="ai-msg-content">
            Hello! 👋 I'm the <strong>EstateMark Showcase Assistant</strong>.
            <br><br>
            I can explain how EstateMark helps builders and developers manage <strong>plots</strong>, <strong>flats</strong>, and <strong>villas</strong> with real-time sync and zero double-bookings.
            <br><br>
            How can I assist you today?
          </div>
          <span class="ai-msg-time">${getCurrentTimeString()}</span>
        </div>
      </div>
    `;
    messagesContainer.innerHTML = greetingHTML;
  }

  function toggleChat() {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  function openChat() {
    isOpen = true;
    positionChatWindow();
    chatWindow.style.display = 'flex';
    chatWindow.classList.add('ai-chat-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('ai-btn-active');

    const triggerWrapper = container.querySelector('.ai-trigger-wrapper');
    if (triggerWrapper) triggerWrapper.classList.add('is-open');

    // Update button icons
    const openIcon = toggleBtn.querySelector('.ai-btn-icon-open');
    const closeIcon = toggleBtn.querySelector('.ai-btn-icon-close');
    const labelText = container.querySelector('.ai-callout-text');
    if (openIcon) openIcon.style.display = 'none';
    if (closeIcon) closeIcon.style.display = 'inline-block';
    if (labelText) labelText.textContent = 'Close';

    // Scroll to bottom
    scrollToBottom();

    // Focus input on desktop
    if (window.innerWidth > 600 && chatInput) {
      setTimeout(() => chatInput.focus(), 150);
    }
  }

  function closeChat() {
    isOpen = false;
    chatWindow.style.display = 'none';
    chatWindow.classList.remove('ai-chat-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('ai-btn-active');

    const triggerWrapper = container.querySelector('.ai-trigger-wrapper');
    if (triggerWrapper) triggerWrapper.classList.remove('is-open');

    const openIcon = toggleBtn.querySelector('.ai-btn-icon-open');
    const closeIcon = toggleBtn.querySelector('.ai-btn-icon-close');
    const labelText = container.querySelector('.ai-callout-text');
    if (openIcon) openIcon.style.display = 'inline-flex';
    if (closeIcon) closeIcon.style.display = 'none';
    if (labelText) labelText.textContent = 'Ask AI';

    toggleBtn.focus();
  }

  function clearChat() {
    seedGreeting();
    if (chatInput) {
      chatInput.value = '';
      chatInput.style.height = 'auto';
    }
  }

  function handleUserSubmit() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';
    chatInput.style.height = 'auto';

    addUserMessage(text);
    respondToQuery(text);
  }

  function addUserMessage(text) {
    if (!messagesContainer) return;
    const safeText = escapeHTML(text);

    const msgEl = document.createElement('div');
    msgEl.className = 'ai-msg ai-msg-user';
    msgEl.innerHTML = `
      <div class="ai-msg-body">
        <div class="ai-msg-content">${safeText}</div>
        <span class="ai-msg-time">${getCurrentTimeString()}</span>
      </div>
    `;
    messagesContainer.appendChild(msgEl);
    scrollToBottom();
  }

  function showTypingIndicator() {
    if (isTyping || !messagesContainer) return null;
    isTyping = true;

    const typingEl = document.createElement('div');
    typingEl.id = 'aiTypingIndicator';
    typingEl.className = 'ai-msg ai-msg-bot ai-msg-typing';
    typingEl.innerHTML = `
      <div class="ai-msg-avatar">
        <img src="images/logo.png" alt="EstateMark">
      </div>
      <div class="ai-msg-body">
        <div class="ai-msg-content">
          <div class="ai-typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    scrollToBottom();
    return typingEl;
  }

  function removeTypingIndicator() {
    isTyping = false;
    const typingEl = document.getElementById('aiTypingIndicator');
    if (typingEl) typingEl.remove();
  }

  function respondToQuery(query) {
    showTypingIndicator();

    // Natural responsive delay (500-750ms) to simulate reasoning
    const delay = Math.floor(Math.random() * 250) + 500;

    setTimeout(() => {
      removeTypingIndicator();
      const responseHTML = resolveAssistantResponse(query);

      const msgEl = document.createElement('div');
      msgEl.className = 'ai-msg ai-msg-bot';
      msgEl.innerHTML = `
        <div class="ai-msg-avatar">
          <img src="images/logo.png" alt="EstateMark">
        </div>
        <div class="ai-msg-body">
          <div class="ai-msg-content">${responseHTML}</div>
          <span class="ai-msg-time">${getCurrentTimeString()}</span>
        </div>
      `;
      messagesContainer.appendChild(msgEl);
      scrollToBottom();
    }, delay);
  }

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function getCurrentTimeString() {
    const d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Expose API for external integration or tests
  window.EstateMarkAssistant = {
    init: initAssistant,
    open: openChat,
    close: closeChat,
    toggle: toggleChat,
    clear: clearChat,
    sendQuery: function (q) {
      addUserMessage(q);
      respondToQuery(q);
    },
    getResponse: resolveAssistantResponse
  };

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
  } else {
    initAssistant();
  }
})();
