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
    $("ul li").on('click', function () {
        var direccion = $(this).find('a').attr('href');
        //alert(direccion);
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
            XMLHTR.open('GET', '../api/Pedido');
            XMLHTR.onreadystatechange = function () {

                var root = document.getElementById("Pedidos");
                root.innerHTML = "cargando";

                if (XMLHTR.readyState === 4 && XMLHTR.status === 200) {

                    root.innerHTML = "";
                    /*[{"ID":5,"IDCliente":1,"Fecha":"2018-02-13T12:53:12.433","PrecioTotal":1000.0000},{"ID":4,"IDCliente":1,"Fecha":"2018-02-13T12:51:27.563","PrecioTotal":1000.0000},{"ID":3,"IDCliente":1,"Fecha":"2018-02-13T12:46:48.017","PrecioTotal":500.0000},{"ID":2,"IDCliente":1,"Fecha":"2018-02-13T12:39:40.537","PrecioTotal":500.0000},{"ID":1,"IDCliente":1,"Fecha":"2018-02-13T12:19:04.793","PrecioTotal":734.0000}]*/


                    var arrayPedidos = JSON.parse(XMLHTR.responseText);
                    var tabla = document.createElement("table");
                    tabla.setAttribute("id", "tablePedidos");
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
                   
                    thId.innerHTML = "ID";
                    thNombre.innerHTML = "Cliente";
                    thFecha.innerHTML = "Fecha";
                    thPrecioTotal.innerHTML = "Importe";

                    tr.appendChild(thId);
                    tr.appendChild(thNombre);
                    tr.appendChild(thFecha);
                    tr.appendChild(thPrecioTotal);
                    tabla.className = "table table-responsive table-striped table-hover";
                    tabla.appendChild(thead);
                    tabla.appendChild(tr);


                    for (i = 0; i < arrayPedidos.length; i++) {

                        var mRow = document.createElement("tr");

                        var tdId = document.createElement("td");
                        var tdNombre = document.createElement("td");
                        var tdFecha = document.createElement("td");
                        var tdPrecioTotal = document.createElement("td");
                        var tdBorrar = document.createElement("td");

                        var pedido = arrayPedidos[i];
                        tdId.innerHTML = pedido.ID;
                        tdNombre.innerHTML = pedido.NombreCliente;
                        tdFecha.innerHTML = pedido.Fecha;
                        tdPrecioTotal.innerHTML = pedido.PrecioTotal;

                        mRow.setAttribute("class", "fila" + pedido.ID);
                        mRow.setAttribute("id", "fila" + pedido.ID);
                        mRow.style.cursor = "pointer";

                        var botonborrar = document.createElement("button");
                        botonborrar.setAttribute('class', 'btn btnCancelar btn-default btnBorrar' + pedido.id);
                        botonborrar.setAttribute('id', pedido.ID);
                        botonborrar.innerHTML = "Cancelar";
                        botonborrar.addEventListener("click", cancelarPedido);
                        tdBorrar.appendChild(botonborrar);


                        mRow.appendChild(tdId);
                        mRow.appendChild(tdNombre);
                        mRow.appendChild(tdFecha);
                        mRow.appendChild(tdPrecioTotal);
                        mRow.appendChild(tdBorrar);
                        mRow.addEventListener("click", editarPedido);

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
    //<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names..">
    var buscador = document.createElement("input");
    buscador.setAttribute("class", "input buscador");
    buscador.setAttribute("id", "buscador");
    buscador.addEventListener("keyup", buscar);

    document.getElementById("Pedidos").insertBefore(buscador, document.getElementById("tablePedidos"));
    //document.getElementById("PedidosCancelados").insertBefore(buscador, document.getElementById("tablePedidosCancelados"));

}



/**
 * Buscador por titulo
 */
function buscar() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscador");
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


function cancelarPedido() {
    
    var idPedido = this.id.split("fila");
    alert(idPedido);
    if (confirm('Esta seguro de cancelar ' + idPedido + "?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", '..api/pedido' + '/' + idPedido, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == "200" || xhr.readyState == 4 && xhr.status == "204") {
            
                cargarPedidos();
            }
        }
        xhr.send();
    }
}



function editarPedido() {
    alert(this.id);

    displayModal();

}





function updateData() {
    var pedido = new LineaDePedido();

    var json = JSON.stringify(p);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", '../api/pedido' + '/' + this.id, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function () {
        if (xhr.status == "204") {
            alert("bien");
            listarPersonas();
        } else {
            alert("error");
            listarPersonas();
        }
    }
    xhr.send(json);
}

