using CapaBL.Gestoras;
using CapaBL.Listados;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIERP.Controllers
{
    public class PedidoController : ApiController
    {
        // GET: api/Pedido
        public IEnumerable<Pedido> Get(String orden=null, String sentido = null, int numPagina=0, int nElementosPagina=0, String BusquedaValor = null, String BusquedaSegun = null)
        {
            Boolean entra = true;
            List<Pedido> listaPedidos = null;
            ListadoPedidosBL listadoPedidosBL = new ListadoPedidosBL();
            try
            {
                listaPedidos = listadoPedidosBL.getPedidos(orden, sentido, numPagina, nElementosPagina, BusquedaValor, BusquedaSegun);//
            }catch(Exception e)
            {
                //throw e;
                entra = false;
            }
            if (listaPedidos == null)
            {
                if (entra)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }
                else
                {                  
                    throw new HttpResponseException(HttpStatusCode.InternalServerError);
                }
            }
            else {
                return listaPedidos;
            }           
        }

        // GET: api/Pedido/5
        public PedidoConLineaPedidoYProductos Get(int id)
        {
            PedidoConLineaPedidoYProductos pedidoConLineaPedidoYProductos = new PedidoConLineaPedidoYProductos();
            GestoraPedidosBL gestoraPedidosBL = new GestoraPedidosBL();
            try
            {
                pedidoConLineaPedidoYProductos = gestoraPedidosBL.getPedidoBL(id);
            }catch(Exception e)
            {
                throw e;
            }
            return pedidoConLineaPedidoYProductos;
        }

        /*public Object Get() {
            throw new HttpResponseException(HttpStatusCode.BadRequest);
        }*/

        // POST: api/Pedido
        public void Post([FromBody]PedidoConLineaPedido value)
        {
            GestoraPedidosBL gestoraPedidosBL = new GestoraPedidosBL();
            try
            {
                gestoraPedidosBL.insertPedido(value);
            }catch(Exception e)
            {
                throw e;
            }
        }

        //POST De Testeo
       /* public void Post()
        {
            GestoraPedidosBL gestoraPedidosBL = new GestoraPedidosBL();
            PedidoConLineaPedido pedidoConLinea = new PedidoConLineaPedido();
            LineaPedido lineaPedido = new LineaPedido();
            lineaPedido.IDProducto = 73;
            lineaPedido.Cantidad = 10;
            lineaPedido.PrecioVenta = 50;

            LineaPedido lineaPedido2 = new LineaPedido();
            lineaPedido2.IDProducto = 74;
            lineaPedido2.Cantidad = 10;
            lineaPedido2.PrecioVenta = 50;

            pedidoConLinea.IDCliente = 1;
            pedidoConLinea.LineasPedido.Add(lineaPedido);
            pedidoConLinea.LineasPedido.Add(lineaPedido2);
            try
            {
                gestoraPedidosBL.insertPedido(pedidoConLinea);
            }
            catch (Exception e)
            {
                throw e;
            }
        }*/

        // PUT: api/Pedido/5
        public void Put(int id, [FromBody]PedidoConLineaPedido value)
        {
            GestoraPedidosBL gestoraPedidosBL = new GestoraPedidosBL();
            try
            {
                gestoraPedidosBL.actualizarPedido(id, value);
            }catch(Exception e)
            {
                throw e;
            }
        }

        // DELETE: api/Pedido/5
        public void Delete(int id)//Para cancelar el pedido
        {
            GestoraPedidosBL gestoraPedidosBL = new GestoraPedidosBL();
            try
            {
                gestoraPedidosBL.cancelarPedido(id);
            }
            catch (Exception e)
            {
                throw e;
            }
        }



    }
}
