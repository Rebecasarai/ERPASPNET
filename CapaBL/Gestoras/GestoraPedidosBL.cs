using CapaDAL.Gestoras;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaBL.Gestoras
{
    public class GestoraPedidosBL
    {

        /// <summary>
        /// Inserta un nuevo pedido en la base de datos y todas sus Lineas de pedido
        /// </summary>
        /// <param name="pedidoConLineaPedido"></param>
        /// <returns>Un entero con las filas afectadas</returns>
        public int insertPedido(PedidoConLineaPedido pedidoConLineaPedido)
        {
            int affectedRows = 0;
            GestoraPedidosDAL gestoraPedidoDAL = new GestoraPedidosDAL();

            if (pedidoValido(pedidoConLineaPedido))
            {
                try
                {
                    affectedRows = gestoraPedidoDAL.insertPedido(pedidoConLineaPedido);
                }
                catch (Exception e)
                {
                    throw e;
                }             
            }  
            return affectedRows;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
        private bool pedidoValido(PedidoConLineaPedido p)
        {
            bool b = true;

            //Revisamos que ninguna linea tiene una cantidad inferior a 1
            for (int i = 0; i < p.LineasPedido.Count; i++)
            {
                if (p.LineasPedido[i].Cantidad < 1)
                {
                    b = false;
                }
            }

            return b;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int cancelarPedido(int id)
        {
            int affectedRows = 0;
            GestoraPedidosDAL gestoraPedidosDAL = new GestoraPedidosDAL();
            //Devuleve las lineas afectadas??
            try
            {
                affectedRows = gestoraPedidosDAL.cancelarPedido(id);
            }catch(Exception e)
            {
                throw e;
            } 
            return affectedRows;
        }

        /// <summary>
        /// Devuelve un pedido concreto y todas sus lineas de pedido
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public PedidoConLineaPedido getPedidoBL(int id)
        {
            GestoraPedidosDAL gestoraPedidosDAL = new GestoraPedidosDAL();
            PedidoConLineaPedido p = new PedidoConLineaPedido();
            try
            {
                p = gestoraPedidosDAL.getPedido(id);
            }
            catch (Exception e)
            {
                throw e;
            }
            return p;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="p"></param>
        /// <returns></returns>
        public int actualizarPedido(int id, PedidoConLineaPedido p)
        {
            GestoraPedidosDAL gestoraPedidosDAL = new GestoraPedidosDAL();
            int r = 0;
            if (pedidoValido(p))
            {
                try
                {
                    r = gestoraPedidosDAL.actualizarPedido(id, p);
                }catch(Exception e)
                {
                    throw e;
                }
            }       
            return r;
        }


        /// <summary>
        /// Devuelve un listado con todos los productos, en caso de que no hubiese devuelve null.
        /// </summary>
        /// <returns></returns>
        public List<Producto> getProductos()
        {
            GestoraPedidosDAL gestoraPedidosDAL = new GestoraPedidosDAL();
            List<Producto> listaProductos = new List<Producto>();
           
            try
            {
                listaProductos = gestoraPedidosDAL.getProductos();  
            }
            catch (Exception e)
            {
                throw e;
            }
            return listaProductos;
        }


    }
}
