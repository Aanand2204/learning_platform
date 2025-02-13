document.addEventListener("DOMContentLoaded", function() {
    fetch("/api/courses")
    .then(response => response.json())
    .then(data => {
        const coursesContainer = document.getElementById("courses");
        data.forEach(course => {
            const courseElement = document.createElement("div");
            courseElement.innerHTML = `<h2>${course.title}</h2><p>${course.description}</p>`;
            coursesContainer.appendChild(courseElement);
        });
    })
    .catch(error => console.error("Error fetching courses:", error));
});