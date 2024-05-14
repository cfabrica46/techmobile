document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/database.json')
        .then(response => response.json())
        .then(data => {
            const carousel = document.querySelector('.carousel');
            
            data.inventory.forEach(brand => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                const link = document.createElement('a');
                link.href = `pages/models.html?brand=${encodeURIComponent(brand.brand)}`;
                const img = document.createElement('img');
                img.src = brand.logo_url;
                img.alt = brand.brand;
                img.classList.add('carousel-image');
                link.appendChild(img);
                slide.appendChild(link);
                carousel.appendChild(slide);
            });
            
            changeSlide(0);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});


let slideIndex = 0;
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    slides[slideIndex].classList.remove('active');
    slideIndex += direction;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    slides[slideIndex].classList.add('active');
}
