import "./style.scss";

const addPetBtn = document.getElementById("goToAddPet") as HTMLButtonElement; // hämtar knappen för att lägga till djur
const petTableBody = document.querySelector("tbody");                         // hämtar tbody-elementet i tabellen
const messageContainer = document.getElementById("dashboardMessage");         // hämtar plats där meddelande ska visas


if (addPetBtn) {
  addPetBtn.addEventListener("click", () => {
    window.location.href = "/addPet.html";                                // omdirigerar till sidan för att lägga till nytt djur
  });
}

const userId = localStorage.getItem("userId");                           // hämtar userId från localstorage


if (!userId) {
  alert("You must be logged in to view your pets!");
  window.location.href = "/index.html";                                   // skickar till login om user saknas
} else {
  fetch(`https://u05.onrender.com/api/v1/Pets/user/${userId}`)
    .then((res) => {
      if (res.status === 404) {
        if (messageContainer) {
          const msgContainer = document.createElement("div");
          msgContainer.classList.add("no-pets-message");
          msgContainer.textContent = "You don’t have any pets registered yet. Click 'Add new pet' to get started!";
          messageContainer.appendChild(msgContainer);
        }
        return [];                                                        // returerar tom lista så den inte försöker loopa pets
      }
      if (!res.ok) {
        console.error("Server error", res.status);
        throw new Error(`There's been a server error ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("fetched pets", data);
      if (!Array.isArray(data)) {                                          // kontrollerar att data som kommer tillbaka inte är en array
        alert("Something went wrong, try again later!");
        return;
      }

      data.forEach((pet) => {
        const row = document.createElement("tr");
        row.innerHTML = ` <td>${pet.name}</td>
          <td>${pet.species}</td>
          <td>${pet.breed}</td>
          <td>${pet.age}</td>`;

        row.addEventListener("click", () => {
          window.location.href = `petProfile.html?id=${pet._id}`;           // omdirigerar till petProfile-sidan med "petId"
        });
        row.classList.add("clickableRow");
        petTableBody?.appendChild(row);                 // lägger till en ny rad längst ner i tabellen
      });
    })
    .catch((error) => {
      console.error("Error fetching pets", error);
      alert("There's been an error loading your pets!");
    });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userId");
      window.location.href = "/index.html";                           // omdirigerar till login-sidan
    });
  }
}
