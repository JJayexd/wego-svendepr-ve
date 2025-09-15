import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ loginData, setLoginData ] = useState('')

    useEffect(() => {
        if(sessionStorage.getItem('accessToken')) {
            setLoginData(JSON.parse(sessionStorage.getItem('accessToken')))
        }
    }, [children]) 

    return (
        <AuthContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom Hook
export const useAuth = () => useContext(AuthContext)