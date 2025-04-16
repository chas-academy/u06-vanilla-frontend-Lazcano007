import './style.scss';


function getQueryParam(param: string): string | null {           // hämtar värdet på en parameter från URL:en
  return new URLSearchParams(window.location.search).get(param); // "new URLSearchParams" skapar ett objekt som gör det lätt att hämta ut enskilda parametrar från URL:en"
}                                                                // "window.location.search" ger oss hela query-strängen (dvs allt efter "?") från URL:en
                                                                 // ".get(param)" hämtar ett specifikt värde från URL:en, i denna fall "petId"
                                                                   
const petId = getQueryParam("id");                           // hämtar petId från URL:en

// hämtar formulär och inputfält från DOM:en
const form = document.getElementById("editPetForm") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const speciesInput = document.getElementById("species") as HTMLInputElement;
const breedInput = document.getElementById("breed") as HTMLInputElement;
const ageInput = document.getElementById("age") as HTMLInputElement;
const deleteButton = document.querySelector(".delete-btn") as HTMLButtonElement;

//------------hämta pet data-----------
if (petId) {
  fetch(`https://u05.onrender.com/api/v1/Pets/getPetById/${petId}`)
    .then((res) => {
      return res.json();
    })
    .then((pet) => {                         // fyll i formuläret med det befintliga husdjurets information
      nameInput.value = pet.name;
      speciesInput.value = pet.species;
      breedInput.value = pet.breed;
      ageInput.value = pet.age;
    })
    .catch((error) => {
      console.error("Failed to load pet data", error);
      alert("There's been a problem loading your pets!");
    });
}

//-----------------uppdatera pet-----------
form.addEventListener("submit", (event) => {   // event är ett "event-objekt" som innehåller information om den händelsen som precis inträffade (submit i detta fall)
  event.preventDefault();                      // förhindrar att sidan laddas om

  
  const updatedPet = {                         // detta skapar ett uppdaterat objekt baserat på formulärvärden
    name: nameInput.value,
    species: speciesInput.value,
    breed: breedInput.value,
    age: Number(ageInput.value),
  };

  fetch(`https://u05.onrender.com/api/v1/Pets/update/${petId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPet),
  })
    .then((res) => {
      return res.json().then((data) => {
        if (!res.ok) {
          alert(data.message || "There was an error updating the pet.");
          return;
        }
        alert("Your pet has been successfully updated!");
        window.location.href = "/dashboard.html";     // omdirigerar till dashboard-sidan
      });
    })
    .catch((error) => {
      console.error("Update error", error);
      alert("There's been an error updating the your pet!");
    });
});

//---------------ta bort pet------------
if (deleteButton && petId) {
  deleteButton.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete this pet?");
    if (!confirmDelete) return;

    fetch(`https://u05.onrender.com/api/v1/Pets/delete/${petId}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            alert(data.message || "Something went wrong while deleting the pet.");
            return;
          }
          alert("Your pet has been successfully deleted!");
          window.location.href = "/dashboard.html";   // omdirigerar till dashboard-sidan
        });
      })
      .catch((error) => {
        console.error("Delete error", error);
        alert("There's been an error deleting your pet!");
      });
  });
}
