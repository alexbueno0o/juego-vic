const correctPassword = "patata";

const loginDiv = document.getElementById("login");
const menuDiv = document.getElementById("menu");
const button = document.getElementById("enterButton");
const input = document.getElementById("passwordInput");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

/* ====== AUDIO SYSTEM ====== */

// Música de fondo
const bgMusic = new Audio("assets/sound/background music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.15; // bajita y cozy

// Sonido de click
const clickSound = new Audio("assets/sound/click.mp3");
clickSound.volume = 0.35;

// Para evitar autoplay bloqueado
let audioStarted = false;

function startAudio() {
  if (audioStarted) return;
  audioStarted = true;
  bgMusic.play().catch(() => {});
}

document.addEventListener("click", () => {
  startAudio();
}, { once: true });

document.addEventListener("click", (e) => {
  const clickable = e.target.closest("button, .icon, img, span, a");

  if (!clickable) return;

  // Reinicia el sonido si se hace click rápido
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
});


button.addEventListener("click", checkPassword);

function checkPassword(){
  const inputValue = document.getElementById("passwordInput").value;

  if (inputValue === correctPassword) {

  // animación de salida del login
  loginDiv.classList.add("login-exit");

  setTimeout(() => {
    loginDiv.classList.add("hidden");
    showDialogue(); // diálogo aparece directamente
  }, 800); // coincide con la animación
}

}

function setGameModal(title, contentHTML) {
  modalContent.innerHTML = `
    <h2 class="game-title">${title}</h2>
    <div class="game-body">
      ${contentHTML}
    </div>
  `;
  openModal();
}

/* ================= ICONOS ================= */
const icons = document.querySelectorAll(".icon");

icons.forEach(icon=>{
  icon.addEventListener("click", ()=>{
    const name = icon.dataset.name;
    if(name==="reloj") showReloj();
    else if(name==="carta") showFoto();
    else if(name==="musica") showSpotify();
    else if(name==="mapa") showMapa();
    else if(name==="foto") showFoto();
    else if(name==="magia") showMagia();
  });
});



function openModal() {
  modal.classList.remove("hidden");
  requestAnimationFrame(() => {
    modal.classList.add("show");
  });
}

function closeModalFn() {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.classList.add("hidden");
    modalContent.innerHTML = "";
  }, 400);
}

closeModal.addEventListener("click", closeModalFn);


/* ====== FUNCIONES DE CADA ICONO ====== */

