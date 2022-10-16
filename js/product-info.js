
let INFO_PRODUCTS = []
let COMENT_PRODUCT = []
let Enviar_Coment = document.getElementById("enviar_coment")

function EstrellasProducts(score) {   //toma el valor de la calificacion del producto y lo transforma en etiquetas
  let Star_Check = ""               //HTML con forma de estrella :)
  let Star_No_Check = ""
  for (j = 0; j < score; j++) {
    Star_Check += `<span class="fa fa-star checked"></span>`
  }
  for (k = score; k < 5; k++) {
    Star_No_Check += `<span class="fa fa-star"></span>`
  }
  return Star_Check + Star_No_Check;
}

function agregarCero(numero) {
  if (numero < 10) {
    numero = "0" + numero;
    return numero
  }
  else return numero
}

function mostrarNuevoComentario() {                                       //se encarga obtener los datos cuando hay 
  let cont_Coment = document.getElementById("comentario_usuario").value //una escucha de evento a traves del boton
  let usuario = localStorage.getItem("Nombre")                          //enviar y construye la etiqueta HTML 
  let hoy = new Date();
  console.log(agregarCero(hoy.getDate()))
  let hoy_mismo = `${hoy.getFullYear()}-${agregarCero(hoy.getMonth())}-${hoy.getDate()}`;
  hoy_mismo += ` ${agregarCero(hoy.getHours())}:${agregarCero(hoy.getMinutes())}:${agregarCero(hoy.getSeconds())}`
  console.log(hoy_mismo)
  let puntuacion = document.getElementById("puntuacion").value
  let html_New_Coment = ""
  if (cont_Coment !== "" && puntuacion !== "0") {
    html_New_Coment = `<div class="opinion-de-usuarios">
                    <li class="list-group-item">${usuario}-${hoy_mismo}-${EstrellasProducts(puntuacion)}<br>
                    <p class="reseña">${cont_Coment}</p></li>
                    </div>`
    document.getElementById("coment-info-list-container").innerHTML += html_New_Coment;
  }
}



function MostrarMiniaturas(arrayImages) { //se encarga de crear etiquetas img a medida que recorre el arreglo de las imagenes del producto
  let miniImages = "";
  for (i = 0; i < arrayImages.length; i++) {
    let mini = arrayImages[i];
    miniImages += `<img class="d-block img-thumbnail rounded p-0 m-1" src="${mini}" onmouseover=llevarAPrincipal("${mini}")>`
  }
  return miniImages
};

function llevarAPrincipal(imagen) { //lleva una de las miniaturas hacia la imagen principal del producto
  let cambiarImg = `<img id="imagen-principal" src="${imagen}">`;
  document.getElementById("principal").innerHTML = cambiarImg;
}

function crearSlides(array) { //crea las etiquetas para mostrar los productos relacionados en el carrousel
  let slides = "";
  for (i = 1; i < array.length; i++) {
    slides = `<div class="carousel-item" onclick=setProdID(${array[i].id})>
    <div class="card">
      <img class="img-thumbnail" src="${array[i].image}" alt="${array[i].name}">
      <div class="card-text">
        <p class="text-center">${array[i].name}</p>
      </div>
    </div>
  </div>`
  }
  return slides
}

function relatedProducts(arrayRel) { //se encarga de crear el carrousel y su primer imagen activa
  let htmlRelacionados = "";
  let i = 0;
  let relacionado = arrayRel[i];
  htmlRelacionados = `
    <div class= "card-body rounded bg-light">
    <h5 class="text-center">Promocionados</h5>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div id="acaVan" class="carousel-inner">
      <div class="carousel-item active" onclick=setProdID(${relacionado.id})>
      <div class="card">
      <img class="img-thumbnail" src="${relacionado.image}" alt="${relacionado.name}">
      <div class="card-text">
        <p class="text-center">${relacionado.name}</p>
      </div>
    </div>
      </div>
      ${crearSlides(arrayRel)}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>`
  document.getElementById("relacionados").innerHTML += htmlRelacionados;
}

  
function LlevarAlCarrito(producto) {
  producto = {
    id: INFO_PRODUCTS.id,
    name : INFO_PRODUCTS.name,
    count: 1,
    unitCost: INFO_PRODUCTS.cost,
    currency: INFO_PRODUCTS.currency,
    image: INFO_PRODUCTS.images[0]
  }
  productos_carrito = localStorage.getItem('Carrito_Compras')
  productos_carrito = JSON.parse(productos_carrito)
  if (productos_carrito.find( x => x.id===producto.id)){
   let nuevo_Carro= productos_carrito.map(x => x.id===producto.id
    ? ({
      ...x,
      count : x.count + 1
    })
    : x)
    console.log({nuevo_Carro})
    localStorage.setItem('Carrito_Compras', JSON.stringify(nuevo_Carro))
    window.location="cart.html"
    return ({productos_carrito : nuevo_Carro})
  }
  else {
    productos_carrito.push(producto)
    localStorage.setItem('Carrito_Compras', JSON.stringify(productos_carrito))
    window.location="cart.html"
  }
  
}



