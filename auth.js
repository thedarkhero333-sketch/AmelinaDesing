document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRegistro');
    const modalLogin = document.getElementById('modalLogin');

    // 1. Verificamos si ya hay un usuario en la "Base de Datos" local
    const usuarioLogueado = localStorage.getItem('usuarioAme');

    if (usuarioLogueado) {
        // Si ya existe, cerramos el modal automáticamente
        modalLogin.classList.remove('activo');
        document.body.style.overflow = "auto";
        console.log("Usuario ya registrado:", JSON.parse(usuarioLogueado));
    }

    // 2. Escuchamos cuando el usuario envía el formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Capturamos los datos
        const datosUsuario = {
            nombre: document.getElementById('regNombre').value,
            apellido: document.getElementById('regApellido').value,
            email: document.getElementById('regEmail').value,
            telefono: document.getElementById('regTel').value,
            dni: document.getElementById('regDni').value,
            fechaRegistro: new Date().toLocaleString()
        };

        // Guardamos en LocalStorage (Nuestra base de datos temporal)
        localStorage.setItem('usuarioAme', JSON.stringify(datosUsuario));

        // Feedback visual
        const btn = e.target.querySelector('button');
        btn.innerText = "¡DATOS GUARDADOS!";
        btn.style.backgroundColor = "#a8bfa8";

        setTimeout(() => {
            modalLogin.classList.remove('activo');
            document.body.style.overflow = "auto";
            alert(`¡Hola ${datosUsuario.nombre}! Ahora podés realizar tu pedido.`);
        }, 1500);
    });
});
