document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorProductos");

  // ✅ Obtener productos desde la API
  fetch('/api/Producto') // ← Cambia esto si tu endpoint real es diferente
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener productos");
      return res.json();
    })
    .then(productos => {
      // Limpiar el contenedor por si acaso
      contenedor.innerHTML = "";

      productos.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-md-3";
        card.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <img src="${item.PROD_IMG}" alt="Imagen Producto" class="img-fluid rounded" style="max-height: 300px;" />
            <div class="card-body text-center">
              <h5 class="card-title text-dark fw-semibold">${item.PROD_NOMBRE}</h5>
              <p class="card-text fw-bold">$${item.PROD_PRECIO.toFixed(2)}</p>
              <p class="text-muted small">Stock: ${item.PROD_STOCK} unidades</p>
              <a href="Detalle.html?id=${item.PROD_ID}" class="btn btn-outline-dark btn-sm w-100 mb-2">Ver más</a>
              <button onclick='agregarAlCarrito(${JSON.stringify(item)})' class="btn btn-morado btn-sm w-100 fw-semibold">🛒 Agregar al carrito</button>
            </div>
          </div>
        `;
        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      contenedor.innerHTML = `<div class="alert alert-danger">❌ Error al cargar productos: ${error.message}</div>`;
    });

  // ✅ Definir función fuera del then
  window.agregarAlCarrito = function (producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.PROD_ID === producto.PROD_ID);
    if (existente) {
      existente.Cantidad += 1;
    } else {
      carrito.push({
        PROD_ID: parseInt(producto.PROD_ID),
        PROD_NOMBRE: producto.PROD_NOMBRE,
        PROD_PRECIO: parseFloat(producto.PROD_PRECIO),
        PROD_IMG: producto.PROD_IMG,
        Cantidad: 1
      });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "../Carrito/Index.html"; // redirige al carrito
  };
});
