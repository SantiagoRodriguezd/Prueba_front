/* eslint-disable react/prop-types */
import { useState } from "react";
import { login } from "../../services/Services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";

function SignIn({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { access_token, cliente, roles } = await login(username, password);

      window.sessionStorage.setItem("access_token", access_token);
      window.sessionStorage.setItem("cliente", JSON.stringify(cliente));
      window.sessionStorage.setItem("roles", JSON.stringify(roles));
      onLogin(access_token, roles);
      if (roles.includes("Administrador")) {
        navigate("/home");
      } else if (roles.includes("Comprador")) {
        navigate("/shop");
      }
    } catch (error) {
      Swal.fire({
        title: "¡Algo ha ocurrido!",
        text: error.error,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="background-signin">
      <div className="box-form">
        <div className="form">
          <div>
            <h1>iShop Data</h1>
            <h2>Iniciar sesión</h2>
            <p>Ingresa para ver los diferentes productos</p>
          </div>
          <div>
            <form onSubmit={handleLogin}>
              <label>Ingrese su usuario</label>
              <div>
                <input
                  className="input-signin"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <label>Ingrese su usuario</label>
              <div>
                <input
                  className="input-signin"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="btn-submit" type="submit">
                  Iniciar sesión
                </button>
                <a href="/signup" className="a-registrarme">
                  No tengo cuenta, registrarse
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
