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
    const titleElement = document.getElementById('título_pack');
    const descriptionElement = document.getElementById('descripcion_pack');
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
});

document.getElementById('login_btn').addEventListener('click', function() {

    function getCookie(nombre) {
    let name = nombre + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
    }

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    // Leer las cookies (o localStorage) con las credenciales registradas
    const storedUser = getCookie('usuario');      // debe coincidir con la cookie almacenada
    const storedPass = getCookie('contrasena');   // idem
    // Validación:
    if (user === storedUser && pass === storedPass) {
        // Credenciales correctas: redirigir a versión B
        window.location.href = 'versión_b.html';  // Redirect según W3Schools:contentReference[oaicite:5]{index=5}
    } else {
        // Credenciales incorrectas: mostrar mensaje de error
        alert("Nombre de usuario o contraseña incorrectos.");
    }
});

document.getElementById('register_btn').addEventListener('click', function() {
  window.location.href = 'versión_a.html';
});
