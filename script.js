/* ============================================
INFRANOVA — FUTURISTIC WEBSITE JAVASCRIPT
============================================ */

document.addEventListener("DOMContentLoaded", () => {

/* 1. MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
menuToggle.addEventListener("click", () => {
const isOpen = navLinks.classList.toggle("open");
menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

}

/* 2. FUTURISTIC ANIMATED STARFIELD */

const canvas = document.getElementById("starfield");

if (canvas) {
const ctx = canvas.getContext("2d");
let stars = [];
let animationFrame;

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.5 + 0.3,
    speed: Math.random() * 0.25 + 0.05,
    opacity: Math.random() * 0.6 + 0.2
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(70, 190, 255, ${star.opacity})`;
    ctx.fill();

    star.y -= star.speed;

    if (star.y < 0) {
      star.y = window.innerHeight;
      star.x = Math.random() * window.innerWidth;
    }
  });

  animationFrame = requestAnimationFrame(animateStars);
}

resizeCanvas();
animateStars();

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  animateStars();
});

}

/* 3. SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
const revealObserver = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
revealObserver.unobserve(entry.target);
}
});
}, {
threshold: 0.12
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

} else {
revealElements.forEach(element => {
element.classList.add("visible");
});
}

/* 4. ACTIVE NAVIGATION LINK */

let currentPage = window.location.pathname.split("/").pop();

if (!currentPage || currentPage === "") {
currentPage = "index.html";
}

document.querySelectorAll(".nav-links a").forEach(link => {
const linkPage = link.getAttribute("href");

if (linkPage === currentPage) {
  link.classList.add("active");
  link.setAttribute("aria-current", "page");
} else {
  link.classList.remove("active");
  link.removeAttribute("aria-current");
}

});

/* 5. INFRANOVA ORDER PRICE CALCULATOR */

const quantityInput = document.getElementById("quantity");
const totalPrice = document.getElementById("total-price");

const UNIT_PRICE = 5000;

function calculateTotal() {
if (!quantityInput || !totalPrice) {
return;
}

let quantity = Number.parseInt(quantityInput.value, 10);

if (Number.isNaN(quantity)) {
  quantity = 1;
}

quantity = Math.max(1, Math.min(100, quantity));

quantityInput.value = quantity;

const total = quantity * UNIT_PRICE;

totalPrice.textContent =
  "₹" + total.toLocaleString("en-IN");

}

if (quantityInput && totalPrice) {
quantityInput.addEventListener("input", calculateTotal);
quantityInput.addEventListener("change", calculateTotal);

calculateTotal();

}

/* 6. CURRENT YEAR IN FOOTER */

document.querySelectorAll("[data-current-year]").forEach(element => {
element.textContent = new Date().getFullYear();
});

/* 7. PREVENT EMPTY ORDER QUANTITY */

if (quantityInput) {
quantityInput.addEventListener("blur", () => {
if (
quantityInput.value === "" ||
Number.parseInt(quantityInput.value, 10) < 1
) {
quantityInput.value = 1;
}

  calculateTotal();
});

}

});
