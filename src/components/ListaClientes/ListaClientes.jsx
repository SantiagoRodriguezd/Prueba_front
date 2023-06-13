import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClientes,
  actualizarCliente,
  crearCliente,
  eliminarCliente,
} from "../../redux/actions/clienteActions.jsx";
import Swal from "sweetalert2";
import { getClienteByDocumento } from "../../services/Services.jsx";

import "./ListaClientes.scss";

function ListaClientes() {
  const dispatch = useDispatch();
  const { clientes, loading, error } = useSelector((state) => state.clientes);
  const [documento, setDocumento] = useState("");

  const handleDocumentoChange = (event) => {
    setDocumento(event.target.value);
  };

  const searchClienteByDocumento = () => {
    getClienteByDocumento(documento)
      .then((response) => {
        const cliente = response.data;

        if (cliente) {
          Swal.fire({
            title: "Información del cliente",
            html: `<p>Nombre: ${cliente.nombre}</p><p>Apellido: ${cliente.apellido}</p><p>N° Cedula: ${cliente.documento}</p><p>Telefono: ${cliente.telefono}</p>`,
            icon: "info",
          });
        } else {
          Swal.fire(
            "Cliente no encontrado",
            "No se encontró ningún cliente con el documento especificado.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire(
          "Cliente no encontrado",
          "No se encontró ningún cliente con el documento especificado.",
          "error"
        );
      });
  };

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  const handleCrearCliente = () => {
    Swal.fire({
      title: "Crear Cliente",
      html:
        '<input type="text" id="documento" placeholder="Documento" class="swal2-input">' +
        '<select id="tipoDocumento" class="swal2-input custom-select">' +
        '  <option value="CC">Cédula de Ciudadanía</option>' +
        '  <option value="TI">Tarjeta de Identidad</option>' +
        '  <option value="CE">Cédula de Extranjería</option>' +
        "</select>" +
        '<input type="text" id="nombre" placeholder="Nombre" class="swal2-input">' +
        '<input type="text" id="apellido" placeholder="Apellido" class="swal2-input">' +
        '<input type="text" id="direccion" placeholder="Dirección" class="swal2-input">' +
        '<input type="text" id="telefono" placeholder="Teléfono" class="swal2-input">' +
        '<input type="date" id="fechaNacimiento" placeholder="Fecha de Nacimiento" class="swal2-input">' +
        '<input type="text" id="imagenPerfil" placeholder="URL de la imagen de perfil" class="swal2-input">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cerrar",
      preConfirm: () => {
        const documento = document.getElementById("documento").value;
        const tipoDocumento = document.getElementById("tipoDocumento").value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const direccion = document.getElementById("direccion").value;
        const telefono = document.getElementById("telefono").value;
        const fechaNacimiento =
          document.getElementById("fechaNacimiento").value;
        const imagenPerfil = document.getElementById("imagenPerfil").value;
        if (
          documento === "" ||
          tipoDocumento === "" ||
          nombre === "" ||
          apellido === "" ||
          direccion === "" ||
          telefono === "" ||
          fechaNacimiento === "" ||
          imagenPerfil === ""
        ) {
          Swal.showValidationMessage("Por favor, complete todos los campos");
        } else {
          const nuevoCliente = {
            documento,
            tipo_documento: tipoDocumento,
            nombre,
            apellido,
            direccion,
            telefono,
            fecha_nacimiento: fechaNacimiento,
            imagen_perfil: imagenPerfil,
          };

          dispatch(crearCliente(nuevoCliente));
        }
      },
    });
  };

  const handleActualizarCliente = (id) => {
    const cliente = clientes.find((c) => c.documento === id);

    if (cliente) {
      Swal.fire({
        title: "Actualizar Cliente",
        html:
          '<form id="actualizarClienteForm">' +
          '<select id="tipoDocumento" class="swal2-input custom-select">' +
          '  <option value="CC">Cédula de Ciudadanía</option>' +
          '  <option value="TI">Tarjeta de Identidad</option>' +
          '  <option value="CE">Cédula de Extranjería</option>' +
          "</select>" +
          '<input type="text" id="nombre" placeholder="Nombre" class="swal2-input" value="' +
          cliente.nombre +
          '">' +
          '<input type="text" id="apellido" placeholder="Apellido" class="swal2-input" value="' +
          cliente.apellido +
          '">' +
          '<input type="text" id="direccion" placeholder="Dirección" class="swal2-input" value="' +
          cliente.direccion +
          '">' +
          '<input type="text" id="telefono" placeholder="Teléfono" class="swal2-input" value="' +
          cliente.telefono +
          '">' +
          '<input type="date" id="fechaNacimiento" placeholder="Fecha de Nacimiento" class="swal2-input" value="' +
          cliente.fecha_nacimiento +
          '">' +
          '<input type="text" id="imagenPerfil" placeholder="URL de la imagen de perfil" class="swal2-input" value="' +
          cliente.imagen_perfil +
          '">' +
          "</form>",
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cerrar",
        preConfirm: () => {
          const tipoDocumento = document.getElementById("tipoDocumento").value;
          const nombre = document.getElementById("nombre").value;
          const apellido = document.getElementById("apellido").value;
          const direccion = document.getElementById("direccion").value;
          const telefono = document.getElementById("telefono").value;
          const fechaNacimiento =
            document.getElementById("fechaNacimiento").value;
          const imagenPerfil = document.getElementById("imagenPerfil").value;

          const datos = {
            tipoDocumento,
            nombre,
            apellido,
            direccion,
            telefono,
            fecha_nacimiento: fechaNacimiento,
            imagen_perfil: imagenPerfil,
          };

          dispatch(actualizarCliente(id, datos));
        },
      });
    }
  };

  const handleEliminarCliente = (documento) => {
    dispatch(eliminarCliente(documento));
  };

  return (
    <div>
      <div className="title-clientes">
        <h1>Lista de Clientes</h1>
        <div>
          <input
            type="search"
            className="search"
            value={documento}
            onChange={handleDocumentoChange}
            placeholder="Buscar por documento"
          ></input>
          <button className="btn" onClick={searchClienteByDocumento}>
            Buscar
          </button>
        </div>

        <button className="btn-crear" onClick={() => handleCrearCliente()}>
          Crear Cliente
        </button>
      </div>
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
                  <button
                    onClick={() => handleActualizarCliente(cliente.documento)}
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleEliminarCliente(cliente.documento)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaClientes;
