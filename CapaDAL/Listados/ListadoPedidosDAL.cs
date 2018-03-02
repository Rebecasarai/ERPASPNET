using CapaDAL.GestoraConexion;
using Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDAL.Listados
{
    public class ListadoPedidosDAL
    {
        Conexion miConexion = new Conexion();
        SqlConnection conexion = new SqlConnection();
        SqlCommand miComando = new SqlCommand();
        SqlDataReader miLector;

        public List<Pedido> getPedidos(String orden, String sentido, int pagina, int elementosPorPagina, String busquedaValor, String busquedaSegun)
        {
            List<Pedido> listadoPedidos = new List<Pedido>();
            Pedido pedido;
            String sentidoOpuesto;
            int miTop = elementosPorPagina * pagina;

            if (sentido == "desc")
            {
                sentidoOpuesto = "asc";
            }
            else
            {
                sentidoOpuesto = "desc";
            }

            try
            {
                miConexion.openConnection();
                conexion = miConexion.connection;
                if (String.IsNullOrEmpty(busquedaSegun))
                {
                    miComando.CommandText = "select p.ID, P.ID_CLiente, p.Fecha, p.PrecioTotal, c.Nombre AS NombreCliente from Pedidos AS p" +
                                                                                                            " INNER JOIN Clientes AS c ON p.ID_CLiente = c.ID" +
                                                      " where p.ID in ( " +
                                                                      "select top(@miTop) P.ID from Pedidos " +
                                                                              "where p.ID in ( " +
                                                                                              "select top(@elementosPorPagina) p.ID from Pedidos as p inner join Clientes as c on p.ID_Cliente = c.ID where Cancelado = 0 " +
                                                                                              " order by " + orden + " " + sentido + ") order by  " + orden + " " + sentidoOpuesto + " " +
                                                                     ") order by  " + orden + "  " + sentido;

                }
                else
                {

                    miComando.CommandText = "select p.ID, p.ID_CLiente, p.Fecha, p.PrecioTotal, c.Nombre AS NombreCliente from Pedidos AS p" +
                                                                                                        " INNER JOIN Clientes AS c ON p.ID_CLiente = c.ID" +
                                                     " where p.ID in ( " +
                                                                     "select top(@miTop) ID from Pedidos " +
                                                                             "where p.ID in ( " +
                                                                                             "select top(@elementosPorPagina) p.ID from Pedidos as p inner join Clientes as c" +
                                                                                             " on p.ID_CLiente = c.ID inner join Lineas_Pedido as lp on p.ID = lp.ID_Pedido" +
                                                                                             " inner join Productos as po on lp.ID_Producto = po.ID where Cancelado = 0" +
                                                                                             " order by " + orden + " " + sentido + " where " + busquedaSegun + ".Nombre like '%@busquedaValor%') order by  " + orden + " " + sentidoOpuesto + " " +
                                                                    ") order by  " + orden + "  " + sentido;

                }

                miComando.Connection = conexion;

                //Numero de la pagina
                SqlParameter paramPagina;
                paramPagina = new SqlParameter();
                paramPagina.ParameterName = "@pagina";
                paramPagina.SqlDbType = System.Data.SqlDbType.Int;
                paramPagina.Value = pagina;

                // Numero de pedidos que queremos que se muestren por pagina
                SqlParameter paramElementosPorPagina;
                paramElementosPorPagina = new SqlParameter();
                paramElementosPorPagina.ParameterName = "@elementosPorPagina";
                paramElementosPorPagina.SqlDbType = System.Data.SqlDbType.Int;
                paramElementosPorPagina.Value = elementosPorPagina;

                // 
                SqlParameter paramTop;
                paramTop = new SqlParameter();
                paramTop.ParameterName = "@miTop";
                paramTop.SqlDbType = System.Data.SqlDbType.Int;
                paramTop.Value = miTop;

                //
                SqlParameter paramBusquedaValor;
                paramBusquedaValor = new SqlParameter();
                paramBusquedaValor.ParameterName = "@busquedaValor";
                paramBusquedaValor.SqlDbType = System.Data.SqlDbType.VarChar;
                paramBusquedaValor.Value = busquedaValor;

                //Añadimos los parametros a miCommando
                miComando.Parameters.Add(paramPagina);
                miComando.Parameters.Add(paramElementosPorPagina);
                miComando.Parameters.Add(paramTop);
                miComando.Parameters.Add(paramBusquedaValor);

                miLector = miComando.ExecuteReader();

                //Si hay lineas en el Lector
                while (miLector.Read())
                {
                    pedido = new Pedido();

                    pedido.ID = (Int32)miLector["ID"];
                    pedido.IDCliente = (Int32)miLector["ID_CLiente"];
                    pedido.Fecha = (DateTime)miLector["Fecha"];
                    pedido.PrecioTotal = (Decimal)miLector["PrecioTotal"];
                    pedido.NombreCliente = (String)miLector["NombreCliente"];

                    listadoPedidos.Add(pedido);
                }
            }
            catch (SqlException sql) { throw sql; }

            return listadoPedidos;
        }//Fin de obtenerMapas




    }
}
