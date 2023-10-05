import axios, { AxiosError } from "axios";
import { Person } from "../types/Person";
import { Experience } from "../types/Experience";
import { Project } from "../types/Project";
import { useHistory } from "react-router-dom";

// const URL = 'http://localhost:8080';
const URL = '';
// axios.defaults.withCredentials = true;

export const getPerson = (username: string | undefined) => {
    return axios.get<Person>(URL + '/api/person/' + username)
}

export const editPortfolioAboutMe = (aboutMe: string | undefined) => {
    return axios.post(URL + '/api/portfolio/aboutMe/edit',
        { load: aboutMe }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const editPortfolioName = (name: string | undefined) => {
    return axios.post(URL + '/api/portfolio/name/edit',
        { load: name }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const addLink = (link: string | undefined) => {
    console.log("adding")
    return axios.post(URL + '/api/portfolio/link/add',
        { load: link }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const getAllExperiences = () => {
    return axios.get(URL + '/api/portfolio/experience/all');
}

export const addExperience = (experience: Experience) => {
    return axios.post(URL + '/api/portfolio/experience/add',
        experience, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

export const deleteExperience = (experienceId: number | undefined) => {
    return axios.delete(URL + '/api/portfolio/experience/' + experienceId + '/delete');
}

export const getAllProjects = () => {
    return axios.get(URL + '/api/portfolio/project/all');
}

export const addProject = (project: Project) => {
    return axios.post(URL + '/api/portfolio/project/add',
        project, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const deleteProject = (projectId: number | undefined) => {
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
    const role = ['user'];
    return axios
        .post(URL + '/api/auth/signup', {
            username,
            email,
            password,
            role
        }, { withCredentials: false })
        .then((response) => {
            console.log(response.data)
            return response.data;
        })
}

export const isUsernameTaken = (username: string) => {
    return axios.get(URL + '/api/person/isUsernameTaken?username=' + username);
}

export const logoutUser = async () => {
    localStorage.removeItem("user");
    const response = await axios.post(URL + "/api/auth/signout");
    window.location.href = "/"
    return response.data;
};

export const getCurrentUser = (): string | null => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("user"));
};

export const shouldShowEditButtons = (name: string): boolean => {
    // @ts-ignore
    return getCurrentUser() && (JSON.parse(localStorage.getItem("user")) as Person).username === name;
}
 
export const handleUnauthorizedError = () => {
    logoutUser()
    // const history = useHistory()
    // history.push("/")
}



