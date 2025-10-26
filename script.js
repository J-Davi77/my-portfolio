// Ativação dos tooltips
document.addEventListener("DOMContentLoaded", () => {
    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (el) =>
            new bootstrap.Tooltip(el, {
                delay: { show: 100, hide: 100 },
                html: true,
            })
    );
});

// Header retraível
const header = document.querySelector("header");
let currentScrollY = window.scrollY;
function toggleHeader() {
    if (window.scrollY > currentScrollY) {
        header.style.transform = "translateY(-100%)";
    } else {
        header.style.transform = "translateY(0)";
    }
    currentScrollY = window.scrollY;
}

window.addEventListener('scroll', toggleHeader);

// Glow nos cards
const cards = document.querySelectorAll(".card");
function glowCard(e, card) {
    const glowDiv = card.querySelector(".glow");
    if (glowDiv) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowDiv.style.left = `${x}px`;
        glowDiv.style.top = `${y}px`;
        glowDiv.style.opacity = 1;
        glowDiv.style.transform = "translate(-50%, -50%) scale(1)";
    }
}

cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => glowCard(e, card));

    card.addEventListener("mouseleave", () => {
        const glowDiv = card.querySelector(".glow");
        glowDiv.style.transform = "translate(-50%, -50%) scale(0)";
        if (glowDiv) glowDiv.style.opacity = 0;
    });
});

// Menu para telas menores
const menuBtn = document.querySelector("#menu-btn");
function toggleMenu() {
    header.classList.toggle("show-menu");
}
menuBtn.addEventListener("click", toggleMenu);

// Modal das imagens dos projetos
const modalOverlay = document.querySelector("#modal-overlay");
const modalImg = document.querySelector("#modal-img");
const projectImgs = document.querySelectorAll("#projetos .img-container img");
function openModal(img) {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalOverlay.classList.add("show-modal");
}

function closeModal() {
    modalOverlay.classList.remove("show-modal");
}

projectImgs.forEach((img) => {
    img.addEventListener("click", (e) => {
        openModal(e.currentTarget);
    });
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Animação de scroll
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    },
    {
        threshold: 0.5,
    }
);

cards.forEach((card) => observer.observe(card));

// Modo Escuro / Claro
const darkmodeBtn = document.querySelector(".darkmode-btn");

function setInitialTheme() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDark.matches) {
        document.body.setAttribute("data-bs-theme", "dark");
        darkmodeBtn.classList.add("darkmode");
    } else {
        document.body.setAttribute("data-bs-theme", "light");
        darkmodeBtn.classList.remove("darkmode");
    }
}

setInitialTheme();

function updateMode() {
    const isDark = document.body.getAttribute("data-bs-theme") === "dark";
    if (isDark) {
        document.body.setAttribute("data-bs-theme", "light");
        darkmodeBtn.classList.remove("darkmode");
    } else {
        document.body.setAttribute("data-bs-theme", "dark");
        darkmodeBtn.classList.add("darkmode");
    }
}

darkmodeBtn.addEventListener("click", () => {
    updateMode();
    darkmodeBtn.blur();
});
