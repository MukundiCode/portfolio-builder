import axios from "axios";
import { Person } from "../types/Person";
import { Experience } from "../types/Experience";
import { Project } from "../types/Project";

const URL = 'http://localhost:8080';

export const createNewUser = (username: string | undefined) => {
    return axios.post(URL + '/new', { username: username });
}

export const getPerson = (username: string | undefined) => {
    return axios.get<Person>(URL + '/' + username);
}

export const editPortfolioAboutMe = (id: number | undefined, aboutMe: string | undefined) => {
    return axios.post(URL + '/portfolio/' + id + '/aboutMe/edit',
        {load: aboutMe}, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const editPortfolioName = (id: number | undefined, name: string | undefined) => {
    return axios.post(URL + '/portfolio/' + id + '/name/edit',
        { load: name }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const addLink = (id: number | undefined, link: string | undefined) => {
    console.log("adding")
    return axios.post(URL + '/portfolio/' + id + '/link/add',
        { load: link }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const getAllExperiences = (id: number | undefined) => {
    return axios.get(URL + '/portfolio/' + id + '/experience/all');
}

export const addExperience = (id: number | undefined, experience: Experience) => {
    return axios.post(URL + '/portfolio/' + id + '/experience/add',
        experience, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

export const deleteExperience = (portfolioId: number | undefined, experienceId: number | undefined) => {
    return axios.delete(URL + '/portfolio/' + portfolioId + '/experience/' + experienceId + '/delete');
}

export const getAllProjects = (id: number | undefined) => {
    return axios.get(URL + '/portfolio/' + id + '/project/all');
}

export const addProject = (id: number | undefined, project: Project) => {
    return axios.post(URL + '/portfolio/' + id + '/project/add',
        project, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const deleteProject = (portfolioId: number | undefined, projectId: number | undefined) => {
    return axios.delete(URL + '/portfolio/' + portfolioId + '/project/' + projectId + '/delete');
}


