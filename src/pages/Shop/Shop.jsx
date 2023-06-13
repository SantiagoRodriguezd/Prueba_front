/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchProductoById, getProductos } from "../../services/Services";
import "./Shop.scss";
import Swal from "sweetalert2";

export default function Shop({ onLogout }) {
  const [documento, setDocumento] = useState("");
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [contadorProductos, setContadorProductos] = useState({});
  const navigate = useNavigate();

  const handleDocumentoChange = (event) => {
    setDocumento(event.target.value);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    onLogout();
    navigate("/");
  };

  const searchProductoByDocumento = () => {
    searchProductoById(documento)
      .then((producto) => {
        if (producto) {
          Swal.fire({
            title: "Información del producto",
            html: `<p>Nombre: ${producto.nombre}</p><p>Marca: ${producto.marca}</p><p>Valor: ${producto.valor_unitario}</p><p>Descripcion: ${producto.descripcion}</p>`,
            icon: "info",
          });
        } else {
          Swal.fire(
            "Producto no encontrado",
            "No se encontró ningún producto con el id especificado.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire(
          "Producto no encontrado",
          "No se encontró ningún producto con el id especificado.",
          "error"
        );
      });
  };

  useEffect(() => {
    getProductos()
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleProductoSeleccionado = (producto) => {
    setProductosSeleccionados((prevProductosSeleccionados) => {
      const productoExistente = prevProductosSeleccionados.find(
        (p) => p.id === producto.id
      );

      if (productoExistente) {
        setContadorProductos((prevContadorProductos) => ({
          ...prevContadorProductos,
          [producto.id]: prevContadorProductos[producto.id] + 1,
        }));
        return prevProductosSeleccionados;
      } else {
        setContadorProductos((prevContadorProductos) => ({
          ...prevContadorProductos,
          [producto.id]: 1,
        }));
        return [...prevProductosSeleccionados, producto];
      }
    });
  };

  const handleEliminarProducto = (productoId) => {
    setProductosSeleccionados((prevProductosSeleccionados) =>
      prevProductosSeleccionados.filter(
        (producto) => producto.id !== productoId
      )
    );

    setContadorProductos((prevContadorProductos) => {
      const newContadorProductos = { ...prevContadorProductos };
      delete newContadorProductos[productoId];
      return newContadorProductos;
    });
  };

  const calcularTotal = () => {
    let total = 0;
    productosSeleccionados.forEach((producto) => {
      const cantidad = contadorProductos[producto.id] || 1;
      total += parseFloat(producto.valor_unitario) * cantidad;
    });
    return total;
  };

  const user = window.sessionStorage.getItem("cliente");
  const nombreUser = JSON.parse(user).nombre;
  const apellidoUser = JSON.parse(user).apellido;

  const rol = window.sessionStorage.getItem("roles");
  const rolUser = JSON.parse(rol);

  return (
    <div className="container-home">
      <div className="header">
        <h1>iShop Data</h1>
        <div className="user">
          <div>
            <p>
              {nombreUser} {apellidoUser}
            </p>
            <p>{rolUser}</p>
          </div>
          <button className="btn-user" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="box-productos-user">
        <div className="lista-productos">
          <div className="productos-busqueda">
            <h2>Productos</h2>
            <div>
              <input
                type="search"
                className="search"
                value={documento}
                onChange={handleDocumentoChange}
                placeholder="Buscar por id"
              ></input>
              <button className="btn" onClick={searchProductoByDocumento}>
                Buscar
              </button>
            </div>
          </div>
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="producto"
              onClick={() => handleProductoSeleccionado(producto)}
            >
              <p>{producto.nombre}</p>
              <p>Precio: ${producto.valor_unitario}</p>
            </div>
          ))}
        </div>
        <div className="productos-seleccionados">
          <h2>Productos Seleccionados</h2>
          {productosSeleccionados.length === 0 ? (
            <p>No hay productos seleccionados.</p>
          ) : (
            productosSeleccionados.map((producto) => (
              <div key={producto.id} className="producto-seleccionado">
                <p>{producto.nombre}</p>
                <p>Precio: ${producto.valor_unitario}</p>
                <div className="contador">
                  <button
                    className="btn-contador"
                    onClick={() => {
                      if (contadorProductos[producto.id] > 1) {
                        setContadorProductos((prevContadorProductos) => ({
                          ...prevContadorProductos,
                          [producto.id]: prevContadorProductos[producto.id] - 1,
                        }));
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{contadorProductos[producto.id]}</span>
                  <button
                    className="btn-contador"
                    onClick={() => {
                      setContadorProductos((prevContadorProductos) => ({
                        ...prevContadorProductos,
                        [producto.id]: prevContadorProductos[producto.id] + 1,
                      }));
                    }}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleEliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </div>
            ))
          )}

          <p className="total">Total: ${calcularTotal()}</p>
        </div>
      </div>
    </div>
  );
}
