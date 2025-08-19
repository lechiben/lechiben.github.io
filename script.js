// Matrix Canvas Background
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Matrix characters
const matrixChars =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const charArray = matrixChars.split("");
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(15, 23, 42, 0.04)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#4ade80";
  ctx.shadowColor = "#4ade80";
  ctx.shadowBlur = 5;
  ctx.font = `${fontSize}px JetBrains Mono`;

  drops.forEach((y, index) => {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    const x = index * fontSize;

    ctx.fillText(text, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[index] = 0;
    }
    drops[index]++;
  });

  ctx.shadowBlur = 0;
}

// State management
let currentView = "intro";
let introShown = false;

// Typed Text Animation
const texts = [
  "Ben Le",
  "a Software Engineer",
  "a Problem Solver",
  "a Data Enthusiast",
];
let textIndex = 0;
let charIndex = 0;
const typedTextElement = document.getElementById("typed-text");
const typingSpeed = 100;
const pauseDelay = 2000;

function typeText() {
  if (charIndex === 0) {
    typedTextElement.textContent = "";
  }

  if (charIndex < texts[textIndex].length) {
    typedTextElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(() => {
      charIndex = 0;
      textIndex = (textIndex + 1) % texts.length;
      typeText();
    }, pauseDelay);
  }
}

// Enter site function
function enterSite() {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");

  intro.classList.add("hidden");

  setTimeout(() => {
    intro.style.display = "none";
    main.classList.add("visible");
    header.classList.remove("hidden");
    nav.classList.remove("hidden");
    currentView = "main";
    introShown = true;

    // Update navigation to show home as active
    updateActiveNav("about");
  }, 1000);
}

// Go home function
function goHome() {
  if (currentView === "intro") return;

  const intro = document.getElementById("intro");
  const main = document.getElementById("main");
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");

  main.classList.remove("visible");
  header.classList.add("hidden");
  nav.classList.add("hidden");

  setTimeout(() => {
    intro.style.display = "flex";
    intro.classList.remove("hidden");
    currentView = "intro";

    // Clear active navigation
    document
      .querySelectorAll(".links li, .mobile-menu li")
      .forEach((li) => li.classList.remove("active"));
  }, 300);
}

// Update active navigation
function updateActiveNav(sectionId) {
  document
    .querySelectorAll(".links li, .mobile-menu li")
    .forEach((li) => li.classList.remove("active"));

  const navLink = document.querySelector(`.links a[href="#${sectionId}"]`);
  const mobileNavLink = document.querySelector(
    `.mobile-menu a[href="#${sectionId}"]`
  );

  if (navLink) navLink.parentElement.classList.add("active");
  if (mobileNavLink) mobileNavLink.parentElement.classList.add("active");
}

// Mobile menu functions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const toggleBtn = document.querySelector(".mobile-menu-toggle i");

  mobileMenu.classList.toggle("active");

  if (mobileMenu.classList.contains("active")) {
    toggleBtn.className = "fas fa-times";
  } else {
    toggleBtn.className = "fas fa-bars";
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const toggleBtn = document.querySelector(".mobile-menu-toggle i");

  mobileMenu.classList.remove("active");
  toggleBtn.className = "fas fa-bars";
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").slice(1);

    if (targetId === "home") {
      goHome();
      return;
    }

    if (currentView === "intro") {
      enterSite();
      setTimeout(() => {
        const target = document.querySelector(`#${targetId}`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          updateActiveNav(targetId);
        }
      }, 1100);
    } else {
      const target = document.querySelector(`#${targetId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        updateActiveNav(targetId);
      }
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".experience-card, .project-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Navigation scroll spy
window.addEventListener("scroll", () => {
  if (currentView === "intro") return;

  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 200;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos <= bottom) {
      updateActiveNav(id);
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const nav = document.getElementById("nav");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!nav.contains(e.target) && mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});

// Form submission handling
document.querySelector("form").addEventListener("submit", function (e) {
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      this.reset();
    }, 2000);
  }, 1000);
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (currentView === "intro") {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enterSite();
    }
    return;
  }

  const sections = ["about", "experience", "projects", "skills", "contact"];
  const currentSection = document
    .querySelector(".links li.active a, .mobile-menu li.active a")
    ?.getAttribute("href")
    ?.slice(1);
  const currentIndex = sections.indexOf(currentSection);

  if (e.key === "ArrowDown" || e.key === "j") {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % sections.length;
    document.querySelector(`a[href="#${sections[nextIndex]}"]`).click();
  } else if (e.key === "ArrowUp" || e.key === "k") {
    e.preventDefault();
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    document.querySelector(`a[href="#${sections[prevIndex]}"]`).click();
  } else if (e.key === "Escape") {
    e.preventDefault();
    goHome();
  }
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Hide header and nav initially
  document.getElementById("header").classList.add("hidden");
  document.getElementById("nav").classList.add("hidden");

  // Start typing animation
  typeText();

  // Start matrix animation
  setInterval(drawMatrix, 50);

  // Performance optimization - pause matrix when not visible
  document.addEventListener("visibilitychange", function () {
    const isTabVisible = !document.hidden;
    canvas.style.animationPlayState = isTabVisible ? "running" : "paused";
  });
});
