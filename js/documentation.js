// ==============================================================
// DOCUMENTATION DATA
// ==============================================================
// Cara menambah dokumentasi baru:
// 1. Duplikat file documentation/example.html, isi kontennya.
// 2. Tambahkan satu object baru ke array "documentation" di bawah.
// 3. Pastikan "category" cocok dengan salah satu key di docCategories.
// Tidak perlu sentuh file HTML lain — kartu akan muncul otomatis
// di halaman Dokumentasi.
// ==============================================================

// Kategori dokumentasi yang ditampilkan sebagai filter chip.
const docCategories = {
  tutorial: "Tutorial",
  android: "Android",
  otomotif: "Otomotif",
  website: "Website",
  teknologi: "Teknologi",
  lainnya: "Lainnya",
};

const documentation = [
  {
    title: "Cara Publish Website ke GitHub Pages",
    description: "Langkah singkat mem-publish website statis seperti IMVION secara gratis lewat GitHub Pages.",
    image: "assets/images/doc-placeholder.svg",
    url: "documentation/setup-github-pages.html",
    category: "tutorial",
  },
  {
    title: "Struktur & Cara Edit Website IMVION",
    description: "Panduan cepat memahami struktur file IMVION dan cara mengubah konten tanpa banyak coding.",
    image: "assets/images/doc-placeholder.svg",
    url: "documentation/tentang-website-ini.html",
    category: "website",
  },
  {
    title: "Tips Menghemat Baterai Android",
    description: "Beberapa pengaturan sederhana agar baterai HP Android lebih awet seharian.",
    image: "assets/images/doc-placeholder.svg",
    url: "documentation/tips-android.html",
    category: "android",
  },
  {
    title: "Cara Ganti Oli Motor Sendiri",
    description: "Panduan dasar mengganti oli mesin motor di rumah tanpa ke bengkel.",
    image: "assets/images/doc-placeholder.svg",
    url: "documentation/ganti-oli-motor.html",
    category: "otomotif",
  },
  {
    title: "Mengenal Dasar Static Site",
    description: "Apa itu static site, kelebihannya, dan kenapa cocok untuk website pribadi.",
    image: "assets/images/doc-placeholder.svg",
    url: "documentation/dasar-static-site.html",
    category: "teknologi",
  },
  {
    title: "Rekomendasi Aplikasi Produktivitas",
    description: "Beberapa aplikasi yang membantu mengatur catatan, tugas, dan waktu sehari-hari.",
    image: "assets/images/doc-placeholder.svg",
    url: "documentation/rekomendasi-aplikasi.html",
    category: "lainnya",
  },
];

// ==============================================================
// RENDER — kartu dokumentasi + search/filter di documentation.html
// (Bagian ini otomatis berhenti jika elemen grid tidak ditemukan,
// sehingga file ini aman dimuat di halaman lain juga.)
// ==============================================================
(function () {
  "use strict";

  const grid = document.querySelector("[data-docs-grid]");
  if (!grid) return; // not on documentation.html

  const searchInput = document.querySelector("[data-search-input]");
  const searchClear = document.querySelector("[data-search-clear]");
  const chipRow = document.querySelector("[data-chip-row]");
  const noResults = document.querySelector("[data-no-results]");

  let activeCategory = "all";

  const arrowIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg>';

  function cardHTML(doc) {
    const label = docCategories[doc.category] || "Dokumentasi";
    return `
      <a class="doc-card reveal in-view" href="${doc.url}">
        <span class="doc-card-image"><img src="${doc.image}" alt="" loading="lazy" onerror="this.style.display='none'"></span>
        <span class="doc-card-body">
          <span class="doc-card-cat">${label}</span>
          <span class="doc-card-title">${doc.title}</span>
          <span class="doc-card-desc">${doc.description}</span>
          <span class="doc-card-cta">Baca dokumentasi ${arrowIcon}</span>
        </span>
      </a>`;
  }

  function buildChips() {
    const cats = ["all", ...Object.keys(docCategories)];
    chipRow.innerHTML = cats
      .map((key) => {
        const label = key === "all" ? "Semua" : docCategories[key];
        return `<button class="chip" type="button" data-cat="${key}" aria-pressed="${key === "all"}">${label}</button>`;
      })
      .join("");

    chipRow.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        activeCategory = chip.getAttribute("data-cat");
        chipRow.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        render();
      });
    });
  }

  function setActiveChip(key) {
    activeCategory = key;
    chipRow.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.getAttribute("data-cat") === key)));
  }

  function render() {
    const query = (searchInput.value || "").trim().toLowerCase();
    const filtered = documentation.filter((doc) => {
      const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
      const matchesQuery =
        !query ||
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        (docCategories[doc.category] || "").toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    grid.innerHTML = filtered.map(cardHTML).join("");
    noResults.classList.toggle("show", filtered.length === 0);
    searchClear.classList.toggle("show", query.length > 0);
  }

  searchInput.addEventListener("input", render);
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    render();
  });

  buildChips();

  // Support links like documentation.html?category=android from the nav dropdown.
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("category");
  if (catParam && docCategories[catParam]) setActiveChip(catParam);
  if (params.get("q")) searchInput.value = params.get("q");

  render();
})();
