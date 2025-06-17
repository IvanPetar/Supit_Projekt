$(document).ready(function () {
  const jwtToken = localStorage.getItem("jwt");

  // Funkcija za dohvatiti sve kurseve
  async function getCurriculum() {
    try {
      const response = await fetch(
        "https://www.fulek.com/data/api/supit/curriculum-list/hr",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const curriculumList = data.data;

        // Popuni popis podataka za automatsko dovršavanje
        const options = curriculumList.map(
          (curriculum) =>
            `<option value="${curriculum.kolegij}" data-id="${curriculum.id}"></option>`
        );
        $("#subject").html(options.join(""));
      } else {
        console.error("Error fetching curriculum data", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getCurriculum();

  // Obrađuje pritisak tipke Enter za pretraživanje
  $("#search-input").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      const query = $(this).val();
      const selectedOption = $(`#subject option[value="${query}"]`);
      const selectedId = selectedOption.data("id");

      if (selectedId) {
        showCurriculumDetails(selectedId);

        // Obrišite unos nakon pretraživanja
        $("#search-input").val("");
      } else {
        alert("Selected course not found!");
      }
    }
  });

  // Funkcija za dohvaćanje i prikaz detalja tečaja
  async function showCurriculumDetails(id) {
    try {
      const response = await fetch(
        `https://www.fulek.com/data/api/supit/get-curriculum/${id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const curriculum = data.data;

        const tableRow = `
          <tr id="row-${curriculum.id}">
            <td>${curriculum.kolegij}</td>
            <td class="ects">${curriculum.ects}</td>
            <td class="hours">${curriculum.sati}</td>
            <td class="lectures">${curriculum.predavanja}</td>
            <td class="exercises">${curriculum.vjezbe}</td>
            <td>${curriculum.tip}</td>
            <td><button class="delete-btn" data-id="${curriculum.id}">Delete</button></td>
          </tr>
        `;

        $("#selected-curriculum-table tbody").append(tableRow);

       // Prikaži tablicu ako je skrivena
        $("#selected-curriculum-table").show();
        $("#selected-curriculum-table th").show();

        // Provjerite postoji li redak s ukupnim iznosima i je li postavljen na dno
        ensureTotalsRow();
        updateTotals();
      } else {
        console.error("Error fetching curriculum details", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Funkcija koja osigurava da redak s ukupnim iznosima postoji i da je na dnu
  function ensureTotalsRow() {
    // Dodaj redak s ukupnim iznosima ako ne postoji
    if ($("#totals-row").length === 0) {
      const totalsRow = `
        <tr id="totals-row">
          <td><strong>Ukupno</strong></td>
          <td id="total-ects">0</td>
          <td id="total-hours">0</td>
          <td id="total-lectures">0</td>
          <td id="total-exercises">0</td>
          <td></td> <!-- Empty column for alignment -->
          <td></td> <!-- Empty column for alignment -->
        </tr>
      `;
      $("#selected-curriculum-table tbody").append(totalsRow);
    } else {
      // Ako postoji redak s ukupnim iznosima, premjestite ga na dno
      $("#totals-row").appendTo("#selected-curriculum-table tbody");
    }
  }

  // Funkcija za ažuriranje ukupnih vrijednosti
  function updateTotals() {
    let totalEcts = 0;
    let totalHours = 0;
    let totalLectures = 0;
    let totalExercises = 0;

    $("#selected-curriculum-table tbody tr").each(function () {
      totalEcts += parseInt($(this).find(".ects").text()) || 0;
      totalHours += parseInt($(this).find(".hours").text()) || 0;
      totalLectures += parseInt($(this).find(".lectures").text()) || 0;
      totalExercises += parseInt($(this).find(".exercises").text()) || 0;
    });

    // Ažuriraj redak s ukupnim iznosima
    $("#total-ects").text(totalEcts);
    $("#total-hours").text(totalHours);
    $("#total-lectures").text(totalLectures);
    $("#total-exercises").text(totalExercises);

    // Ukloni redak s ukupnim iznosima ako nema preostalih redaka
    if ($("#selected-curriculum-table tbody tr").length === 1) {
      $("#totals-row").remove();
      $("#selected-curriculum-table").hide();
      $("#selected-curriculum-table th").hide();
    }
  }

  // Obrađuje klik na gumb za brisanje
  $("#selected-curriculum-table").on("click", ".delete-btn", function () {
    const rowId = $(this).data("id");
    $(`#row-${rowId}`).remove();
    updateTotals();
  });
});