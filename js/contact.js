document
  .getElementById("form")
  .addEventListener("submit", function (event) {
    const checkbox = document.getElementById("News");
    if (checkbox.checked) {
      checkbox.value = "true";
    } else {
      checkbox.value = "false";
    }
  });
