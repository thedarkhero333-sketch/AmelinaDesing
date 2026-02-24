document.addEventListener('DOMContentLoaded', () => {
    const URL_GOOGLE_SHEET = "https://script.google.com/macros/s/AKfycbz-ofME3KlD1ouX4lzboS14Z-ZTgTUks4fbsSxsUZYPIIylUu5JXp9nFMriswWRVL2I3A/exec";

    const modalLogin = document.getElementById('modalLogin');
    const modalOferta = document.getElementById('modalOferta');
    const contLogin = document.getElementById('contenedor-login');
    const contReg = document.getElementById('contenedor-registro');

    // Navegación interna del modal
    document.getElementById('linkIrARegistro').addEventListener('click', () => {
        contLogin.style.display = 'none';
        contReg.style.display = 'block';
    });

    document.getElementById('linkIrALogin').addEventListener('click', () => {
        contReg.style.display = 'none';
        contLogin.style.display = 'block';
    });

    // Bloqueo de scroll al inicio y animación de entrada (Ventanita desde arriba)
    setTimeout(() => {
        modalLogin.classList.add('activo');
        document.body.style.overflow = "hidden";
    }, 100);

    // LÓGICA DE REGISTRO
    document.getElementById('formRegistro').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const dniVal = document.getElementById('regDni').value.trim();
        if(dniVal.length !== 8 || isNaN(dniVal)) {
            alert("El DNI debe tener 8 números exactos.");
            return;
        }

        const btn = e.target.querySelector('button');
        btn.innerText = "REGISTRANDO...";
        btn.disabled = true;

        const datos = {
            nombre: document.getElementById('regNombre').value.trim(),
            apellido: document.getElementById('regApellido').value.trim(),
            email: document.getElementById('regEmail').value.trim().toLowerCase(),
            telefono: document.getElementById('regTel').value.trim(),
            dni: dniVal,
            fechaRegistro: new Date().toLocaleString()
        };

        localStorage.setItem('user_amelina', JSON.stringify(datos));

        fetch(URL_GOOGLE_SHEET, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        }).then(() => {
            alert("¡Registro exitoso! Ya podés ver los productos.");
            entrar();
        }).catch(() => {
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
            alert("Los datos no coinciden. Asegurate de usar el mismo Email y DNI con el que te registraste en este dispositivo.");
        }
    });

    function entrar() {
        // Primero subimos la ventanita de login
        modalLogin.classList.remove('activo');
        
        // Esperamos un segundo a que termine la animación de subida para bajar la de oferta
        setTimeout(() => {
            modalOferta.classList.add('activo');
        }, 600);
        
        document.body.style.overflow = "auto";
    }
});
