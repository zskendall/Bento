// Store the theme
let lightTheme = localStorage.getItem("lightTheme");
const themeToggle = document.querySelector("#themeButton");

// Apply Light theme
const enableLight = () => {
  document.body.classList.add("lighttheme");
  localStorage.setItem("lightTheme", "enabled");
  themeToggle.innerHTML = `<i id="themeButton__icon" data-feather="moon"></i>`;
  feather.replace();
};

// Remove Light theme
const disableLight = () => {
  document.body.classList.remove("lighttheme");
  localStorage.setItem("lightTheme", null);
  themeToggle.innerHTML = `<i id="themeButton__icon" data-feather="sun"></i>`;
  feather.replace();
};

//Toggle theme
if (lightTheme === "enabled") {
  enableLight();
} else {
  disableLight();
}

themeToggle.addEventListener("click", () => {
  lightTheme = localStorage.getItem("lightTheme");
  if (lightTheme !== "enabled") {
    enableLight();
  } else {
    disableLight();
  }
});

// Theme accordint the hour

/*
const today = new Date();

if (hour >= 19 || hour < 5) {
    enableLight();
} else {
    disableLight();
}
*/
