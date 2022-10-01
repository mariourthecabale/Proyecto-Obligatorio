
let Nombre_Producto = "";
let max = undefined;
let min = undefined;
const ASC_BY_COST= "MENOR-MAYOR";
const DESC_BY_COST= "MAYOR-MENOR";
const RELEVANCIA = "MAS_VENDIDOS";
let currentProductsArray = [];
let currentSortCriteria = undefined;
console.log(min)
let btnFiltrar=document.getElementById("FiltroPrecio")
let btnLimpiar= document.getElementById("LimpiarFiltrosPrecio")
let btnRel=document.getElementById("Count")
let btnAsc=  document.getElementById("Asc")
let btnDesc= document.getElementById("Desc")
let btnBusc= document.getElementById("buscador")
let buscar= ""



function MostrarListaProductos() {
    let htmlContentToAppend = "";
    let cabecera = "";
    cabecera = `
    <p class="lead">Verás aquí todos los productos de la categoría ${Nombre_Producto}.</p>` 

    for (let i = 0; i < currentProductsArray.length; i++) { 
        
        let products = currentProductsArray[i]; 
        let precio = parseInt(products.cost);
        let concat = products.name + products.currency + products.cost + products.description
        
        if ( !(precio<min) && !(precio>max)) {
                if (buscar==undefined || buscar=="" || (concat.toLowerCase().includes(buscar, 0))) {

               

                htmlContentToAppend += `
        <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
     </div>    
            `
    }}
    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}   document.getElementById("cabecera").innerHTML = cabecera; 
}

function sortProducts(criterio,array) {   //Ordena los productos segun el criterio que se pase a traves de los botones.
    let result = []
        if(criterio===ASC_BY_COST) {                 //Orden de menor a mayor
        result=array.sort(function(a,b) {            
            if(a.cost < b.cost){return -1;}
            if(a.cost > b.cost){return 1;}
            return 0
        });
    }else if (criterio===DESC_BY_COST){       //Orden de mayor a menor
        result=array.sort(function(a,b) {
            if(a.cost > b.cost){return -1;}
            if(a.cost < b.cost){return 1;}
            return 0
    });
    }else if (criterio===RELEVANCIA){        //Orden segun articulos vendidos
        result=array.sort(function(a,b){
            if ( a.soldCount < b.soldCount){ return 1;}
            if (a.soldCount > b.soldCount){return -1;}
            return 0
        });
        }
    return result
 }  
 function ordenarYMostrarProductos(criterio, productsArray){
    currentSortCriteria = criterio;

    if(currentProductsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Se muestran los productos ordenados segun el criterio de clasificacion.
    MostrarListaProductos(currentProductsArray);
}


document.addEventListener("DOMContentLoaded", function (e) {
    let ID = localStorage.getItem('catID') + EXT_TYPE;
    console.log(ID);
    console.log(PRODUCTS_URL + ID)
    getJSONData(PRODUCTS_URL + ID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products
            Nombre_Producto = resultObj.data.catName
            console.log(currentProductsArray)
            console.log(resultObj.data.catName)        
            MostrarListaProductos() 
        }
    });

    btnFiltrar.addEventListener("click", function() {
            min = document.getElementById("PrecioMinimo").value;
            console.log(min)
            max = document.getElementById("PrecioMaximo").value;
    
            if ((min != undefined) && (min != "") && (parseInt(min)) >= 0){
                min = parseInt(min);
            }
            else{
                min = undefined;
            }
    
            if ((max != undefined) && (max != "") && (parseInt(max)) >= 0){
                max = parseInt(max);
            }
            else{
                max = undefined;
            }
    
            MostrarListaProductos();
        });

        btnAsc.addEventListener("click", function () {
            console.log(document.getElementById("Asc"))
            console.log(sortProducts(ASC_BY_COST, currentProductsArray));
            ordenarYMostrarProductos(ASC_BY_COST, currentProductsArray);
        });
        btnDesc.addEventListener("click", function () {
            ordenarYMostrarProductos(DESC_BY_COST, currentProductsArray);
        });
        btnRel.addEventListener("click", function () {
            ordenarYMostrarProductos(RELEVANCIA, currentProductsArray);
        });
        console.log(document.getElementById("Asc"))

        btnLimpiar.addEventListener("click", ()=>{
            min = document.getElementById("PrecioMinimo").value =undefined
            max = document.getElementById("PrecioMaximo").value = undefined
            MostrarListaProductos()
        });

        btnBusc.addEventListener("input", function () {
            buscar = btnBusc.value.toLowerCase();
            MostrarListaProductos()
        });
  });