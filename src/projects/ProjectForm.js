import React from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";
function ProjectForm({onCancel, onSave}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(new Project({name: "Updated Project"}));
    };

    return(
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="Enter Name..." />
            <label htmlFor="descripttion">Project Description</label>
            <input type="text" name="description" placeholder="Enter Description..." />
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="Enter Budget..." />
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" />
            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <button type="button" className="bordered medium" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

ProjectForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
export default ProjectForm;