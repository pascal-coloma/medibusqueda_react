import { describe, expect, it, vi } from "vitest"
import { Boton } from "../components/Boton"
import { render, screen, fireEvent } from "@testing-library/react"

describe('Comportamiento del Boton', () => {
    it('Renderiza correctamente', () => {
        render(<Boton />)
        expect(screen.getByText("Presiona el boton")).toBeInTheDocument()
    })

    it("Ejecuta Alerta", () => {
        const alerta = vi.spyOn(window, 'alert').mockImplementation(() => { })
        render(<Boton />)
        fireEvent.click(screen.getByText("Presiona el boton"))
        expect(alerta).toBeCalledTimes(1)
    })
})

