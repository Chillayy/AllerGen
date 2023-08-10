document.addEventListener("DOMContentLoaded", function () {
  const dietaryFilter = document.getElementById("dietary-filter");
  const menuItems = document.querySelectorAll(".menu-item");
  const displayedItems = new Set();

  dietaryFilter.addEventListener("change", function () {
    const selectedOption = dietaryFilter.value;

    menuItems.forEach(function (item) {
      const parentDiv = item.closest(".menu-item");
      const parentDivHasSelectedDiet =
        selectedOption === "all" ||
        parentDiv.classList.contains(selectedOption);

      const itemDietaryRestrictions = Array.from(item.classList).filter(
        (cls) => cls !== "menu-item"
      );

      const shouldDisplay =
        selectedOption === "all" ||
        item.classList.contains(selectedOption) ||
        parentDivHasSelectedDiet ||
        itemDietaryRestrictions.includes(selectedOption);

      const wasDisplayed =
        displayedItems.has(item) && item.style.display === "block";

      item.style.display = shouldDisplay && !wasDisplayed ? "block" : "none";

      if (shouldDisplay) {
        displayedItems.add(item);
      } else {
        displayedItems.delete(item);
      }
    });
  });
});
