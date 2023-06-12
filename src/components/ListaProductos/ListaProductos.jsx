import { useState, useEffect } from "react";
import axios from "axios";
import "./ListaProductos.scss";

function ListaProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/productos/"
        );

        const productosData = JSON.parse(response.data).map((item) => item);
        setProductos(productosData);
      } catch (error) {
        console.error("Error fetching productos:", error.message);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h1>Listado de Productos</h1>
      <div className="lista-productos">
        {productos.map((producto) => (
          <div key={producto.pk} className="Card">
            <div className="Card-box">
              <div className="Info-name">
                <h2>{producto.fields.nombre}</h2>
                <p>Categoría: {producto.fields.categoria}</p>
              </div>
              <div className="Info-value">
                <p>Marca: {producto.fields.marca}</p>
                <p>Valor: {producto.fields.valor_unitario}</p>
              </div>
              <div className="Info-description">
                <p>Descripción: {producto.fields.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProductos;
