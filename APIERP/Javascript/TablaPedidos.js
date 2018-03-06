var pedido;
var resultado = 0;
var arrayProductos = [];



//Carga el index con ajax
$(document).ready(cargar);



function cargar() {
    $.ajax({
        url: "../Views/Pedidos.html", success: function (result) {
            $("#contenido").html(result);
        }
    });
    escucharMenu();
    nuevoListar();
}


/**
 * Nueva forma de listar productos y paginar correctamente
 */
function nuevoListar() {
    
        var $pagination = $('#pagination'),
            totalRecords = 0,
            records = [],
            displayRecords = [],
            recPerPage = 10,
            page = 1,
            totalPages = 0;

        $.ajax({
            url: "../api/pedido?nElementosPagina=100",
            async: true,
            dataType: 'json',
            success: function (data) {
                records = data;
                totalRecords = records.length;
                totalPages = Math.ceil(totalRecords / recPerPage);
                $('#pagination').empty();
                $('#pagination').removeData("twbs-pagination");
                $('#pagination').unbind("page");

                apply_pagination();
            }
        });
        function generate_table() {
            var tr;
            $('#emp_body').html('');
            for (var i = 0; i < displayRecords.length; i++) {
                tr = $('<tr/>');
                tr.append('<td class="tdid">' + displayRecords[i].ID + "</td>");
                tr.append('<td  class="tdnombre" data-toggle="modal" data-target="#modalEditar" >' + displayRecords[i].NombreCliente + "</td>");
                tr.append('<td  class="tdfecha"  data-toggle="modal" data-target="#modalEditar" >' + displayRecords[i].Fecha + "</td>");
                tr.append('<td  class="tdprecio" data-toggle="modal" data-target="#modalEditar" >' + displayRecords[i].PrecioTotal + "</td>");
                tr.append('<td style="text-align: center;"><button class="btn btnBorrar btn-default btnBorrar' + displayRecords[i].ID+'" id="' + displayRecords[i].ID + '"><span class="glyphicon glyphicon-remove"></span></button></td>');
                tr.attr('id', 'fila' + displayRecords[i].ID);

                $('#emp_body').append(tr);
            }

            $('.btnBorrar').click(cancelarPedido);
            $('.tdid').click(editarPedido);
            $('.tdnombre').click(editarPedido);
            $('.tdfecha').click(editarPedido);
            $('.tdnombre').css('cursor', 'pointer');
            $('.tdfecha').css('cursor', 'pointer');
            $('.tdprecio').css('cursor', 'pointer');

        }
        function apply_pagination() {
            $pagination.twbsPagination({
                totalPages: totalPages,
                visiblePages: 6,
                next: 'Siguiente',
                prev: 'Anterior',
                first: 'Primera',
                last: 'Última',
                onPageClick: function (event, page) {
                    displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                    endRec = (displayRecordsIndex) + recPerPage;
                    displayRecords = records.slice(displayRecordsIndex, endRec);
                    generate_table();
                }
            });
        }

           
        
}





/**
 * Metodo que rellena el modal para editar un pedido y ver sus datos
 */
function editarPedido() {

    var idPedido = this.parentNode.id.split('fila')[1];
    
    getProductos();

    $.ajax({
        url: "../api/pedido/" + idPedido,
        dataType: 'json',
        success: function (data) {
            var lineas = [];
            lineas = data.LineasPedido;
            $('#tbodyvacio').html('');
            $('#tituloModalEditar').html('Pedido ' + data.ID + ' realizado en fecha ' + data.Fecha);
            $('#botonEditarCancelar').click(cancelarPedidoParametro(data.ID));
            for (var i = 0; i < lineas.length; i++) {
                for (var j = 0; j < arrayProductos.length; j++) {
                    if (lineas[i].IDProducto == arrayProductos[j].ID) {
                        tr = $('<tr/>');
                        
                        tr.append('<td class="tdid">' + arrayProductos[j].Nombre + "</td>");
                        tr.append('<td class="tdStock">' + arrayProductos[j].Stock + "</td>");
                        tr.append('<td class="tdFecha">' + arrayProductos[j].Descripcion + "</td>");
                        tr.append('<td class="tdCantidad"><input type="number" id="cantidadinput" class="cantidadinput" value='+ lineas[i].Cantidad +' min="1" max="123"> </td>');
                        tr.append('<td class="tdPrecioUnitario"><input type="number" id="cantidadinput" class="precioinput" value=' + lineas[i].PrecioVenta+' min="1" max="123"> </td>');
                        tr.append('<td class="tdPrecioTotal">' + data.PrecioTotal + "</td>");
                        $('#tbodyvacio').append(tr);
                
                    }
                }

            }
            

        },
        error: function (e) {
            console.log(e.message);
        }
    });

}



function actualizarPedido() {

}


/**
 * Obtiene todos los productos y coloca en array
 */
function getProductos() {
    $.ajax({
        url: "../api/productos",
        dataType: 'json',
        success: function (data) {
            arrayProductos = data;
            
        },
        error: function (e) {
            //called when there is an error
            console.log(e.message);
        }
    });
}


//Busqueda
$(document).ready(function (e) {
    $('.search-panel .dropdown-menu').find('a').click(function (e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);

    });
});

/**
 * Metodo con el que navegacmos entre los contenidos de la vista
 */
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


function cargarBuscador() {

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
    alert(this.id);

    var idPedido = this.id.split("fila");
    if (confirm('Esta seguro de cancelar ' + idPedido + "?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", '../api/pedido' + '/' + idPedido, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == "204") {
                
                nuevoListar();
                //location.reload();
            }
        }
        xhr.send();
    }
}



function cancelarPedidoParametro(idPedido) {
    if (confirm('Esta seguro de cancelar ' + idPedido + "?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", '../api/pedido' + '/' + idPedido, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == "204") {
                
                nuevoListar();
                //location.reload();
            }
        }
        xhr.send();
    }
}
