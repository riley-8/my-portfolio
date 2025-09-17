
document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    const modal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDescription = document.getElementById('modal-description');
    const modalSourceLink = document.getElementById('modal-source-link');
    const modalLiveLink = document.getElementById('modal-live-link');

    let projectsData = [];

    // Fetch project data from the backend
    async function fetchProjects() {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            projectsData = await response.json();
            displayProjects(projectsData);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            projectGrid.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
        }
    }

    // Display projects in the grid
    function displayProjects(projects) {
        projectGrid.innerHTML = ''; // Clear existing projects

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.dataset.projectId = project.id;

            let tagsHtml = '';
            if (project.tags && project.tags.length) {
                tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            }

            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-tags">${tagsHtml}</div>
                </div>
            `;

            projectCard.addEventListener('click', () => {
                openModal(project.id);
            });

            projectGrid.appendChild(projectCard);
        });
    }

    // Open the modal with project details
    function openModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.long_description;

        // Clear and populate tags
        modalTags.innerHTML = '';
        if (project.tags && project.tags.length) {
            project.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.classList.add('tag');
                tagElement.textContent = tag;
                modalTags.appendChild(tagElement);
            });
        }

        // Update links
        updateLink(modalSourceLink, project.source_code_link);
        updateLink(modalLiveLink, project.live_demo_link);

        modal.style.display = 'block';
    }

    // Helper function to update link visibility and href
    function updateLink(element, link) {
        if (link) {
            element.href = link;
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    }

    // Close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Initial fetch
    fetchProjects();
});
