import './style.scss';

const form = document.getElementById("loginForm") as HTMLFormElement;  // hämtar login-formuläret från DOM:en

form.addEventListener("submit", (event) => {                           // event är ett "event-objekt" som innehåller information om den händelsen som precis inträffade (submit i detta fall)
  event.preventDefault();                                              // förhindrar att sidan laddas om vid inlämning

    // hämtar värden från inputfälten
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  fetch("https://u05.onrender.com/api/v1/Users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  })
    .then((response) => {
      return response.json().then((data) => {
        if (!response.ok) {
          alert(data.message || "There's been an error while logging in!");
          return;
        }
        localStorage.setItem("userId", data.user._id);       // sparar användarens ID i localStorage
        alert("You've logged in successfully!");
        form.reset();                                        // rensar formuläret efter inloggning
        window.location.href = "/dashboard.html";            // omdirigerar till dashboard-sidan
      });
    })
    .catch((error) => {
      console.error("Login error", error);
      alert("There's been an error during your login session!");
    });
});
