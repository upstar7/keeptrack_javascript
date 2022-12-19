import { Project } from "./Project";

const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status) {
    switch (status) {
        case 401:
            return "Please login again";
        case 403:
            return "You do not have permission to view the projects.";
        default:
            return "There was an error retrieing the project. Please try again.";
    }
}

function checkStatus(response) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response) {
    return response.json();
}

function delay(ms) {
    return function(x) {
        return Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
}

const projectAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(delay(600))
            .then(checkStatus)
            .then(parseJSON)
            .then((project) => {
                return project.map((p) => {
                    return new Project(p);
                });
            })
            .catch((error) => {
                console.log("log client error " + error);
                throw new Error(
                    "There was an error retrieving the projects. Please try again."
                );
            });
    },
};
export { projectAPI };
