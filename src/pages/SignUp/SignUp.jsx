import { useState } from "react";
import { register } from "../../services/Services";
import Swal from "sweetalert2";
import "./SignUp.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      Swal.fire({
        title: "Usuario creado",
        text: "Usuario registrado con éxito",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    } catch (error) {
      console.error("Error durante el registro:", error.error);
      Swal.fire({
        title: "¡Algo ha ocurrido!",
        text: error.error,
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
