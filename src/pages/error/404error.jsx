import "./404error.scss";
function Error() {
  return (
    <div>
      <div className="error-container">
        <div>
          <h1>{"404"}</h1>
        </div>
        <div>
          <h3>{"Pagina no encontrada"}</h3>
          <div className="div-error">
            <a href="/signin" className="error-home">
              Volver al home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Error;
