
var fila = 1;
var id;
var dataTable;
var tableHead;
var arraycosas = [];
var pedido;
var resultado = 0;
var precioTotal = 0;
var lineasDeProductos = 0;
var productos = [];
var cantidad = 0;
var idProducto = 0;




/**
 * Envia el producto editado con nuevos datos
 */
function updateData() {
    var pedido = new LineaDePedido();

    var json = JSON.stringify(p);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", '../api/pedido' + '/' + this.id, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function () {
        if (xhr.status == "204") {
        } else {
        }
    }
    xhr.send(json);
}



/**
 * Muestra los datos de productos dispinles en el modal para añadir productos
 */
function displayResult() {

    document.getElementById("confirmarPedido").addEventListener("click", confirmarPedido);
    dataTable = document.getElementById('table1');
    tableHead = document.getElementById('table-head');
    tbody = document.createElement('tbody');
    
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
    var select = document.createElement("SELECT");
    select.setAttribute('id', id);

    td0.appendChild(select);

    $(document).ready(function () {
        $("#" + id).select2();
    }).on("change", function () {
        for (var i = 0; i < arraycosas.length; i++) {
            if (arraycosas[i].Nombre === td0.firstChild.value) {

                td7.className
                td7.setAttribute("id", arraycosas[i].ID);
                td7.setAttribute("class", "productoId");
                td7.value = arraycosas[i].ID;
                td7.innerHTML = arraycosas[i].ID;
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
            x.setAttribute("id", "cantidadinput" + fila);
            x.setAttribute("class", "cantidadinput");
            x.setAttribute("value", "1");
            x.setAttribute("fila", fila);
            x.value = 1;
            x.min = "1";
            x.value = "1";
            x.max = "123";
            
            var precioInput = document.createElement("INPUT");
            precioInput.setAttribute("type", "number");
            precioInput.setAttribute("id", "precioinput" + fila);
            precioInput.setAttribute("fila", fila);
            precioInput.setAttribute("class", "precioinput");
            precioInput.min = "1";
            precioInput.setAttribute("value", productoSeleccionado.PrecioUnitario);
            precioInput.value = productoSeleccionado.PrecioUnitario;


            
            x.onkeypress = function (evt) {
                evt.preventDefault();
            };
            precioInput.onkeypress = function (evt) {
                evt.preventDefault();
            };

            td1.innerHTML = productoSeleccionado.Stock; //stock de la api
            td2.innerHTML = productoSeleccionado.Descripcion;//descrupcion
            //td4.innerHTML = productoSeleccionado.PrecioUnitario;
            if (td3.firstChild == null) {
                td3.appendChild(x); //cantidad
            }
            if (td4.firstChild == null) {
                td4.appendChild(precioInput); //precio
            }
            if (td5.firstChild == null) {

                td5.innerHTML = productoSeleccionado.PrecioUnitario;
            }

            precioInput.addEventListener("change", function () {
                var mFila = this.getAttribute("fila");
                resultado = parseFloat(document.getElementById("cantidadinput" + fila).value) * parseFloat(document.getElementById("precioinput" + fila).value);
                td5.innerHTML = resultado;
            });

            x.addEventListener("change", function () {
                var mFila = this.getAttribute("fila");
                resultado = parseFloat(document.getElementById("cantidadinput" + fila).value) * parseFloat(document.getElementById("precioinput" + fila).value);
                td5.innerHTML = resultado;
            });
        }
    });
    
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
    btnDelete.addEventListener("click", eliminarFila, false);
    tbody.appendChild(tr);

    dataTable.appendChild(tbody);
    fila++;
}


/**
 * Metodo que confirma un nuevo pedido
 */
function confirmarPedido() {

    var pedido = "";
    var oTable = document.getElementById('table1');
    var rowLength = oTable.rows.length;

    var lineas = [];
    for (i = 1; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;
        lineasDeProductos = cellLength;
        
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
        }

        var idProductoLinea = document.getElementsByClassName("productoId")[0].id;
        var linea = new LineaDePedido(idProductoLinea, cantidad, resultado);
        lineas.push(linea);

    }

    var date = obtenerFechaDeHoy();
    var pedidoPost = new PedidoConLineaPedido(lineas, 1, date, precioTotal);

    addPedido(pedidoPost);
    document.getElementById("pedidoHecho").innerHTML = pedido;
    borrarTabla();
}



/**
 * Metodo para eliminar fila
 */
function eliminarFila() {
    if (document.getElementById("table1").childElementCount - 1 <= this.name) {
        document.getElementById("table1").rows.item(parseInt(this.name)).style.display = 'none';
    } else {
        document.getElementById("table1").rows.item(parseInt(this.name)).style.display = 'none';
    }
}

/**
 * Metodo que borra todo en una tabla
 */
function borrarTabla() {

    for (var i = 1; i < document.getElementById("table1").rows.length; i++) {
        document.getElementById("table1").rows.item(i).style.display = 'none';
    }

}

/**
 * MEtodo que añade el nuevo pedido
 * @param {any} pedido
 */
function addPedido(pedido) {

    var url = '../api/Pedido';

    var json = JSON.stringify(pedido);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "204" /*|| xhr.status == "200"*/) {
            alert("Se ha insertado correctamente");

            //location.reload();
            nuevoListar();

        }
    }
    xhr.send(json);
}

/**
 * Obtiene la fecha de hoy
 */
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