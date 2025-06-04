document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("bloquesResponsables");

  const mensajes = [
    {
      img: "../../imagenes/historia1.jpg",
      titulo: "✅ Evita conducir si has ingerido alcohol.",
      texto: "Cuida tu vida y la de otros. Usa taxi o designa un conductor."
    },
    {
      img: "../../imagenes/historia2.jpg",
      titulo: "✅ Respeta tu límite personal y el de los demás.",
      texto: "No todos toleran igual el alcohol. Sé empático y consciente."
    },
    {
      img: "../../imagenes/historia3.jpg",
      titulo: "✅ Combina con alimentos y mantente hidratado.",
      texto: "Beber agua y comer mejora tu experiencia y reduce riesgos."
    },
    {
      img: "../../imagenes/historia.jpg",
      titulo: "✅ No consumas alcohol si eres menor de edad.",
      texto: "El alcohol puede afectar el desarrollo físico y mental."
    }
  ];

  mensajes.forEach(mensaje => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-6";

    col.innerHTML = `
      <div class="bloque-responsable d-flex align-items-center shadow h-100 p-3 rounded-4">
        <img src="${mensaje.img}" alt="Imagen" class="img-fluid rounded me-4" style="width: 120px; height: auto;" />
        <div>
          <h5 class="fw-bold mb-1">${mensaje.titulo}</h5>
          <p class="mb-0 small">${mensaje.texto}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
  });
});
