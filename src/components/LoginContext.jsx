import { createContext, useState } from "react";
import "./logoutOverlay.css"; // Importa el CSS externo

export const LoginContext = createContext();

export function LoginProvider({ children }) {
    
    const [usuario, setUsuario] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("usuario")) || null;
        } catch {
            return null;
        }
    });

    const [loadingLogout, setLoadingLogout] = useState(false);

    const login = (datosUsuario) => {
        localStorage.setItem("usuario", JSON.stringify(datosUsuario));
        setUsuario(datosUsuario);
    };

    const logout = () => {
        setLoadingLogout(true);

        setTimeout(() => {
            localStorage.clear();
            setUsuario(null);
            setLoadingLogout(false);
        }, 1500);
    };

    return (
        <LoginContext.Provider value={{ usuario, login, logout, loadingLogout }}>
            <>
                {children}

                {loadingLogout && (
                    <div className="logout-overlay">
                        <div className="logout-text">Cerrando sesión…</div>
                    </div>
                )}
            </>
        </LoginContext.Provider>
    );
}
