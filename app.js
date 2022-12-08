// const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");
const mobilemenu = document.querySelector(".menu-icon-btn");
const settingsbar = document.querySelector("[data-settingsbar]");

let toggleSidebar = () => {
  sidebar.classList.toggle("open");
};

let toggleArrow = (e) => {
  let expanded = e.getAttribute("aria-expanded");
  let arrowParent = e.closest("div");
  if (expanded === "true") {
    e.setAttribute("aria-expanded", "false");
    arrowParent.style.transform = "rotate(0deg)";
  } else {
    e.setAttribute("aria-expanded", "true");
    arrowParent.style.transform = "rotate(180deg)";
  }
};

let dropdowns = document.querySelectorAll(".sidebar-dropdown-icon");
dropdowns.forEach((e) => {
  e.addEventListener("click", () => {
    toggleArrow(e);
    let dropdown = document.querySelectorAll(
      "[data-dropdown=" + e.getAttribute("data-dropdown-header") + "]"
    );
    dropdown.forEach((e) => e.classList.toggle("dropdown-show"));
  });
});

mobilemenu.addEventListener("click", function () {
  this.classList.toggle("is-active");
  toggleSidebar();
});

settingsbar.addEventListener("click", function () {
  document.querySelector(".settingsbar").classList.toggle("is-active");
  console.log("clicked");
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    if (sidebar.classList.contains("open")) {
      toggleSidebar();
      mobilemenu.classList.toggle("is-active");
    }
  }
});

let toggleDarkMode = () => document.body.classList.toggle("dark-mode");
document
  .querySelector("#dark-mode-switch")
  .addEventListener("change", toggleDarkMode);
