import "./style.scss";


const owner = localStorage.getItem("userId");                                  // hämtar userId från localStorage direkt när sidan laddas

if (!owner) {
  alert("You must be logged in to add a pet!");
  window.location.href = "/index.html";                                         // omdirigerar till login-sidan
}

const form = document.getElementById("addPetForm") as HTMLFormElement;          // hämtar addPet-formuläret från DOM:en

form.addEventListener("submit", (event) => {           // event är ett "event-objekt" som innehåller information om den händelsen som precis inträffade (submit i detta fall)
  event.preventDefault();                              // förhindrar att sidan laddas om vid formulärinlämning

  // hämtar värden från inputfälten
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const species = (document.getElementById("species") as HTMLInputElement).value;
  const breed = (document.getElementById("breed") as HTMLInputElement).value;
  const age = Number((document.getElementById("age") as HTMLInputElement).value);

  fetch("https://u05.onrender.com/api/v1/Pets/create", { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ owner, name, species, breed, age }),
  })
    .then((response) => {
      return response.json().then((data) => {
        if (!response.ok) {
          alert( data.message || "Something went wrong when registering your pet!"
          );
          return;
        }

        alert("Your pet has successfully been added!");
        window.location.href = "/dashboard.html";                         // omdirigerar till dashboard-sidan
      });
    })
    .catch((error) => {
      console.error("Add pet error", error);
      alert("Unfortunately something went wrong, try again later!");
    });
});
