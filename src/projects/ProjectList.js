import React, { useState } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
function ProjectList({ projects, onSave }) {
    const [projectBeingEdited, setProjectBeingEdited] = useState([]);

    const handleEdit = (project) => {
        // console.log(project);
        setProjectBeingEdited(project);
    };

    const cancelEditing = () => {
        // console.log(project);
        setProjectBeingEdited({});
    };

    const items = projects.map((project) => (
        <div key={project.id} className="cols-sm">
            {project === projectBeingEdited ? (
                <ProjectForm
                    project={project}
                    onCancel={cancelEditing}
                    onSave={onSave}
                />
            ) : (
                <ProjectCard
                    project={project}
                    onEdit={handleEdit}
                ></ProjectCard>
            )}
        </div>
    ));
    return <div className="row">{items}</div>;
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
    onSave: PropTypes.func.isRequired,
};
export default ProjectList;
