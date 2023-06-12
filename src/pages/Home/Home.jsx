import { useState } from "react";
import ListaClientes from "../../components/ListaClientes/ListaClientes";
import ListaProductos from "../../components/ListaProductos/ListaProductos";
import "./Home.scss";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("clientes"); // Estado para controlar la pestaña seleccionada

  const user = window.sessionStorage.getItem("cliente");
  const nombreUser = JSON.parse(user).nombre;
  const apellidoUser = JSON.parse(user).apellido;

  const rol = window.sessionStorage.getItem("roles");
  const rolUser = JSON.parse(rol);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="container-home">
      <div className="header">
        <h1>iShop Data</h1>
        <div>
          <button className="btn" onClick={() => handleTabChange("clientes")}>
            Clientes
          </button>
          <button className="btn" onClick={() => handleTabChange("productos")}>
            Productos
          </button>
        </div>
        <div className="user">
          <div>
            <p>
              {nombreUser} {apellidoUser}
            </p>
            <p>{rolUser}</p>
          </div>
          <button>Cerrar sesión</button>
        </div>
      </div>
      <div className="box-productos">
        {selectedTab === "clientes" ? <ListaClientes /> : null}
        {selectedTab === "productos" ? <ListaProductos /> : null}
      </div>
    </div>
  );
}
