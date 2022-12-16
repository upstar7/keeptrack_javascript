import React, { useState } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";
function ProjectForm({
    project: initialProject,
    onCancel, 
    onSave
}) {

    const [project, setProject] = useState(initialProject);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(project);
    };

    const handleChange = (e) => {
        // console.log(e.target);
        const {type, name, value, checked} = e.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === "checkbox" ? checked : value;

        //if input type is number convert the updatedValue string to a +number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }

        const change = {
            [name]: updatedValue,
        };
        // console.log(updatedValue);
        let updatedProject;
        setProject((project) => {
            updatedProject = new Project({...project, ...change});
            return updatedProject;
        });
    };

    return(
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input 
                type="text" 
                name="name" 
                placeholder="Enter Name..."
                value={project.name}
                onChange={handleChange}    
            />
            <label htmlFor="descripttion">Project Description</label>
            <input 
                type="text" 
                name="description" 
                placeholder="Enter Description..." 
                value={project.description}
                onChange={handleChange} 
            />
            <label htmlFor="budget">Project Budget</label>
            <input 
                type="number" 
                name="budget" 
                placeholder="Enter Budget..."
                value={project.budget}
                onChange={handleChange} 
            />
            <label htmlFor="isActive">Active?</label>
            <input 
                type="checkbox" 
                name="isActive" 
                checked={project.isActive}
                onChange={handleChange}     
            />
            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <button type="button" className="bordered medium" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

ProjectForm.propTypes = {
    project: PropTypes.instanceOf(Project),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
export default ProjectForm;