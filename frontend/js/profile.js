document.addEventListener('DOMContentLoaded', function() {
    function fetchUserProfile() {
        fetch('/auth/user') // Calls GET /auth/user on backend (protected route - needs token in real app)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayUserProfile(data); // Assuming backend returns user profile data directly
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                document.getElementById('user-profile').innerHTML = '<p>Error loading profile.</p>';
            });
    }

    function displayUserProfile(profile) {
        const userInfoSection = document.getElementById('user-info');
        const preferencesSection = document.getElementById('preferences');
        const learningHistorySection = document.getElementById('learning-history');

        if (userInfoSection) {
            userInfoSection.innerHTML = `
                <p><strong>Username:</strong> ${profile.username}</p>
                <p><strong>Email:</strong> ${profile.email}</p>
            `;
        }

        if (preferencesSection) {
            preferencesSection.innerHTML = `
                <h3>Learning Preferences</h3>
                <p><strong>Topics:</strong> ${profile.preferences ? profile.preferences.topics.join(', ') : 'No preferences set'}</p>
                <button id="edit-preferences">Edit Preferences</button>
            `;
            const editPreferencesButton = document.getElementById('edit-preferences');
            if (editPreferencesButton) {
                editPreferencesButton.addEventListener('click', function() {
                    alert('Edit preferences functionality to be implemented - form to update preferences');
                    // In real app: Show a form to edit user preferences and update via API call to /auth/user/preferences (or similar)
                });
            }
        }

        if (learningHistorySection) {
            learningHistorySection.innerHTML = `
                <h3>Learning History</h3>
                <ul>
                    ${profile.learningHistory ? profile.learningHistory.map(item => `<li>${item.resourceTitle} - Progress: ${item.progress}</li>`).join('') : 'No learning history yet'}
                </ul>
                <h3>Quiz Results</h3>
                <ul>
                    ${profile.quizResults ? profile.quizResults.map(result => `<li>${result.quizTitle} - Score: ${result.score}%</li>`).join('') : 'No quiz results yet'}
                </ul>
            `;
        }
    }

    fetchUserProfile();
});