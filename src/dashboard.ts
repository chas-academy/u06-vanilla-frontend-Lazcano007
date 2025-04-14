import "./style.scss";

const addPetBtn = document.getElementById("goToAddPet") as HTMLButtonElement;
const petTableBody = document.querySelector("tbody");

if (addPetBtn) {
  addPetBtn.addEventListener("click", () => {
    window.location.href = "/addPet.html"; // Ändra vägen om du har annan mappstruktur
  });
}

const userId = localStorage.getItem("userId");

if (!userId) {
  alert("You must be logged in to view your pets!");
} else {
  fetch(`https://u05.onrender.com/api/v1/Pets/user/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        console.error("Unexpected response:", data);
        return;
      }
      data.forEach((pet) => {
        const row = document.createElement("tr");   //Skapar en ny rad för varje ny registrerad djur
        row.innerHTML = 
        ` <td>${pet.name}</td>
          <td>${pet.species}</td>
          <td>${pet.breed}</td>
          <td>${pet.age}</td>`;
        
          row.addEventListener("click", () => {
            // OBS: det heter _id, inte id
            window.location.href = `petProfile.html?id=${pet._id}`;
          });
      
      row.classList.add("clickableRow"); 
        
      petTableBody?.appendChild(row);  // Detta lägger till en nya raden i tabellens tbody
      });  
    })
    .catch((error) => {
      console.error("There's been aneError fetching your pets:", error);
      alert("Theres been an error loading your pets");
    });
}
