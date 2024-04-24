document.addEventListener('DOMContentLoaded', function() {
    // Cargar la información del archivo JSON
    fetch('../data/database.json')
        .then(response => response.json())
        .then(data => {
            // Obtener el elemento del carrusel
            const carousel = document.querySelector('.carousel');
            
            // Crear slides para cada marca y mostrar los logos
            data.inventory.forEach(brand => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                const img = document.createElement('img');
                img.src = brand.logo_url;
                img.alt = brand.brand;
                img.classList.add('carousel-image');
                slide.appendChild(img);
                carousel.appendChild(slide);
            });
            
            // Inicializar el carrusel
            changeSlide(0);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

});


// Función para cambiar el slide del carrusel
let slideIndex = 0;
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    slides[slideIndex].classList.remove('active');
    slideIndex += direction;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    slides[slideIndex].classList.add('active');
}