import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Project } from "./Project";
import { type } from "@testing-library/user-event/dist/type";
function ProjectForm({ 
    project: initialProject,
    onSave, 
    onCancel 
}) {
    const [project, setProject] = useState(initialProject);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(new Project({ name: 'Updated Project' }));
    };
    const handleChange = (e) => {
        const { type, name, value, checked } = e.target;
        // if input type is checkbox use checked
        // otherwise it is type is text, number etc. so use value
        // console.log(e.target);
        let updatedValue = type === 'checkbox' ? checked : value;

        //if input type is number convert the updated string to a + number

        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };


    };

    return (
        <form 
            className="input-group vertical"
            onSubmit={handleSubmit}
        >
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name" onChange={handleChange}/>
            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description" />
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="enter budget" />
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" />
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