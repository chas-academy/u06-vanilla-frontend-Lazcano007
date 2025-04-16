import './style.scss';

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const petId = getQueryParam("id");
const petDetailsDiv = document.getElementById("petCard");

if (!petId) {
  alert("No pet ID provided in the URL!");
} else {
  fetch(`https://u05.onrender.com/api/v1/Pets/getPetById/${petId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Response not ok");
      return res.json();
    })
    .then((pet) => {
      const nameElement = document.getElementById("petName");
      if (nameElement) {
        nameElement.textContent = "Pet Profil";
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
            window.location.href = `/petEdit.html?id=${petId}`;
          });
        }
      }
    })
    .catch((error) => {
      console.error("There's been an error fetching your pet details:", error);
      if (petDetailsDiv) {
        petDetailsDiv.innerHTML = `<p>Error fetching pet details!</p>`;
      }
      alert("Error fetching pet details!");
    });
}
