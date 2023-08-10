document.addEventListener("DOMContentLoaded", () => {
  const dietaryFilter = document.getElementById("dietary-filter");
  const menuItems = document.querySelectorAll(".menu-item");

  dietaryFilter.addEventListener("change", () => {
    const selectedOption = dietaryFilter.value;

    menuItems.forEach((item) => {
      if (selectedOption === "all" || item.classList.contains(selectedOption)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
