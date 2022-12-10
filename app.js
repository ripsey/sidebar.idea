// const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");
const mobilemenu = document.querySelector(".menu-icon-btn");
const settingsbar = document.querySelector("[data-settingsbar]");

mobilemenu.addEventListener("click", () => {
  mobilemenu.classList.toggle("is-active");
  toggleSidebar();
});

settingsbar.addEventListener("click", () => {
  document.querySelector(".settingsbar").classList.toggle("is-active");
  console.log("clicked");
});
toggleSidebar = () => {
  sidebar.classList.toggle("open");
};
openSidebar = () => {
  sidebar.classList.add("open");
};
closeSidebar = () => {
  sidebar.classList.remove("open");
};

toggleArrow = (e) => {
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
  openSidebar();
  mobilemenu.classList.add("is-active");
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
  let dropdowns = document.querySelectorAll("[data-dropdown]");
  if (localStorage.getItem("dropdowns_always_open") === "true")
    dropdowns.forEach((e) => e.classList.add("dropdown-show"));
  else dropdowns.forEach((e) => e.classList.remove("dropdown-show"));
};

let dropdowns_always_open = localStorage.getItem("dropdowns_always_open");
if (dropdowns_always_open === "true") {
  document.querySelector("#sidebar-dropdown-open").checked = true;
  toggleDropdownsAlwaysOpen();
}
