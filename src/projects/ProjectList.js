import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
function ProjectList({ projects, onSave }) {
    const [projectBeeingEdited, setProjectBeeingEdited] = useState({});

    const handleEdit = (project) => {
        setProjectBeeingEdited(project);
    };
    
    const cancelEditing = () => {
        setProjectBeeingEdited({});
    }

    const items = projects.map(project => (
        <div key={project.id} className="cols-sm">
            {project === projectBeeingEdited ? (
                <ProjectForm 
                    project={project}
                    onSave={onSave}
                    onCancel={cancelEditing}
                />
            ) : (
                <ProjectCard project={project} onEdit={handleEdit} />
            )}
        </div>
    ));

    return(
        <div className="row">{items}</div>
    );
    
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
    onSave: PropTypes.func.isRequired
};

export default ProjectList;