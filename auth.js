document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRegistro');
    const modalLogin = document.getElementById('modalLogin');
    const URL_GOOGLE_SHEET = "https://script.google.com/macros/s/AKfycbz-ofME3KlD1ouX4lzboS14Z-ZTgTUks4fbsSxsUZYPIIylUu5JXp9nFMriswWRVL2I3A/exec";

    // 1. Verificamos si ya hay un usuario en el navegador
    const usuarioLogueado = localStorage.getItem('usuarioAme');

    if (usuarioLogueado) {
        modalLogin.classList.remove('activo');
        document.body.style.overflow = "auto";
    }

    // 2. Escuchamos el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Feedback visual inmediato
        const btn = e.target.querySelector('button');
        const textoOriginal = btn.innerText;
        btn.innerText = "ENVIANDO...";
        btn.disabled = true;

        // Capturamos los datos
        const datosUsuario = {
            nombre: document.getElementById('regNombre').value,
            apellido: document.getElementById('regApellido').value,
            email: document.getElementById('regEmail').value,
            telefono: document.getElementById('regTel').value,
            dni: document.getElementById('regDni').value,
            fechaRegistro: new Date().toLocaleString()
        };

        // A. Guardamos en LocalStorage (para que el cliente no se vuelva a registrar)
        localStorage.setItem('usuarioAme', JSON.stringify(datosUsuario));

        // B. Mandamos los datos a tu Google Sheets
        fetch(URL_GOOGLE_SHEET, {
            method: 'POST',
            mode: 'no-cors', // Importante para evitar bloqueos de seguridad
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosUsuario)
        })
        .then(() => {
            // Éxito: Feedback y cerrar modal
            btn.innerText = "¡DATOS GUARDADOS!";
            btn.style.backgroundColor = "#a8bfa8";

            setTimeout(() => {
                modalLogin.classList.remove('activo');
                document.body.style.overflow = "auto";
                alert(`¡Hola ${datosUsuario.nombre}! Tus datos han sido registrados con éxito.`);
            }, 1500);
        })
        .catch(err => {
            console.error("Error al enviar a la base de datos:", err);
            // Si falla el internet, igual lo dejamos entrar porque los datos se guardaron en LocalStorage
            modalLogin.classList.remove('activo');
            document.body.style.overflow = "auto";
        });
    });
});
