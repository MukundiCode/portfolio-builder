import { PropsWithChildren, ReactNode, createContext } from 'react'
import axios from 'axios';
import { Person } from "../types/Person";


const AuthContext = createContext<{
    loginUser: (username: string, password: string) => Promise<Person | null>,
    logoutUser: () => Promise<{message: string}>,
    getCurrentUser: () => string | null
} | null>(null)

export default AuthContext;

interface Props {
    children: React.ReactNode;
  }

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const API_URL = "/api/auth/";

    let loginUser = async (username: string, password: string): Promise<Person | null> => {
        return axios
            .post<Person>(API_URL + 'signin', {
                username,
                password,
            })
            .then((response) => {
                if (response.data.username) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                window.location.replace("/");
                return response.data;
            })
    }

    let logoutUser = async (): Promise<{message: string}> => {
        localStorage.removeItem("user");
        const response = await axios.post(API_URL + "signout");
        console.log(response);
        return response.data;
    };

    const getCurrentUser = () : string | null => {
        return JSON.parse(localStorage.getItem("user") || "");
    };

    let contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        getCurrentUser: getCurrentUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}