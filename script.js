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
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
let isDark = prefersDark.matches;
updateMode();

function updateMode() {
    const tooltip = document.querySelector(".mode-tooltip");
    if (isDark) {
        document.body.setAttribute("data-bs-theme", "dark");
        darkmodeBtn.classList.add("darkmode");
        tooltip.textContent = "Mudar para Modo Claro";
        isDark = false;
    } else {
        document.body.setAttribute("data-bs-theme", "light");
        darkmodeBtn.classList.remove("darkmode");
        tooltip.textContent = "Mudar para Modo Escuro";
        isDark = true;
    }
}

// EventListeners
projectImgs.forEach((img) => {
    img.addEventListener("click", (e) => {
        openModal(e.currentTarget);
    });
});

modalOverlay.addEventListener("click", (e) => {
    if ((e.target = modalOverlay)) closeModal();
});

darkmodeBtn.addEventListener("click", updateMode);