function showReloj(){
  setGameModal("Llevamos juntos tan solo:", `<div id="relojGame" class="big-text"></div>`);

  const startDate = new Date("2025-08-02T00:00:00");
  const reloj = document.getElementById("relojGame");

  function update(){
    const now = new Date();
    let diff = now - startDate;
    const d = Math.floor(diff/86400000);
    diff %= 86400000;
    const h = Math.floor(diff/3600000);
    diff %= 3600000;
    const m = Math.floor(diff/60000);
    const s = Math.floor(diff/1000)%60;
    reloj.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  setInterval(update,1000);
}

let currentTrackIndex = null;
let trackHistory = [];

const tracks = [
  "https://open.spotify.com/embed/track/1u8c2t2Cy7UBoG4ArRcF5g",
  "https://open.spotify.com/embed/track/2PfvY24GBZZbq7hPWGeAOJ",
  "https://open.spotify.com/embed/track/2p5oV6VInGd7t28iDA1Ov7",
  "https://open.spotify.com/embed/track/30QvxRsCWIuH6MhAcpxDc6",
  "https://open.spotify.com/embed/track/3HEEHmKE7p30ovzY1YCgbG",

  "https://open.spotify.com/embed/track/4zrykkNStVGMEn0L68UuxE",
  "https://open.spotify.com/embed/track/0isjtJAFQqeerWeecGmc1u",
  "https://open.spotify.com/embed/track/5aJaApaCPmSOTrHupUoqnl",
  "https://open.spotify.com/embed/track/2lwrv8g1JbRlhhqYpPVnlE",
  "https://open.spotify.com/embed/track/2MpgKrz5R2soYBh0MzfliF",
  "https://open.spotify.com/embed/track/5nVcYqS5FhyZlOMMPwfLNl",
  "https://open.spotify.com/embed/track/7Dhvtb3KnYj2KaRKhdLhMS",
  "https://open.spotify.com/embed/track/5nW4z3pfZgJAJ2QTCz9AIE",
  "https://open.spotify.com/embed/track/0tQ9vBYpldCuikPsbgOVKA",
  "https://open.spotify.com/embed/track/5wANPM4fQCJwkGd4rN57mH",
  "https://open.spotify.com/embed/track/2TAMGH49O7zNWDnPyfMGWW",
  "https://open.spotify.com/embed/track/7rdP71W8x4UbJ0KAKBACbo",
  "https://open.spotify.com/embed/track/2tpIAmAq9orm1Owh5pja1w",
  "https://open.spotify.com/embed/track/2Ep5yZhBqHfwg0Lj4BlNKb",
  "https://open.spotify.com/embed/track/2tFwfmceQa1Y6nRPhYbEtC"
];


function showSpotify(random = true) {

  if (currentTrackIndex === null || random) {
    const newIndex = Math.floor(Math.random() * tracks.length);
    if (currentTrackIndex !== null) {
      trackHistory.push(currentTrackIndex);
    }
    currentTrackIndex = newIndex;
  }

  const url = tracks[currentTrackIndex];

  setGameModal(
    "Canción del día...",
    `
    <iframe 
      src="${url}" 
      width="100%" 
      height="380" 
      style="border-radius:20px;border:none;">
    </iframe>

    <div class="spotify-controls">
      <button onclick="prevSong()">⏮</button>
      <button onclick="nextSong()">⏭</button>
    </div>
    `
  );
}

function nextSong() {
  showSpotify(true);
}

function prevSong() {
  if (trackHistory.length === 0) return;
  currentTrackIndex = trackHistory.pop();
  showSpotify(false);
}



function showMapa() {
  setGameModal(
    "Para que vayas eligiendo donde comer postmir jeje",
    `
    <div class="modal-scroll-wrapper">
      <iframe 
        src="https://www.google.com/maps/d/embed?mid=1TNlbG-ttzvQZ4tOzst2cuk9aeytdhCM"
        width="100%" height="360" style="border-radius:20px;border:0;margin-bottom:20px;">
      </iframe>

      <div class="nota-restaurante-wrapper">
        <label for="notaRestaurante">Escribe el sitio, fecha y hora y yo reservo ;)</label>
        <textarea id="notaRestaurante" placeholder="No te duele la cara de ser tan guapa??" rows="4"></textarea>
        <button onclick="guardarNota()">Guardar nota</button>
        <p id="notaGuardada" class="notaGuardada"></p>
      </div>
    </div>
    `
  );

  window.guardarNota = () => {
    const nota = document.getElementById("notaRestaurante").value.trim();
    const display = document.getElementById("notaGuardada");
    if (nota) {
      display.innerText = `✅ Tu nota ha sido guardada: "${nota}"`;
      display.style.opacity = 1;
      display.style.transition = "opacity 0.6s ease-in-out";
    } else {
      display.innerText = "⚠️ Escribe algo antes de guardar.";
      display.style.opacity = 1;
    }
  };
}


let currentPhotoIndex = null;
let photoHistory = [];

const photos = [
  "assets/WhatsApp Image 2026-01-20 at 20.25.24.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.10.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.12.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.13 (1).jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.13.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.14 (1).jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.14.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.15 (1).jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.15.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.16 (1).jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.16.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.17.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.18 (1).jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.18.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.19.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.20.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.21.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.22 (1).jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.22.jpeg",
  "assets/WhatsApp Image 2026-01-20 at 20.25.23.jpeg"
];

function showFoto() {
  if (currentPhotoIndex === null) {
    currentPhotoIndex = Math.floor(Math.random() * photos.length);
  }

  const url = photos[currentPhotoIndex];

  setGameModal(
    "Foto aleatoria de hoy",
    `
      <p style="font-family:'KiwiSoda'; font-size:18px; margin-bottom:12px;">Cada día saldrá una nueva</p>
      <img src="${url}" style="width:100%; max-width:600px; border-radius:20px; box-shadow:0 10px 30px rgba(216,180,254,0.4); margin-bottom:20px;" />

      <div class="spotify-controls">
        <button onclick="prevPhoto()">⏮ Anterior</button>
        <button onclick="nextPhoto()">⏭ Siguiente</button>
      </div>
    `
  );
}

function nextPhoto() {
  if (currentPhotoIndex !== null) photoHistory.push(currentPhotoIndex);

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * photos.length);
  } while (newIndex === currentPhotoIndex && photos.length > 1);

  currentPhotoIndex = newIndex;
  showFoto();
}

