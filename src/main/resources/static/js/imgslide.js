document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide-content');
        const slideWidth = slides[0].offsetWidth + parseFloat(window.getComputedStyle(slides[0]).marginRight) * 2; // 각 슬라이드의 너비 + 마진 값
        const totalSlides = slides.length;

        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        const newTransformValue = -currentSlide * slideWidth;
        document.querySelector('.slider-wrapper').style.transform = `translateX(${newTransformValue}px)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // 초기 슬라이드 설정
    showSlide(currentSlide);
});
