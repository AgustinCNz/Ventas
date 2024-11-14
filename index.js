/* Llamada al archivo juegos.json */
document.addEventListener('DOMContentLoaded', () => {
    let juegosData = [];

    // Cargar los datos desde el archivo JSON
    fetch('/data/juegos.json') // Verifica que la ruta sea correcta
        .then(response => response.json())
        .then(data => {
            juegosData = data;
            renderCards(juegosData); // Generar las cards dinámicamente
            addEventListenersToButtons(juegosData);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

/* Función para renderizar las cards dinámicamente */
function renderCards(juegosData) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    juegosData.forEach(juego => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${juego.imagenes[0]}" alt="${juego.nombre}">
            <h3>${juego.nombre}</h3>
            <p>${juego.descripcion.substring(0, 100)}...</p>
            <button class="ver-mas">Ver más</button>
            <button class="comprar">Comprar</button>
        `;

        cardContainer.appendChild(card);
    });
}

/* Lógica para mostrar el Modal */
function addEventListenersToButtons(juegosData) {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImages = document.getElementById('modal-images');
    const modalPrice = document.getElementById('modal-price');
    const modalPreview = document.getElementById('modal-preview');

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('ver-mas')) {
            const cardIndex = Array.from(document.querySelectorAll('.ver-mas')).indexOf(event.target);
            const juego = juegosData[cardIndex];

            // Llenar el contenido del modal con la información del juego
            modalTitle.textContent = juego.nombre;
            modalDescription.textContent = juego.descripcion;
            modalPrice.textContent = `Precio: $${juego.precio.toFixed(2)} (Descuento: ${juego.descuento}%)`;

            // Mostrar la primera imagen como previsualización por defecto
            modalPreview.src = juego.imagenes[0];

            // Limpiar y añadir las imágenes con evento de hover
            modalImages.innerHTML = '';
            juego.imagenes.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.addEventListener('mouseover', () => {
                    modalPreview.src = imgSrc; // Cambiar la imagen de previsualización al pasar el cursor
                });
                modalImages.appendChild(img);
            });

            // Mostrar el modal
            modal.style.display = 'block';
        }
    });

    // Cerrar el modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


/* Fin de la lógica para mostrar el Modal */

/* Lógica del carrusel de ofertas */
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const thumbnails = document.querySelectorAll('.carousel-thumbnails img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function showSlide(index) {
        if (index >= carouselItems.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = carouselItems.length - 1;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Avance automático
    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
});

/* Fin del carrusel de ofertas */
