import './style.scss';

const form = document.getElementById("addPetForm") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const owner = localStorage.getItem("userId");
  if (!owner) {
    alert("You must be logged in to add a pet!");
    return;
  }
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const species = (document.getElementById("species") as HTMLInputElement).value;
  const breed = (document.getElementById("breed") as HTMLInputElement).value;
  const age = Number((document.getElementById("age") as HTMLInputElement).value);
  try {
    const response = await fetch("https://u05.onrender.com/api/v1/Pets/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, name, species, breed, age }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "Something went wrong when registering the pet.");
      return;
    }
    alert("Your pet has successfully been added!");
    form.reset();
    window.location.href = "/dashboard.html";
  } catch (error) {
    console.error("Add pet error:", error);
    alert("Unfortunately something went wrong.");
  }
});
