let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const tablaCarrito = document.querySelector('#tablaCarrito tbody');
const totalCarrito = document.querySelector('#totalCarrito');
const btnVaciar = document.querySelector('#vaciarCarrito');
const btnPresupuesto = document.querySelector('#btnPresupuesto');

function renderizarCarrito() {
  tablaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const fila = `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.talle}</td>
        <td>${producto.puntera || '-'}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio.toLocaleString('es-AR')}</td>
        <td>$${subtotal.toLocaleString('es-AR')}</td>
        <td><button class="btn-eliminar" data-index="${index}">❌</button></td>
      </tr>`;
    tablaCarrito.innerHTML += fila;
  });

  totalCarrito.textContent = total.toLocaleString('es-AR');
}

// 🧹 Eliminar un producto
tablaCarrito.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
  }
});

// 🧺 Vaciar carrito
btnVaciar.addEventListener('click', () => {
  localStorage.removeItem('carrito');
  carrito = [];
  renderizarCarrito();
  actualizarContadorCarrito();
});

// 💬 Solicitar presupuesto por WhatsApp
btnPresupuesto.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  let mensaje = '¡Hola! Quiero solicitar un presupuesto por los siguientes productos:%0A';
  carrito.forEach(item => {
    mensaje += `• ${item.nombre} (Talle: ${item.talle}${item.puntera ? `, ${item.puntera}` : ''}) - Cant: ${item.cantidad} - $${item.precio.toLocaleString('es-AR')}%0A`;
  });
  mensaje += `%0A🔸 Total: $${totalCarrito.textContent}`;

  const url = `https://wa.me/5493516502531?text=${mensaje}`;
  window.open(url, '_blank');
});

// 🔢 Contador global
function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contador.textContent = totalItems;
}

// ✅ Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
  actualizarContadorCarrito();
});
