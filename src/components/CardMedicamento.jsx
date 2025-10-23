import React, { useEffect } from "react";

function CardMedicamento ({ producto }) {
  return (
    <>
      <div className="col-md-4 mb-4">
        <form className="medicamentosJs border-info" id="tarjetasMeds">
          <div className="card bg-light">
            <div className="card-body text-black">
              <h5 className="nombre card-title fw-bold text-capitalize text-center">
                {producto.nombreMedicamento}
              </h5>
              <hr />
              <p className="laboratorio card-text" style={{ fontWeight: "bold" }}>
                {producto.laboratorio}
              </p>
              <p className="principioActivo card-text">
                {producto.principioActivo1}
              </p>
              <p className="card-text" id="tituloCard">Presentación:</p>
              <p className="presentacion">{producto.presentacion}</p>
              <p className="card-text" id="tituloCard">Acción Terapéutica:</p>
              <p className="accion">{producto.accionTerapeutica}</p>
              <p className="card-text" id="tituloCard">Precio Fonasa:</p>
              <p className="precio" style={{fontWeight: "bold"}}>${Math.round(producto.ofertaFonasa)}</p>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CardMedicamento
