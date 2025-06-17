document.addEventListener("DOMContentLoaded", () => {
const Form = document.getElementById("form");

Form.addEventListener("submit", async function(e){
  e.preventDefault()

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
  
try {
      // Pošalji POST zahtjev API-ju za registraciju
      const response = await fetch(
        "https://www.fulek.com/data/api/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // Odredite vrstu sadržaja kao JSON
          body: JSON.stringify({ username, password }), // Pretvori ulazne podatke u JSON niz znakova
        }
      );

      if (response.ok) {  
        window.location.href = "login.html"; // Preusmjeri na stranicu za prijavu
      } else {
        // Ako registracija ne uspije, obavijestiti korisnika
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      // Obrađuje sve pogreške koje se dogode tijekom API zahtjeva
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
    }
});
});
