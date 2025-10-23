document.addEventListener('DOMContentLoaded', () => {
    // Array con la información de los packs de viaje
    const travelPacks = [
        {
            price: '500$',
            title: 'Pack Europeo',
            description: 'Estocolmo, Berlín & Amsterdam: buses y hostales',
            link: 'versión_c.html',
            image: '../images/pack_eu.jpg'
        },
        {
            price: '850$',
            title: 'Aventura Asiática',
            description: 'Bangkok, Tokio & Seúl: vuelos y hoteles',
            link: 'versión_c.html', // Asumimos que lleva a la misma página de compra por ahora
            image: '../images/albergue_china.jpg'
        },
        {
            price: '1100$',
            title: 'Ruta Sudamericana',
            description: 'Lima, Cuzco & La Paz: tours guiados',
            link: 'versión_c.html', // Asumimos que lleva a la misma página de compra por ahora
            image: '../images/rutas_chile.jpg'
        }
    ];

    // Se obtienen los elementos del DOM que se van a modificar
    const packElement = document.getElementById('pack1');
    const priceElement = document.getElementById('price1');
    const titleElement = document.getElementById('título_pack_europeo');
    const descriptionElement = document.getElementById('descripcion_pack_europeo');
    const buyButton = document.getElementById('Comprar1');
    const prevButton = document.getElementById('bk');
    const nextButton = document.getElementById('fw');
    
    // Si algún elemento no existe, el script no se ejecuta para evitar errores.
    if (!packElement || !prevButton || !nextButton) {
        console.error("Los elementos del carrusel no se encontraron en la página.");
        return;
    }

    let currentPackIndex = 0;
    let slideInterval;

    // Función que actualiza dinámicamente el contenido del pack mostrado
    function updatePackDisplay(index) {
        const pack = travelPacks[index];
        priceElement.textContent = pack.price;
        titleElement.textContent = pack.title;
        descriptionElement.textContent = pack.description;
        packElement.style.backgroundImage = `url('${pack.image}')`;
        buyButton.setAttribute('onclick', `location.href='${pack.link}'`);
    }

    // Función para reiniciar el intervalo del carrusel automático
    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            currentPackIndex = (currentPackIndex + 1) % travelPacks.length;
            updatePackDisplay(currentPackIndex);
        }, 2000);
    }

    // Evento para el botón de avanzar (">")
    nextButton.addEventListener('click', () => {
        currentPackIndex = (currentPackIndex + 1) % travelPacks.length;
        updatePackDisplay(currentPackIndex);
        resetAutoSlide(); // Reinicia el temporizador
    });

    // Evento para el botón de retroceder ("<")
    prevButton.addEventListener('click', () => {
        currentPackIndex = (currentPackIndex - 1 + travelPacks.length) % travelPacks.length;
        updatePackDisplay(currentPackIndex);
        resetAutoSlide(); // Reinicia el temporizador
    });

    // Carga inicial del primer pack y del carrusel automático
    updatePackDisplay(currentPackIndex);
    resetAutoSlide();

    const nombreUsuario = document.getElementById("nombre_usuario");
    const imgUsuario = document.getElementById("img_usuario");

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    } 

    const usuario = getCookie("usuario");
    if (usuario) nombreUsuario.textContent = usuario;
    const imagenPerfil = localStorage.getItem("imagenPerfil");
    if (imagenPerfil && imgUsuario) {
        imgUsuario.style.backgroundImage = `url('${imagenPerfil}')`;
    }

    // GESTIÓN DE CONSEJOS
    const consejoForm = document.getElementById("consejo_form");
    const tituloInput = document.getElementById("titulo_input");
    const descripcionInput = document.getElementById("descripcion_input");
    const listaConsejos = document.querySelector("#consejo1 + ul"); // La lista <ul> bajo "Últimos Consejos"

    // Función para obtener la lista actual de consejos desde localStorage
    function obtenerConsejos() {
        const consejosGuardados = localStorage.getItem("consejos");
        return consejosGuardados ? JSON.parse(consejosGuardados) : [];
    }

    // Función para guardar la lista de consejos
    function guardarConsejos(consejos) {
        localStorage.setItem("consejos", JSON.stringify(consejos));
    }

    // Función para renderizar los últimos tres consejos en el DOM
    function mostrarUltimosConsejos() {
        const consejos = obtenerConsejos();
        listaConsejos.innerHTML = ""; // Limpiamos la lista

        // Tomamos los tres primeros (los más recientes)
        consejos.slice(0, 3).forEach(consejo => {
            const li = document.createElement("li");
            const enlace = document.createElement("a");
            enlace.href = "consejo.html"; // Página ficticia
            enlace.textContent = consejo.titulo;
            enlace.title = consejo.descripcion; // Tooltip con descripción
            li.appendChild(enlace);
            listaConsejos.appendChild(li);
        });
    }

    // Manejador del formulario
    consejoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const titulo = tituloInput.value.trim();
        const descripcion = descripcionInput.value.trim();

        // Validaciones de longitud
        if (titulo.length < 15) {
            alert("El título debe tener al menos 15 caracteres.");
            return;
        }

        if (descripcion.length < 30) {
            alert("La descripción debe tener al menos 30 caracteres.");
            return;
        }

        // Crear el nuevo consejo
        const nuevoConsejo = { titulo, descripcion };

        // Obtener lista actual, agregar al principio y guardar
        const consejos = obtenerConsejos();
        consejos.unshift(nuevoConsejo); // Añadir al comienzo
        guardarConsejos(consejos);

        // Actualizar la lista visible
        mostrarUltimosConsejos();

        // Limpiar campos
        tituloInput.value = "";
        descripcionInput.value = "";
    });

    // Mostrar los consejos al cargar la página
    mostrarUltimosConsejos();
});

document.getElementById('cerrar_sesion').addEventListener('click', function() {
        // Crear ventana emergente personalizada
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
        mensaje.textContent = "¿Desea cerrar sesión?";

        const confirmarBtn = document.createElement("button");
        confirmarBtn.textContent = "Confirmar";
        confirmarBtn.style.margin = "10px";

        const cancelarBtn = document.createElement("button");
        cancelarBtn.textContent = "Cancelar";

        modal.appendChild(mensaje);
        modal.appendChild(confirmarBtn);
        modal.appendChild(cancelarBtn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Evento para cancelar
        cancelarBtn.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });

        // Evento para confirmar
        confirmarBtn.addEventListener("click", () => {
            document.body.removeChild(overlay);
            window.location.href = "index.html";
    });
});

