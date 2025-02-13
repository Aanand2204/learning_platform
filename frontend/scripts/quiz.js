document.addEventListener("DOMContentLoaded", function() {
    fetch("/api/quiz")
    .then(response => response.json())
    .then(data => {
        const quizContainer = document.getElementById("quiz-container");
        data.questions.forEach((question, index) => {
            const questionElement = document.createElement("div");
            questionElement.innerHTML = `<p>${question.text}</p>`;
            question.options.forEach(option => {
                questionElement.innerHTML += `<input type='radio' name='q${index}' value='${option}'> ${option}<br>`;
            });
            quizContainer.appendChild(questionElement);
        });
    })
    .catch(error => console.error("Error fetching quiz:", error));
});

document.getElementById("submit-quiz").addEventListener("click", function() {
    const answers = {};
    document.querySelectorAll("input[type=radio]:checked").forEach(input => {
        answers[input.name] = input.value;
    });
    fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers)
    })
    .then(response => response.json())
    .then(data => alert("Quiz submitted! Your score: " + data.score))
    .catch(error => console.error("Quiz submission failed:", error));
});
