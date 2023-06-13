import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchProductos,
  actualizarProducto,
  crearProducto,
  eliminarProducto,
} from "../../redux/actions/productoActions";
import { getProductById } from "../../services/Services";

import "./ListaProductos.scss";

function ListaProductos() {
  const dispatch = useDispatch();
  const { productos, loading, error } = useSelector((state) => state.productos);

  const [id, setId] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const searchproductoById = () => {
    getProductById(id)
      .then((response) => {
        const producto = response.data;
        if (producto) {
          Swal.fire({
            title: "Información del producto",
            html: `<p>Nombre: ${producto.nombre}</p><p>Categoria: ${producto.categoria}</p><p>Precio: ${producto.valor_unitario}</p><p>Descripcion: ${producto.descripcion}</p>`,
            icon: "info",
          });
        } else {
          Swal.fire(
            "producto no encontrado",
            "No se encontró ningún producto con el documento especificado.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire(
          "producto no encontrado",
          "No se encontró ningún producto con el documento especificado.",
          "error"
        );
      });
  };

  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  const handleCrearProducto = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Crear Producto",
      html:
        '<input type="text" id="nombre" placeholder="Nombre producto" class="swal2-input">' +
        '<input type="text" id="categoria" placeholder="Categoria" class="swal2-input">' +
        '<input type="text" id="marca" placeholder="Marca" class="swal2-input">' +
        '<input type="number" id="valor_unitario" placeholder="Valor unitario" class="swal2-input">' +
        '<input type="number" id="unidades_stock" placeholder="Cantidad en stock" class="swal2-input">' +
        '<input type="text" id="descripcion" placeholder="Descripcion" class="swal2-input">' +
        '<select id="proveedor" class="swal2-input custom-select">' +
        '  <option value="1">Proveedor1</option>' +
        '  <option value="2">Proveedor2</option>' +
        '  <option value="3">Proveedor3</option>' +
        "</select>",
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cerrar",
      preConfirm: () => {
        const nombre = document.getElementById("nombre").value;
        const categoria = document.getElementById("categoria").value;
        const marca = document.getElementById("marca").value;
        const valor_unitario = document.getElementById("valor_unitario").value;
        const unidades_stock = document.getElementById("unidades_stock").value;
        const descripcion = document.getElementById("descripcion").value;
        const proveedor = document.getElementById("proveedor").value;

        return {
          nombre,
          categoria,
          marca,
          valor_unitario,
          unidades_stock,
          descripcion,
          proveedor_id: proveedor,
        };
      },
    });

    if (formValues) {
      dispatch(crearProducto(formValues));
    }
  };

  const handleActualizarProducto = (id) => {
    const producto = productos.find((p) => p.id === id);

    if (producto) {
      Swal.fire({
        title: "Actualizar Producto",
        html:
          '<form id="actualizarProductoForm">' +
          '<input type="text" id="nombre" placeholder="Nombre" class="swal2-input" value="' +
          producto.nombre +
          '">' +
          '<input type="text" id="categoria" placeholder="Categoría" class="swal2-input" value="' +
          producto.categoria +
          '">' +
          '<input type="text" id="marca" placeholder="Marca" class="swal2-input" value="' +
          producto.marca +
          '">' +
          '<input type="number" id="valor_unitario" placeholder="Valor unitario" class="swal2-input" value="' +
          producto.valor_unitario +
          '">' +
          '<input type="number" id="unidades_stock" placeholder="Cantidad en stock" class="swal2-input" value="' +
          producto.unidades_stock +
          '">' +
          '<input type="text" id="descripcion" placeholder="Descripción" class="swal2-input" value="' +
          producto.descripcion +
          '">' +
          '<select id="proveedor" class="swal2-input custom-select">' +
          '  <option value="1">Proveedor1</option>' +
          '  <option value="2">Proveedor2</option>' +
          '  <option value="3">Proveedor3</option>' +
          "</select>" +
          "</form>",
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cerrar",
        preConfirm: () => {
          const nombre = document.getElementById("nombre").value;
          const categoria = document.getElementById("categoria").value;
          const marca = document.getElementById("marca").value;
          const valor_unitario = parseFloat(
            document.getElementById("valor_unitario").value
          );
          const unidades_stock = parseInt(
            document.getElementById("unidades_stock").value
          );
          const descripcion = document.getElementById("descripcion").value;
          const proveedor = document.getElementById("proveedor").value;

          if (
            nombre === "" ||
            categoria === "" ||
            marca === "" ||
            isNaN(valor_unitario) ||
            isNaN(unidades_stock) ||
            descripcion === "" ||
            proveedor === ""
          ) {
            Swal.showValidationMessage(
              "Por favor, complete todos los campos correctamente"
            );
          } else {
            const datos = {
              nombre,
              categoria,
              marca,
              valor_unitario,
              unidades_stock,
              descripcion,
              proveedor_id: parseInt(proveedor),
            };
            dispatch(actualizarProducto(id, datos));
          }
        },
      });
    }
  };

  const handleEliminarProducto = (id) => {
    dispatch(eliminarProducto(id));
  };

  return (
    <div>
      <div className="title-productos">
        <h1>Lista de productos</h1>
        <div>
          <input
            type="search"
            className="search"
            value={id}
            onChange={handleIdChange}
            placeholder="Buscar por id"
          ></input>
          <button className="btn" onClick={searchproductoById}>
            Buscar
          </button>
        </div>
        <button className="btn-crear" onClick={handleCrearProducto}>
          Crear Producto
        </button>
      </div>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="lista-productos">
          {productos.map((producto) => (
            <div key={producto.id} className="Card">
              <div className="Card-box">
                <div className="Info-name">
                  <h2>{producto.nombre}</h2>
                  <p>Id referencia: {producto.id}</p>
                  <p>Categoría: {producto.categoria}</p>
                </div>
                <div className="Info-value">
                  <p>Marca: {producto.marca}</p>
                  <p>Valor: {producto.valor_unitario}</p>
                  <p>Descripción: {producto.descripcion}</p>
                </div>
                <div className="Info-actions">
                  <button onClick={() => handleActualizarProducto(producto.id)}>
                    Actualizar
                  </button>
                  <button onClick={() => handleEliminarProducto(producto.id)}>
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

export default ListaProductos;
