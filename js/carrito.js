document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const usuario = localStorage.getItem("usuario");
  const contenedor = document.getElementById("contenedorCarrito");
  const opcionesPago = document.getElementById("opcionesPago");

  function renderCarrito() {
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      contenedor.innerHTML = `
        <div class="alert alert-info text-center">
          🛒 Tu carrito está vacío. ¡Agrega productos desde el catálogo!
        </div>
      `;
      opcionesPago.innerHTML = "";
      return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
      const cantidad = item.CANTIDAD || 0;
      const precio = item.PROD_PRECIO || 0;
      const subtotal = precio * cantidad;
      total += subtotal;

      const card = document.createElement("div");
      card.className = "card mb-3 shadow-sm p-3 d-flex flex-md-row flex-column align-items-center card-producto";
      card.innerHTML = `
        <div class="text-center me-md-4 mb-3 mb-md-0">
          <img src="${item.PROD_IMG}" alt="${item.PROD_NOMBRE}" class="img-fluid rounded" style="max-width: 180px; max-height: 180px; object-fit: contain;" />
        </div>
        <div class="flex-grow-1">
          <h5 class="fw-bold">${item.PROD_NOMBRE}</h5>
          <p class="mb-1">Precio: $${precio.toFixed(2)}</p>
          <div class="d-flex align-items-center mb-2">
            <label class="me-2 fw-bold">Cantidad:</label>
            <button class="btn btn-outline-danger btn-sm btn-cantidad" onclick="modificarCantidad(${index}, -1)">-</button>
            <span class="mx-2">${cantidad}</span>
            <button class="btn btn-outline-success btn-sm btn-cantidad" onclick="modificarCantidad(${index}, 1)">+</button>
          </div>
          <p class="fw-bold mb-2">Subtotal: $${subtotal.toFixed(2)}</p>
          <button class="btn btn-outline-secondary btn-sm" onclick="eliminarProducto(${index})">🗑 Eliminar</button>
        </div>
      `;
      contenedor.appendChild(card);
    });

    opcionesPago.innerHTML = `
      <h4 class="precio-total mt-4 text-end">Total: $${total.toFixed(2)}</h4>
      ${
        usuario
          ? '<button class="btn btn-success fw-semibold mt-3" onclick="pagar()">💳 Pagar</button>'
          : '<a href="../Cuenta/Login.html" class="btn btn-warning fw-semibold mt-3">🔐 Inicia sesión para pagar</a>'
      }
    `;
  }

  window.modificarCantidad = (index, cambio) => {
    carrito[index].CANTIDAD += cambio;
    if (carrito[index].CANTIDAD <= 0) {
      carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  };

  window.eliminarProducto = (index) => {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  };

  window.pagar = () => {
    if (!carrito.length) {
      alert("❗ No tienes productos en el carrito.");
      return;
    }

    const total = carrito.reduce((sum, p) => sum + p.PROD_PRECIO * p.CANTIDAD, 0);
    const iva = total * 0.12;
    const totalConIva = total + iva;

    alert(`✅ ¡Gracias por tu compra!\n\nSubtotal: $${total.toFixed(2)}\nIVA (12%): $${iva.toFixed(2)}\nTotal: $${totalConIva.toFixed(2)}`);
    localStorage.removeItem("carrito");

    setTimeout(() => {
      window.location.href = "../Productos/Index.html";
    }, 1000);
  };

  renderCarrito();
});
