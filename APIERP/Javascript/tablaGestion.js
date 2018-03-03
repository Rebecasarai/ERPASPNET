window.addEventListener("load", iniciar );
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
        XMLHTR.open('GET', '../api/Pedido');
        XMLHTR.onreadystatechange = function () {

            var root = document.getElementById("pedidosCompleto");
            root.innerHTML = "cargando";

            if (XMLHTR.readyState === 4 && XMLHTR.status === 200) {

                root.innerHTML = "";
                /*[{"ID":5,"IDCliente":1,"Fecha":"2018-02-13T12:53:12.433","PrecioTotal":1000.0000},{"ID":4,"IDCliente":1,"Fecha":"2018-02-13T12:51:27.563","PrecioTotal":1000.0000},{"ID":3,"IDCliente":1,"Fecha":"2018-02-13T12:46:48.017","PrecioTotal":500.0000},{"ID":2,"IDCliente":1,"Fecha":"2018-02-13T12:39:40.537","PrecioTotal":500.0000},{"ID":1,"IDCliente":1,"Fecha":"2018-02-13T12:19:04.793","PrecioTotal":734.0000}]*/


                var arrayPedidos = JSON.parse(XMLHTR.responseText);
                var tabla = document.createElement("table");
                tabla.setAttribute("id", "tablePedidos");
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
                    botonborrar.innerHTML = "Cancelar";
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
    //<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names..">
   /* var buscador = document.createElement("input");
    buscador.setAttribute("class", "input buscador");
    buscador.setAttribute("id", "buscador");
    buscador.addEventListener("keyup", buscar);*/

    

    
    document.getElementById("buscador").addEventListener("keyup", buscar);
    /*
    $(document).ready(function (e) {
        e.preventDefault();
        $('.search-panel .dropdown-menu').find('a').click(function (e) {
            e.preventDefault();
            var param = $(this).attr("href").replace("#", "");
            var concept = $(this).text();
            $('.search-panel span#search_concept').text(concept);
            $('.input-group #search_param').val(param);

            e.preventDefault();
        });

        e.preventDefault();
    });*/

   // document.getElementById("pedidosCompleto").insertBefore(buscador, document.getElementById("tablePedidos"));
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



function editarPedidoOld() {
    var idPedidoGet = parseInt(this.id.split("fila"));
    alert("Pedido a editar "+idPedidoGet);
    
    displayModal(idPedidoGet);
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




function editarPedido() {


    var idPedido = this.parentNode.id.split("fila");
    alert(idPedido);
    

    //Hacemos el get de pedido particular
    //document.getElementById("table1").insertRow(-1).innerHTML = '<td>Producto</td><td>Stock</td><td>Descripción</td><td>Cantidad</td><td>Precio Total</td>';
    dataTable = document.getElementById('table1');
    tableHead = document.getElementById('table-head');
    tbody = document.createElement('tbody');

    /*while (dataTable.firstChild) {
        dataTable.removeChild(dataTable.firstChild);
    }*/

    dataTable.appendChild(tableHead);
    var tr = document.createElement('tr'),
        td0 = document.createElement('td'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6 = document.createElement('td'),
        td7 = document.createElement('td'),
        btnDelete = document.createElement('input');


    td7.style.display = "none";
    td5.setAttribute('class', "total");
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('class', 'btnDelete');
    btnDelete.setAttribute('id', fila);
    btnDelete.setAttribute('value', "Eliminar");
    btnDelete.setAttribute('name', fila);


    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);


    id = "slcProductos" + fila;
    //$('.js-example-basic-single').select2;
    var select = document.createElement("SELECT");
    select.setAttribute('id', id);

    td0.appendChild(select);







    $(document).ready(function () {
        $("#" + id).select2();
    }).on("change", function () {
        //Si el nombre del producto elegido está en el array auxiliar, cambiar el seleccionado al por defecto
        for (var i = 0; i < arraycosas.length; i++) {
            if (arraycosas[i].Nombre === td0.firstChild.value) {

                td7.className
                td7.setAttribute("id", arraycosas[i].ID);

                td7.setAttribute("class", "productoId");
                td7.value = arraycosas[i].ID;
                td7.innerHTML = arraycosas[i].ID;
                alert("idProducto" + arraycosas[i].ID);

                productoSeleccionado = arraycosas[i];
            }
        }

        if (td0.firstChild.value === "") {
            td1.innerHTML = "";
            td2.innerHTML = "";
            td3.innerHTML = "";
            td4.innerHTML = "";
            td5.innerHTML = "";
        } else {
            var x = document.createElement("INPUT");
            x.setAttribute("type", "number");
            x.setAttribute("id", "cantidadinput");
            x.setAttribute("class", "cantidadinput");
            x.setAttribute("value", "1");
            x.value = 1;
            x.min = "1";
            x.value = "1";
            x.max = "123";



            x.onkeypress = function (evt) {
                evt.preventDefault();
            };

            td1.innerHTML = productoSeleccionado.Stock; //stock de la api
            td2.innerHTML = productoSeleccionado.Descripcion;//descrupcion
            td4.innerHTML = productoSeleccionado.PrecioUnitario;
            if (td3.firstChild == null) {
                td3.appendChild(x); //cantidad
            }

            x.addEventListener("change", new function () {
                //resultado = parseInt(this.value) * parseInt(td4.innerHTML);
                resultado = parseFloat(document.getElementById("cantidadinput").value) * parseFloat(td4.innerHTML);
                td5.innerHTML = resultado;
            });

            //precio
            //Meter producto en el array auxiliar
        }
    });

    //{ "ID":73, "Nombre":"Manta eléctrica", "Descripcion":"Manta eléctrica de alta calidad", "PrecioUnitario":12.5000, "Stock":-52, "Baja":true }



    var option = document.createElement("option");
    option.style.width = "200";
    option.value = "";
    option.text = "Seleccione un producto";
    td0.firstChild.appendChild(option);

    var XMLHTR = new XMLHttpRequest();
    if (XMLHTR) {
        XMLHTR.open('GET', '../api/productos');
        XMLHTR.onreadystatechange = function () {


            if (XMLHTR.readyState === 4 && XMLHTR.status === 200 || XMLHTR.readyState === 4 && XMLHTR.status === 204) {
                arraycosas = JSON.parse(XMLHTR.responseText);

                for (var i = 0; i < arraycosas.length; i++) {
                    var option = document.createElement("option");
                    option.value = arraycosas[i].Nombre;
                    option.text = arraycosas[i].Nombre;
                    option.style.width = "200px";
                    td0.firstChild.appendChild(option);
                }

            }
        }
        XMLHTR.send();
    }


    td6.appendChild(btnDelete);

    //AÑADE A CADA BOTON ELIMINAR UN LISTENER PARA EL METODO
    btnDelete.addEventListener("click", eliminarFila, false);

    tbody.appendChild(tr);

    dataTable.appendChild(tbody);
    fila++;
    //}
    

    var XMLHTR = new XMLHttpRequest();
    if (XMLHTR) {
        XMLHTR.open('GET', '../api/pedido/' + idPedido);
        XMLHTR.onreadystatechange = function () {
            if (XMLHTR.readyState === 4 && XMLHTR.status === 200) {
                var pedidoPUT = JSON.parse(XMLHTR.responseText);
                /*alert(pedidoPUT.Fecha);
                alert(pedidoPUT.ID);
                alert(pedidoPUT.PrecioTotal);
                */
                var parsed = []
                parsed = pedidoPUT.LineasPedido;

                var stringy = JSON.stringify(pedidoPUT.LineasPedido);
                var res = stringy.split(",");

                arrayLineas = parsed;
                alert(JSON.stringify(arrayLineas));

                alert(arrayLineas.IDProducto+"");
                alert(arrayLineas.Cantidad + "");

                var res = stringy.split(",");

                //alert(JSON.stringify(pedidoPUT.LineasPedido));
                document.getElementById("tituloModal").textContent = "Actualizar Pedido " + idPedido + " con fecha " + JSON.stringify(pedidoPUT.Fecha);


                //alert(pedido.lineas[0]);

                if (td0.firstChild.value === "") {
                    td1.innerHTML = "";
                    td2.innerHTML = "";
                    td3.innerHTML = "";
                    td4.innerHTML = "";
                    td5.innerHTML = "";
                } else {
                    var x = document.createElement("INPUT");
                    x.setAttribute("type", "number");
                    x.setAttribute("id", "cantidadinput");
                    x.setAttribute("class", "cantidadinput");
                    x.setAttribute("value", "1");
                    x.value = 1;
                    x.min = "1";
                    x.value = "1";
                    x.max = "123";



                    x.onkeypress = function (evt) {
                        evt.preventDefault();
                    };

                    td1.innerHTML = "hola"//productoSeleccionado.Stock; //stock de la api
                    td2.innerHTML = "hola"//productoSeleccionado.Stock; //stock de la api productoSeleccionado.Descripcion;//descrupcion
                    td4.innerHTML = "hola"//productoSeleccionado.Stock; //stock de la api productoSeleccionado.PrecioUnitario;
                    if (td3.firstChild == null) {
                        td3.appendChild(x); //cantidad
                    }

                    x.addEventListener("change", new function () {
                        //resultado = parseInt(this.value) * parseInt(td4.innerHTML);
                        resultado = parseFloat(document.getElementById("cantidadinput").value) * parseFloat(td4.innerHTML);
                        td5.innerHTML = resultado;
                    });

                    //precio
                    //Meter producto en el array auxiliar
                }


                tbody.appendChild(tr);

            }
        }
        XMLHTR.send();
    }



    
    document.getElementById("confirmarPedido").addEventListener("click", updatePedido);
}





function updatePedido() {

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


/**
 * Modal
 */


function displayResult() {

    document.getElementById("confirmarPedido").addEventListener("click", confirmarPedido);
    //document.getElementById("table1").insertRow(-1).innerHTML = '<td>Producto</td><td>Stock</td><td>Descripción</td><td>Cantidad</td><td>Precio Total</td>';
    dataTable = document.getElementById('table1');
    tableHead = document.getElementById('table-head');
    tbody = document.createElement('tbody');
    
    /*while (dataTable.firstChild) {
        dataTable.removeChild(dataTable.firstChild);
    }*/

    dataTable.appendChild(tableHead);
    var tr = document.createElement('tr'),
        td0 = document.createElement('td'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6 = document.createElement('td'),
        td7 = document.createElement('td'),
        btnDelete = document.createElement('input');


    td7.style.display = "none";
    td5.setAttribute('class', "total");
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('class', 'btnDelete');
    btnDelete.setAttribute('id', fila);
    btnDelete.setAttribute('value', "Eliminar");
    btnDelete.setAttribute('name', fila);


    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    

    id = "slcProductos" + fila;
    //$('.js-example-basic-single').select2;
    var select = document.createElement("SELECT");
    select.setAttribute('id', id);
    
    td0.appendChild(select);

    $(document).ready(function () {
        $("#" + id).select2();
    }).on("change", function () {
        //Si el nombre del producto elegido está en el array auxiliar, cambiar el seleccionado al por defecto
        for (var i = 0; i < arraycosas.length; i++) {
            if (arraycosas[i].Nombre === td0.firstChild.value) {

                td7.className
                td7.setAttribute("id", arraycosas[i].ID);

                td7.setAttribute("class", "productoId");
                td7.value = arraycosas[i].ID;
                td7.innerHTML = arraycosas[i].ID;
                alert("idProducto" + arraycosas[i].ID);

                productoSeleccionado = arraycosas[i];
            }
        }
    
        if (td0.firstChild.value === "") {
            td1.innerHTML = "";
            td2.innerHTML = "";
            td3.innerHTML = "";
            td4.innerHTML = "";
            td5.innerHTML = "";
        } else {
            var x = document.createElement("INPUT");
            x.setAttribute("type", "number");
            x.setAttribute("id", "cantidadinput");
            x.setAttribute("class", "cantidadinput");
            x.setAttribute("value", "1");
            x.value = 1;
            //x.setAttribute("minValue", "1");
            x.min = "1";
            x.value = "1";
            x.max = "123";

            

            x.onkeypress = function (evt) {
                evt.preventDefault();
            };

            td1.innerHTML = productoSeleccionado.Stock; //stock de la api
            td2.innerHTML = productoSeleccionado.Descripcion;//descrupcion
            td4.innerHTML = productoSeleccionado.PrecioUnitario;
            if (td3.firstChild == null) {
                td3.appendChild(x); //cantidad
            }

            x.addEventListener("change", new function () {
                //resultado = parseInt(this.value) * parseInt(td4.innerHTML);
                resultado = parseFloat(document.getElementById("cantidadinput").value) * parseFloat(td4.innerHTML);
                td5.innerHTML = resultado;
            });

           //precio
                //Meter producto en el array auxiliar
        }
    });
    
    //{ "ID":73, "Nombre":"Manta eléctrica", "Descripcion":"Manta eléctrica de alta calidad", "PrecioUnitario":12.5000, "Stock":-52, "Baja":true }
   


    var option = document.createElement("option");
    option.style.width = "200";
    option.value = "";
    option.text = "Seleccione un producto";
    td0.firstChild.appendChild(option);

    var XMLHTR = new XMLHttpRequest();
    if (XMLHTR) {
        XMLHTR.open('GET', '../api/productos');
        XMLHTR.onreadystatechange = function () {


            if (XMLHTR.readyState === 4 && XMLHTR.status === 200 || XMLHTR.readyState === 4 && XMLHTR.status === 204) {
                arraycosas = JSON.parse(XMLHTR.responseText);

                for (var i = 0; i < arraycosas.length; i++) {
                    var option = document.createElement("option");
                    option.value = arraycosas[i].Nombre;
                    option.text = arraycosas[i].Nombre;
                    option.style.width = "200px";
                    td0.firstChild.appendChild(option);
                }
                
            }
        }
        XMLHTR.send();
    }
    
    
    td6.appendChild(btnDelete);

    //AÑADE A CADA BOTON ELIMINAR UN LISTENER PARA EL METODO
    btnDelete.addEventListener("click", eliminarFila, false);

    tbody.appendChild(tr);
    
    dataTable.appendChild(tbody);
    fila++;
    //}
}

function confirmarPedido() {


    alert("pedido");

    
    var pedido = "";
    //gets table
    var oTable = document.getElementById('table1');

    //gets rows of table
    var rowLength = oTable.rows.length;
    alert("Lineas de pedido: " + rowLength);


    var lineas = [];

    //loops through rows    
    for (i = 1; i < rowLength; i++) {
        
        //gets cells of current row  
        var oCells = oTable.rows.item(i).cells;

        //gets amount of cells of current row
        var cellLength = oCells.length;
        lineasDeProductos = cellLength;

        //--------------HAY QUE HACER QUE LAS QUE NO SE VEN NO SE METAN EN EN PEDIDO--------------

        //if(se ve la row)

        var aja = 0;
        
        //loops through each cell in current row
        for (var j = 0; j < cellLength; j++) {
            if ($(oTable.rows.item(i)).is(':visible')) {
                if (j == 0) {
                    pedido = pedido + oCells.item(j).firstChild.value + " ";
                } else if (j == 3) {
                    pedido = pedido + oCells.item(j).firstChild.value + " | ";
                }

                if (j == 3) {
                    cantidad = parseFloat(oCells.item(j).firstChild.value);
                }

                if (j == 5) {
                    precioTotal += parseFloat(oCells.item(j).firstChild.textContent);
                }
                
            }

            if (j == 6) {
                alert(oCells.item(j).ID);
                /*
                idProducto = oCells.item(j).firstChild.innerHTML;
                //idProducto = oCells.item(j).firstChild.id;

                alert("id del producto es: " + idProducto);
                aja = oCells.item(j).firstChild.innerHTML;
                alert("id del producto es inner: " + oCells.item(j).firstChild.innerHTML);
                alert("id del producto es value: " + oCells.item(j).firstChild.value);*/
            }
            
        }
        alert(pedido);
        var linea = new LineaDePedido(77, cantidad, resultado);
        lineas.push(linea);

    }

    var date = obtenerFechaDeHoy();
    var pedidoPost = new PedidoConLineaPedido(lineas, 1, date, precioTotal);

    addPedido(pedidoPost);


    document.getElementById("pedidoHecho").innerHTML = pedido;
    borrarTabla();
}

function eliminarFila() {
    if (document.getElementById("table1").childElementCount - 1 <= this.name) {
        document.getElementById("table1").rows.item(parseInt(this.name)).style.display = 'none';
    } else {
        document.getElementById("table1").rows.item(parseInt(this.name)).style.display = 'none';
    }
}

function borrarTabla() {

    for (var i = 1; i < document.getElementById("table1").rows.length; i++) {
        document.getElementById("table1").rows.item(i).style.display = 'none';
    }

}


function addPedido(pedido) {

    var url = '../api/Pedido';

    var json = JSON.stringify(pedido);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "204" /*|| xhr.status == "200"*/) {
            alert("Se ha insertado correctamente");
        }
    }
    xhr.send(json);
}

function obtenerFechaDeHoy() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd + "T12:53:12.433";
    //2018-02-13T12:53:12.433
    return today;
}