function MostrarInfoProductos() { //muestra toda la info del producto, con sus imagenes, descripcion, y comentarios. 
  let htmlContentToAppend = "";
  let informacion = INFO_PRODUCTS;
  let comentarios = COMENT_PRODUCT;
  let htmlComentarios = `<div class="ingresar-comentario">
    <p class="invitacion-a-comentar">Nos interesa tu comentario</p>
    <textarea class="comentario-usuario" id="comentario_usuario"></textarea>
    <select id="puntuacion"class="puntuacion">
    <option value="0" selected>Tú puntuación</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select><br>
    <button id="enviar_coment" class="enviar-coment" onclick=mostrarNuevoComentario();>Enviar</button>      
  </div>`;

  htmlContentToAppend += `
  <div class="product-info"> 
  <div id="miniatura">
  ${MostrarMiniaturas(informacion.images)}
  </div>
  <div id="principal" class="principal">
  <img id="imagen-principal"src="${informacion.images[0]}">
  </div>
  <div class="info-product-related-product">
  <div class="accionSobreProduct">
  <div class="tamaño-info-product">
  <h2 class="text-center">${informacion.name}<br>${informacion.currency} ${informacion.cost}</h2><br>
  <p class="text-center">${informacion.soldCount} vendidos.</p>
    <p class="text-center">${informacion.description}.</p>
    </div>
    <div class="btn-accion-product">
    <button class="comprar">Comprar</button><br><button id="agregar_carrito" class="agregarCarrito">Agregar al carrito</button>
    </div>
    </div>
    <div id="relacionados"class="container">
      <div id="acaVan" class="carousel-item active"></div>
    </div>
    </div>
  </div>`
  document.getElementById("product-info-list-container").innerHTML = htmlContentToAppend;

  for (i = 0; i < comentarios.length; i++) { //recorrer el arrgelo de comentarios e ir mostrandolos en pantalla
    let contenido = comentarios[i];
    console.log(comentarios.length)
    htmlComentarios += `
             <div class="opinion-de-usuarios">
             <li class="list-group-item">${contenido.user}-${contenido.dateTime}-${EstrellasProducts(contenido.score)}<br>
             <p class="reseña">${contenido.description}</p></li>
             </div>
             `
  }
  document.getElementById("coment-info-list-container").innerHTML += htmlComentarios;
  relatedProducts(informacion.relatedProducts)
};


document.addEventListener("DOMContentLoaded", function () {
  let ID_PRODUCT = localStorage.getItem('prodID') + EXT_TYPE;
  getJSONData(PRODUCT_INFO_URL + ID_PRODUCT).then(function (resultObj) {
    if (resultObj.status === "ok") {
      INFO_PRODUCTS = resultObj.data
      getJSONData(PRODUCT_INFO_COMMENTS_URL + ID_PRODUCT).then(function (resultObj) { //consulta a url con comentarios de los productos
        if (resultObj.status === "ok") {
          COMENT_PRODUCT = resultObj.data;
          MostrarInfoProductos(INFO_PRODUCTS, COMENT_PRODUCT)   //se cargan los 2 arreglos a la funcion
          //el producto a mostrar y los comentarios sobre el mismo
          document.getElementById("agregar_carrito").addEventListener("click", function () {
            LlevarAlCarrito(INFO_PRODUCTS)
          });
        }
      })
    }
  })

})