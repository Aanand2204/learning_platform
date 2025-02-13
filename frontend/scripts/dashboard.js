document.addEventListener("DOMContentLoaded", function() {
        fetch("/api/user", {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("user-info").innerHTML = `<p>Welcome, ${data.name}</p>`;
        })
        .catch(error => console.error("Error fetching user info:", error));
    });