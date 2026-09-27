// ===============================
// ELEMENTOS PRINCIPALES
// ===============================
const intro = document.getElementById("intro");
const openBtn = document.getElementById("openBtn");
const song = document.getElementById("song");
const musicBtn = document.getElementById("musicBtn");
const afterYes = document.getElementById("afterYes");
const backTop = document.getElementById("backTop");

let musicOn = false;
let accepted = false;

// ===============================
// ABRIR LA PÁGINA
// ===============================
openBtn.addEventListener("click", async () => {
  intro.classList.add("hide");
  document.body.classList.remove("locked");

  try {
    await song.play();
    musicOn = true;
    musicBtn.textContent = "❚❚";
  } catch (error) {
    musicOn = false;
  }
});

// ===============================
// MÚSICA
// ===============================
musicBtn.addEventListener("click", async () => {
  if (musicOn) {
    song.pause();
    musicOn = false;
    musicBtn.textContent = "♫";
    return;
  }

  try {
    await song.play();
    musicOn = true;
    musicBtn.textContent = "❚❚";
  } catch (error) {
    console.log("El navegador bloqueó el audio automático.");
  }
});

// ===============================
// ANIMACIONES AL HACER SCROLL
// ===============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.13
});

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// ===============================
// CUANDO ELLA DICE QUE SÍ
// ===============================
document.querySelectorAll(".yes-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (accepted) return;
    accepted = true;

    // Muestra la segunda parte completa de la página
    afterYes.classList.add("active");

    // Activa observador para elementos nuevos
    document.querySelectorAll(".reveal-after").forEach((element) => {
      observer.observe(element);
    });

    // Pequeña celebración visual
    createPetals();

    // Espera un poco para que aparezca la sección y luego baja suavemente
    setTimeout(() => {
      afterYes.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 300);
  });
});

// ===============================
// VOLVER ARRIBA
// ===============================
backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===============================
// PÉTALOS / CORAZONES
// ===============================
function createPetals() {
  const symbols = ["🌹", "❤", "♡", "✨"];

  for (let i = 0; i < 48; i++) {
    const element = document.createElement("span");

    element.className = "petal";
    element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    element.style.left = Math.random() * 100 + "vw";
    element.style.fontSize = 14 + Math.random() * 18 + "px";
    element.style.setProperty("--drift", ((Math.random() - 0.5) * 180) + "px");
    element.style.animationDuration = 4 + Math.random() * 4 + "s";

    document.body.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 8000);
  }
}
