document.addEventListener('DOMContentLoaded', () => {
    const URL_GOOGLE_SHEET = "https://script.google.com/macros/s/AKfycbz-ofME3KlD1ouX4lzboS14Z-ZTgTUks4fbsSxsUZYPIIylUu5JXp9nFMriswWRVL2I3A/exec";

    const modalLogin = document.getElementById('modalLogin');
    const modalOferta = document.getElementById('modalOferta');
    const contLogin = document.getElementById('contenedor-login');
    const contReg = document.getElementById('contenedor-registro');

    // Botones para intercambiar vistas
    document.getElementById('linkIrARegistro').addEventListener('click', () => {
        contLogin.style.display = 'none';
        contReg.style.display = 'block';
    });

    document.getElementById('linkIrALogin').addEventListener('click', () => {
        contReg.style.display = 'none';
        contLogin.style.display = 'block';
    });

    // Forzar modal al cargar
    modalLogin.classList.add('activo');
    document.body.style.overflow = "hidden";

    // LÓGICA DE REGISTRO
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

        localStorage.setItem('user_amelina', JSON.stringify(datos));

        fetch(URL_GOOGLE_SHEET, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        }).then(() => {
            alert("¡Cuenta creada!");
            entrar();
        });
    });

    // LÓGICA DE LOGIN
    document.getElementById('formLogin').addEventListener('submit', (e) => {
        e.preventDefault();
        const emailIng = document.getElementById('loginEmail').value.trim().toLowerCase();
        const dniIng = document.getElementById('loginDni').value.trim();
        const userSave = JSON.parse(localStorage.getItem('user_amelina'));

        if (userSave && userSave.email === emailIng && userSave.dni === dniIng) {
            entrar();
        } else {
            alert("Datos incorrectos o no estás registrado en este navegador.");
        }
    });

    function entrar() {
        modalLogin.classList.remove('activo');
        modalOferta.classList.add('activo');
        document.body.style.overflow = "auto";
    }
});
