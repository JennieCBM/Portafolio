

const grid = new Muuri(".grid", {
  rounding: false
});

window.addEventListener("load", ()=>{
  grid.refreshItems().layout();
  document.getElementById("grid").classList.add("imagenes-cargadas");
  //listener para filtrado por enlaces
  const enlaces = document.querySelectorAll("#categorias a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e)=>{
      e.preventDefault();
      enlaces.forEach((elemento) => elemento.classList.remove("activo"));
      e.target.classList.add("activo");

      const categoria = e.target.innerHTML.toLowerCase();
      categoria === "todos" ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
    });
  });

  //listener para barra de busqueda
  document.querySelector('#barra-busqueda').addEventListener('input', (e)=> {
    const busqueda = e.target.value;
    grid.filter( (item)=> item.getElement().dataset.etiquetas.includes(busqueda) );
  });
  //listener para las imagenes

  const overlay = document.getElementById('overlay');
  document.querySelectorAll('.grid .item img').forEach((imagen) => {
    imagen.addEventListener("click", ()=>{
      const ruta = imagen.getAttribute('src');
      const descripcion = imagen.parentNode.parentNode.dataset.descripcion;
      overlay.classList.add('active');
      document.querySelector('#overlay img').src = ruta;
      document.querySelector('#overlay .descripcion').innerHTML = descripcion;
    })
  });

  const boton = document.querySelector("#btn-cerrar-popup")
  boton.addEventListener("click", ()=>{
    overlay.classList.remove('active');
  });

  //addEventListener del overlay
  overlay.addEventListener("click", (e)=>{
    e.target.id === 'overlay' ? overlay.classList.remove("active") : '';
  });
});
