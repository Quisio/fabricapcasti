function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  if (!contador) return; // si no hay contador en esta página, no hace nada

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  contador.textContent = totalItems;
}

// 🚀 Ejecutar automáticamente cuando se carga la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

// 🔍 MODAL DE ZOOM PARA IMÁGENES DE PRODUCTOS
// Este código crea una ventana emergente que muestra las imágenes ampliadas
document.addEventListener("DOMContentLoaded", () => {
  
  // Verificar si el modal ya existe para no crearlo dos veces
  if (!document.querySelector(".modal-zoom")) {
    
    // 1️⃣ CREAR EL MODAL DINÁMICAMENTE
    // createElement: crea un nuevo elemento HTML <div>
    const modal = document.createElement("div");
    modal.className = "modal-zoom"; // Asigna la clase CSS
    
    // innerHTML: define el contenido HTML del modal
    // &times; = símbolo X para cerrar
    // <img> vacía que luego se llenará con la imagen clickeada
    modal.innerHTML = `
      <span class="modal-close">&times;</span>
      <img src="" alt="Imagen ampliada">
    `;
    
    // appendChild: agrega el modal al final del <body>
    document.body.appendChild(modal);

    // 2️⃣ OBTENER REFERENCIAS A LOS ELEMENTOS DEL MODAL
    // modalImg: la imagen que se mostrará ampliada
    // closeBtn: el botón X para cerrar
    const modalImg = modal.querySelector("img");
    const closeBtn = modal.querySelector(".modal-close");

    // 3️⃣ ABRIR MODAL AL HACER CLIC EN IMÁGENES DE PRODUCTOS
    // addEventListener: escucha todos los clicks en el documento
    document.addEventListener("click", (e) => {
      // Verifica si el elemento clickeado tiene la clase "producto-img-zoom"
      if (e.target.classList.contains("producto-img-zoom")) {
        // dataset.src: obtiene el atributo data-src de la imagen
        // || e.target.src: si no existe data-src, usa el src normal
        const imgSrc = e.target.dataset.src || e.target.src;
        
        // Asigna la imagen al modal
        modalImg.src = imgSrc;
        
        // classList.add("active"): muestra el modal (display: flex)
        modal.classList.add("active");
        
        // Evita que el usuario haga scroll mientras el modal está abierto
        document.body.style.overflow = "hidden";
      }
    });

    // 4️⃣ CERRAR MODAL AL HACER CLIC EN LA X
    closeBtn.addEventListener("click", () => {
      // classList.remove("active"): oculta el modal (display: none)
      modal.classList.remove("active");
      
      // Restaura el scroll de la página
      document.body.style.overflow = "";
    });

    // 5️⃣ CERRAR MODAL AL HACER CLIC FUERA DE LA IMAGEN
    // (en el fondo oscuro)
    modal.addEventListener("click", (e) => {
      // e.target === modal: verifica que el click fue en el fondo, no en la imagen
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // 6️⃣ CERRAR MODAL CON LA TECLA ESCAPE (ESC)
    // keydown: detecta cuando se presiona una tecla
    document.addEventListener("keydown", (e) => {
      // e.key === "Escape": verifica si la tecla es ESC
      // && modal.classList.contains("active"): verifica que el modal esté abierto
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
});

// 🝔 Menú hamburguesa - Mostrar/Ocultar menú en móviles
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
