
const boton = document.getElementById("ingresar");

boton.addEventListener("click", () => {
    if (
        mail.value.trim("") !== "" &&
        password.value.trim("") !== ""
    ) {
        alert("Datos correctos");
        window.location.href = "portada.html"
    }
    else {
        alert("Verifique los campos")
    }
})