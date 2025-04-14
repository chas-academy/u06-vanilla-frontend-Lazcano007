import './style.scss';

const form = document.getElementById("loginForm") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // 

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  try {
    const response = await fetch("https://u05.onrender.com/api/v1/Users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "There's been an error while login in!");
      return;
    }
    localStorage.setItem("userId", data.user._id); // Spara userId i localStorage
    alert("You've logged in successfully!");
    form.reset();
    window.location.href = "/dashboard.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("There's been an error during login");
  }
});
