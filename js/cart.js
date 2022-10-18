
function ModificarSubTotal(subindice) {
  /* Toma el valor del indice del array del carrito para acceder a sus propiedades y asi hacer la operacion
  matematica para obtener el subtotal, guardarlo en LS y modificarlo en tiempo real en el html a traves de oninput. */
  let cantidad = Math.round(document.getElementById(subindice).value)
  let SubTotal = document.getElementById(productos_carrito[subindice].id + "|" + subindice);
  console.log(cantidad)
  productos_carrito[subindice].count=cantidad;
  localStorage.setItem('Carrito_Compras', JSON.stringify(productos_carrito))
  SubTotal.innerHTML = productos_carrito[subindice].currency + " " + cantidad * productos_carrito[subindice].unitCost
}

function eliminarProdcucto(subindice) {
   productos_carrito.splice(subindice,1);
   localStorage.setItem("Carrito_Compras", JSON.stringify(productos_carrito))
   window.location="cart.html"
}


function MostrarCarrito(carrito) {
  console.log(carrito)
  for (i = 0; i < carrito.length; i++) {
    let producto = carrito[i]
    let htmlArtCarrito = `
      <div class="container mb-4 bg-white rounded" id="${producto.id}">
        <div class="row">
         <div class="col-sm-6 col-md-6 col-lg-3">
           <img class="img-thumbnail  align-middle" src="${producto.image}">
          </div>
          <div class="col-sm-6 col-md-6 col-lg-9 ml-3">
            <div class="row my-2">
             <h4 class="col-sm-12 text-center"> ${producto.name}
             </h4>           
            </div>
            <div class="row border-bottom align-items-center">
              <p class="col-sm-6 text-start my-2 col-6"> Costo:
              </p>
              <p class="col-sm-6 text-end my-2 col-6"> ${producto.currency} ${producto.unitCost}
              </p>
            </div>
            <div class="row border-bottom align-items-center">
             <p class="col-9 col-sm-9 col-lg-11 text-start my-2"> Cantidad:</p>
             <label class="col-3 col-sm-3 col-lg-1 justify-content-md-end"> 
             <input id="${i}" min="1" class="start-100 rounded w-75 h-50 border border-primary text-center" type="number" value="${producto.count}" oninput="ModificarSubTotal(${i})">
             </label> 
            </div>
            <div class="row border-bottom align-items-center mb-2">
              <p class="col-6 col-sm-6 text-start my-2"> Subtotal:
              </p>
              <p id="${producto.id}|${i}" class="col-6 col-sm-6 text-start text-end my-2">${producto.currency} ${producto.unitCost * producto.count} 
              </p>
            </div>
            <div class="row mb-2">
             <div class="d-grid gap-2 d-md-flex justify-content-md-end">
               <button class="btn btn-primary me-md-2" type="button">Ver producto</button>
               <button class="btn btn-primary" type="button" onclick="eliminarProdcucto(${i})">Eliminar</button>
             </div>
            </div>
          </div>
        </div>
      </div>

    `
    document.getElementById("carrito").innerHTML += htmlArtCarrito;
  }

  let htmlArticulos=`${productos_carrito.length}`
  document.getElementById("articulos").innerHTML= htmlArticulos;

  let htmlEnvio = `
        <div class="container rounded bg-white my-2">
        <h3 class="text-center my-4">Tipo de envío</h3>
          <div class="row border-bottom pb-2">
           <div class="col-sm-12 col-md-12 col-lg-12">
            <input type="checkbox">
            <label class="text-end">Premium 2 a 5 días (15%)</label>
           </div>
           <div class="col-sm-12 col-md-12 col-lg-12">
            <input type="checkbox">
            <label>Express 5 a 8 días (7%)</label>
           </div>
           <div class="col-sm-12 col-md-12 col-lg-12">
            <input type="checkbox">
            <label>Standard 12 a 15 días(5%)</label>
           </div>
          </div>
          <div class="row">
            <h3 class="text-center my-4">Dirección de envío</h3>
          </div>
          <div class="row">
            <div class="col-md-6 mb-4">
               <p class="h6 d-block text-muted m-0">Calle</p>
               <input id="calle" class="w-100 rounded border border-primary bg-dark text-light" type="text" name="calle">
            </div>
            <div class="col-md-6 mb-4">
               <p class="h6 d-block text-muted m-0">Número</p>
               <input id="numero" class="w-100 rounded border border-primary bg-dark text-light" type="text" name="numero">
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-4">
              <p class="h6 d-block text-muted m-0">Esquina</p>
              <input id="esquina" class="w-100 rounded border border-primary bg-dark text-light" type="text" name="esquina">
            </div>
          </div>  
        </div>
       `
  document.getElementById("envio").innerHTML += htmlEnvio;
}


document.addEventListener("DOMContentLoaded", function () {
  productos_carrito = localStorage.getItem('Carrito_Compras')
  productos_carrito = JSON.parse([productos_carrito])
  MostrarCarrito(productos_carrito);
})
