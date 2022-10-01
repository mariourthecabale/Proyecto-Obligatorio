const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}

function borrarDatosUsuario() {
  localStorage.setItem('Nombre', "");
  localStorage.setItem('Imagen', "")
}

function mostrarUsuario() {
  let htmlContentToAppend = "";
  let imagen = localStorage.getItem('Imagen');
  let nombre = localStorage.getItem('Nombre');
  htmlContentToAppend = `<ul class="navbar-nav w-100 justify-content-between">
  <li class="nav-item">
    <a class="nav-link" href="portada.html">Inicio</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="categories.html">Categorías</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="sell.html">Vender</a>
  </li>
  <li class="dropdown">
  <button class="dorpdown-btn" href="my-profile.html"><p class="dropdown-name">${nombre}<img class="imagen_usuario"src="${imagen}"></p>
  </button>
  <div class="dropdown-content text-center">
  <a href="cart.html">Mi carrito</a>
  <a href="my-profile.html">Mi perfil</a>
  <a href="index.html" onclick=borrarDatosUsuario()>Cerrar sesión</a>
  </div>
  </li>
  </li>
</ul>  `

  document.getElementById("navbarNav").innerHTML = htmlContentToAppend;
}
console.log(mostrarUsuario)

document.addEventListener("DOMContentLoaded", function () {
  mostrarUsuario();
});