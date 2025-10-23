document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro_a');
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const email = document.getElementById('email');
    const confirmEmail = document.getElementById('confirm_email');
    const fecha = document.getElementById('fecha_de_nacimiento');
    const usuario = document.getElementById('usuario');
    const contraseña = document.getElementById('contraseña');
    const imagen = document.getElementById('img_perfil');
    const politica = document.getElementById('politica_privacidad');
    const confirmarBtn = document.getElementById('confirmar_datos');

    // Habilitar / deshabilitar botón según checkbox
    confirmarBtn.disabled = true;
    
    politica.addEventListener('change', () => {
        confirmarBtn.disabled = !politica.checked;
    });

    confirmarBtn.addEventListener('click', () => {
        // Validaciones
        if (!validarNombre(nombre.value)) return error('El nombre debe tener al menos 3 caracteres.');
        if (!validarApellidos(apellidos.value)) return error('Debe introducir al menos dos apellidos de mínimo 3 caracteres cada uno.');
        if (!validarEmail(email.value)) return error('El email no tiene un formato válido.');
        if (email.value !== confirmEmail.value) return error('Los correos no coinciden.');
        if (!validarFecha(fecha.value)) return error('La fecha de nacimiento es inválida o futura.');
        if (!validarUsuario(usuario.value)) return error('El nombre de usuario debe tener al menos 5 caracteres.');
        if (!validarContraseña(contraseña.value)) return error('La contraseña debe tener 8 caracteres, 2 números, 1 especial, 1 mayúscula y 1 minúscula.');
        if (!validarImagen(imagen)) return error('Debes subir una imagen en formato .jpg, .png o .webp.');

        // Guardar en cookies (usuario y contraseña para login posterior)
        document.cookie = `usuario=${encodeURIComponent(usuario.value)}; path=/`;
        document.cookie = `contrasena=${encodeURIComponent(contraseña.value)}; path=/`;

        // Guardar imagen en localStorage
        const file = imagen.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Image = e.target.result;
            localStorage.setItem('imagenPerfil', base64Image);
            
            alert('Registro exitoso. ¡Bienvenido/a!');
            window.location.href = 'versión_b.html';
        };
        reader.readAsDataURL(file);
    });

    function error(msg) {
        alert(msg);
    }

    function validarNombre(nom) {
        return nom.trim().length >= 3;
    }

    function validarApellidos(aps) {
        const partes = aps.trim().split(/\s+/);
        return partes.length >= 2 && partes.every(p => p.length >= 3);
    }

    function validarEmail(mail) {
        return /^[^@]+@[^@]+\.[a-z]{2,}$/i.test(mail);
    }

    function validarFecha(fechaStr) {
        if (!fechaStr) return false;
        const fecha = new Date(fechaStr);
        const hoy = new Date();
        return fecha < hoy && fecha.getFullYear() > 1900;
    }

    function validarUsuario(user) {
        return user.trim().length >= 5;
    }

    function validarContraseña(pass) {
        const regex = /^(?=(?:.*\d){2,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return regex.test(pass);
    }

    function validarImagen(input) {
        if (!input.files || input.files.length === 0) return false;
        const file = input.files[0];
        const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        return tiposPermitidos.includes(file.type);
    }
});
