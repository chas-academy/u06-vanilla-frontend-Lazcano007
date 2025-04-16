import "./style.scss";

const form = document.getElementById("addPetForm") as HTMLFormElement; // hämtar addPet-formuläret från DOM:en

form.addEventListener("submit", (event) => {           // event är ett "event-objekt" som innehåller information om den händelsen som precis inträffade (submit i detta fall)
  event.preventDefault();                              // förhindrar att sidan laddas om vid formulärinlämning

  const owner = localStorage.getItem("userId");        // hämtar userId från localStorage
  if (!owner) {
    alert("You must be logged in to add a pet!"); 
    return;
  }
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
          alert(
            data.message || "Something went wrong when registering your pet!");
          return;
        }
        alert("Your pet has successfully been added!");
        form.reset();                               // rensar formuläret
        window.location.href = "/dashboard.html";   // omdirigerar till dashboard-sidan
      });
    })
    .catch((error) => {
      console.error("Add pet error", error);        // hanterar nätverksfel eller andra oväntade fel
      alert("Unfortunatelly something went wrong, try again later!");
    });
});
