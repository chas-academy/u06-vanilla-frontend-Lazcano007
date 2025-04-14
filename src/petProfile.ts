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
        nameElement.textContent = pet.name;
      }

      if (petDetailsDiv) {
        petDetailsDiv.innerHTML = `
          <h2>Pet Info</h2>
          <p>Pet: ${pet.name}</p>
          <p>Species: ${pet.species}</p>
          <p>Breed: ${pet.breed}</p>
          <p>Age: ${pet.age}</p>
        `;
      }
    })
    .catch((error) => {
      console.error("Error fetching pet details:", error);
      if (petDetailsDiv) {
        petDetailsDiv.innerHTML = `<p>Error fetching pet details!</p>`;
      }
      alert("Error fetching pet details!");
    });
}
