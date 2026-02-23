const URL_GOOGLE_SHEET = "https://script.google.com/macros/s/AKfycbz-ofME3KlD1ouX4lzboS14Z-ZTgTUks4fbsSxsUZYPIIylUu5JXp9nFMriswWRVL2I3A/exec";

// Funciones para cambiar de vista en el modal
function mostrarRegistro() {
    document.getElementById('contenedor-login').style.display = 'none';
    document.getElementById('contenedor-registro').style.display = 'block';
}

function mostrarLogin() {
    document.getElementById('contenedor-login').style.display = 'block';
    document.getElementById('contenedor-registro').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const modalLogin = document.getElementById('modalLogin');
    const modalOferta = document.getElementById('modalOferta');

    // Siempre mostramos el modal al cargar la página (según tu pedido)
    modalLogin.classList.add('activo');
    document.body.style.overflow = "hidden";

    // --- LÓGICA DE REGISTRO ---
    document.getElementById('formRegistro').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = "REGISTRANDO...";
        btn.disabled = true;

        const datos = {
            nombre: document.getElementById('regNombre').value.trim(),
            apellido: document.getElementById('regApellido').value.trim(),
            email: document.getElementById('regEmail').value.trim().toLowerCase(),
            telefono: document.getElementById('regTel').value.trim(),
            dni: document.getElementById('regDni').value.trim(),
            fechaRegistro: new Date().toLocaleString()
        };

        // Guardamos localmente
        localStorage.setItem('user_amelina', JSON.stringify(datos));

        // Enviamos a Google
        fetch(URL_GOOGLE_SHEET, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        }).then(() => {
            alert("¡Cuenta creada con éxito!");
            entrarALaTienda();
        });
    });

    // --- LÓGICA DE LOGIN ---
    document.getElementById('formLogin').addEventListener('submit', (e) => {
        e.preventDefault();
        const emailIngresado = document.getElementById('loginEmail').value.trim().toLowerCase();
        const dniIngresado = document.getElementById('loginDni').value.trim();

        // Buscamos si el usuario existe en esta computadora
        const usuarioGuardado = JSON.parse(localStorage.getItem('user_amelina'));

        if (usuarioGuardado && usuarioGuardado.email === emailIngresado && usuarioGuardado.dni === dniIngresado) {
            entrarALaTienda();
        } else {
            alert("Los datos no coinciden o no estás registrado en este dispositivo. Si es tu primera vez, hacé clic en 'Registrate acá'.");
        }
    });

    function entrarALaTienda() {
        modalLogin.classList.remove('activo');
        modalOferta.classList.add('activo');
        document.body.style.overflow = "auto";
    }
});
