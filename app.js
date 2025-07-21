// Navegación desde la portada
function iniciarApp() {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) {
    alert("🌱 Por favor escribe tu nombre para comenzar.");
    return;
  }
  localStorage.setItem("nombreUsuario", nombre);
  window.location.href = "reflexion.html";
}

// En reflexión.html
document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombreUsuario");
  if (nombre) {
    document.getElementById("saludo").textContent = `🌟 Bienvenido, ${nombre}`;
  }

  // Mostrar cita desde JSON
  fetch('citas.json')
    .then(res => res.json())
    .then(data => {
      const cita = data.citas[Math.floor(Math.random() * data.citas.length)];
      document.getElementById("cita").textContent = cita.texto;
      document.getElementById("reflexion").textContent = cita.ref;

      // Voz hablada (Web Speech API)
      const utterance = new SpeechSynthesisUtterance(`${cita.texto}, ${cita.ref}`);
      utterance.lang = "es-ES";
      speechSynthesis.speak(utterance);
    });

  // Mostrar comentarios guardados
  mostrarComentarios();
});

// Reacciones simples
function reaccionar(clave, like) {
  const campo = document.getElementById("likes-cita");
  let likes = parseInt(localStorage.getItem("likes") || "0");
  let dislikes = parseInt(localStorage.getItem("dislikes") || "0");

  if (like) likes++; else dislikes++;

  localStorage.setItem("likes", likes);
  localStorage.setItem("dislikes", dislikes);
  campo.textContent = `${likes} 👍 / ${dislikes} 👎`;
}

// Publicar comentario
function publicarComentario() {
  const nombre = localStorage.getItem("nombreUsuario") || "Anónimo";
  const texto = document.getElementById("comentario").value.trim();
  if (!texto) return;

  const comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");
  comentarios.push({ nombre, texto });
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
  document.getElementById("comentario").value = "";
  mostrarComentarios();
}

// Mostrar comentarios
function mostrarComentarios() {
  const contenedor = document.getElementById("comentarios");
  const comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");
  contenedor.innerHTML = comentarios.map(c =>
    `<div class="comentario"><strong>${c.nombre}</strong>: ${c.texto}</div>`
  ).join("");
}

// Guardar cita y reflexión personal
function guardarPropia() {
  const cita = document.getElementById("citaPersonal").value.trim();
  const reflexion = document.getElementById("reflexionPersonal").value.trim();
  if (!cita || !reflexion) return alert("💬 Completa ambos campos antes de guardar.");

  alert("🌱 ¡Tu aporte ha sido guardado con gratitud!");
  document.getElementById("citaPersonal").value = "";
  document.getElementById("reflexionPersonal").value = "";
}
