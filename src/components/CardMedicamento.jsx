import React from "react";

const CardMedicamento = ({ medicamento }) => {
  const producto = medicamento?.presentacionesExistentes?.[0]?.productos?.[0];

  if (!producto) return null; 

  return (
    <div className="col-md-4">
      <form className="medicamentosJs" id="tarjetasMeds">
        <div className="card shadow-sm">
          <div className="card-body">
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
            <p className="precio">${Math.round(producto.ofertaFonasa)}</p>
            <p className="registro card-text" style={{ color: "white" }}>
              {producto.registroSanitario}
            </p>
            <button type="submit" data-toggle="modal" data-target="#datoFarmacia" className="btn btn-info">
              Detalle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardMedicamento;
