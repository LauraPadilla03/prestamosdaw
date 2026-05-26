import { useState } from "react";
import "./App.css";

function App() {

  //  URL del backend 
  const API_URL = "https://prestamos-backend-gkpo.onrender.com";

  // Estado del usuario (login)
  // Guarda lo que escribe el usuario en el input de nombre
  const [usuario, setUsuario] = useState("");
  // Guarda la contraseña del login
  const [password, setPassword] = useState("");

  // Usuario autenticado (null si no hay sesión)
  // Aquí se guarda el usuario que ha hecho login correctamente
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  // Mensaje de error en login
  // Se usa si el backend rechaza el login
  const [errorLogin, setErrorLogin] = useState("");

  // Fechas del préstamo
  // Fecha de inicio del préstamo
  const [fechaFin, setFechaFin] = useState("");
  // Fecha de fin del préstamo
  const [fechaInicio, setFechaInicio] = useState("");

  // Mensajes de feedback (éxito / error)
  // Mensaje general cuando todo va bien
  const [mensaje, setMensaje] = useState("");
  // Mensajes de error en préstamos
  const [error, setError] = useState("");

  // Lista de préstamos del usuario
  // Array con los préstamos que devuelve el backend
  const [prestamos, setPrestamos] = useState([]);

  // Control de visibilidad del historial
  // true = se muestra el historial, false = oculto
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  // Formatea la fecha mientras el usuario escribe (DD/MM/AAAA)
  // Convierte lo que escribe el usuario en formato legible
  const formatearFecha = (value) => {
    let v = value.replace(/\D/g, "");

    if (v.length > 8) v = v.slice(0, 8);

    let dia = v.slice(0, 2);
    let mes = v.slice(2, 4);
    let año = v.slice(4, 8);

    // Validación básica de día y mes
    if (dia.length === 2 && parseInt(dia) > 31) dia = "31";
    if (mes.length === 2 && parseInt(mes) > 12) mes = "12";

    if (v.length <= 2) return dia;
    if (v.length <= 4) return `${dia}/${mes}`;
    return `${dia}/${mes}/${año}`;
  };

  // Comprueba si una fecha es anterior a hoy
  // Evita pedir préstamos con fechas pasadas
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

  // Convierte fecha de DD/MM/AAAA a YYYY-MM-DD (formato backend)
  // Esto es necesario porque el backend suele usar formato ISO
  const convertirFecha = (f) => {
    const [d, m, a] = f.split("/");
    return `${a}-${m}-${d}`;
  };

  // Login contra backend
  // Hace petición al endpoint de autenticación
  const login = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
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

    // Guardamos usuario logueado
    setUsuarioLogueado({
      id: data.id,
      nombre: data.nombre,
    });

    setErrorLogin("");
  };

  // Logout y reset de estado
  // Limpia toda la sesión
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

  // Solicitar préstamo de portátil
  const pedirPortatil = async () => {
    setMensaje("");
    setError("");

    // Validación de fechas
    if (esFechaPasada(fechaInicio) || esFechaPasada(fechaFin)) {
      setError("La fecha introducida no es válida.");
      return;
    }

    if (!fechaInicio || !fechaFin) {
      setError("Selecciona las fechas antes de pedir el portátil");
      return;
    }

    // Petición al backend para crear préstamo
    const res = await fetch(`${API_URL}/prestamos`, {
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

  // Marcar préstamo como devuelto
  const devolverPortatil = async (id) => {
    await fetch(`${API_URL}/prestamos/${id}/devolver`, {
      method: "PUT",
    });

    setMensaje("Portátil devuelto correctamente.");
    cargarPrestamos();
  };

  // Cargar historial de préstamos del usuario
  const cargarPrestamos = async () => {
    const res = await fetch(
      `${API_URL}/prestamos/usuario/${usuarioLogueado.id}`
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