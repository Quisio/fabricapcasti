function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  if (!contador) return; // si no hay contador en esta página, no hace nada

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  contador.textContent = totalItems;
}

// 🚀 Ejecutar automáticamente cuando se carga la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

// 🍔 Menú hamburguesa - Mostrar/Ocultar menú en móviles
document.addEventListener("DOMContentLoaded", () => {
  const menuIcono = document.querySelector(".menu-icono");
  const nav = document.querySelector(".cabecera-principal nav ul");

  if (menuIcono && nav) {
    // Función para ajustar el menú según el tamaño de pantalla, sin esto no se veia el menu cuando se redimensionaba
    function ajustarMenu() {
      if (window.innerWidth > 768) {
        // En pantallas grandes, quitar el estilo inline para que use el CSS
        nav.style.display = "";
      } else {
        // En móviles, asegurar que esté oculto si no hay estilo inline
        if (nav.style.display === "") {
          nav.style.display = "none";
        }
      }
    }

    // Ejecutar al cargar y al cambiar tamaño de ventana
    ajustarMenu();
    window.addEventListener("resize", ajustarMenu);

    menuIcono.addEventListener("click", () => {
      // Toggle: si el menú está visible lo oculta, si está oculto lo muestra
      if (nav.style.display === "flex") {
        nav.style.display = "none";
      } else {
        nav.style.display = "flex";
      }
    });

    // Cierra el menú al hacer clic en cualquier enlace del menú
    const enlaces = nav.querySelectorAll("a");
    enlaces.forEach(enlace => {
      enlace.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          nav.style.display = "none";
        }
      });
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener("click", (e) => {
      if (!menuIcono.contains(e.target) && !nav.contains(e.target)) {
        if (window.innerWidth <= 768) {
          nav.style.display = "none";
        }
      }
    });
  }
});