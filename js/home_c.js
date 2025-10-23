document.addEventListener('DOMContentLoaded', () => {
    // Obtener el pack seleccionado del localStorage
    const packGuardado = localStorage.getItem('packSeleccionado');
    if (!packGuardado) {
        console.warn("No hay pack seleccionado en localStorage.");
        return;
    }

    const pack = JSON.parse(packGuardado);

    // Obtener los elementos del DOM
    const priceElement = document.getElementById('price1');
    const titleElement = document.getElementById('titulo_pack');
    const descriptionElement = document.getElementById('descripcion_pack');
    const descripcionLarga = document.getElementById('descripcion_pack_largo');
    const packElement = document.getElementById('pack1');

    // Actualizar los valores
    priceElement.textContent = pack.price;
    titleElement.textContent = pack.title;
    descriptionElement.textContent = pack.description;

    // Cambiar la imagen de fondo del contenedor del pack
    packElement.style.backgroundImage = `url('${pack.image}')`;
    packElement.style.backgroundSize = "cover";
    packElement.style.backgroundPosition = "center";

    // Generar una descripción larga ficticia (por ejemplo)
    // Aquí puedes personalizar o ampliar si quieres.
    descripcionLarga.textContent = 
        `Explora nuestro ${pack.title}: ${pack.description}. 
         Este paquete incluye todo lo necesario para que disfrutes tu viaje al máximo.
         ¡Vive una experiencia única y reserva ahora por solo ${pack.price}!`;
    
    // VALIDACIÓN DEL FORMULARIO DE COMPRA

    const form = document.getElementById("formulario_compra");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const tipoTarjeta = document.getElementById("tipo_tarjeta-dropdown");
    const numeroTarjeta = document.getElementById("numero_tarjeta");
    const titular = document.getElementById("titular");
    const fechaCaducidad = document.getElementById("fecha_de_caducidad");
    const cvv = document.getElementById("cvv");
    const botonComprar = document.getElementById("boton_comprar");

    // ---- Validadores individuales ----
    function error(msg) {
        alert(msg);
    }

    function validarNombre(nombre) {
        return nombre.trim().length >= 3;
    }

    function validarEmail(mail) {
        const regex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
        return regex.test(mail);
    }

    function validarTipoTarjeta(valor) {
        return valor !== "";
    }

    function validarNumeroTarjeta(num) {
        return /^\d{13}$|^\d{15}$|^\d{16}$|^\d{19}$/.test(num.trim());
    }

    function validarTitular(tit) {
        return tit.trim().length >= 3;
    }

    function validarFechaCaducidad(fechaStr) {
        if (!fechaStr) return false;
        const fecha = new Date(fechaStr);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        return fecha >= hoy; // no vencida
    }

    function validarCVV(valor) {
        return /^\d{3}$/.test(valor.trim());
    }

    // ---- Evento de compra ----
    botonComprar.addEventListener('click', () => {
        if (!validarNombre(nombre.value)) return error('El nombre completo debe tener al menos 3 caracteres.');
        if (!validarEmail(email.value)) return error('El correo electrónico no tiene un formato válido.');
        if (!validarTipoTarjeta(tipoTarjeta.value)) return error('Debe seleccionar un tipo de tarjeta.');
        if (!validarNumeroTarjeta(numeroTarjeta.value)) return error('El número de tarjeta debe tener 13, 15, 16 o 19 dígitos.');
        if (!validarTitular(titular.value)) return error('El nombre del titular debe tener al menos 3 caracteres.');
        if (!validarFechaCaducidad(fechaCaducidad.value)) return error('La fecha de caducidad es inválida o ya está vencida.');
        if (!validarCVV(cvv.value)) return error('El código CVV debe tener exactamente 3 dígitos.');

        // Si todo es correcto
        mostrarConfirmacion();
    });

    // ---- Modal de confirmación (estilo versión A) ----
    function mostrarConfirmacion() {
        // Crear overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "999";

        const modal = document.createElement("div");
        modal.style.backgroundColor = "#fff";
        modal.style.padding = "20px";
        modal.style.borderRadius = "10px";
        modal.style.textAlign = "center";
        modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

        const mensaje = document.createElement("p");
        mensaje.textContent = "✅ Compra realizada con éxito. ¡Gracias por confiar en TRAVEL4EVER!";

        const cerrarBtn = document.createElement("button");
        cerrarBtn.textContent = "Cerrar";
        cerrarBtn.style.marginTop = "15px";

        modal.appendChild(mensaje);
        modal.appendChild(cerrarBtn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        cerrarBtn.addEventListener("click", () => {
            document.body.removeChild(overlay);
            form.reset();
            tipoTarjeta.value = ""; // restablecer selección vacía
        });
    }
});

