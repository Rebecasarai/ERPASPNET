using CapaDAL.Listados;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaBL.Listados
{
    public class ListadoPedidosBL
    {

        public List<Pedido> getPedidos(String orden, String sentido, int numPagina, int nElementosPagina, String BusquedaValor, String BusquedaSegun)
        {
            List<Pedido> r = null;
            bool fallo = false;

            //validación orden
            if (orden != "Fecha" && orden != "Cliente" && orden != "PrecioTotal")
            {
                orden = "Fecha";
            }

            //validación sentido
            if (sentido != "ASC" && sentido != "DESC")
            {
                switch (orden)
                {
                    case "Fecha":
                        sentido = "DESC";
                        break;
                    case "Cliente":
                        sentido = "ASC";
                        break;
                    case "PrecioTotal":
                        sentido = "DESC";
                        break;
                    default:
                        sentido = "DESC";
                        break;
                }
            }

            //Validación numPagina
            if (numPagina < 0)
            {
                fallo = true;
            }

            //por defecto
            if (numPagina == 0)
            {
                numPagina = 1;
            }

            //Validación nElementosPagina
            if (nElementosPagina < 0)
            {
                fallo = true;
            }

            //por defecto
            if (nElementosPagina == 0)
            {
                nElementosPagina = 10;
            }

            //Validar busquedas (tienen que estar las dos llenas o las dos vacías)

            if (BusquedaSegun == null)
            {
                BusquedaSegun = "";
            }
            if (BusquedaValor == null) {
                BusquedaValor = "";
            }
                if ((BusquedaValor.Equals("") && !BusquedaSegun.Equals("")) || (!BusquedaValor.Equals("") && BusquedaSegun.Equals("")))
                {
                    fallo = true;
                }

                //Valores válidos para BusquedaSegún
                if (!BusquedaSegun.Equals("") && !BusquedaSegun.Equals("Cliente") && !BusquedaSegun.Equals("Producto"))
                {
                    fallo = true;
                }             
            
            if (!fallo)
            {
                ListadoPedidosDAL cDAL = new ListadoPedidosDAL();
                r = cDAL.getPedidos(orden, sentido, numPagina, nElementosPagina, BusquedaValor, BusquedaSegun);
            }
            return r;
        }

    }
}

