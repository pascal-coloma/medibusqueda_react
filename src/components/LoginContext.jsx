import { createContext, useState } from "react";

export const LoginContext = createContext()

//  Usar context y context provider
//  useEffect
//  Hooks de React
// Navigate -> navegacion entre componentes de la pagina
// Efecto -> ejecucion de codigo en funciones asincronas: cargar datos y sincronia desde backend
// Contexto -> interaccion de informacion entre componentes: componente global que maneja los datos en los distintos almacenamientos


export function LoginProvider({children}){
    const [usuario, setUsuario] = useState(null)

    const login = (user) => {
        localStorage.setItem("user", user)
        setUsuario(user)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUsuario(null)
    }

    return (
        <LoginContext.Provider value={usuario}>
            {children}
        </LoginContext.Provider>
        
    )

}

