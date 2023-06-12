import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClientes,
  actualizarCliente,
  crearCliente,
  eliminarCliente,
} from "../../redux/actions/clienteActions.jsx";
import "./ListaClientes.scss";

function ListaClientes() {
  const dispatch = useDispatch();
  const { clientes, loading, error } = useSelector((state) => state.clientes);

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  const handleActualizarCliente = (id, datos) => {
    dispatch(actualizarCliente(id, datos));
  };

  const handleCrearCliente = (datos) => {
    dispatch(crearCliente(datos));
  };

  const handleEliminarCliente = (id) => {
    dispatch(eliminarCliente(id));
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
      {loading ? (
        <p>Cargando clientes...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="lista-clientes">
          {clientes.map((cliente) => (
            <div key={cliente.documento} className="Card">
              <div className="Card-box">
                <div className="Info-name">
                  <h2>
                    {cliente.nombre} {cliente.apellido}
                  </h2>
                  <p>Direccion: {cliente.direccion}</p>
                </div>
                <div className="Info-value">
                  <p>Fecha de nacimiento: {cliente.fecha_nacimiento}</p>
                  <p>Teléfono: {cliente.telefono}</p>
                </div>
                <div className="Info-actions">
                  <button onClick={() => handleActualizarCliente(cliente.id)}>
                    Actualizar
                  </button>
                  <button onClick={() => handleEliminarCliente(cliente.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() =>
          handleCrearCliente({ nombre: "Nuevo Cliente", edad: 30 })
        }
      >
        Crear Cliente
      </button>
    </div>
  );
}

export default ListaClientes;
