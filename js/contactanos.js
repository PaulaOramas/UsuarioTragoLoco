document.addEventListener("DOMContentLoaded", () => {
  const faqs = [
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos tarjetas de crédito, débito y transferencias bancarias en Ecuador."
    },
    {
      pregunta: "¿Hacen envíos a todo el país?",
      respuesta: "Sí, realizamos envíos en todo el Ecuador, con entregas de 24 a 72 horas dependiendo del sector."
    },
    {
      pregunta: "¿Qué pasa si un producto llega dañado?",
      respuesta: "Nos comprometemos a reemplazar cualquier producto dañado. Solo debes contactarnos en un plazo de 24 horas."
    },
    {
      pregunta: "¿Puedo comprar sin registrarme?",
      respuesta: "No, para realizar compras debes crear una cuenta. Esto nos ayuda a garantizar una entrega segura."
    }
  ];

  const accordion = document.getElementById("faqAccordion");

  faqs.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "accordion-item faq-card";

    card.innerHTML = `
      <h2 class="accordion-header" id="faq${index}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
          ${item.pregunta}
        </button>
      </h2>
      <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">${item.respuesta}</div>
      </div>
    `;

    accordion.appendChild(card);
  });

  // Manejo del formulario de contacto
  const form = document.getElementById("formContacto");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("Nombre").value.trim();
    const correo = document.getElementById("Email").value.trim();
    const mensaje = document.getElementById("Mensaje").value.trim();

    if (nombre && correo && mensaje) {
      alert(`✅ Gracias, ${nombre}. Tu mensaje ha sido enviado correctamente.`);
      form.reset();
    } else {
      alert("❗ Por favor completa todos los campos.");
    }
  });
});
