document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const resourceId = urlParams.get('resource_id');
    const quizForm = document.getElementById('quiz-form');
    const quizResultsDiv = document.getElementById('quiz-results');

    if (!resourceId) {
        document.getElementById('quiz-page').innerHTML = '<p>Resource ID for quiz missing.</p>';
        return;
    }

    function fetchQuiz(resourceId) {
        fetch(`/quizzes/${resourceId}`) // Calls GET /quizzes/{resourceId} on backend
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayQuiz(data.quiz); // Assuming backend returns { quiz: { ... } }
            })
            .catch(error => {
                console.error('Error fetching quiz:', error);
                document.getElementById('quiz-page').innerHTML = '<p>Error loading quiz.</p>';
            });
    }

    function displayQuiz(quizData) {
        quizForm.innerHTML = ''; // Clear default content
        quizData.questions.forEach((question, questionIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.innerHTML = `
                <p><strong>${questionIndex + 1}. ${question.questionText}</strong></p>
            `;
            question.options.forEach((option, optionIndex) => {
                questionDiv.innerHTML += `
                    <label>
                        <input type="radio" name="question_${questionIndex}" value="${optionIndex}"> ${option}
                    </label><br>
                `;
            });
            quizForm.appendChild(questionDiv);
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit Quiz';
        quizForm.appendChild(submitButton);

        quizForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            handleSubmitQuiz(quizData.quiz_id, quizData.questions.length); // Pass quizId and question count
        });
    }

    function handleSubmitQuiz(quizId, questionCount) {
        const userAnswers = [];
        for (let i = 0; i < questionCount; i++) {
            const selectedOption = document.querySelector(`input[name="question_${i}"]:checked`);
            if (selectedOption) {
                userAnswers.push(parseInt(selectedOption.value));
            } else {
                userAnswers.push(null); // No answer selected for question i
            }
        }

        fetch(`/quizzes/submit_quiz/${quizId}`, { // Calls POST /quizzes/submit_quiz/{quizId} on backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers: userAnswers }) // Send user answers in request body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayQuizResults(data.score, questionCount); // Assuming backend returns { score: number, message: string }
            })
            .catch(error => {
                console.error('Error submitting quiz:', error);
                quizResultsDiv.innerHTML = '<p>Error submitting quiz.</p>';
                quizResultsDiv.style.display = 'block'; // Show error message
                quizForm.style.display = 'none';
            });
    }


    function displayQuizResults(score, totalQuestions) {
        quizResultsDiv.innerHTML = `
            <h2>Quiz Results</h2>
            <p>Your Score: ${score} out of ${totalQuestions} (${score}%)</p>
            <button onclick="location.reload()">Retake Quiz</button>
        `;
        quizResultsDiv.style.display = 'block'; // Show results div
        quizForm.style.display = 'none'; // Hide quiz form
    }

    fetchQuiz(resourceId);
});