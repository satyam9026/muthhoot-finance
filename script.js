// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Simple testimonial slider
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    current = i;
    showSlide(current);
  });
});

// Auto slide every 5s
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

// start section
// Auto Count Animation when section enters viewport
    const counters = document.querySelectorAll('.stat-number');
    let started = false; // prevent repeating

    const startCounting = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // approx. 60fps
        let count = 0;

        const updateCounter = () => {
          count += step;
          if (count < target) {
            counter.textContent = Math.floor(count);
            requestAnimationFrame(updateCounter);
          } else {
            // Format numbers like 10M+, 4500+, etc.
            if (target >= 1000000) {
              counter.textContent = Math.floor(target / 1000000) + "M+";
            } else if (target >= 1000) {
              counter.textContent = Math.floor(target) + "+";
            } else {
              counter.textContent = target + "+";
            }
          }
        };

        updateCounter();
      });
    };

    // Detect when the stats section is visible
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        startCounting();
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);