document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const resourceId = urlParams.get('id');

    if (!resourceId) {
        document.getElementById('resource-detail').innerHTML = '<p>Resource ID missing.</p>';
        return;
    }

    function fetchResourceDetail(id) {
        fetch(`/resources/${id}`) // Calls GET /resources/{id} on backend
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayResourceDetail(data.resource); // Assuming backend returns { resource: { ... } }
            })
            .catch(error => {
                console.error('Error fetching resource detail:', error);
                document.getElementById('resource-detail').innerHTML = '<p>Error loading resource detail.</p>';
            });
    }

    function displayResourceDetail(resource) {
        const detailDiv = document.getElementById('resource-detail');
        if (!detailDiv) return;

        detailDiv.innerHTML = `
            <h2>${resource.title}</h2>
            <p>${resource.description}</p>
            <p><strong>Type:</strong> ${resource.resource_type}</p>
            <p><strong>Topic:</strong> ${resource.topic}</p>
            <div id="resource-content-embed">
                ${resource.resource_type === 'video' ? `<iframe width="560" height="315" src="${resource.url}" frameborder="0" allowfullscreen></iframe>` : `<p><a href="${resource.url}" target="_blank">View Resource</a></p>`}
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" id="resource-progress-bar" style="width: 20%;"></div>
            </div>
            <a href="/frontend/html/quiz.html?resource_id=${resource.resource_id}">Take Quiz</a>
        `;

        const startLearningButton = document.getElementById('start-learning'); // Example button - functionality to be implemented
        if (startLearningButton) {
            startLearningButton.addEventListener('click', function() {
                alert('Start/Continue Learning - Progress update to be implemented');
                // In real app: Update user progress in backend via API call to /progress
            });
        }
    }

    fetchResourceDetail(resourceId);
});