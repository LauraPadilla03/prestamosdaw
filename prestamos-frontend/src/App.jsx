import { useState } from "react";

function App() {
  // =========================
  //  ESTADOS LOGIN
  // =========================
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [errorLogin, setErrorLogin] = useState("");
  // =========================
  //  ESTADOS PRÉSTAMO
  // =========================
  const [fechaFin, setFechaFin] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");

  //  Mensaje final
  const [mensaje, setMensaje] = useState("");

  // =========================
  //  ESTADOS HISTORIAL (AÑADIDO)
  // =========================
  const [prestamos, setPrestamos] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  // =========================
  //  LOGIN
  // =========================
  const login = async () => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: usuario,
        password: password,
      }),
    });

    if (!res.ok) {
      setErrorLogin("Usuario o contraseña incorrecta");
      return;
    }

    const data = await res.json();
    setUsuarioLogueado(data);
    setErrorLogin(""); // limpia el error si va bien
  };

  const logout = () => {
    setUsuarioLogueado(null);
    setUsuario("");
    setPassword("");
    setFechaInicio("");
    setFechaFin("");
    setMensaje("");
    setPrestamos([]);
    setMostrarHistorial(false);
  };

  // =========================
  //  PEDIR PORTÁTIL
  // =========================
  const pedirPortatil = async () => {
    console.log("boton pedir pulsado");

    const res = await fetch("http://localhost:8080/prestamos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      }),
    });

    const data = await res.json();

    const inicio = new Date(data.fechaInicio).toLocaleDateString("es-ES");
    const fin = new Date(data.fechaFin).toLocaleDateString("es-ES");

    setMensaje(
      `Portátil ${data.portatil.codigo} asignado del ${inicio} al ${fin}`,
    );
  };

  // =========================
  //  DEVOLVER PORTÁTIL
  // =========================
  const devolverPortatil = async (id) => {
    const res = await fetch(`http://localhost:8080/prestamos/${id}/devolver`, {
      method: "PUT",
    });

    const data = await res.json();

    setMensaje(`Portátil ${data.portatil.codigo} devuelto correctamente 😌`);
  };

  // =========================
  //  CARGAR HISTORIAL (AÑADIDO)
  // =========================
  const cargarPrestamos = async () => {
    const res = await fetch(
      `http://localhost:8080/prestamos/usuario/${usuarioLogueado.id}`,
    );

    const data = await res.json();
    setPrestamos(data);
  };

  // =========================
  //  RENDER
  // =========================
  return (
    <div>
      <h1>Portátiles</h1>

      {/* ================= LOGIN ================= */}
      {!usuarioLogueado ? (
        <div>
          <h2>Login</h2>

          <input
            placeholder="Nombre completo"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            lang="es"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            lang="es"
          />

          <button onClick={login}>Entrar</button>
          {errorLogin && <p style={{ color: "red" }}> {errorLogin} </p>}
        </div>
      ) : (
        <>
          <h4>
            Bienvenido/a {usuarioLogueado.nombre}, selecciona la fecha de
            recogida y entrega de tu portátil.
          </h4>

          <button onClick={logout}>Cerrar sesión</button>

          {/* ================= PRÉSTAMOS ================= */}
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            lang="es"
          />

          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            lang="es"
          />

          <button onClick={pedirPortatil}>Pedir portátil</button>

          {mensaje && <p>{mensaje}</p>}

          {/* ================= DEVOLVER FIJO ================= */}
          <button onClick={() => devolverPortatil(1)}>Devolver portátil</button>

          {/* ================= HISTORIAL ================= */}
          <button
            onClick={() => {
              setMostrarHistorial(!mostrarHistorial);
              cargarPrestamos();
            }}
          >
            {mostrarHistorial ? "Ocultar historial" : "Ver historial"}
          </button>

          {mostrarHistorial && (
            <div>
              {prestamos.map((p) => (
                <div key={p.id}>
                  <p>Portátil: {p.portatil.codigo}</p>

                  <p>
                    Fecha recogida:{" "}
                    {new Date(p.fechaInicio).toLocaleDateString("es-ES")}
                  </p>

                  <p>
                    Fecha entrega:{" "}
                    {new Date(p.fechaFin).toLocaleDateString("es-ES")}
                  </p>

                  <p>Estado: {p.estado}</p>

                  {p.estado !== "DEVUELTO" && (
                    <button onClick={() => devolverPortatil(p.id)}>
                      Devolver portátil
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
