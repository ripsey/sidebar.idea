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

// let toggleDarkMode = () => {
//   document.body.classList.toggle("dark-mode");
//   localStorage.setItem(
//     "dark_mode",
//     document.body.classList.contains("dark-mode")
//   );
// };

// document
//   .querySelector("#dark-mode-switch")
//   .addEventListener("change", toggleDarkMode);

let radios = document.querySelectorAll(".form-check-theme-switch");
document.querySelector("#theme-switch-default").checked = true;
radios.forEach((e) => {
  e.addEventListener("click", () => {
    toggleTheme(e.value);
  });
});

let toggleTheme = (theme) => {
  document.body.className = "";
  document.body.classList.toggle("theme-" + theme);
  // let theme = document.querySelector("#dark-mode-switch").checked;
  console.log(theme);
  localStorage.setItem("brandname_theme", theme);
};

let theme = localStorage.getItem("brandname_theme");
radios.forEach((e) => {
  if (e.value === theme) {
    e.checked = true;
    toggleTheme(e.value);
  }
});
// if (theme != null) {
//   document.body.classList.toggle("theme-" + theme);
// } else if (theme === "default") {
//   input.className = "";
// } else {
//   input.className = '';
// }

let checkAlwaysOpen = document.querySelector("#sidebar-always-open");
checkAlwaysOpen.addEventListener("change", () => {
  toggleSidebarAlwaysOpen();
});

let toggleSidebarAlwaysOpen = () => {
  let sidebar_always_open = document.querySelector(
    "#sidebar-always-open"
  ).checked;
  localStorage.setItem("sidebar_always_open", sidebar_always_open);
  if (sidebar_always_open) {
    sidebar.classList.add("open");
  } else {
    sidebar.classList.remove("open");
  }
};

let sidebar_always_open = localStorage.getItem("sidebar_always_open");
if (sidebar_always_open === "true") {
  document.querySelector("#sidebar-always-open").checked = true;
  sidebar.classList.add("open");
}

let dropdowns_always_open = localStorage.getItem("dropdowns_always_open");
if (dropdowns_always_open === "true") {
  document.querySelector("#dropdowns-always-open").checked = true;
  let dropdowns = document.querySelectorAll(".sidebar-dropdown");
  dropdowns.forEach((e) => {
    e.classList.add("dropdown-show");
    let arrowParent = e.closest("div");
    arrowParent.style.transform = "rotate(180deg)";
  });
}
