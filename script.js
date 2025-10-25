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

// Menu para telas menores
const menuBtn = document.querySelector("#menu-btn");
function toggleMenu() {
    const header = document.querySelector("header");
    header.classList.toggle("show-menu");
    if (header.classList.contains("show-menu")) {
        menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>`;
    } else {
        menuBtn.innerHTML = `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        class="bi bi-list"
                        viewBox="0 0 16 16"
                        >
                        <path
                        fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                        />
                        </svg>`;
    }
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
const cards = document.querySelectorAll(".card");

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
        darkmodeBtn.classList.add('darkmode')
    } else {
        document.body.setAttribute("data-bs-theme", "light");
        darkmodeBtn.classList.remove('darkmode')
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
