import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./SignUp.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/registro/", {
        username,
        password,
      });
      Swal.fire({
        title: "Usuario creado",
        text: "Usuario registrado con exito",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      // Redirige a la página de inicio de sesión o muestra un mensaje de éxito
    } catch (error) {
      console.error("Error during registration:", error.response.data.error);
      Swal.fire({
        title: "¡Algo ha ocurrido!",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="background-signup">
      <div className="lava"></div>

      <div className="box-form">
        <div className="form">
          <div>
            <h1>iShop Data</h1>
            <h2>Registrate</h2>
            <p>Unete e ingresa para ver los diferentes productos</p>
          </div>
          <div>
            <form onSubmit={handleRegister}>
              <label>Ingrese su usuario</label>
              <div>
                <input
                  className="input-signup"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <label>Ingrese su usuario</label>
              <div>
                <input
                  className="input-signup"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="btn-submit" type="submit">
                  Registrarse
                </button>
                <a href="/signup" className="a-registrarme">
                  Ya tengo cuenta, iniciar sesión
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
