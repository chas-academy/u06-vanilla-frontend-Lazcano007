import "./style.scss";

const addPetBtn = document.getElementById("goToAddPet") as HTMLButtonElement; // hämtar knappen för att lägga till djur
const petTableBody = document.querySelector("tbody");                         // hämtar tbody-elementet i tabellen
//------------------add pet-------------------
if (addPetBtn) {
  addPetBtn.addEventListener("click", () => {
    window.location.href = "/addPet.html";                                    // Ändra vägen om du har annan mappstruktur
  });
}
const userId = localStorage.getItem("userId");                                // härmtar userId från localstorage
//------------------fetch pets------------------
if (!userId) {
  alert("You must be logged in to view your pets!");
} else {
  fetch(`https://u05.onrender.com/api/v1/Pets/user/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) {                                               // detta kollar om datan är en riktig array eller inte       
        alert("Something went wrong, try again later!");
        return;
      }
      data.forEach((pet) => {
        const row = document.createElement("tr");                               //skapar en ny rad för varje ny registrerad djur
        row.innerHTML = ` <td>${pet.name}</td>
          <td>${pet.species}</td>
          <td>${pet.breed}</td>
          <td>${pet.age}</td>`;

        row.addEventListener("click", () => {
          window.location.href = `petProfile.html?id=${pet._id}`;               // omdirigerar till petProfile med djurets id
        });
        row.classList.add("clickableRow");
        petTableBody?.appendChild(row);                                         // detta lägger till en nya raden i tabellens tbody
      });
    })
    .catch((error) => {
      console.error("Error fetching pets", error);
      alert("There's been an error loading your pets!");
    });
  //----------------Log-out-----------------
  const logoutBtn = document.getElementById("logoutBtn");                        // hämtar knappen för att logga ut
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userId");                                        // ta bort userId från localstorage
      window.location.href = "/login.html";                                     // omdirigera till login sidan
    });
  }
}
