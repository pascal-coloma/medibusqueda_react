export const  Boton = () => {
    const alerta = () => {
        alert("Presionaste el boton")
    }
    return(
        <button onClick={alerta}>Presiona el boton</button>
    )
}

