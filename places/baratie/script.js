const menuItems = document.querySelectorAll(".menu-item");
const diet = JSON.parse(localStorage.getItem("Diet")) || [];

let filterState = 1;
let hamburgerSubMenuState = 1;

let hamburgerMenu = document.getElementById("hamburger-menu");
let hamburgerSubMenu = document.getElementById("hamburger-submenu");
let revealButton = document.getElementById("revealButton");

revealButton.addEventListener("click", function () {
  if (filterState == 1) {
    filterState = 2;
    menuItems.forEach((menuItem) => {
      menuItem.style.display = "block";
      const menuItemRestrictions = Array.from(menuItem.classList);
      const shouldHide = diet.some((item) =>
        menuItemRestrictions.includes(item)
      );

      menuItem.style.color = shouldHide ? "Red" : "Black";
    });
  } else {
    filterState = 1;
    menuItems.forEach((menuItem) => {
      const menuItemRestrictions = Array.from(menuItem.classList);
      const shouldHide = diet.some((item) =>
        menuItemRestrictions.includes(item)
      );

      menuItem.style.display = shouldHide ? "none" : "block";
    });
  }
});

menuItems.forEach((menuItem) => {
  const menuItemRestrictions = Array.from(menuItem.classList);
  const shouldHide = diet.some((item) => menuItemRestrictions.includes(item));

  menuItem.style.display = shouldHide ? "none" : "block";
});

hamburgerMenu.onclick = function () {
  if (hamburgerSubMenuState == 1) {
    hamburgerSubMenuState = 2;
    hamburgerSubMenu.style.display = "none";
  } else {
    hamburgerSubMenuState = 1;
    hamburgerSubMenu.style.display = "flex";
  }
};
