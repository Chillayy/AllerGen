//localStorage.removeItem("Diet");
let diet = JSON.parse(localStorage.getItem("Diet")) || [];
let favs = JSON.parse(localStorage.getItem("SavedHearts")) || [];
let favPlaces = JSON.parse(localStorage.getItem("FavPlaces")) || [];

let insideArray = [];
let lastValue;

let saveButton = document.getElementById("save-button");
let selectMenu = document.getElementById("allergens0");
let preferenceDivs = document.querySelectorAll(".preference-container select");
let hamburgerMenu = document.getElementById("hamburger-menu");
let hamburgerSubMenu = document.getElementById("hamburger-submenu");
let favContainers = document.getElementsByClassName("fav-container");

let selectCounter = preferenceDivs.length;

let hamburgerSubMenuState = 1;

for (let i = 0; i < favContainers.length; i++) {
  if (favs[i] == 1) {
    let heart = favContainers[i].querySelector("#heart");
    heart.src = "../images/fav-icon.png";
  }
}

function generateOptions(selectElement) {
  const options = [
    { value: "", label: "Please select" },
    { value: "peanuts", label: "Peanuts" },
    { value: "dairy", label: "Dairy" },
    { value: "treeNuts", label: "Tree Nuts" },
    { value: "eggs", label: "Eggs" },
    { value: "shellfish", label: "Shellfish" },
    { value: "wheat", label: "Wheat" },
    { value: "fish", label: "Fish" },
    { value: "soy", label: "Soy" },
  ];

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    selectElement.appendChild(optionElement);
  });
}

function handlePreferenceChange(selectElement, index) {
  return function () {
    let selectedValue = selectElement.value;
    let container = selectElement.closest(".preference-container");
    let existingSelects = container.querySelectorAll(".allergen-select");
    if (
      selectElement === existingSelects[existingSelects.length - 1] ||
      selectElement === existingSelects[index] ||
      insideArray.includes(selectElement)
    ) {
      diet[index] = selectedValue;
      console.log(diet);
      localStorage.setItem("Diet", JSON.stringify(diet));

      if (!insideArray.includes(selectElement)) {
        let newSelect = document.createElement("select");
        newSelect.className = "allergen-select";

        container.appendChild(newSelect);
        generateOptions(newSelect);

        newSelect.addEventListener(
          "change",
          handlePreferenceChange(newSelect, diet.length)
        );
      }

      insideArray.push(selectElement);
    }
  };
}

let initialSelects = document.querySelectorAll(".allergen-select");
initialSelects.forEach((select, index) => {
  select.addEventListener("change", function () {
    handlePreferenceChange(select, index)();
  });

  let savedDiet = JSON.parse(localStorage.getItem("Diet"));
  if (savedDiet && savedDiet[index]) {
    select.value = savedDiet[index];

    console.log(index);
    console.log(savedDiet);
  }
});

if (localStorage.getItem("Diet") && location.href.includes("settings")) {
  let savedDiet = JSON.parse(localStorage.getItem("Diet"));
  for (let i = initialSelects.length; i < savedDiet.length; i++) {
    console.log(initialSelects.length);
    let container = document.querySelector(".preference-container");
    let newSelect = document.createElement("select");
    newSelect.className = "allergen-select";
    container.appendChild(newSelect);
    generateOptions(newSelect);

    newSelect.value = savedDiet[i];

    newSelect.addEventListener("change", handlePreferenceChange(newSelect, i));

    insideArray.push(newSelect);

    console.log(insideArray);
    console.log(savedDiet);
  }
  let container = document.querySelector(".preference-container");
  let newSelect = document.createElement("select");
  newSelect.className = "allergen-select";
  container.appendChild(newSelect);
  generateOptions(newSelect);

  newSelect.addEventListener(
    "change",
    handlePreferenceChange(newSelect, diet.length - 1)
  );
}

for (let i = 0; i < favContainers.length; i++) {
  favContainers[i].onclick = function () {
    if (favs[i] !== 1) {
      favs[i] = 1;
      let heart = this.querySelector("#heart");
      heart.src = "../images/fav-icon.png";
      let parentDiv = favContainers[i].parentNode;
      let placeName = parentDiv
        .querySelector(".img-container")
        .querySelector("h1").innerHTML;
      favPlaces.push(placeName);
      localStorage.setItem("FavPlaces", JSON.stringify(favPlaces));
      localStorage.setItem("SavedHearts", JSON.stringify(favs));
      console.log(favPlaces);
    } else {
      favs[i] = 0;
      let heart = this.querySelector("#heart");
      heart.src = "../images/heart-icon.png";
      let parentDiv = favContainers[i].parentNode;
      let placeName = parentDiv
        .querySelector(".img-container")
        .querySelector("h1").innerHTML;
      let index = favPlaces.indexOf(placeName);
      favPlaces.splice(index, 1);
      localStorage.setItem("FavPlaces", JSON.stringify(favPlaces));
      localStorage.setItem("SavedHearts", JSON.stringify(favs));
      console.log(favPlaces);
    }
  };
}

hamburgerMenu.onclick = function () {
  if (hamburgerSubMenuState == 1) {
    hamburgerSubMenuState = 2;
    hamburgerSubMenu.style.display = "none";
  } else {
    hamburgerSubMenuState = 1;
    hamburgerSubMenu.style.display = "flex";
  }
};
