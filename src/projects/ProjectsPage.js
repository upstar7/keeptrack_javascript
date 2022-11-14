import React, { useState } from 'react';
// import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';

function ProjectsPage() {
    // const [projects, setProjects] = useState(MOCK_PROJECTS);
    const [projects, setProjects] = useState([]]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const saveProject = (project) => {
        // console.log('Saving project: ', project);
        let updatedProjects = projects.map((p) => {
            return p.id ===project.id ? project: p;
        });
        setProjects(updatedProjects);
    };

    return (
        <>
            <h1>Projects</h1>
            <ProjectList 
                onSave={saveProject}
                projects={projects} 
            />
        </>
    );
}

export default ProjectsPage;