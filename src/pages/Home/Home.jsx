import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListaClientes from "../../components/ListaClientes/ListaClientes";
import ListaProductos from "../../components/ListaProductos/ListaProductos";
import UsuarioRol from "../../components/UsuarioRol/UsuarioRol";
import "./Home.scss";

// eslint-disable-next-line react/prop-types
export default function Home({ onLogout }) {
  const [selectedTab, setSelectedTab] = useState("clientes");
  const navigate = useNavigate();

  const user = window.sessionStorage.getItem("cliente");
  const nombreUser = JSON.parse(user).nombre;
  const apellidoUser = JSON.parse(user).apellido;

  const rol = window.sessionStorage.getItem("roles");
  const rolUser = JSON.parse(rol);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    onLogout();
    navigate("/signin");
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
          <button className="btn" onClick={() => handleTabChange("usuarios")}>
            Usuarios
          </button>
        </div>
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
      <div className="box-productos">
        {selectedTab === "clientes" ? <ListaClientes /> : null}
        {selectedTab === "productos" ? <ListaProductos /> : null}
        {selectedTab === "usuarios" ? <UsuarioRol /> : null}
      </div>
    </div>
  );
}
