import axios from "axios";
import { Person } from "../types/Person";
import { Experience } from "../types/Experience";
import { Project } from "../types/Project";

const URL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export const createNewUser = (username: string | undefined) => {
    console.log("User with name " + username)
    return axios.post(URL + '/api/new', { username: username });
}

export const getPerson = (username: string | undefined) => {
    return axios.get<Person>(URL + '/' + username);
}

export const editPortfolioAboutMe = (id: number | undefined, aboutMe: string | undefined) => {
    return axios.post(URL + '/api/portfolio/aboutMe/edit',
        {load: aboutMe}, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const editPortfolioName = (id: number | undefined, name: string | undefined) => {
    return axios.post(URL + '/api/portfolio/name/edit',
        { load: name }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const addLink = (id: number | undefined, link: string | undefined) => {
    console.log("adding")
    return axios.post(URL + '/api/portfolio/link/add',
        { load: link }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const getAllExperiences = (id: number | undefined) => {
    return axios.get(URL + '/api/portfolio/experience/all');
}

export const addExperience = (id: number | undefined, experience: Experience) => {
    return axios.post(URL + '/api/portfolio/experience/add',
        experience, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

export const deleteExperience = (portfolioId: number | undefined, experienceId: number | undefined) => {
    return axios.delete(URL + '/api/portfolio/experience/' + experienceId + '/delete');
}

export const getAllProjects = (id: number | undefined) => {
    return axios.get(URL + '/api/portfolio/project/all');
}

export const addProject = (id: number | undefined, project: Project) => {
    return axios.post(URL + '/api/portfolio/project/add',
        project, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const deleteProject = (portfolioId: number | undefined, projectId: number | undefined) => {
    return axios.delete(URL + '/api/portfolio/project/' + projectId + '/delete');
}

export const loginUser = async (username: string, password: string): Promise<Person | null> => {
    return axios
        .post<Person>(URL + '/api/auth/signin', {
            username,
            password,
        })
        .then((response) => {
            console.log(response)
            if (response.data.username) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
}

export const signupUser = async (username: string, email: string, password: string) => {
    const role = ["admin"]
    return axios
        .post(URL + '/api/auth/signup', {
            username,
            email,
            password,
            role
        })
        .then((response) => {
            console.log(response.data)
            // if (response.data.username) {
            //     localStorage.setItem("user", JSON.stringify(response.data));
            // }
            // window.location.replace("/");
            return response.data;
        })
}

export const logoutUser = async (): Promise<{message: string}> => {
    localStorage.removeItem("user");
    const response = await axios.post(URL + "signout");
    console.log(response);
    return response.data;
};

export const getCurrentUser = () : string | null => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("user"));
};


