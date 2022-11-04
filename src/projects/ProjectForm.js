import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Project } from "./Project";
function ProjectForm({ 
    project: initialProject,
    onSave, 
    onCancel 
}) {
    const [project, setProject] = useState(initialProject);
    const handleSubmit = (e) => {
        e.preventDefault();
        // onSave(new Project({ name: 'Updated Project' }));
        onSave(project);
    };
    const handleChange = (e) => {
        const { type, name, value, checked } = e.target;
        // if input type is checkbox use checked
        // otherwise it is type is text, number etc. so use value
        console.log(e.target);
        let updatedValue = type === 'checkbox' ? checked : value;

        //if input type is number convert the updated string to a + number

        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedProject;
        // need to do functional update b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited +like project.id
        // the spread operator (...) is used to
        // spread the previous project properties and the new change
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });

    };

    return (
        <form 
            className="input-group vertical"
            onSubmit={handleSubmit}
        >
            <label htmlFor="name">Project Name</label>
            <input 
                type="text" 
                name="name" 
                placeholder="enter name" 
                value={project.name}
                onChange={handleChange}
            />
            <label htmlFor="description">Project Description</label>
            <textarea 
                name="description" 
                placeholder="enter description" 
                value={project.description}
                onChange={handleChange}
            />
            <label htmlFor="budget">Project Budget</label>
            <input 
                type="number" 
                name="budget" 
                placeholder="enter budget" 
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
                <span />
                <button 
                    type="button" 
                    className="bordered medium"
                    onClick={onCancel}
                >
                Cancel
                </button>
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