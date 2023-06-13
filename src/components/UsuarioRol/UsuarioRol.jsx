import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsuariosRoles } from "../../redux/actions/usuarioActions";
import "./UsuarioRol.scss";

function UsuarioRol() {
  const dispatch = useDispatch();
  const { usuariosRoles, loading, error } = useSelector(
    (state) => state.usuarioRol
  );

  useEffect(() => {
    dispatch(fetchUsuariosRoles());
  }, [dispatch]);

  return (
    <div>
      <h1>Lista de Usuarios con Roles</h1>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="usuario-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuariosRoles.map((usuarioRol) => (
              <tr key={usuarioRol.id}>
                <td>{usuarioRol.id}</td>
                <td>{usuarioRol.nombre_usuario}</td>
                <td>{usuarioRol.rol_id__nombre_rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsuarioRol;
