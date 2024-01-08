$(document).ready(function () {
    // Manejar el envío del formulario de inicio de sesión
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();

        // Verificar las credenciales
        if (verificarCredenciales(username, password)) {
            alert("Inicio de sesión exitoso");
            // Aquí podrías redirigir al usuario a una página de inicio de sesión exitoso
        } else {
            alert("Error: Usuario o contraseña incorrectos");
        }
    });

    // Función para verificar las credenciales
    function verificarCredenciales(username, password) {
        // Obtener usuarios almacenados en localStorage
        var usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || {};

        // Verificar si las credenciales son correctas
        return usuariosGuardados[username] === password;
    }

    // Manejar el envío del formulario de creación de cuenta
    $("#signupForm").submit(function (event) {
        event.preventDefault();
        var nuevoUsuario = $("#nuevoUsuario").val();
        var nuevaContrasena = $("#nuevaContrasena").val();

        // Obtener usuarios almacenados en localStorage
        var usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || {};

        // Verificar si el usuario ya existe
        if (usuariosGuardados.hasOwnProperty(nuevoUsuario)) {
            alert("Error: El usuario ya existe");
        } else {
            // Guardar las nuevas credenciales en localStorage
            usuariosGuardados[nuevoUsuario] = nuevaContrasena;
            localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

            // Muestra un mensaje de éxito al usuario
            alert("Cuenta creada con éxito");

            // Descargar el archivo actualizado
            descargarArchivo("usuarios.json", JSON.stringify(usuariosGuardados));
        }
    });

    // Función para descargar un archivo
    function descargarArchivo(nombreArchivo, contenido) {
        var blob = new Blob([contenido], { type: "application/json" });

        // Crear un enlace de descarga
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = nombreArchivo;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

