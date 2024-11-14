/* Modal para mostrar mas detalle de los juegos*/

/* Fin del Modal para mostrar mas detalle de los juegos*
/* Esta es la logica del carrusell de ofertas */
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

/* aqui termina el carrusell de ofertas */