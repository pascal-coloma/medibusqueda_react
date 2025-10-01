import './modal.css'

//Este popup lo oinvocas y dentro de la pagina donde lo estes invocando lo puedes rellenar con lo que quieras

function Popup(prop) {
    return (prop.trigger) ? (
      <div  className="popup">
        <div className="popup-inner">
        {prop.children}
        </div>
      </div>
    ): ""; //esto es un if donde si trigger es true se muestra el popup y si es false no se muestra nada
}

export default Popup