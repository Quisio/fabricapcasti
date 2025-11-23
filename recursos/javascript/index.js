import { renderizarTiendaCalzado } from './funciones.js';
import calzado from './calzado.js';
// Solo renderizar la tienda si el elemento existe (evita error en otras páginas)
const contenedorTienda = document.getElementById("tienda-productos");
if (contenedorTienda) {
  renderizarTiendaCalzado(calzado);
}

// 2️⃣ Escuchamos clics en el botón “Agregar al carrito”
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-agregar')) {
    const id = e.target.dataset.id;
    const producto = calzado.find(p => p.id == id);

    // Obtenemos los selects (talle y puntera)
    const talleSelect = document.getElementById(`talle-${id}`);
    const punteraSelect = document.getElementById(`puntera-${id}`);

    const talle = talleSelect?.value || "";
    const puntera = punteraSelect?.value || "";

    // Validamos que haya elegido talle
    if (talle === "") {
      alert("Por favor seleccioná un talle.");
      return;
    }

      //valida si tiene punteras.
    if (producto.punteras && puntera === "") {
      alert("Por favor seleccioná el tipo de puntera.");
      return;
    }

    // Creamos el objeto final para el carrito
   const productoCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio,
      talle,
      puntera: puntera || "N/A", // si no tiene puntera, se guarda N/A
      cantidad: 1
    };

    agregarAlCarrito(productoCarrito);
  }
});

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Buscamos si ya existe el mismo producto con igual talle y puntera
  const existente = carrito.find(item =>
    item.id === producto.id &&
    item.talle === producto.talle &&
    item.puntera === producto.puntera
  );

  //agrega cantidad si existe.
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert(`${producto.nombre} (Talle ${producto.talle}) agregado al carrito.`);
}

// 🔢 Actualiza el contador visual del carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contador.textContent = totalItems;
}

// 🟢 Llamamos al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

