document.addEventListener('DOMContentLoaded', function() {
    function fetchResources(topicFilter = '', searchText = '') {
        let apiUrl = '/resources';
        const queryParams = [];
        if (topicFilter) {
            queryParams.push(`topic=${encodeURIComponent(topicFilter)}`);
        }
        if (searchText) {
            queryParams.push(`search=${encodeURIComponent(searchText)}`); // Assuming backend supports search query param
        }
        if (queryParams.length > 0) {
            apiUrl += '?' + queryParams.join('&');
        }

        fetch(apiUrl) // Calls GET /resources?topic=...?search=... on backend
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayResources(data.resources); // Assuming backend returns { resources: [...] }
            })
            .catch(error => {
                console.error('Error fetching resources:', error);
                document.getElementById('resource-list').innerHTML = '<p>Error loading resources.</p>';
            });
    }

    function displayResources(resources) {
        const listElement = document.getElementById('resource-list');
        if (!listElement) return;

        listElement.innerHTML = ''; // Clear existing resources
        resources.forEach(resource => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'resource-item';
            itemDiv.innerHTML = `
                <h3><a href="/frontend/html/resource_detail.html?id=${resource.resource_id}">${resource.title}</a></h3>
                <p>${resource.description}</p>
                <p>Topic: ${resource.topic}</p>
            `;
            listElement.appendChild(itemDiv);
        });
    }

    function setupFilters() {
        const filterDiv = document.getElementById('resource-filters');
        if (!filterDiv) return;

        filterDiv.innerHTML = `
            <input type="text" id="search-box" placeholder="Search resources...">
            <select id="topic-filter">
                <option value="">All Topics</option>
                <option value="Python">Python</option>
                <option value="Web Development">Web Development</option>
            </select>
            <button id="filter-button">Filter</button>
        `;

        const filterButton = document.getElementById('filter-button');
        filterButton.addEventListener('click', function() {
            const searchText = document.getElementById('search-box').value;
            const topic = document.getElementById('topic-filter').value;
            fetchResources(topic, searchText); // Fetch resources with filters
        });
    }

    fetchResources(); // Initial load of all resources
    setupFilters();
});