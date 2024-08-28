import { createContext, useState, useCallback, useEffect } from "react";
import { postRequest, baseURL } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('User');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        try {
            const response = await postRequest(`${baseURL}/user/register`, JSON.stringify(registerInfo));

            setIsRegisterLoading(false);

            if (response.error) {
                setRegisterError(response.message);
                return false;
            }

            localStorage.setItem('User', JSON.stringify(response));
            setUser(response);
            return true;
        } catch (error) {
            setIsRegisterLoading(false);
            setRegisterError("Network error. Please try again later.");
            return false;
        }
    }, [registerInfo]);

    const loginUser = useCallback(async ({ email, password }) => {
        setIsLoginLoading(true);
        setLoginError(null);

        try {
            const response = await postRequest(`${baseURL}/user/login`, JSON.stringify({ email, password }));

            setIsLoginLoading(false);

            if (response.error) {
                setLoginError(response.message);
                return false;
            }

            localStorage.setItem('User', JSON.stringify(response));
            setUser(response);
            return true;
        } catch (error) {
            setIsLoginLoading(false);
            setLoginError("Network error. Please try again later.");
            return false;
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            loginUser,
            loginError,
            isLoginLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};
