// Display the dropdown profile

let dropDownList = document.querySelector(".profile-menu");
let dropDownBtn = document.querySelector(".profile-dropdown-btn");

const toggle = () => dropDownList.classList.toggle("active");

window.addEventListener("click", function (e) {
    if (!dropDownBtn.contains(e.target)) {
        dropDownList.classList.remove("active");
    }
});