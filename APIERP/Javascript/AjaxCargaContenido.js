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


                    var arrayPosts = JSON.parse(XMLHTR.responseText);
                    var tabla = document.createElement("table");
                    tabla.setAttribute("id", "table");
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
                    thNombre.innerHTML = "Nombre";
                    thFecha.innerHTML = "Fecha";
                    thPrecioTotal.innerHTML = "PrecioTotal";

                    tr.appendChild(thId);
                    tr.appendChild(thNombre);
                    tr.appendChild(thFecha);
                    tr.appendChild(thPrecioTotal);
                    tabla.className = "table table-striped table-hover";
                    tabla.appendChild(thead);
                    tabla.appendChild(tr);


                    for (i = 0; i < arrayPosts.length; i++) {

                        var mRow = document.createElement("tr");

                        var tdId = document.createElement("td");
                        var tdNombre = document.createElement("td");
                        var tdFecha = document.createElement("td");
                        var tdPrecioTotal = document.createElement("td");
                        var tdBorrar = document.createElement("td");
                        /*var tdAltura = document.createElement("td");
                        var tdCabello = document.createElement("td");
                        var tdEditar = document.createElement("td");
                        var tdPrecio = document.createElement("td");
                        var tdCarrito = document.createElement("td");*/

                        var post = arrayPosts[i];
                        tdId.innerHTML = post.ID;
                        tdNombre.innerHTML = post.NombreCliente;
                        tdFecha.innerHTML = post.Fecha;
                        tdPrecioTotal.innerHTML = post.PrecioTotal;

                        mRow.setAttribute("class", "fila" + post.id);


                        //botones
                        /*var botonEditar = document.createElement("button");
                        botonEditar.setAttribute('class', 'btn bntEditar btn-default btnEditar' + post.id);
                        botonEditar.setAttribute('id', post.id);
                        botonEditar.innerHTML = "Editar";
                        tdEditar.appendChild(botonEditar);*/

                        var botonborrar = document.createElement("button");
                        botonborrar.setAttribute('class', 'btn btnBorrar btn-default btnBorrar' + post.id);
                        botonborrar.setAttribute('id', post.id);
                        botonborrar.innerHTML = "Cancelar";
                        tdBorrar.appendChild(botonborrar);

                        mRow.appendChild(tdId);
                        mRow.appendChild(tdNombre);
                        mRow.appendChild(tdFecha);
                        mRow.appendChild(tdPrecioTotal);
                        mRow.appendChild(tdBorrar);
                        //mRow.appendChild(tdCarrito);

                        
                        //botonborrar.addEventListener("click", borrar);

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

    document.getElementById("Pedidos").insertBefore(buscador, document.getElementById("table"));
    //document.getElementById("PedidosCancelados").insertBefore(buscador, document.getElementById("tablePedidosCancelados"));

}



/**
 * Buscador por titulo
 */
function buscar() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscador");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
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

