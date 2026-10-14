/**
 * IMPEX STUDIOS — BESPOKE AGENCY SCRIPTS
 * Live Staging Viewport, Studio Clock, Precision Spotlights, Calculators & Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. LIVE STUDIO CLOCK (EST / Toronto)
  const clockElement = document.getElementById('live-studio-clock');
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    const options = { timeZone: 'America/Toronto', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    clockElement.textContent = now.toLocaleTimeString('en-US', options) + ' EST';
  }
  if (clockElement) {
    updateClock();
    setInterval(updateClock, 1000);
  }

  // 2. HERO INTERACTIVE LIVE STAGING VIEWPORT TABS
  const viewportTabs = document.querySelectorAll('.hero-viewport-tab');
  const viewportScreens = document.querySelectorAll('.hero-viewport-screen');
  const viewportMetricRoi = document.getElementById('hero-viewport-roi');
  const viewportMetricSub = document.getElementById('hero-viewport-sub');
  const viewportUrl = document.getElementById('hero-viewport-url');

  if (viewportTabs.length > 0) {
    viewportTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        const roi = tab.dataset.roi;
        const sub = tab.dataset.sub;
        const url = tab.dataset.url;

        viewportTabs.forEach(t => {
          t.classList.remove('bg-white/10', 'text-white', 'border-white/20');
          t.classList.add('text-zinc-400', 'border-transparent');
        });
        tab.classList.add('bg-white/10', 'text-white', 'border-white/20');
        tab.classList.remove('text-zinc-400', 'border-transparent');

        viewportScreens.forEach(screen => {
          if (screen.id === targetId) {
            screen.classList.remove('hidden');
          } else {
            screen.classList.add('hidden');
          }
        });

        if (viewportMetricRoi && roi) viewportMetricRoi.textContent = roi;
        if (viewportMetricSub && sub) viewportMetricSub.textContent = sub;
        if (viewportUrl && url) viewportUrl.textContent = url;
      });
    });
  }

  // 3. PRECISION CURSOR SPOTLIGHT ON CARDS
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. MOBILE NAVIGATION DRAWER
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    }
  }

  // 5. ACCORDION (FAQ)
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        const parent = item.closest('.accordion-group');
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach(sibling => {
            sibling.classList.remove('active');
          });
        }
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 6. FAQ TOPIC & SEARCH FILTER
  const faqSearchInput = document.getElementById('faq-search');
  const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
  const allFaqSections = document.querySelectorAll('.faq-topic-section');

  if (faqCategoryBtns.length > 0) {
    faqCategoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        faqCategoryBtns.forEach(b => {
          b.classList.remove('bg-white', 'text-black', 'border-white');
          b.classList.add('bg-white/[0.04]', 'text-zinc-400', 'border-white/10');
        });
        btn.classList.add('bg-white', 'text-black', 'border-white');
        btn.classList.remove('bg-white/[0.04]', 'text-zinc-400', 'border-white/10');

        allFaqSections.forEach(sec => {
          if (category === 'all' || sec.dataset.category === category) {
            sec.classList.remove('hidden');
          } else {
            sec.classList.add('hidden');
          }
        });
      });
    });
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', e => {
      const term = e.target.value.toLowerCase().trim();
      const allFaqItems = document.querySelectorAll('.faq-topic-section .accordion-item');
      allFaqItems.forEach(item => {
        const question = item.querySelector('.accordion-header')?.textContent.toLowerCase() || '';
        const answer = item.querySelector('.accordion-content')?.textContent.toLowerCase() || '';
        if (question.includes(term) || answer.includes(term)) {
          item.classList.remove('hidden');
          item.closest('.faq-topic-section')?.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  }

  // 7. PORTFOLIO FILTER
  const portfolioBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-item-card');

  if (portfolioBtns.length > 0) {
    portfolioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        portfolioBtns.forEach(b => {
          b.classList.remove('bg-white', 'text-black', 'border-white');
          b.classList.add('bg-white/[0.04]', 'text-zinc-400', 'border-white/10');
        });
        btn.classList.add('bg-white', 'text-black', 'border-white');
        btn.classList.remove('bg-white/[0.04]', 'text-zinc-400', 'border-white/10');

        portfolioCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 8. BESPOKE SCOPE & INVESTMENT CALCULATOR
  const calcBasePackage = document.getElementById('calc-base-package');
  const calcAddons = document.querySelectorAll('.calc-addon-checkbox');
  const calcTotalDisplay = document.getElementById('calc-total-price');
  const calcSummaryPackage = document.getElementById('calc-summary-package');
  const calcCtaLink = document.getElementById('calc-cta-link');

  function updatePricingCalculator() {
    if (!calcBasePackage || !calcTotalDisplay) return;

    let total = parseInt(calcBasePackage.value, 10) || 499;
    let selectedPackageName = calcBasePackage.options[calcBasePackage.selectedIndex].dataset.name || 'Landing Page';
    let selectedAddonNames = [];

    calcAddons.forEach(addon => {
      if (addon.checked) {
        total += parseInt(addon.value, 10);
        selectedAddonNames.push(addon.dataset.name);
      }
    });

    calcTotalDisplay.textContent = `$${total.toLocaleString()}`;
    if (calcSummaryPackage) {
      calcSummaryPackage.textContent = selectedPackageName;
    }

    if (calcCtaLink) {
      const addonsParam = encodeURIComponent(selectedAddonNames.join(', '));
      calcCtaLink.href = `/contact.html?package=${encodeURIComponent(selectedPackageName)}&addons=${addonsParam}&estimate=${total}`;
    }
  }

  if (calcBasePackage) {
    calcBasePackage.addEventListener('change', updatePricingCalculator);
    calcAddons.forEach(addon => {
      addon.addEventListener('change', updatePricingCalculator);
    });
    updatePricingCalculator();
  }

  // 9. PREFILL CONTACT FORM FROM URL PARAMS
  const urlParams = new URLSearchParams(window.location.search);
  const pkgParam = urlParams.get('package');
  const addonsParam = urlParams.get('addons');
  const detailsField = document.getElementById('contact-project-details');
  const packageSelect = document.getElementById('contact-package-select');

  if (packageSelect && pkgParam) {
    for (let i = 0; i < packageSelect.options.length; i++) {
      if (packageSelect.options[i].text.toLowerCase().includes(pkgParam.toLowerCase())) {
        packageSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (detailsField && (pkgParam || addonsParam)) {
    let prefill = '';
    if (pkgParam) prefill += `Selected Package: ${pkgParam}\n`;
    if (addonsParam) prefill += `Desired Add-ons: ${addonsParam}\n`;
    detailsField.value = prefill + detailsField.value;
  }
});
