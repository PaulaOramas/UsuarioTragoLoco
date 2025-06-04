
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));

  const contenedor = document.getElementById("contenedorDetalle");

  if (!id || isNaN(id)) {
    contenedor.innerHTML = `<p class="text-center text-danger">ID de producto inválido.</p>`;
    return;
  }

  // ✅ Fetch del producto desde la API
  fetch(`/api/productos/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Producto no encontrado");
      return res.json();
    })
    .then(producto => {
      contenedor.innerHTML = `
        <div class="col-md-6 text-center mb-4">
          <img src="${producto.PROD_IMG}" alt="Imagen de ${producto.PROD_NOMBRE}" class="img-fluid rounded shadow" style="max-height: 350px;" />
        </div>
        <div class="col-md-6">
          <h2 class="text-dark fw-bold">${producto.PROD_NOMBRE}</h2>
          <p class="lead text-dark">${producto.PROD_DESCRIPCION}</p>
          <h4 class="text-dark mb-3 fw-bold">$${parseFloat(producto.PPROD_PRECIO || producto.PROD_PRECIO).toFixed(2)}</h4>

          <div class="mb-3">
            <label for="cantidad" class="text-dark fw-semibold">Cantidad:</label>
            <input type="number" id="cantidad" min="1" max="${producto.PROD_STOCK}" value="1" class="form-control w-50 d-inline-block" required />
          </div>

          <button class="btn btn-morado w-100 fw-semibold" onclick="agregarDetalleAlCarrito(${encodeURIComponent(JSON.stringify(producto))})">
            🛒 Agregar al carrito
          </button>

          <div class="mt-4 text-center">
            <a href="Index.html" class="btn btn-outline-dark text-dark fw-semibold">← Volver al catálogo</a>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.error("Error cargando producto:", error);
      contenedor.innerHTML = `<p class="text-center text-danger">Producto no encontrado o error al cargar.</p>`;
    });

  // ✅ Función para agregar producto al carrito
  window.agregarDetalleAlCarrito = function (productoStr) {
    const producto = JSON.parse(decodeURIComponent(productoStr));
    const cantidad = parseInt(document.getElementById("cantidad").value);
    if (cantidad <= 0 || isNaN(cantidad)) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => parseInt(p.PROD_ID) === parseInt(producto.PROD_ID));
    const precio = parseFloat(producto.PPROD_PRECIO || producto.PROD_PRECIO);

    if (existente) {
      existente.Cantidad += cantidad;
    } else {
      carrito.push({
        PROD_ID: parseInt(producto.PROD_ID),
        PROD_NOMBRE: producto.PROD_NOMBRE,
        PROD_PRECIO: precio,
        PROD_IMG: producto.PROD_IMG,
        Cantidad: cantidad
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "../Carrito/Index.html";
  };
});

