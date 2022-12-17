const mobilemenu = document.querySelector(".menu-icon-btn");
const topbar = document.querySelector(".topbar");
const sidebar = document.querySelector("[data-sidebar]");
const topsidebar = document.querySelector(".top-sidebar");
const settingsbar_btn = document.querySelector("[data-settingsbar-btn]");
const settingsbar = document.querySelector(".settingsbar");
toggleSidebar = () => {
  sidebar.classList.toggle("open");
  mobilemenu.classList.toggle("is-active");
};
openSidebar = () => {
  sidebar.classList.add("open");
  mobilemenu.classList.add("is-active");
};
closeSidebar = () => {
  sidebar.classList.remove("open");
  mobilemenu.classList.remove("is-active");
};
mobilemenu.addEventListener("click", () => toggleSidebar());
settingsbar_btn.addEventListener("click", () =>
  settingsbar.classList.toggle("is-active")
);
// close sidebar on resize
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    if (
      sidebar.classList.contains("open") &&
      localStorage.getItem("TUS_sidebar_always_open") !== "true"
    )
      closeSidebar();
  }
});
// sidebar always open
let sao = document.querySelector("#sidebar-always-open");
sao.addEventListener("change", () => toggleSidebarAlwaysOpen());
toggleSidebarAlwaysOpen = () => {
  localStorage.setItem("TUS_sidebar_always_open", sao.checked);
  if (localStorage.getItem("TUS_sidebar_always_open") === "true") openSidebar();
  else closeSidebar();
};
if (localStorage.getItem("TUS_sidebar_always_open") === "true") {
  sao.checked = true;
  openSidebar();
}
// toggle dropdown arrows
let checkArrow = (e) => {
  if (e.checked) {
    e.parentElement.querySelector("i").classList.add("bi-chevron-up");
    e.parentElement.querySelector("i").classList.remove("bi-chevron-down");
  }
  if (!e.checked) {
    e.parentElement.querySelector("i").classList.remove("bi-chevron-up");
    e.parentElement.querySelector("i").classList.add("bi-chevron-down");
  }
};
let dropdownArrows = document.getElementsByName("checkbox-dropdown-menu");
dropdownArrows.forEach((e) =>
  e.addEventListener("change", () => checkArrow(e))
);
// dropdowns always open
let sdo = document.querySelector("#sidebar-dropdown-open");
sdo.addEventListener("change", () => toggleDropdownsAlwaysOpen());
toggleDropdownsAlwaysOpen = () => {
  localStorage.setItem("TUS_dropdowns_always_open", sdo.checked);
  let dropdowns = document.getElementsByName("checkbox-dropdown-menu");
  dropdowns.forEach((e) => {
    if (localStorage.getItem("TUS_dropdowns_always_open") === "true")
      e.checked = true;
    else e.checked = false;
    checkArrow(e);
  });
};
if (localStorage.getItem("TUS_dropdowns_always_open") === "true") {
  sdo.checked = true;
  toggleDropdownsAlwaysOpen();
}
// hide header
document
  .querySelector("#sidebar-hide-header")
  .addEventListener("change", () => toggleHeader());
toggleHeader = () => {
  localStorage.setItem(
    "TUS_hide_header",
    document.querySelector("#sidebar-hide-header").checked
  );
  let hide_header = localStorage.getItem("TUS_hide_header");
  if (hide_header === "true") topsidebar.classList.add("d-none");
  else topsidebar.classList.remove("d-none");
};
if (localStorage.getItem("TUS_hide_header") === "true") {
  document.querySelector("#sidebar-hide-header").checked = true;
  toggleHeader();
}
// theme switcher
let theme = localStorage.getItem("TUS_theme");
if (theme) document.querySelector("#theme-" + theme).checked = true;
let radios = document.getElementsByName("theme-switch");
radios.forEach((radio) =>
  radio.addEventListener("change", () => {
    localStorage.setItem("TUS_theme", radio.value);
  })
);
// disco
document.querySelector("#sidebar-disco").addEventListener("change", () => {
  toggleDisco();
});
toggleDisco = () => {
  sidebar.classList.toggle("disco-2");
  topbar.classList.toggle("disco");
  topsidebar.classList.toggle("disco-2");
  document
    .querySelectorAll(".item")
    .forEach((e) => e.classList.toggle("disco"));
  settingsbar.classList.toggle("disco");
};
// load transitions 500ms after page load
setTimeout(() => {
  document
    .querySelector(".preload-transitions")
    .classList.remove("preload-transitions");
}, 500);
// go back to top
goToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
document.querySelector("#go-to-top").addEventListener("click", goToTop);
