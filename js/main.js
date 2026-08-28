// ==============================================================
// MAIN.JS — shared behavior for every page
// (navbar, dark/light mode, branding injection, scroll reveal)
// ==============================================================
(function () {
  "use strict";

  // Article pages live one folder deeper (documentation/*.html), so every
  // relative asset/link built here needs a "../" prefix on those pages only.
  const PREFIX = location.pathname.includes("/documentation/") ? "../" : "";

  /* ---------- Branding: fill in text/images from config.js ---------- */
  function applyBranding() {
    document.title = document.title || siteConfig.siteName;

    document.querySelectorAll("[data-site='name']").forEach((el) => (el.textContent = siteConfig.siteName));
    document.querySelectorAll("[data-site='tagline']").forEach((el) => (el.textContent = siteConfig.tagline));
    document.querySelectorAll("[data-site='year']").forEach((el) => (el.textContent = siteConfig.year));

    // Logo with graceful text fallback if the image file is missing.
    document.querySelectorAll("[data-logo]").forEach((img) => {
      img.src = PREFIX + siteConfig.logo;
      img.alt = siteConfig.siteName + " logo";
      img.addEventListener("error", function handler() {
        img.style.display = "none";
        const fallback = img.parentElement.querySelector(".logo-fallback");
        if (fallback) fallback.style.display = "inline-flex";
        img.removeEventListener("error", handler);
      });
    });
    document.querySelectorAll(".logo-fallback[data-site='name']").forEach((el) => (el.textContent = siteConfig.siteName));

    // Favicon
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon && siteConfig.favicon) favicon.href = PREFIX + siteConfig.favicon;

    // Background images declared as data-bg="home|tools|documentation" (CSS background, for page-header banners)
    document.querySelectorAll("[data-bg]").forEach((el) => {
      const key = el.getAttribute("data-bg");
      const src = siteConfig.backgrounds[key];
      if (src) el.style.backgroundImage = "url('" + PREFIX + src + "')";
    });

    // Hero <img> (real <img> tag for the homepage hero — better loading control than CSS background)
    document.querySelectorAll("[data-hero-img]").forEach((img) => {
      const key = img.getAttribute("data-hero-img");
      const src = siteConfig.backgrounds[key];
      if (src) {
        img.src = PREFIX + src;
        img.alt = "";
      }
    });

    // Footer
    document.querySelectorAll("[data-footer='copy']").forEach((el) => {
      el.textContent = "\u00A9 " + siteConfig.year + " " + siteConfig.siteName + ". All Rights Reserved.";
    });
    const socialWrap = document.querySelector("[data-footer='socials']");
    if (socialWrap) {
      socialWrap.innerHTML = siteConfig.socials
        .filter((s) => s.url)
        .map(
          (s) =>
            `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${iconMarkup(s.icon)}</a>`
        )
        .join("");
    }

    // About page content
    const aboutTitle = document.querySelector("[data-about='title']");
    if (aboutTitle) aboutTitle.textContent = siteConfig.about.title;
    const aboutBody = document.querySelector("[data-about='body']");
    if (aboutBody) aboutBody.textContent = siteConfig.about.body;
    const aboutMeta = document.querySelector("[data-about='meta']");
    if (aboutMeta) {
      aboutMeta.innerHTML = siteConfig.about.meta
        .map((m) => `<div class="about-meta-row"><dt>${m.label}</dt><dd>${m.value}</dd></div>`)
        .join("");
    }
    const aboutSocials = document.querySelector("[data-about='socials']");
    if (aboutSocials) {
      aboutSocials.innerHTML = siteConfig.socials
        .filter((s) => s.url)
        .map(
          (s) =>
            `<a href="${s.url}" target="_blank" rel="noopener">${iconMarkup(s.icon)}<span>${s.label}</span></a>`
        )
        .join("");
    }
  }

  // Social icon renderer — uses simple SVG strokes (width/height set both via
  // HTML attribute and CSS, so sizing is locked even if one layer fails to load in time)
  function iconMarkup(name) {
    const icons = {
      github: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.6 2.8 5.5 3.1 5.5 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.1 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path></svg>',
      instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37"></path><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle></svg>',
      mail: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    };
    return icons[name] || icons.mail;
  }

  /* ---------- Theme toggle (dark default, persisted) ---------- */
  function initTheme() {
    const saved = localStorage.getItem("imvion-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);

    document.querySelectorAll("[data-action='toggle-theme']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
        const next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("imvion-theme", next);
      });
    });
  }

  /* ---------- Nav: hamburger, dropdown, active link, mobile submenu ---------- */
  function initNav() {
    const hamburger = document.querySelector("[data-action='toggle-menu']");
    const panel = document.querySelector(".mobile-panel");
    if (hamburger && panel) {
      hamburger.addEventListener("click", () => {
        const open = panel.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
      });
      panel.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          panel.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        })
      );
    }

    // Desktop dropdown: click-to-toggle (works alongside CSS hover), closes on outside click / Esc.
    document.querySelectorAll(".nav-dropdown").forEach((dd) => {
      const toggle = dd.querySelector(".nav-dropdown-toggle");
      if (!toggle) return;
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const open = dd.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    });
    document.addEventListener("click", (e) => {
      document.querySelectorAll(".nav-dropdown.open").forEach((dd) => {
        if (!dd.contains(e.target)) {
          dd.classList.remove("open");
          const t = dd.querySelector(".nav-dropdown-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".nav-dropdown.open").forEach((dd) => dd.classList.remove("open"));
        if (panel && panel.classList.contains("open")) {
          panel.classList.remove("open");
          if (hamburger) hamburger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      }
    });

    // Build "Dokumentasi" submenu (desktop dropdown + mobile group) from docCategories.
    if (typeof docCategories !== "undefined") {
      const entries = Object.entries(docCategories);
      const dropdownMenu = document.querySelector("[data-nav='doc-dropdown']");
      if (dropdownMenu) {
        dropdownMenu.innerHTML =
          `<a href="${PREFIX}documentation.html"><strong>Semua Dokumentasi</strong></a>` +
          entries.map(([key, label]) => `<a href="${PREFIX}documentation.html?category=${key}">${label}</a>`).join("");
      }
      const mobileGroup = document.querySelector("[data-nav='doc-mobile']");
      if (mobileGroup) {
        mobileGroup.innerHTML = entries
          .map(([key, label]) => `<a href="${PREFIX}documentation.html?category=${key}">${label}</a>`)
          .join("");
      }
    }

    // Mark current page link as active (also covers article pages under /documentation/).
    const path = location.pathname.split("/").pop() || "index.html";
    const inDocsFolder = location.pathname.includes("/documentation/");
    document.querySelectorAll(".nav-links a, .mobile-panel > a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      const hrefFile = href.split("?")[0].split("/").pop();
      if (hrefFile === path || (inDocsFolder && hrefFile === "documentation.html")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Nav search: focuses local search, or redirects to Tools ---------- */
  function initNavSearch() {
    const navSearchBtn = document.querySelector("[data-action='nav-search']");
    if (!navSearchBtn) return;
    navSearchBtn.addEventListener("click", () => {
      const localSearch = document.querySelector("[data-search-input]");
      if (localSearch) {
        localSearch.focus();
        localSearch.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.location.href = PREFIX + "tools.html";
      }
    });
  }

  /* ---------- Scroll reveal (lightweight IntersectionObserver) ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyBranding();
    initTheme();
    initNav();
    initNavSearch();
    initReveal();
  });
})();
