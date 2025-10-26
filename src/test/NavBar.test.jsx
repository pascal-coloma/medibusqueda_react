import NavBar from "../components/NavBar";
import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { LoginContext, LoginProvider } from "../components/LoginContext";
import { MemoryRouter } from "react-router-dom";

// Test de renderizado de la navbar 
describe('Render Navbar', () => {

    const mockLogin = vi.fn();
    const mockLogout = vi.fn();

    it('Renderizado correcto', () => {
        const { getByText } = render(
            <LoginProvider>
                <NavBar />
            </LoginProvider>

        )
        expect(getByText('MediBusqueda')).toBeInTheDocument();
    })
    it('Check boton "Cerrar sesion" por usuario logueado', () => {
        localStorage.setItem("username", "Anakin")
        render(
            <LoginContext.Provider value={{ usuario: "Anakin", login: mockLogin, logout: mockLogout }}>
                <NavBar />
            </LoginContext.Provider>
        );

        expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument()

    })
    it('Check boton "Iniciar sesion" con localStorage vacio', () => {
        localStorage.clear()

        render(
            <LoginContext.Provider value={{ usuario: "", login: mockLogin, logout: mockLogout }}>
                <NavBar />
            </LoginContext.Provider>
        )

        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    })
    it('check boton cierre de sesion', () => {
        localStorage.setItem("username", "Anakin");
        render(
            <LoginContext.Provider value={{ usuario: "Anakin", login: mockLogin, logout: mockLogout }}>
                <NavBar />
            </LoginContext.Provider>

        )
        fireEvent.click(screen.getByText('Cerrar Sesión'));
        expect(mockLogout).toHaveBeenCalledTimes(1);

        localStorage.clear();
    })

    it('enlaces de navegacion presentes y correcta redireccion', () => {
        render(
            <LoginContext.Provider value={{usuario: "Anakin", login:mockLogin, logout:mockLogout}}>
                <NavBar />
            </LoginContext.Provider>

        )
        expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
        expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
    })
    
})