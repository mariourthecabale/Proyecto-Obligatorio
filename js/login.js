
const boton = document.getElementById("verificar");
let productos_carrito = {}
let producto_existente = []
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";

let getData = function (url) { //obtener carrito del servidor al iniciar cesion.
    let result = {};
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
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}

boton.addEventListener("click", function () {

    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("password").value;
    let valido = true;
    localStorage.setItem('Nombre', usuario)
    localStorage.setItem('Imagen', "img/img_perfil.jpg")
    localStorage.setItem('Carrito_Compras', JSON.stringify(productos_carrito));

    if (usuario.trim() == "") {
        valido = false
        alert("Ingrese usuario")
    }
    if (contraseña.trim() == "") {
        valido = false
        alert("Ingrese contraseña")
    }
    if (valido) {
        getData(CART_INFO_URL + "25801" + ".json").then(function (resultObj) {
            if (resultObj.status === "ok") {
                console.log(productos_carrito)
                producto_existente = resultObj.data.articles;
                localStorage.setItem('Carrito_Compras', JSON.stringify(producto_existente));
                window.location.href = "portada.html"
            }
        })
    }
})

function decodificador(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

/* Toma la decodificacion y lee sus propiedades */
function handleCredentialResponse(response) {
    const datos_usuario = decodificador(response.credential);

    /* Usar como guia para mostrar al usuario en pantalla */
    console.log("ID: " + datos_usuario.sub);
    console.log('Full Name: ' + datos_usuario.name);
    console.log('Given Name: ' + datos_usuario.given_name);
    console.log('Family Name: ' + datos_usuario.family_name);
    console.log("Image URL: " + datos_usuario.picture);
    console.log("Email: " + datos_usuario.email);
    localStorage.setItem('Nombre', datos_usuario.name)
    localStorage.setItem('Imagen', datos_usuario.picture)
    if (datos_usuario.name != "") {
        window.location.href = "portada.html";
    }
};

window.onload = function () {
    google.accounts.id.initialize({
        client_id: '859288457870-d8ren9b0lk5a79tf5lvbd5u4phtt2eai.apps.googleusercontent.com',
        callback: "handleCredentialResponse"
    })
    google.accounts.id.prompt()
};


/* $("#name").text(profile.getName());
$("#email").text(profile.getEmail());
$("#image").attr('src',profile.getImageUrl());
$(".data").css("display", "block");
$(".g-signin2").css("display", "none"); */


