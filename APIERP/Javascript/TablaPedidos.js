window.addEventListener("load", iniciar);
var fila = 1;
var id;
var dataTable;
var tbody;
var tableHead;
var filasBorradas = 0;
var arraycosas = [];
var pedido;
var resultado = 0;

var precioTotal = 0;
var lineasDeProductos = 0;

var productos = [];
var cantidad = 0;
var idProducto = 0;



function iniciar() {
}

/**
 * Modal
 */



$(document).ready(function (e) {
    $('.search-panel .dropdown-menu').find('a').click(function (e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);

    });
});

//Carga el index con ajax
$(document).ready(cargar);

function cargar() {
    cargarPedidos();
    $.ajax({
        url: "../Views/Pedidos.html", success: function (result) {
            $("#contenido").html(result);
        }
    });
    escucharMenu();
}

//
function escucharMenu() {
    $("#menu li").on('click', function () {
        var direccion = $(this).find('a').attr('href');
        var containers = $('.container').find('div.visible');
        containers.removeClass('visible');
        containers.addClass('invisible');
        $(direccion).removeClass('invisible');
        $(direccion).addClass('visible');

    });



    $("a").on('Click', function () {
        e.preventDefault();
    });
}

function cargarPedidos() {
    var XMLHTR = new XMLHttpRequest();
    if (XMLHTR) {
        XMLHTR.open('GET', '../api/pedido?nElementosPagina=50');
        XMLHTR.onreadystatechange = function () {

            var root = document.getElementById("pedidosCompleto");
            root.innerHTML = "cargando";

            if (XMLHTR.readyState === 4 && XMLHTR.status === 200) {

                root.innerHTML = "";
                /*[{"ID":5,"IDCliente":1,"Fecha":"2018-02-13T12:53:12.433","PrecioTotal":1000.0000},{"ID":4,"IDCliente":1,"Fecha":"2018-02-13T12:51:27.563","PrecioTotal":1000.0000},{"ID":3,"IDCliente":1,"Fecha":"2018-02-13T12:46:48.017","PrecioTotal":500.0000},{"ID":2,"IDCliente":1,"Fecha":"2018-02-13T12:39:40.537","PrecioTotal":500.0000},{"ID":1,"IDCliente":1,"Fecha":"2018-02-13T12:19:04.793","PrecioTotal":734.0000}]*/


                var arrayPedidos = JSON.parse(XMLHTR.responseText);
                var tabla = document.createElement("table");
                tabla.setAttribute("id", "tablePedidos");
                tabla.setAttribute("data-toggle", "table");
                tabla.style.margin = " 40px 0px 0px 0px ";
                tabla.style.color = "black";
                //tabla.className = "table table-striped table-hover";
                // Creamos the headers of the table
                var thead = document.createElement("thead");
                var tr = document.createElement("tr");
                var hr = document.createElement("hr");
                var thId = document.createElement("th");
                var thNombre = document.createElement("th");
                var thFecha = document.createElement("th");
                var thPrecioTotal = document.createElement("th");
                var thCancelar = document.createElement("th");

                thId.innerHTML = "ID";
                thNombre.innerHTML = "Cliente";
                thFecha.innerHTML = "Fecha";
                thPrecioTotal.innerHTML = "Importe";
                thCancelar.innerHTML = "Cancelar";


                thId.setAttribute("id", "idCabecera");
                thNombre.setAttribute("id", "nombreCabecera");
                thFecha.setAttribute("id", "fechaCabecera");
                thPrecioTotal.setAttribute("id", "precioCabecera");


                thId.setAttribute("data-sortable", "true");
                thNombre.setAttribute("data-sortable", "true");
                thFecha.setAttribute("data-sortable", "true");
                thPrecioTotal.setAttribute("data-sortable", "true");
                thPrecioTotal.setAttribute("data-sorter", "priceSorter");
                thCancelar.style.textAlign = "center";

                tr.appendChild(thId);
                tr.appendChild(thNombre);
                tr.appendChild(thFecha);
                tr.appendChild(thPrecioTotal);
                tr.appendChild(thCancelar);
                

                tabla.className = "table table-responsive table-striped table-hover";
                tabla.appendChild(thead);
                tabla.appendChild(tr);

                for (i = 0; i < arrayPedidos.length; i++) {

                    var mRow = document.createElement("tr");

                    if (i % 2 == 0) {
                        mRow.style.background = "#e5f2f7";
                    }

                    var tdId = document.createElement("td");
                    var tdNombre = document.createElement("td");
                    var tdFecha = document.createElement("td");
                    var tdPrecioTotal = document.createElement("td");
                    var tdBorrar = document.createElement("td");

                    tdId.setAttribute("data-toggle", "modal");
                    tdId.setAttribute("data-target", "#myModal");
                    tdNombre.setAttribute("data-toggle", "modal");
                    tdNombre.setAttribute("data-target", "#myModal");
                    tdFecha.setAttribute("data-toggle", "modal");
                    tdFecha.setAttribute("data-target", "#myModal");
                    tdPrecioTotal.setAttribute("data-toggle", "modal");
                    tdPrecioTotal.setAttribute("data-target", "#myModal");
                    tdBorrar.style.textAlign = "center";
                    
                    tdId.addEventListener("click", editarPedido);
                    tdNombre.addEventListener("click", editarPedido);
                    tdFecha.addEventListener("click", editarPedido);
                    tdPrecioTotal.addEventListener("click", editarPedido);


                    var pedido = arrayPedidos[i];
                    tdId.innerHTML = pedido.ID;
                    tdNombre.innerHTML = pedido.NombreCliente;
                    tdFecha.innerHTML = pedido.Fecha;
                    tdPrecioTotal.innerHTML = pedido.PrecioTotal;

                    mRow.setAttribute("class", "fila" + pedido.ID);
                    mRow.setAttribute("id", "" + pedido.ID);
                    mRow.style.cursor = "pointer";

                    var botonborrar = document.createElement("button");
                    botonborrar.setAttribute('class', 'btn btnCancelar btn-default btnBorrar' + pedido.id);
                    botonborrar.setAttribute('id', pedido.ID);
                    botonborrar.innerHTML = '<span class="glyphicon glyphicon-remove"></span>';
                    botonborrar.addEventListener("click", cancelarPedido);
                    tdBorrar.appendChild(botonborrar);


                    mRow.appendChild(tdId);
                    mRow.appendChild(tdNombre);
                    mRow.appendChild(tdFecha);
                    mRow.appendChild(tdPrecioTotal);
                    mRow.appendChild(tdBorrar);


                    tabla.appendChild(mRow);
                }

                root.appendChild(tabla);

                cargarBuscador();
            }
        }
        XMLHTR.send();
    }

}


