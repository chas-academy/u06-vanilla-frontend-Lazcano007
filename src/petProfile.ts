import './style.scss';

function getQueryParam(param: string): string | null {               // hämtar värdet på en specifik query parameter från URL:en
  const urlParams = new URLSearchParams(window.location.search);     // "new URLSearchParams" skapar ett objekt som gör det lätt att hämta ut enskilda parametrar från URL:en 
  return urlParams.get(param);
}

const petId = getQueryParam("id");                                // hämtar petId:et från URL:en
const petDetailsDiv = document.getElementById("petCard");

if (!petId) {
} else {
  fetch(`https://u05.onrender.com/api/v1/Pets/getPetById/${petId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Response not ok");
      return res.json();})
    .then((pet) => {
      const nameElement = document.getElementById("petName");
      if (nameElement) {
        nameElement.textContent = "Pet Profil";         //   " nameElement.textContent" sätter textinnehållet i elementet "Pet Profile"
      }
      if (petDetailsDiv) {
        petDetailsDiv.innerHTML = `                     
        <div class="petFrame">
          <button class="edit-btn" id="editPetBtn">Edit</button>
          <h3></h3>
          <div class="field"><span class="label">Name:</span> ${pet.name}</div>
          <div class="field"><span class="label">Species:</span> ${pet.species}</div>
          <div class="field"><span class="label">Breed:</span> ${pet.breed}</div>
          <div class="field"><span class="label">Age:</span> ${pet.age}</div>
        </div>`;
        const editButton = document.getElementById("editPetBtn");                 
        if (editButton) {
          editButton.addEventListener("click", () => {
            window.location.href = `/petEdit.html?id=${petId}`;                   // omdirigerar till petProfile-sidan med "petId"
    });
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching pet details", error);
      if (petDetailsDiv) {
        petDetailsDiv.innerHTML = `<p>Error fetching pet details!</p>`;
      }
      alert("There's been an error fetching your pet details!");
    });
}
