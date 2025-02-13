document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevents page refresh

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", { // ✅ Corrected port
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("token", data.token); // Save token
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Error connecting to server: " + error.message);
        }
    });
});
