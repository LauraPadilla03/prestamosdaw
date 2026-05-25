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
  const [error, setError] = useState("");
  const [prestamos, setPrestamos] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  // 🔥 AUTOFORMATO FECHA
  const formatearFecha = (value) => {
    let v = value.replace(/\D/g, "");

    if (v.length > 8) v = v.slice(0, 8);

    let dia = v.slice(0, 2);
    let mes = v.slice(2, 4);
    let año = v.slice(4, 8);

    if (dia.length === 2 && parseInt(dia) > 31) dia = "31";
    if (mes.length === 2 && parseInt(mes) > 12) mes = "12";

    if (v.length <= 2) return dia;
    if (v.length <= 4) return `${dia}/${mes}`;
    return `${dia}/${mes}/${año}`;
  };

  // 🚫 VALIDAR FECHAS PASADAS
  const esFechaPasada = (fechaStr) => {
    const partes = fechaStr.split("/");

    if (partes.length !== 3) return false;

    const [dia, mes, año] = partes.map(Number);

    if (!dia || !mes || !año) return false;

    const fecha = new Date(año, mes - 1, dia);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fecha < hoy;
  };

  // 🚀 CONVERTIR FECHA A YYYY-MM-DD
  const convertirFecha = (f) => {
    const [d, m, a] = f.split("/");
    return `${a}-${m}-${d}`;
  };

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
    setError("");
    setPrestamos([]);
    setMostrarHistorial(false);
  };

  const pedirPortatil = async () => {
    setMensaje("");
    setError("");

    if (esFechaPasada(fechaInicio) || esFechaPasada(fechaFin)) {
      setError("La fecha introducida no es válida.");
      return;
    }

    if (!fechaInicio || !fechaFin) {
      setError("Selecciona las fechas antes de pedir el portátil");
      return;
    }

    const res = await fetch("http://localhost:8080/prestamos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fechaInicio: convertirFecha(fechaInicio),
        fechaFin: convertirFecha(fechaFin),
      }),
    });

    const data = await res.json();

    setMensaje(`Portátil ${data.portatil.codigo} asignado correctamente.`);
  };

  const devolverPortatil = async (id) => {
    await fetch(`http://localhost:8080/prestamos/${id}/devolver`, {
      method: "PUT",
    });

    setMensaje("Portátil devuelto correctamente.");
    cargarPrestamos();
  };

  const cargarPrestamos = async () => {
    const res = await fetch(
      `http://localhost:8080/prestamos/usuario/${usuarioLogueado.id}`
    );

    const data = await res.json();

    setPrestamos(data);
  };

  return (
    <div className="app">

      {!usuarioLogueado ? (
        <div className="landing">

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

          <div className="logo-section">
            <img src="/Logo-VS-1.png" alt="Logo" />
          </div>

          <div className="separator-line"></div>

          <nav className="menu-navbar">
            <ul className="menu">
              <li><a href="#top">INICIO</a></li>
              <li><a href="#solicitud-form">SERVICIOS</a></li>
              <li><a href="#contacto">CONTACTO</a></li>
            </ul>
          </nav>

          <section className="hero-image" id="top">
            <img src="/hero.png" alt="Instituto" />
          </section>

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

              <button className="primary-btn" onClick={login}>
                Entrar
              </button>

              {errorLogin && (
                <p style={{ color: "red" }}>{errorLogin}</p>
              )}

            </div>
          </div>

          <footer id="contacto">
            <h3>Contacto</h3>
            <p>Correo: laura.padilla@a.vedrunasevillasj.es</p>
          </footer>

        </div>
      ) : (
        <div className="dashboard-container">

          <div className="dashboard-header">
            <div className="dashboard-logo">
              <img src="/Logo-VS-1.png" alt="Logo" />
            </div>

            <button className="logout-btn" onClick={logout}>
              Cerrar sesión
            </button>
          </div>

          <div className="dashboard-content">

            <div className="dashboard-welcome">
              <h1>Portátiles</h1>
              <h4>Bienvenido/a, {usuarioLogueado.nombre}</h4>
            </div>

            <div className="dashboard-grid">

              <div className="card-solicitar">
                <h3>Solicitar préstamo</h3>

                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  value={fechaInicio}
                  onChange={(e) =>
                    setFechaInicio(formatearFecha(e.target.value))
                  }
                />

                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  value={fechaFin}
                  onChange={(e) =>
                    setFechaFin(formatearFecha(e.target.value))
                  }
                />

                <button className="primary-btn" onClick={pedirPortatil}>
                  Pedir portátil
                </button>

                {error && (
                  <p className="mensaje-error">{error}</p>
                )}

                {mensaje && (
                  <p className="mensaje-feedback">{mensaje}</p>
                )}
              </div>

              <div className="card-historial">
                <h3>Historial</h3>

                <button
                  className="secondary-btn"
                  onClick={() => {
                    setMostrarHistorial(!mostrarHistorial);
                    cargarPrestamos();
                  }}
                >
                  {mostrarHistorial ? "Ocultar historial" : "Ver historial"}
                </button>

                {mostrarHistorial && (
                  <div className="historial-list">
                    {prestamos.map((p) => (
                      <div className="historial-item" key={p.id}>
                        <div className="historial-left">
                          <p><b>💻 {p.portatil.codigo}</b></p>
                          <p>
                            {new Date(p.fechaInicio).toLocaleDateString()} →{" "}
                            {new Date(p.fechaFin).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="historial-right">
                          <span className="historial-status">
                            {p.estado}
                          </span>

                          {p.estado !== "DEVUELTO" && (
                            <button
                              className="return-btn"
                              onClick={() => devolverPortatil(p.id)}
                            >
                              Devolver
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default App;