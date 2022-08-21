let PRODRUCTS_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";


function MostrarListaProductos(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];
        htmlContentToAppend += `
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("lista-autos").innerHTML += htmlContentToAppend;
    }






document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODRUCTS_AUTOS).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            console.log(currentProductsArray.length)
            MostrarListaProductos()
        }
    });
})