function cargarBuscador() {
    /*
    document.getElementById("idCabecera").addEventListener("click", sortTable(0));/
    document.getElementById("nombreCabecera").addEventListener("click", sortTable(1));
    document.getElementById("fechaCabecera").addEventListener("click", sortTable(2));
    document.getElementById("precioCabecera").addEventListener("click", sortTable(3));*/


    switch (document.getElementById("search_param").value) {
        case "ID":

            document.getElementById("inputBuscar").addEventListener("keyup", buscarPorID(0));
            break;

        case "Cliente":

            document.getElementById("inputBuscar").addEventListener("keyup", buscarPorCliente(1));
            break;

        case "Fecha":

            document.getElementById("inputBuscar").addEventListener("keyup", buscarPorFecha(2));
            break;

        case "Importe":

            document.getElementById("inputBuscar").addEventListener("keyup", buscarPorImporte(3));
            break;

        case "all":
            document.getElementById("inputBuscar").addEventListener("keyup", buscarPorFecha(4));
            break;

        default:
            document.getElementById("inputBuscar").addEventListener("keyup", buscarPorFecha(3));
            break;
    }
}




/**
 * Buscador por titulo
 */
function buscarPorImporte(numero) {

    var number = parseInt(numero);

    var input, filter, table, tr, td, i;
    input = document.getElementById("inputBuscar");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablePedidos");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        //especificamos la columna a buscar
        td = tr[i].getElementsByTagName("td")[3];
        //alert(td.innerHTML);
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


/**
 * Buscador por titulo
 */
function buscarPorFecha(numero) {

    var number = parseInt(numero);

    var input, filter, table, tr, td, i;
    input = document.getElementById("inputBuscar");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablePedidos");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        //especificamos la columna a buscar
        td = tr[i].getElementsByTagName("td")[2];
        //alert(td.innerHTML);
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


/**
 * Buscador por titulo
 */
function buscarPorCliente(numero) {

    var number = parseInt(numero);

    var input, filter, table, tr, td, i;
    input = document.getElementById("inputBuscar");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablePedidos");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        //especificamos la columna a buscar
        td = tr[i].getElementsByTagName("td")[1];
        //alert(td.innerHTML);
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


/**
 * Buscador por titulo
 */
function buscarPorID(numero) {

    var number = parseInt(numero);

    var input, filter, table, tr, td, i;
    input = document.getElementById("inputBuscar");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablePedidos");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        //especificamos la columna a buscar
        td = tr[i].getElementsByTagName("td")[0];
        //alert(td.innerHTML);
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function cancelarPedido() {

    var idPedido = this.id.split("fila");
    if (confirm('Esta seguro de cancelar ' + idPedido + "?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", '../api/pedido' + '/' + idPedido, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == "204") {

                cargarPedidos();
            }
        }
        xhr.send();
    }
}

/**
 * Ordena por orden alfabetico
 * @param {any} n
 */
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tablePedidos");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
            // Start by saying: no switching is done:
            switching = false;
        rows = table.getElementsByTagName("tr");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
        break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
        break;
        }
      }
    }
    if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
            dir = "desc";
        switching = true;
      }
    }
  }
}


function monthSorter(a, b) {
    if (a.month < b.month) return -1;
    if (a.month > b.month) return 1;
    return 0;
}


function integerSorter(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

function priceSorter(a, b) {
    a = +a.substring(1); // remove $
    b = +b.substring(1);
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}