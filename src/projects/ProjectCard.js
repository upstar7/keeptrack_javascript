import React from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";




function ProjectCard( props ) {
    const {project, onEdit} = props;

    const formatDescription = (desc) => desc.length >= 60 ? desc.substring(0, 60) + "..." : desc;

    const handleEditClick = (projectBeingEdited)=> {
        onEdit(projectBeingEdited);
    }
    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <h5 className="strong">
                    <strong>{project.name}</strong>
                </h5>
                <p>{formatDescription(project.description)}</p>
                <p>Budget: {project.budget}</p>
                <button className="bordered" onClick={() => handleEditClick(project)}>
                    <span className="icon-edit"></span>
                    Edit
                </button>
            </section>
        </div>
    );   
}

ProjectCard.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
    onEdit: PropTypes.func.isRequired
};

export default ProjectCard;
