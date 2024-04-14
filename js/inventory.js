let slideIndex = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    slides[slideIndex].classList.remove('active');
    slideIndex += direction;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    slides[slideIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    changeSlide(0);
});