import { useState } from "react";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");

  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const [errorLogin, setErrorLogin] = useState("");

  const [fechaFin, setFechaFin] = useState("");

  const [fechaInicio, setFechaInicio] = useState("");

  const [mensaje, setMensaje] = useState("");

  const [prestamos, setPrestamos] = useState([]);

  const [mostrarHistorial, setMostrarHistorial] = useState(false);

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

    setUsuarioLogueado({
      id: data.id,

      nombre: data.nombre,
    });

    setErrorLogin("");
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

  const pedirPortatil = async () => {
    const res = await fetch("http://localhost:8080/prestamos", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ fechaInicio, fechaFin }),
    });

    const data = await res.json();

    const inicio = new Date(data.fechaInicio).toLocaleDateString("es-ES");

    const fin = new Date(data.fechaFin).toLocaleDateString("es-ES");

    setMensaje(
      `Portátil ${data.portatil.codigo} asignado del ${inicio} al ${fin}`,
    );
  };

  const devolverPortatil = async (id) => {
    const res = await fetch(
      `http://localhost:8080/prestamos/${id}/devolver`,

      { method: "PUT" },
    );

    const data = await res.json();

    setMensaje(`Portátil ${data.portatil.codigo} devuelto correctamente 😌`);
  };

  const cargarPrestamos = async () => {
    const res = await fetch(
      `http://localhost:8080/prestamos/usuario/${usuarioLogueado.id}`,
    );

    const data = await res.json();

    setPrestamos(data);
  };

  return (
    <div className="app">
      {/* ================= LANDING ================= */}

      {!usuarioLogueado ? (
        <div className="landing">
          {/* HEADER VERDE */}

          <div className="top-header">
            <div className="social-icons">
              <a href="https://www.facebook.com/vedrunasevilla/">
                <img src="/facebook.png" alt="Facebook" />
              </a>

              <a href="https://x.com/fpvedrunasev">
                <img src="/twitter.png" alt="Twitter" />
              </a>

              <a href="https://www.instagram.com/fpvedrunasevilla/">
                <img src="/instagram.png" alt="Instagram" />
              </a>
            </div>
          </div>

          {/* LOGO */}

          <div className="logo-section">
            <img src="/Logo-VS-1.png" alt="Logo" />
          </div>

          <div className="separator-line"></div>

          {/* MENÚ */}

          <nav className="menu-navbar">
            <nav className="menu-navbar">
              <ul className="menu">
                {/* 🔥 MODIFICADO: Enlaces limpios apuntando a las tres secciones */}
                <li>
                  <a href="#top">INICIO</a>
                </li>
                <li>
                  <a href="#solicitud-form">SERVICIOS</a>
                </li>
                <li>
                  <a href="#contacto">CONTACTO</a>
                </li>
              </ul>
            </nav>

            {/* HERO */}
            {/* No requiere ID específico ya que "INICIO" subirá al tope del HTML */}
            <section className="hero-image">
              <img src="/hero.png" alt="Instituto" />
            </section>

            {/* LOGIN / FORMULARIO */}
            {/* 🔥 MODIFICADO: Cambiado el id a "solicitud-form" para enlazar con SERVICIOS */}
            <div id="solicitud-form" className="scroll-area">
              <div className="login-card">
                <h3>Solicita tu portátil</h3>

                <input
                  placeholder="Nombre completo"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login}>Entrar</button>

                {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
              </div>
            </div>

            {/* FOOTER */}
            {/* Mantiene el id para CONTACTO */}
            <footer id="contacto">
              <h3>Contacto</h3>
              <p>Correo: laura.padilla@a.vedrunasevillasj.es</p>
            </footer>
          </nav>
        </div>
      ) : (
        <>
          {/* ================= DASHBOARD ================= */}

          <h1>Portátiles</h1>

          <h4>Bienvenido/a {usuarioLogueado.nombre}</h4>

          <button onClick={logout}>Cerrar sesión</button>

          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />

          <button onClick={pedirPortatil}>Pedir portátil</button>

          {mensaje && <p>{mensaje}</p>}

          <button onClick={() => devolverPortatil(1)}>Devolver portátil</button>

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

                  <p>{new Date(p.fechaInicio).toLocaleDateString("es-ES")}</p>

                  <p>{new Date(p.fechaFin).toLocaleDateString("es-ES")}</p>

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
