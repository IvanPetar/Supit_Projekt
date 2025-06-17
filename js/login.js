document.addEventListener("DOMContentLoaded", () => {
  const Form = document.getElementById("form");

  Form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Sprječava slanje zadanog obrasca

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "https://www.fulek.com/data/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login response:", data); // Pregledajte odgovor poslužitelja

        // Ispravno pristupi tokenu iz odgovora
        if (data.data && data.data.token) {
          localStorage.setItem("jwt", data.data.token); // Pohrani token za buduće zahtjeve
          window.location.href = "index.html"; // Preusmjeri na početnu stranicu
        } else {
          alert("Login failed.");
        }
      } else {
        alert("Invalid credentials. Please try again."); // Opća greška za neuspjeli odgovor
      }
    } catch (error) {
      console.error("Login error:", error); // Zabilježi sve mrežne pogreške
      alert("An error occurred. Please try again."); // Obavijesti korisnika o pogrešci
    }
  });
});