function prevPhoto() {
  if (photoHistory.length === 0) return;
  currentPhotoIndex = photoHistory.pop();
  showFoto();
}


function showMagia(){
  const palabras = [ "Vaya culo hija mia", "Tuberculona" ];

  const palabra = palabras[Math.floor(Math.random()*palabras.length)];

  setGameModal(
    "Te requetequiero",
    `<div class="magic-word">${palabra}</div>`
  );
}


const heartContainer = document.getElementById("heart-container");
const heartGif = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXhwaWI3bjd5dXoxNmdtMDRhMzMyM2g5ZnNrc29rOXFtejA4dWNkNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/xT0GqvEqri5HpMJL2g/giphy.gif";

function createHeart() {
  const heart = document.createElement("img");
  heart.src = heartGif;
  heart.className = "heart";

  // posición aleatoria inicial
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-50px";
  
  // tamaño aleatorio
  const scale = 0.5 + Math.random() * 0.7; 
  heart.style.width = 40 * scale + "px";
  heart.style.height = 40 * scale + "px";

  heartContainer.appendChild(heart);

  // animación: flotar hacia arriba y desaparecer
  const duration = 5000 + Math.random() * 5000; // 5-10s
  heart.animate(
    [
      { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(-120vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ],
    {
      duration: duration,
      easing: "linear",
      iterations: 1
    }
  ).onfinish = () => heart.remove();
}

// Crear corazones cada 0.3-0.6s
setInterval(createHeart, 400);

const dialogueModal = document.getElementById("dialogueModal");
const dialogueText = document.getElementById("dialogueText");
const closeDialogue = document.getElementById("closeDialogue");

function showDialogue() {
  dialogueModal.classList.remove("hidden");

  const message = "Hola guapísima, mañana es el gran día! Estoy segurísimo que te va a salir super bien, pero aun así te he hecho esta web por si podía quitarte un poquito de estrés <3, baja al menú y pincha en los iconos";

  dialogueText.innerHTML = "";
  let index = 0;

  const interval = setInterval(() => {
    dialogueText.innerHTML += message[index];
    index++;
    if(index >= message.length){
      clearInterval(interval);
    }
  }, 40); // velocidad de aparición letra por letra (ms)
}

// cerrar diálogo
closeDialogue.addEventListener("click", () => {

  const wrapper = document.querySelector(".dialogue-wrapper");
  wrapper.classList.add("dialogue-exit");

  setTimeout(() => {
    dialogueModal.classList.add("hidden");

    const home = document.getElementById("home");
    home.classList.remove("hidden");
  }, 600);
});

function startHearts() {
  if (STATE.heartInterval) return;
  STATE.heartInterval = setInterval(createHeart, 400);
}

function stopHearts() {
  clearInterval(STATE.heartInterval);
  STATE.heartInterval = null;
}

startHearts();

