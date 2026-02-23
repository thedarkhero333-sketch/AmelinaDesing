document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    const modalLogin = document.getElementById('modalLogin');
    const modalOferta = document.getElementById('modalOferta');
    const URL_GOOGLE_SHEET = "https://script.google.com/macros/s/AKfycbz-ofME3KlD1ouX4lzboS14Z-ZTgTUks4fbsSxsUZYPIIylUu5JXp9nFMriswWRVL2I3A/exec";

    // 1. Verificamos si ya hay un usuario registrado en este navegador
    const usuarioLogueado = localStorage.getItem('user_amelina');

    if (usuarioLogueado) {
        modalLogin.classList.remove('activo');
        document.body.style.overflow = "auto";
        // Si ya está logueado, podríamos mostrar la oferta (opcional)
        // modalOferta.classList.add('activo'); 
    } else {
        modalLogin.classList.add('activo');
        document.body.style.overflow = "hidden";
    }

    // 2. Escuchamos el envío del formulario con validación
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Feedback visual
        const btn = e.target.querySelector('button');
        btn.innerText = "VERIFICANDO...";
        btn.disabled = true;

        // Capturamos y limpiamos los datos
        const datosUsuario = {
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            email: document.getElementById('email').value.trim().toLowerCase(),
            telefono: document.getElementById('telefono').value.trim(),
            dni: document.getElementById('dni').value.trim(),
            fechaRegistro: new Date().toLocaleString()
        };

        // A. Guardamos en LocalStorage
        localStorage.setItem('user_amelina', JSON.stringify(datosUsuario));

        // B. Mandamos los datos a Google Sheets
        fetch(URL_GOOGLE_SHEET, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosUsuario)
        })
        .then(() => {
            btn.innerText = "¡BIENVENIDO/A!";
            btn.style.backgroundColor = "#a8bfa8";

            setTimeout(() => {
                modalLogin.classList.remove('activo');
                modalOferta.classList.add('activo');
                document.body.style.overflow = "auto";
            }, 1000);
        })
        .catch(err => {
            console.error("Error al enviar:", err);
            // Si falla la conexión, igual lo dejamos pasar
            modalLogin.classList.remove('activo');
            modalOferta.classList.add('activo');
            document.body.style.overflow = "auto";
        });
    });
});
