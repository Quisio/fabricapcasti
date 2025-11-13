export function renderizarTiendaCalzado(calzado) {
  const $contenedor = document.getElementById("tienda-productos");
  $contenedor.innerHTML = ""; // limpiar

  let html = "";

  calzado.forEach((producto) => {
    // Generamos las opciones de talle dinámicamente
    const opcionesTalle = producto.talles
      .map((t) => `<option>${t}</option>`)
      .join("");

    // Si tiene punteras, agregamos el select
    const selectPuntera = producto.punteras
      ? `
        <label for="puntera-${producto.id}">Puntera:</label>
        <select id="puntera-${producto.id}" class="select-producto">
          <option value="">Seleccione</option>
          ${producto.punteras
            .map((p) => `<option>${p}</option>`)
            .join("")}
        </select>
      `
      : "";

    html += `
      <article class="producto tienda-productos">
        <div class="producto-imagen-container">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>

        <div class="producto-controles">
          <label for="talle-${producto.id}">Talle:</label>
          <select id="talle-${producto.id}" class="select-producto">
            <option value="">Seleccione</option>
            ${opcionesTalle}
          </select>

          ${selectPuntera}

          <button class="btn-agregar" data-id="${producto.id}">
            🛍️ Agregar al carrito
          </button>
        </div>
      </article>
    `;
  });

  $contenedor.innerHTML = html;
}
