// ==============================================================
// TOOLS.JS — renders tool cards + search/filter for tools.html
// Reads data from js/config.js (tools, toolCategories).
// ==============================================================
(function () {
  "use strict";

  const grid = document.querySelector("[data-tools-grid]");
  if (!grid) return; // not on tools.html

  const searchInput = document.querySelector("[data-search-input]");
  const searchClear = document.querySelector("[data-search-clear]");
  const chipRow = document.querySelector("[data-chip-row]");
  const noResults = document.querySelector("[data-no-results]");

  let activeCategory = "all";

  const arrowIcon =
    '<svg class="tool-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg>';

  function cardHTML(tool) {
    const label = toolCategories[tool.category] || "Tools";
    return `
      <a class="tool-card reveal in-view" href="${tool.url}" target="${tool.target || "_self"}" rel="noopener">
        <span class="tool-card-icon" aria-hidden="true">
          <img src="${tool.icon}" alt="" width="22" height="22" loading="lazy" onerror="this.style.display='none'">
        </span>
        <span class="tool-card-body">
          <span class="tool-card-top">
            <span class="tool-card-name">${tool.name}</span>
            ${arrowIcon}
          </span>
          <span class="tool-card-desc">${tool.description}</span>
          <span class="tool-card-tag">${label}</span>
        </span>
      </a>`;
  }

  function buildChips() {
    const cats = ["all", ...Object.keys(toolCategories)];
    chipRow.innerHTML = cats
      .map((key) => {
        const label = key === "all" ? "Semua" : toolCategories[key];
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

  function render() {
    const query = (searchInput.value || "").trim().toLowerCase();
    const filtered = tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesQuery =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        (toolCategories[tool.category] || "").toLowerCase().includes(query);
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

  // Prefill from ?q= (used when redirected from the nav search icon on another page).
  const params = new URLSearchParams(window.location.search);
  if (params.get("q")) searchInput.value = params.get("q");

  buildChips();
  render();
})();
                      
