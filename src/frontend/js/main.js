document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
});

async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        const projectGrid = document.querySelector('.project-grid');
        projectGrid.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
    }
}

function displayProjects(projects) {
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = ''; // Clear existing projects

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        let tagsHtml = '';
        if (project.tags && project.tags.length) {
            tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        }

        let linksHtml = '';
        if (project.source_code_link) {
            linksHtml += `<a href="${project.source_code_link}" target="_blank" class="project-link">Source Code</a>`;
        }
        if (project.live_demo_link) {
            linksHtml += `<a href="${project.live_demo_link}" target="_blank" class="project-link">Live Demo</a>`;
        }

        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <div class="project-tags">${tagsHtml}</div>
            <div class="project-description">${project.long_description}</div>
            <div class="project-links">${linksHtml}</div>
        `;

        projectGrid.appendChild(projectCard);
    });
}
