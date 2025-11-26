import { createContext, useState } from "react";

export const LoginContext = createContext()

export function LoginProvider({ children }) {
    
    const [usuario, setUsuario] = useState(() => {
        
        try {
            return JSON.parse(localStorage.getItem("usuario")) || null
            
        } catch {
            return null;
        }
        
    })

    const login = (datosUsuario) => {
        localStorage.setItem("usuario", JSON.stringify(datosUsuario));
        console.log(datosUsuario)
        setUsuario(datosUsuario);
    };

    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <LoginContext.Provider value={{ usuario, login, logout }}>
            {children}
        </LoginContext.Provider>
    )

}

