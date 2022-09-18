
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
        numero= "0" + numero;
        return numero
    }
    else return numero
}

function mostrarNuevoComentario() {                                       //se encarga obtener los datos cuando hay 
    let cont_Coment = document.getElementById("comentario_usuario").value //una escucha de evento a traves del boton
    let usuario = localStorage.getItem("Nombre")                          //enviar y construye la etiqueta HTML 
    let hoy = new Date();
    console.log(agregarCero(hoy.getDate()))
    let hoy_mismo = `${hoy.getFullYear()}-${hoy.getMonth()}-${hoy.getDate()}`;
    hoy_mismo+=` ${agregarCero(hoy.getHours())}:${agregarCero(hoy.getMinutes())}:${agregarCero(hoy.getSeconds())}`
    console.log(hoy_mismo)
    let puntuacion = document.getElementById("puntuacion").value
    let html_New_Coment = ""
    if (cont_Coment !== "" && puntuacion !== "0") {
        html_New_Coment = `<div class="container">
                    <li class="list-group-item">${usuario}-${hoy_mismo}-${EstrellasProducts(puntuacion)}<br>
                    ${cont_Coment}</li>
                    </div>`
        document.getElementById("product-info-list-container").innerHTML += html_New_Coment;
    }
}

function elegirMiniaturaAMostrar(array) {
    for (i=0; i<array.length; i++){
        document.getElementsByClassName("miniaturas")[i].addEventListener('click', ()=> {
            llevarAPrincipal(array[i])
        })
    }}

function llevarAPrincipal(url_img){
    let cambiarImg=`<img src="${url_img}">`
    document.getElementById("principal").innerHTML=cambiarImg;
}

function MostrarMiniaturas(arrayImages) { //se encarga de crear etiquetas img a medida que recorre el arreglo de las imagenes del producto
    let miniImages = "";
    for (i = 0; i < arrayImages.length; i++) {
        let mini = arrayImages[i];
        miniImages += `<img class="otrasImg"src="${mini}" onclick="llevarAPrincipal(${mini})">`
    }
    return miniImages
};


function MostrarInfoProductos() { //muestra toda la info del producto, con sus imagenes, descripcion, y comentarios. 
    let htmlContentToAppend = "";
    let htmlComentarios = "";
    let informacion = INFO_PRODUCTS;
    let comentarios = COMENT_PRODUCT;
    htmlContentToAppend += `
<div>
  <div class="product-info"> 
  <div class="miniatura">
  ${MostrarMiniaturas(informacion.images)}
  </div>
  <div id="pricipal" class="principal">
  <img id="imagen-principal"src="${informacion.images[0]}">
  </div>
  <div class="accionSobreProduct">
  <p class="card-text">${informacion.name}<br>${informacion.currency} ${informacion.cost}<br>${informacion.soldCount} vendidos.</p>
    <p class="card-text">${informacion.description}.</p>
    <button class="comprar">Comprar</button><br><button class="agregarCarrito">Agregar al carrito</button>
  </div>
  </div>
</div> `
    document.getElementById("product-info-list-container").innerHTML = htmlContentToAppend;

    for (i = 0; i < comentarios.length; i++) { //recorrer el arrgelo de comentarios e ir mostrandolos en pantalla
        let contenido = comentarios[i];
        console.log(comentarios.length)
        htmlComentarios = `
             <div class="container coment">
             <li class="list-group-item">${contenido.user}-${contenido.dateTime}-${EstrellasProducts(contenido.score)}<br>
             ${contenido.description}</li>
             </div>
             `
        document.getElementById("product-info-list-container").innerHTML += htmlComentarios;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    let ID_PRODUCT = localStorage.getItem('prodID') + EXT_TYPE;
    getJSONData(PRODUCT_INFO_URL + ID_PRODUCT).then(function (resultObj) {
        if (resultObj.status === "ok") {
            INFO_PRODUCTS = resultObj.data
            console.log(resultObj)
            console.log(INFO_PRODUCTS)
            getJSONData(PRODUCT_INFO_COMMENTS_URL + ID_PRODUCT).then(function (resultObj) { //consulta a url con comentarios de los productos
                if (resultObj.status === "ok") {
                    COMENT_PRODUCT = resultObj.data
                    console.log(COMENT_PRODUCT)
                    MostrarInfoProductos(INFO_PRODUCTS, COMENT_PRODUCT)  //se cargan los 2 arreglos a la funcion
                }                                                        //el producto a mostrar y los comentarios sobre el mismo
                Enviar_Coment.addEventListener("click", () => {
                    mostrarNuevoComentario();
                })
            })
        }
    })

})