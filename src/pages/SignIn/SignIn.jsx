import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      const { access_token, cliente, roles } = response.data;

      window.sessionStorage.setItem("access_token", access_token);
      window.sessionStorage.setItem("cliente", JSON.stringify(cliente));
      window.sessionStorage.setItem("roles", JSON.stringify(roles));

      navigate("/home");
      // Redirige a la página de inicio de sesión o muestra un mensaje de éxito
    } catch (error) {
      Swal.fire({
        title: "¡Algo ha ocurrido!",
        text: error.response.data.error,
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
