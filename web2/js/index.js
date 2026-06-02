document.addEventListener('DOMContentLoaded', function () {
  var carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  var slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  var dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  var prevBtn = carousel.querySelector('[data-carousel-prev]');
  var nextBtn = carousel.querySelector('[data-carousel-next]');
  var current = 0;
  var timer = null;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === current);
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = window.setInterval(function () {
      showSlide(current + 1);
    }, 3000);
  }

  function stopAutoPlay() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  slides.forEach(function (slide) {
    var img = slide.querySelector('img');
    if (!img) return;

    img.addEventListener('error', function () {
      slide.classList.add('is-placeholder');
      img.style.display = 'none';
      img.alt = '开州风景图片占位图（当前图片未加载）';
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      showSlide(current - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      showSlide(current + 1);
      startAutoPlay();
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      showSlide(i);
      startAutoPlay();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  showSlide(0);
  startAutoPlay();
});
