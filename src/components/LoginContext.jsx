import { createContext, useState } from "react";

export const LoginContext = createContext()

//  Usar context y context provider
//  useEffect
//  Hooks de React
// Navigate -> navegacion entre componentes de la pagina
// Efecto -> ejecucion de codigo en funciones asincronas: cargar datos y sincronia desde backend
// Contexto -> interaccion de informacion entre componentes: componente global que maneja los datos en los distintos almacenamientos


export function LoginProvider({ children }) {
    const [usuario, setUsuario] = useState("")

    const login = (user) => {

        localStorage.setItem("correo", user);
        setUsuario(user);

    }

    const logout = () => {

        logout();
        localStorage.removeItem("correo");
        localStorage.removeItem("nombre");
        localStorage.removeItem("profileImage");
        localStorage.removeItem("busquedasRecientes");
        navegador("/login");

    }

    return (
        <LoginContext.Provider value={{ usuario, login, logout }}>
            {children}
        </LoginContext.Provider>
    )

}

