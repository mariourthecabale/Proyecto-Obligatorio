
const boton = document.getElementById("verificar");
const botonSignIn = document.getElementById("IngresarGoogle");
const botonSignOut = document.getElementById("salir");

boton.addEventListener("click", () => {

    let usuario= document.getElementById("usuario").value;
    let contraseña= document.getElementById("password").value;
    let valido = true;

    if (usuario.trim()=="") {
        valido= false
        alert("Ingrese usuario")
    }
    if (contraseña.trim()=="") {
        valido=false
        alert("Ingrese contraseña")
        }
    if (valido) {
        window.location.href="portada.html"
    }
    });

function decodificador (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    /* Toma la decodificacion y lee sus propiedades */
function handleCredentialResponse(response) {
    const responsePayload = decodificador(response.credential);

/* Usar como guia para mostrar al usuario en pantalla */
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    if (responsePayload.name!="") {
        window.location.href= "portada.html";
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

