import './style.scss';

const form = document.getElementById("registerForm") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  try {
    const response = await fetch(
      "https://u05.onrender.com/api/v1/Users/registration",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "Registration failed, try again!");
      return;
    }
    alert("Your account has been created!");
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    alert("Unfortunately something went wrong!");
  }
});
