document
  .getElementById("form")
  .addEventListener("submit", function (event) {
    const checkbox = document.getElementById("Newsletter");
    // if checked -> true
    if (checkbox.checked) {
      checkbox.value = "true";
    } else {
      checkbox.value = "false";
    }
  });
