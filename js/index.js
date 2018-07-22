/*Autor="Antony Inga Atunga" */
/*Es la variable en donde se registran todas las caracteristicas y subcaracteristicas con sus conceptos */
var caracteristicas = [{
    nombre: "ETICA",
    identificador: "001",
    subcaracteristicas: [
        { nombre: "Principios que guían el comportamiento de un individuo, ayudándolo a discernir el bien del mal." },
        { nombre: "Varía de un individuo a otro y de una situación a otra." },
        { nombre: "Son abstractos, dependen del contexto" },
        { nombre: "Aceptación" },
        { nombre: "Compasión" }],


}, {
    nombre: "MORAL",
    identificador: "002",
    subcaracteristicas: [
        { nombre: "Costumbres de un grupo con respecto a lo que es correcto o incorrecto." },
        { nombre: "Creada por un colectivo" },
        { nombre: "Son concretos y no dependen de la situación." },
        { nombre: "Decir la verdad", },
        { nombre: "Vivir de acuerdo a la voluntad de dios" }],

}]
var template_carta = `<div class="card hoverable subCaracteristica">
<div class="front">

</div>
<div class="back">

</div>
Este es una carta
</div>`;
var icon = $("i#icon");
var colores = ["#69f0ae", "#69f0ae", "#18ffff", "#b388ff", "#ff8a80", "#ea80fc ", "#b0bec5", "#ffe57f"];
var instance;
$(document).ready(function () {
    var elem = $('.modal').modal();
    instance = M.Modal.getInstance(elem);

    caracteristicas.forEach(element => {
        templateCaracteristica(element.nombre, "#caracteristicas", colores[Math.round(Math.random() * colores.length - 1)], element.identificador)
        element.subcaracteristicas.forEach(subcaracteristicas => {
            templateSubCaracteristica(subcaracteristicas.nombre, "#subCaracteristicas", colores[Math.round(Math.random() * colores.length - 1)], Math.round(Math.random() * 50), element.identificador)
        })
    });
    $(".dragable").draggable({
        opacity: 0.70,
        cursor: "move",
        helper: "original",

    });
    $(".caracteristica").droppable({
        drop: function (event, ui) {
            comparacion($(this).attr("data-identificador"), $(ui.draggable).attr("data-identificador"), ui.draggable, this)
            ActivarModal();
        }
    });
    $(".card").tooltip({ show: { effect: "explode", duration: 500, delay: 700 }, position: { my: "left center", at: "right center" } });
})

/*Con este metodo se crea las subcaracteristicas*/
/* Nombre="Nombre de las subcaracteristica"
identificador=Identificador de la subcaracteristica que sirve para Jquey
colorFondo=Sera el background de la subcaracteristica
zindex=Indicara la posicion en el eje Z 
identificadorPadre=Cada subcaracteristica tiene identificador del padre que servira si esa subcaracteristica pertenece a la caracteristica
tooltip=texto informativo de la caracteristica*/
function templateSubCaracteristica(nombre, identificador, colorFondo, zindex, identificadorPadre) {
    let template = `<div class="card hoverable subCaracteristica dragable"  data-identificador=${identificadorPadre} style="background:${colorFondo};z-index:${zindex}">
<div class="front">
<h4> ${nombre}</h4> 
</div>

</div>`;
    $(identificador).append(template)
}
function ActivarModal() {
    let puntajePositivo = 0;
    let puntajeNegativo = 0;
    if ($("div#subCaracteristicas").children().length == 0) {
        puntajePositivo = parseInt($("p.acierto").find("strong").text())
        puntajeNegativo = parseInt($("p.fallido").find("strong").text())
        let strong = $("strong#nota_Obtenida");
        strong.text((puntajePositivo * 2)).css("color", (puntajePositivo > puntajeNegativo ? "green" : "red"));
        $("i#icon").html(puntajePositivo > puntajeNegativo ? "mood" : "mood_bad")
        $("a#resultado").css("display", "")
        Texto(puntajePositivo > puntajeNegativo)
        instance.open();
    }
}
function Texto(accion) {
    let parrafo = "QUE MAL!!! Sigue intentando";
    if (accion) {
        parrafo = "EN HORA BUENA!!! Lo lograste";
    }
    $("div.pensamiento").find("p").text(parrafo)
}
function comparacion(caracteristicaNumero, SubCaNumero, elementoDrag, elementoDrpp) {

    console.log(caracteristicaNumero, SubCaNumero)
    let estado = false;
    if (parseInt(caracteristicaNumero) == parseInt(SubCaNumero)) {
        estado = aciertos(elementoDrpp)
        activarEstrella(elementoDrpp);
    } else {
        estado = fallidos(elementoDrpp)
    }
    let TextoElementoDrag = $(elementoDrag).find("h4").text();
    $(elementoDrpp).find("ul.resultados").append(`<ol >${TextoElementoDrag}<i class="material-icons " style="color:${estado ? 'green' : 'red'}">${estado ? 'check' : 'close'}</i></ol>`)


    $(elementoDrag).remove();
}
function aciertos(elementoDrop) {
    elemnetoPositivo = $(elementoDrop).find("p.positivo");
    elemnetoPositivo.text(parseInt(elemnetoPositivo.text()) + 1)
    $("p.acierto strong").text((parseInt($("p.acierto strong").text()) + 1));
    $("i#icon").html("mood")
    return true;

}

function fallidos(elementoDrop) {
    $(elementoDrop).find("p.negativo").text(parseInt($(elementoDrop).find("p.negativo").text()) + 1)
    $("p.fallido strong").text((parseInt($("p.fallido strong").text()) + 1))
    $("i#icon").html("mood_bad")
    return false;
}
function activarEstrella(elementoDrag) {
    $(elementoDrag).find("i.start").animate({
        color: "yellow",
        fontSize: "+=2rem"
    }, {
            duration: 500,
            complete: function () {
                $(this).animate({ color: "black", fontSize: "2rem" });
            }
        })
}
/*El metodo se encargara de agregar las caracteristicas al DOM 
nombre=Nombre de la caracteristica
identificador=sera el id de la caracteristica
colorFondo=el background de la caracteristica
identificadorPadre=es el id de la subcaracteristica que servira para ver si la subcaracteristica pertenece 
a la caracteristica
tooltip=texto informativo de la caracteristica*/
function templateCaracteristica(nombre, identificador, colorFondo, identificadorPadre) {

    let template = ` <div class="col s12 m6 " style="position:relative" >
    <div class="card small  hoverable caracteristica"  data-identificador=${identificadorPadre} style="background:${colorFondo}">
    <div class="card-content">
    <div class="row">
    <div class="col s10">
    <span class="card-title activator black-text text-darken-1 ">${nombre}</span>
    </div>
    <div class="col s2">
    <i class="material-icons right start small">grade</i>
    </div>
    </div>
    
                        
                    <div class="divider"></div>
                    <div class="re">
                    <ul class="resultados overflow">
    
                    </ul>
                    </div>
                    
                      
    </div>
    

    

<div id="resultado">
<p class="numero positivo z-depth-2" >0</p>
<p class="numero  negativo z-depth-2" >0</p>
</div>


    </div>`
    $(identificador).append(template);
}