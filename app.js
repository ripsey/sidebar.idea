const mobilemenu = document.querySelector(".menu-icon-btn");
const topbar = document.querySelector(".topbar");
const sidebar = document.querySelector("[data-sidebar]");
const topsidebar = document.querySelector(".top-sidebar");
const settingsbar_btn = document.querySelector("[data-settingsbar-btn]");
const settingsbar = document.querySelector(".settingsbar");

mobilemenu.addEventListener("click", () => toggleSidebar());
settingsbar_btn.addEventListener("click", () =>
  settingsbar.classList.toggle("is-active")
);
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
toggleDropdownArrow = (e) => {
  let arrow = e.querySelector("i");
  if (arrow.classList.contains("bi-chevron-up")) {
    arrow.classList.remove("bi-chevron-up");
    arrow.classList.add("bi-chevron-down");
  } else {
    arrow.classList.add("bi-chevron-up");
    arrow.classList.remove("bi-chevron-down");
  }
};
let dropdowns = document.querySelectorAll(".sidebar-dropdown-icon");
dropdowns.forEach((e) => {
  e.addEventListener("click", () => {
    toggleDropdownArrow(e);
    let dropdowns = document.querySelectorAll(
      "[data-dropdown=" + e.getAttribute("data-dropdown-header") + "]"
    );
    dropdowns.forEach((e) => e.classList.toggle("dropdown-show"));
  });
});
// close sidebar on resize
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    if (
      sidebar.classList.contains("open") &&
      localStorage.getItem("sidebar_always_open") !== "true"
    )
      closeSidebar();
  }
});
// sidebar always open
document
  .querySelector("#sidebar-always-open")
  .addEventListener("change", () => {
    toggleSidebarAlwaysOpen();
  });
toggleSidebarAlwaysOpen = () => {
  localStorage.setItem(
    "sidebar_always_open",
    document.querySelector("#sidebar-always-open").checked
  );
  if (localStorage.getItem("sidebar_always_open") === "true") openSidebar();
  else closeSidebar();
};
let sidebar_always_open = localStorage.getItem("sidebar_always_open");
if (sidebar_always_open === "true") {
  document.querySelector("#sidebar-always-open").checked = true;
  // mobilemenu.classList.add("is-active");
  openSidebar();
}
// dropdowns always open
document
  .querySelector("#sidebar-dropdown-open")
  .addEventListener("change", () => {
    toggleDropdownsAlwaysOpen();
  });
toggleDropdownsAlwaysOpen = () => {
  localStorage.setItem(
    "dropdowns_always_open",
    document.querySelector("#sidebar-dropdown-open").checked
  );
  let dropdownIcons = document.querySelectorAll(".sidebar-dropdown-icon i");
  let dropdowns = document.querySelectorAll("[data-dropdown]");
  if (localStorage.getItem("dropdowns_always_open") === "true") {
    dropdowns.forEach((e) => e.classList.add("dropdown-show"));
    dropdownIcons.forEach((e) => {
      e.classList.add("bi-chevron-up");
      e.classList.remove("bi-chevron-down");
    });
  } else {
    dropdowns.forEach((e) => e.classList.remove("dropdown-show"));
    dropdownIcons.forEach((e) => {
      e.classList.remove("bi-chevron-up");
      e.classList.add("bi-chevron-down");
    });
  }
};
let dropdowns_always_open = localStorage.getItem("dropdowns_always_open");
if (dropdowns_always_open === "true") {
  document.querySelector("#sidebar-dropdown-open").checked = true;
  toggleDropdownsAlwaysOpen();
}
// hide header
document
  .querySelector("#sidebar-hide-header")
  .addEventListener("change", () => toggleHeader());
toggleHeader = () => {
  localStorage.setItem(
    "hide_header",
    document.querySelector("#sidebar-hide-header").checked
  );
  let hide_header = localStorage.getItem("hide_header");
  if (hide_header === "true") topsidebar.classList.add("d-none");
  else topsidebar.classList.remove("d-none");
};
if (localStorage.getItem("hide_header") === "true") {
  document.querySelector("#sidebar-hide-header").checked = true;
  toggleHeader();
}
// theme switcher
toggleTheme = (theme) => {
  document.body.className = "";
  document.body.classList.toggle("theme-" + theme);
  localStorage.setItem("brandname_theme", theme);
};
let radios = document.querySelectorAll(".form-check-theme-switch");
document.querySelector("#theme-switch-default").checked = true;
radios.forEach((e) => e.addEventListener("change", () => toggleTheme(e.value)));
radios.forEach((e) => {
  if (e.value === localStorage.getItem("brandname_theme")) {
    e.checked = true;
    toggleTheme(e.value);
  }
});
// disco
document.querySelector("#sidebar-disco").addEventListener("change", () => {
  toggleDisco();
});
toggleDisco = () => {
  sidebar.classList.toggle("disco");
  topbar.classList.toggle("disco-2");
  document
    .querySelectorAll(".sidebar-list-item")
    .forEach((e) => e.classList.toggle("disco-2"));
  document
    .querySelectorAll(".sidebar-dropdown-header")
    .forEach((e) => e.classList.toggle("disco-2"));
  settingsbar.classList.toggle("disco");
};
// load transitions 500ms after page load
setTimeout(() => {
  document
    .querySelector(".preload-transitions")
    .classList.remove("preload-transitions");
}, 500);
// go back to top
topFunction = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

let top_btn = document.querySelector("#go-to-top");
top_btn.addEventListener("click", () => topFunction());
