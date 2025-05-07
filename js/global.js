$(document).ready(function () {
  // Učitaj header.html u <header> tag
  $("header").load("header.html", function () {
    // Selektori elemenata
    const loginItem = $("#login");
    const logoutItem = $("#logout");
    const studyPlanItem = $("#study-plan");
    const jwtToken = localStorage.getItem("jwt");

    // Prikaz/sakrivanje menija
    if (jwtToken) {
      loginItem.addClass("hidden");
      logoutItem.removeClass("hidden");
      studyPlanItem.removeClass("hidden");
    } else {
      loginItem.removeClass("hidden");
      logoutItem.addClass("hidden");
      studyPlanItem.addClass("hidden");
    }

    // Logout funkcionalnost
    logoutItem.on("click", function () {
      localStorage.removeItem("jwt");
    });

    // Hamburger meni toggle
    $(".hamburger-menu").on("click", function () {
      $(".unordered-list").toggleClass("show");
    });

    // 'about.html'
    if (window.location.pathname.includes("about.html")) {
      const extraMenu = $("<ul>").addClass("transition-list");

      extraMenu.append('<li><a href="#first-section">Naše vrijednosti</a></li>');
      extraMenu.append('<li><a href="#history-graybox">Povijest</a></li>');
      extraMenu.append('<li><a href="#algebra-graybox">Algebra grupa</a></li>');
      extraMenu.append('<li><a href="#map-section">Kako do nas</a></li>');

      $(".navigation-bar").append(extraMenu);
    }
  });
});
