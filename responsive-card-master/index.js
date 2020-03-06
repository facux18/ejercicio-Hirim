/*Esta funcion convierte el precio en un input editable*/
function editarInputPrecio() {
  const input = document.getElementById("input-precio");
  const h2 = document.getElementById("precio");

  input.value = h2.textContent.split('.').join("");
  input.style.display = "initial";
  h2.style.display = "none";
  input.focus();
}

/*Esta funcion agrega puntos a un numero para darle formato. Ej: 10000 => 10.000 */
function formatearNumero(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/*Funcion para calcular el precio por m2 y colocarlo en el elemento html correspondiente */
function actualizarPrecioPorMetro(precio){
    const small = document.getElementById("precio-metro");
    const metros = Number.parseFloat(document.getElementById("metros-cuadrados").textContent.split('.').join(""));

    let precioPorMetro = Math.ceil(precio/metros);

    small.innerHTML = '$/m'+'2'.sup()+' '+formatearNumero(precioPorMetro);
}

/* Esta funcion cambia el contenido del elemento h2 que contiene el precio y actualiza el precio por m2 */
function setNuevoPrecio(precio){
  const h2 = document.getElementById("precio");

  h2.textContent = formatearNumero(precio);
  actualizarPrecioPorMetro(precio);
}

/*Funcion que valida cada tecla que se pulsa en el input del precio */
function validarInput(e) {
  const input = document.getElementById("input-precio");
  const h2 = document.getElementById("precio");

  const charCode = e.keyCode;

  /* Este if verifica que se ingresen solo numeros o teclas especiales (del, sup, enter, etc) */
  if (charCode > 31 && (charCode < 48 || charCode > 57)) 
    return false;

  /*COn este condicional se maneja la accion de la tecla enter*/
  if (charCode === 13) {
    input.style.display = "none";
    h2.style.display = "initial";

    localStorage.setItem('precio', input.value.split('.').join(""));
    setNuevoPrecio(input.value)

    input.value = '';
  }
  return true;
}

/* Funcion para poner o quitar el "Me Gusta" */
function toggleLike(sender){
    
    sender.classList.toggle("active");
    localStorage.setItem('liked', sender.classList.contains('active'));

}

/* Recuperar LocalStorage al cargar la apgina */
document.addEventListener('DOMContentLoaded', () => {
    likeButton = document.getElementById('like');

    localStorage.getItem('liked') === "true" && likeButton.classList.add('active');
    !isNaN(localStorage.getItem('precio')) && setNuevoPrecio(localStorage.getItem('precio'));
})

/* Slider */

/*Funcion apra avanzar en el slider */
function next(){
            
  const slider = document.getElementById('contenedor');
  slider.scrollTo(slider.scrollLeft + slider.clientWidth, 0);
  const dotsList = document.getElementById('dots');
  
  const index = Math.round(slider.scrollLeft/slider.clientWidth) + 1;
  const maxIndex = dotsList.children.length-1;

  /* verifica que el indice no sobrepase el maximo de nodos */
  if(index <= maxIndex){
    Array.from(dotsList.children).forEach(x => {
      x.classList.remove('active');
    })

    dotsList.children[index].classList.add('active');
  }
}

/*Funcion apra retroceder en el slider */
function prev(){
  
  const slider = document.getElementById('contenedor');
  slider.scrollTo(slider.scrollLeft - slider.clientWidth, 0);
  const dotsList = document.getElementById('dots');

  const index = Math.round(slider.scrollLeft/slider.clientWidth) - 1;

  /* verifica que el indice no sea inferior al primer nodo */
  if(index >= 0){
    Array.from(dotsList.children).forEach(x => {
      x.classList.remove('active');
    })

    dotsList.children[index].classList.add('active');
  }
}

/* funcion para agregar los circulos indicadores del segun la cantidad de fotos que hay */
document.addEventListener('DOMContentLoaded', () => {
  
  const dotsList = document.getElementById('dots');
  const slider = document.getElementById('contenedor');

  Array.from(slider.children).forEach(x => {
    if(dotsList.children.length === 0){
      dotsList.innerHTML += `<li class="dot active"></li>`
    }else{
      dotsList.innerHTML += `<li class="dot"></li>`
    }
  })
})

/* funcion para abrir el modal */
function abrirModal(){
  const modal = document.getElementById('modal');

  modal.classList.add('visible');

}

//funcion para cerrar el modal
function cerrarModal(){
  const modal = document.getElementById('modal');

  modal.classList.remove('visible');

}

/* chequear si lo ingresado es un email */
function isEmail(value){

  const patron = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  return value.match(patron)

}

function checkInput(input){

  const mensaje =  document.getElementById('mensaje');

  if(isEmail(input.value) || input.value === ''){
    input.classList.remove('invalid');
    mensaje.classList.remove('visible');
  }else{
    input.classList.add('invalid');
    mensaje.classList.add('visible');
  }

}

/* simular envio del mensaje */
function enviar(){

  const input = document.getElementById('input-email');
  const mensaje =  document.getElementById('mensaje');


  if(isEmail(input.value)){
    const modal = document.getElementById('modal').children[0];
    modal.innerHTML = `<button onclick='cerrarModal()' class="close" type="button">
                        <i class="fas fa-times-circle"></i>
                      </button>
                      <span>Gracias por ponerse en contacto!</span>`;
    }else{
      input.classList.add('invalid');
      mensaje.classList.add('visible');
    }

}