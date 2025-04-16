import './style.scss';

const form = document.getElementById("registerForm") as HTMLFormElement;  // hämtar register-formuläret från DOM:en


form.addEventListener("submit", (event) => {      // event är ett "event-objekt" som innehåller information om den händelsen som precis inträffade (submit i detta fall)
  event.preventDefault();                         // förhindrar att sidan laddas om vid formulärinlämning

    // hämtar värden från inputfälten
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  fetch("https://u05.onrender.com/api/v1/Users/registration", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => {
      return response.json().then((data) => {
        if (!response.ok) {
          alert(data.message || "Registration failed, try again!");
          return;
        }
        alert("Your account has been created!");
        window.location.href = "/dashboard.html"; // omdirigerar till dashboard
      });
    })
    .catch((error) => {
      console.error("Error creating an account", error);
      alert("Unfortunately something went wrong, please try again later!");
    });
});
