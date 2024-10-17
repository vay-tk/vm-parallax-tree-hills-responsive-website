
const text = document.getElementById("text");
const leaf = document.getElementById("leaf");
const hill1 = document.getElementById("hill1");
const hill4 = document.getElementById("hill4");
const hill5 = document.getElementById("hill5");

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navigation.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navigation.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!navigation.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navigation.classList.remove('active');
  }
});

// Improved parallax effect with performance optimization
let ticking = false;
let lastScrollY = window.scrollY;

const updateParallax = () => {
  const value = window.scrollY;
  
  // Use different multipliers for mobile and desktop
  const isMobile = window.innerWidth <= 768;
  const multipliers = {
    text: isMobile ? 1.5 : 2.5,
    leaf: isMobile ? -0.8 : -1.5,
    leafX: isMobile ? 0.8 : 1.5,
    hill5: isMobile ? 0.8 : 1.5,
    hill4: isMobile ? -0.8 : -1.5,
    hill1: isMobile ? 0.5 : 0.9
  };

  // Apply transforms instead of direct positioning
  text.style.transform = `translateY(${value * multipliers.text}px)`;
  leaf.style.transform = `translate(${value * multipliers.leafX}px, ${value * multipliers.leaf}px)`;
  hill5.style.transform = `translateX(${value * multipliers.hill5}px)`;
  hill4.style.transform = `translateX(${value * multipliers.hill4}px)`;
  hill1.style.transform = `translateY(${value * multipliers.hill1}px)`;

  ticking = false;
};

// Optimized scroll handler with requestAnimationFrame
window.addEventListener("scroll", () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768) {
      navigation.classList.remove('active');
      hamburger.classList.remove('active');
    }
    updateParallax();
  }, 250);
}, { passive: true });

// Initial update
updateParallax();
