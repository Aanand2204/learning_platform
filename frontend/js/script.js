document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch recommendations from backend API
    function fetchRecommendations() {
        fetch('/recommendations') // Calls GET /recommendations on backend
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayRecommendations(data.recommendations); // Assuming backend returns { recommendations: [...] }
            })
            .catch(error => {
                console.error('Error fetching recommendations:', error);
                document.getElementById('recommendation-list').innerHTML = '<p>Error loading recommendations.</p>';
            });
    }

    function displayRecommendations(recommendations) {
        const listElement = document.getElementById('recommendation-list');
        if (!listElement) return;

        listElement.innerHTML = ''; // Clear existing content
        recommendations.forEach(rec => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'recommendation-item';
            itemDiv.innerHTML = `
                <h3><a href="/frontend/html/resource_detail.html?id=${rec.resource_id}">${rec.title}</a></h3>
                <p>${rec.description}</p>
            `;
            listElement.appendChild(itemDiv);
        });
    }

    // Example progress overview (replace with actual API call if needed)
    function displayProgressOverview() {
        const progressSection = document.getElementById('progress-overview');
        if (!progressSection) return;

        progressSection.innerHTML = `
            <h2>Your Progress</h2>
            <p>Welcome back! Continue learning and explore new resources.</p>
            <p><em>(Progress overview data would be fetched from backend API in a real application)</em></p>
        `;
    }

    // Logout functionality (example - needs actual implementation with token clearing/API)
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            alert('Logout functionality to be implemented - clear tokens, redirect to login page.');
            // In real app: Clear JWT token from localStorage/cookies, redirect to login page
        });
    }

    fetchRecommendations();
    displayProgressOverview();
});