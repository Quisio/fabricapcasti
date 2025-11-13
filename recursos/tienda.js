// tienda.js

// tienda.js

// Espera que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".btn-agregar");

  // 🧱 Crear contenedor para los mensajes flotantes
  const contenedorMensajes = document.createElement("div");
  contenedorMensajes.classList.add("mensajes-flotantes");
  document.body.appendChild(contenedorMensajes);

  // ⚙️ Función para mostrar mensaje
  function mostrarMensaje(texto, tipo = "exito") {
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje", tipo);
    mensaje.textContent = texto;
    contenedorMensajes.appendChild(mensaje);

    // Desaparece después de 2.5 segundos
    setTimeout(() => {
      mensaje.classList.add("oculto");
      setTimeout(() => mensaje.remove(), 300);
    }, 2500);
  }

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const producto = boton.closest(".producto");
      const nombre = producto.querySelector("h2").textContent;
      const precioTexto = producto.querySelector(".precio").textContent.replace("$", "").replace(".", "").trim();
      const precio = parseFloat(precioTexto);
      const talleSelect = producto.querySelector("select[id*='talle']");
      const punteraSelect = producto.querySelector("select[id*='puntera']");
      const talle = talleSelect ? talleSelect.value : "—";
      const puntera = punteraSelect ? punteraSelect.value : "—";

      // 🔍 Validaciones
      if (talleSelect && talle === "") {
        mostrarMensaje("Seleccioná un talle antes de agregar.", "error");
        return;
      }

      if (punteraSelect && puntera === "") {
        mostrarMensaje("Seleccioná una puntera antes de agregar.", "error");
        return;
      }

      // 🛒 Crear objeto producto
      const item = { nombre, talle, puntera, precio, cantidad: 1 };

      // Obtener carrito guardado
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      // Verificar si el producto ya existe
      const existente = carrito.find(
        (p) => p.nombre === item.nombre && p.talle === item.talle && p.puntera === item.puntera
      );

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push(item);
      }

      // Guardar en localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarMensaje(`${nombre} agregado al carrito ✅`, "exito");
    });
  });
});
