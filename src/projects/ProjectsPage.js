import React, { useState, useEffect } from "react";
// import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";
import { Project } from "./Project";

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    //Approach 1: using promise then
    // useEffect(() => {
    //     setLoading(true);
    //     projectAPI
    //         .get(1)
    //         .then((data) => {
    //             setError(null);
    //             setLoading(false);
    //             setProjects(data);
    //         })
    //         .catch((e) => {
    //             setLoading(false);
    //             setError(e.message);
    //         });
    // }, []);

    // Approach 2: using async/await
    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError(null);
                // setProjects(data);
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((project) => [...projects, ...data]);
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage]);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const saveProject = (project) => {
        // let updatedProjects = projects.map((p) => {
        //     return p.id === project.id ? project : p;
        // });
        // setProjects(updatedProjects);
        // console.log("saved Data:    ", project);
        projectAPI
            .put(project)
            .then((updatedProject) => {
                // console.log(updateProject);
                let updatedProjects = projects.map((p) => {
                    return p.id === project.id
                        ? new Project(updatedProject)
                        : p;
                });
                setProjects(updatedProjects);
            })
            .catch((e) => {
                setError(e.message);
            });
    };

    return (
        <>
            <h1>Projects</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}

            <ProjectList projects={projects} onSave={saveProject} />
            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button
                                className="button default"
                                onClick={handleMoreClick}
                            >
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </>
    );
}

export default ProjectsPage;
