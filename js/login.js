document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenidoLogin");
    const usuarioActual = localStorage.getItem("usuario");

    // Mostrar saludo en header si está logueado
    actualizarSaludoHeader(usuarioActual);

    if (usuarioActual) {
        contenedor.innerHTML = `
      <div class="alert alert-info fw-semibold" role="alert">
        Ya has iniciado sesión como <span class="text-primary">${usuarioActual}</span>.
        <br />
        <button type="button" class="btn btn-sm btn-outline-danger mt-2" id="btnCerrarSesion">Cerrar sesión</button>
      </div>
    `;
        document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
        return;
    }

    contenedor.innerHTML = `
    <h2 class="mb-4 text-dark">Iniciar Sesión</h2>
    <div id="mensaje" role="alert" class="alert d-none"></div>

    <form id="formLogin" novalidate>
      <div class="mb-3 text-start">
        <label for="cedula" class="form-label">Cédula:</label>
        <input type="text" id="cedula" name="cedula" class="form-control" required maxlength="13"
               pattern="\\d{10,13}" title="Ingrese una cédula o RUC válida" aria-describedby="cedulaHelp" />
        <div id="cedulaHelp" class="form-text">Ingrese su cédula o RUC (10-13 dígitos).</div>
      </div>

      <div class="mb-3 text-start">
        <label for="contrasena" class="form-label">Contraseña:</label>
        <input type="password" id="contrasena" name="contrasena" class="form-control" required aria-describedby="contrasenaHelp" />
        <div id="contrasenaHelp" class="form-text">Ingrese su contraseña.</div>
      </div>

      <button type="submit" class="btn btn-morado w-100 fw-bold">Ingresar</button>

      <div class="mt-3">
        <span>¿No tienes cuenta?</span>
        <a href="Registro.html" class="text-decoration-none fw-bold text-danger">Regístrate aquí</a>
      </div>
    </form>
  `;

    const form = document.getElementById("formLogin");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            mensaje.textContent = "Por favor, complete correctamente todos los campos.";
            mensaje.className = "alert alert-danger";
            mensaje.classList.remove("d-none");
            form.reportValidity();
            return;
        }

        const cedula = form.cedula.value.trim();
        const contrasena = form.contrasena.value.trim();

        if (cedula && contrasena) {
            localStorage.setItem("usuario", cedula);
            actualizarSaludoHeader(cedula);
            window.location.href = "../Productos/Index.html";
        } else {
            mensaje.textContent = "Cédula o contraseña inválidos.";
            mensaje.className = "alert alert-danger";
            mensaje.classList.remove("d-none");
        }
    });
});

function cerrarSesion() {
    localStorage.removeItem("usuario");
    actualizarSaludoHeader(null);
    location.reload();
}

// Actualiza saludo en el header (usa un id "saludo-usuario" dentro del header)
function actualizarSaludoHeader(usuario) {
    const saludoContenedor = document.getElementById("saludo-usuario");
    if (!saludoContenedor) return;

    if (usuario) {
        saludoContenedor.textContent = ` Hola, ${usuario}`;
        saludoContenedor.style.display = "inline";
    } else {
        saludoContenedor.textContent = "";
        saludoContenedor.style.display = "none";
    }
}

// Actualiza el menú nav según si hay usuario logueado (link Login o dropdown usuario)
function actualizarUIUsuario() {
    const usuario = localStorage.getItem("usuario");

    const navLogin = document.getElementById("nav-login");
    const navUsuario = document.getElementById("nav-usuario");
    const nombreUsuarioSpan = document.getElementById("nombreUsuario");

    if (!navLogin || !navUsuario || !nombreUsuarioSpan) return;

    if (usuario) {
        navLogin.classList.add("d-none");
        navUsuario.classList.remove("d-none");
        nombreUsuarioSpan.textContent = usuario;
    } else {
        navLogin.classList.remove("d-none");
        navUsuario.classList.add("d-none");
        nombreUsuarioSpan.textContent = "";
    }
}
