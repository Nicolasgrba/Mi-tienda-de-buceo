$(document).ready(function () {
    
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        if (verificarCredenciales(username, password)) {
            alert("Inicio de sesión exitoso");
            
        } else {
            alert("Error: Usuario o contraseña incorrectos");
        }
    });


    function verificarCredenciales(username, password) {

        var usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || {};

        return usuariosGuardados[username] === password;
    }

    $("#signupForm").submit(function (event) {
        event.preventDefault();
        var nuevoUsuario = $("#nuevoUsuario").val();
        var nuevaContrasena = $("#nuevaContrasena").val();

        var usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || {};

        if (usuariosGuardados.hasOwnProperty(nuevoUsuario)) {
            alert("Error: El usuario ya existe");
        } else {
            usuariosGuardados[nuevoUsuario] = nuevaContrasena;
            localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

            alert("Cuenta creada con éxito");

            descargarArchivo("usuarios.json", JSON.stringify(usuariosGuardados));
        }
    });


    function descargarArchivo(nombreArchivo, contenido) {
        var blob = new Blob([contenido], { type: "application/json" });


        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = nombreArchivo;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

