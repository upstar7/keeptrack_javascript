import React, { useState } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";
function ProjectForm({ project: initialProject, onCancel, onSave }) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        budget: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid()) return;
        onSave(project);
    };

    const handleChange = (e) => {
        // console.log(e.target);
        const { type, name, value, checked } = e.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === "checkbox" ? checked : value;

        //if input type is number convert the updatedValue string to a +number
        if (type === "number") {
            updatedValue = Number(updatedValue);
        }

        const change = {
            [name]: updatedValue,
        };
        // console.log(updatedValue);
        let updatedProject;
        setProject((project) => {
            updatedProject = new Project({ ...project, ...change });
            return updatedProject;
        });
        setErrors(() => validate(updatedProject));
    };

    function validate(project) {
        let err = { name: "", description: "", budget: "" };
        if (project.name.length === 0) {
            err.name = "Name is required.";
        }
        if (project.name.length > 0 && project.name.length < 3) {
            err.name = "Name needs to be at least 3 characters.";
        }
        if (project.description.length === 0) {
            err.description = "Description is required.";
        }
        if (project.budget === 0) {
            err.budget = "Budget is required.";
        }
        return err;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input
                type="text"
                name="name"
                placeholder="Enter Name..."
                value={project.name}
                onChange={handleChange}
            />
            {errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}
            <label htmlFor="descripttion">Project Description</label>
            <input
                type="text"
                name="description"
                placeholder="Enter Description..."
                value={project.description}
                onChange={handleChange}
            />
            {errors.description.length > 0 && (
                <div className="card error">
                    <p>{errors.description}</p>
                </div>
            )}
            <label htmlFor="budget">Project Budget</label>
            <input
                type="number"
                name="budget"
                placeholder="Enter Budget..."
                value={project.budget}
                onChange={handleChange}
            />
            {errors.budget.length > 0 && (
                <div className="card error">
                    <p>{errors.budget}</p>
                </div>
            )}
            <label htmlFor="isActive">Active?</label>
            <input
                type="checkbox"
                name="isActive"
                checked={project.isActive}
                onChange={handleChange}
            />
            <div className="input-group">
                <button className="primary bordered medium">Save</button>
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
    onCancel: PropTypes.func.isRequired,
};
export default ProjectForm;
