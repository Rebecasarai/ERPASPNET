using CapaDAL.GestoraConexion;
using Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDAL.Gestoras
{
    public class GestoraPedidosDAL
    {

        /// <summary>
        /// Inserta un nuevo pedido en la base de datos y todas sus Lineas de pedido
        /// </summary>
        /// <param name="pedidoConLineaPedido"></param>
        /// <returns>Un entero con las filas afectadas</returns>
        public int insertPedido(PedidoConLineaPedido pedidoConLineaPedido)
        {
            int affectedRows = 0;
            int idPedidoInsertado = -1;
            SqlCommand sqlCommandInsertPedido;
            SqlCommand sqlCommandInsertLineaPedido;
            Conexion conexion = new Conexion();
            SqlParameter parameterIdCliente=new SqlParameter();
            SqlParameter parameterCantidad = new SqlParameter();
            SqlParameter parameterPrecioVenta = new SqlParameter();
            SqlParameter parameterIdProducto = new SqlParameter();
            SqlParameter parameterIdPedido = new SqlParameter();
            SqlParameter parameterOutPut = new SqlParameter();

            try
            {
                conexion.openConnection();
                sqlCommandInsertPedido = new SqlCommand("InsertarPedido", conexion.connection);
                sqlCommandInsertPedido.CommandType = System.Data.CommandType.StoredProcedure;

                parameterIdCliente.ParameterName = "@ID_Cliente";
                parameterIdCliente.SqlDbType = System.Data.SqlDbType.Int;
                parameterIdCliente.Value = pedidoConLineaPedido.IDCliente;

                parameterOutPut.ParameterName = "@ID_Pedido";
                parameterOutPut.SqlDbType = System.Data.SqlDbType.Int;
                parameterOutPut.Direction = System.Data.ParameterDirection.Output;

                sqlCommandInsertPedido.Parameters.Add(parameterIdCliente);
                sqlCommandInsertPedido.Parameters.Add(parameterOutPut);

                //Llamada a procedimento para insertar pedido
                affectedRows = sqlCommandInsertPedido.ExecuteNonQuery();
                idPedidoInsertado = Convert.ToInt32(sqlCommandInsertPedido.Parameters["@ID_Pedido"].Value);

                //Parametros para llamada a aprocedimiento para insertar lineas de pedido
                sqlCommandInsertLineaPedido = new SqlCommand("InsertarLineaPedido", conexion.connection);//Nombre
                sqlCommandInsertLineaPedido.CommandType = System.Data.CommandType.StoredProcedure;

                parameterCantidad.ParameterName = "@Cantidad";
                parameterCantidad.SqlDbType = System.Data.SqlDbType.Int;

                parameterPrecioVenta.ParameterName = "@PrecioVenta";
                parameterPrecioVenta.SqlDbType = System.Data.SqlDbType.Decimal;

                parameterIdProducto.ParameterName = "@ID_Producto";
                parameterIdProducto.SqlDbType = System.Data.SqlDbType.Int;

                parameterIdPedido.ParameterName = "@ID_Pedido";
                parameterIdPedido.SqlDbType = System.Data.SqlDbType.Int;
                parameterIdPedido.Value = idPedidoInsertado;

                //Bucle para insertar las distintas lineas del pedido
                for (int i=0;i<pedidoConLineaPedido.LineasPedido.Count;i++)      
                {
                    //Llamada a procedimiento para insertar cada linea de pedido
                    //IdPedido, idProducto, Cantidad, PrecioVenta
                    parameterIdProducto.Value = pedidoConLineaPedido.LineasPedido.ElementAt(i).IDProducto;
                    parameterPrecioVenta.Value = Math.Round(pedidoConLineaPedido.LineasPedido.ElementAt(i).PrecioVenta, 2);
                    parameterCantidad.Value = pedidoConLineaPedido.LineasPedido.ElementAt(i).Cantidad;

                    sqlCommandInsertLineaPedido.Parameters.Add(parameterIdPedido);
                    sqlCommandInsertLineaPedido.Parameters.Add(parameterIdProducto);
                    sqlCommandInsertLineaPedido.Parameters.Add(parameterCantidad);
                    sqlCommandInsertLineaPedido.Parameters.Add(parameterPrecioVenta);

                    affectedRows=affectedRows + sqlCommandInsertLineaPedido.ExecuteNonQuery();

                    sqlCommandInsertLineaPedido.Parameters.Clear();
                }
            }
            catch (SqlException e)
            {
                throw e;
            }
            finally
            {
                conexion.connection.Close();
            }
            return affectedRows;
        }

        /// <summary>
        /// Actual
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public int actualizarPedido(int id, PedidoConLineaPedido value)
        {
            int affectedRows = 0;
            try
            {
                Conexion conexion = new Conexion();
                SqlConnection conection = conexion.connection;
                conection.Open();

                SqlCommand comando = new SqlCommand("EXECUTE  BorrarLineasPedido (@ID_Pedido)", conection);
                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.Parameters.Add("@ID_Pedido", SqlDbType.Int).Value = value.ID;

                comando.ExecuteNonQuery();

                comando = new SqlCommand("EXECUTE InsertarLineaPedido(@ID_Pedido,@ID_Producto,@Cantidad,@PrecioVenta)", conection);
                foreach (LineaPedido lp in value.LineasPedido)
                {
                    comando.CommandType = System.Data.CommandType.StoredProcedure;
                    comando.Parameters.Add("@ID_Pedido", SqlDbType.Int).Value = value.ID;
                    comando.Parameters.Add("@ID_Producto", SqlDbType.Int).Value = lp.IDProducto;
                    comando.Parameters.Add("@Cantidad", SqlDbType.Int).Value = lp.Cantidad;
                    comando.Parameters.Add("@PrecioVenta", SqlDbType.Money).Value = lp.PrecioVenta;

                    comando.ExecuteNonQuery();
                }
               // comando.Parameters.Add("ID", value.ID);          
                affectedRows = comando.ExecuteNonQuery();
                conection.Close();
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.Message);
            }
            return affectedRows;
        }

        /// <summary>
        /// Marca un pedido como cancelado en la base de datos
        /// </summary>
        /// <param name="id_pedido"></param>
        public int cancelarPedido(int id_pedido)
        {
            int affectedRows = 0;
            Conexion con = new Conexion();
            try
            {
                con.openConnection();
                SqlCommand comando = new SqlCommand("EXECUTE CancelarPedido @ID_Pedido", con.connection);
                comando.Parameters.Add("@ID_Pedido", SqlDbType.Int).Value = id_pedido;
                affectedRows = comando.ExecuteNonQuery();
                con.connection.Close();
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.Message);
            }
            return affectedRows;
        }


        /// <summary>
        /// Devuelve un pedido concreto y todas sus lineas de pedido
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public PedidoConLineaPedidoYProductos getPedido(int id)
        {
            PedidoConLineaPedidoYProductos pedidoConLineaPedidoYProductos = null;
            SqlConnection conexion = new SqlConnection();
            Conexion miConexion = new Conexion();
            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector;
            //Buscamos el pedido 
            try
            {
                miConexion.openConnection();
                conexion = miConexion.connection;
                miComando.CommandText = "SELECT * FROM Pedidos WHERE id = @id";
                SqlParameter param;
                param = new System.Data.SqlClient.SqlParameter();
                param.ParameterName = "@id";
                param.SqlDbType = System.Data.SqlDbType.Int;
                param.Value = id;

                miComando.Parameters.Add(param);

                miComando.Connection = conexion;
                miLector = miComando.ExecuteReader();
                //Si hay lineas en el lector
                if (miLector.HasRows)
                {
                    pedidoConLineaPedidoYProductos = new PedidoConLineaPedidoYProductos();
                    miLector.Read();
                    pedidoConLineaPedidoYProductos = new PedidoConLineaPedidoYProductos();
                    pedidoConLineaPedidoYProductos.ID = (int)miLector["ID"];
                    pedidoConLineaPedidoYProductos.Fecha = (DateTime)miLector["Fecha"];
                    pedidoConLineaPedidoYProductos.IDCliente = (int)miLector["ID_Cliente"];
                    pedidoConLineaPedidoYProductos.PrecioTotal = (decimal)miLector["PrecioTotal"];

                    miLector.Close();

                    //Se insertan sus lineas de pedido
                    pedidoConLineaPedidoYProductos.LineasPedido = getLineasPedido(id, conexion);

                    //Se insertan los productos
                    pedidoConLineaPedidoYProductos.Productos = getProductos(conexion);
                }
                miConexion.connection.Close();
            }
            catch (Exception e)
            {
                throw e;
            }
            return pedidoConLineaPedidoYProductos;
        }    
        /// <summary>
        /// Devuelve un listado de LineasPedido segun la id del pedido, si no hay lineas de pedido devuelve null
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<LineaPedido> getLineasPedido(int id, SqlConnection conexion)
        {
            List<LineaPedido> lineasPedido = null;

            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector;
            //Buscamos las lineas de pedido
            try
            {
                miComando.CommandText = "SELECT * FROM Lineas_Pedido WHERE ID_Pedido = @id";
                SqlParameter param;
                param = new System.Data.SqlClient.SqlParameter();
                param.ParameterName = "@id";
                param.SqlDbType = System.Data.SqlDbType.Int;
                param.Value = id;

                miComando.Parameters.Add(param);

                miComando.Connection = conexion;
                miLector = miComando.ExecuteReader();
                //Si hay lineas en el lector
                if (miLector.HasRows)
                {
                    lineasPedido = new List<LineaPedido>();
                    LineaPedido LineaPedidoMolde;
                    while (miLector.Read())
                    {
                        LineaPedidoMolde = new LineaPedido();
                        LineaPedidoMolde.IDPedido = (int)miLector["ID_Pedido"];
                        LineaPedidoMolde.IDProducto = (int)miLector["ID_Producto"];
                        LineaPedidoMolde.Cantidad = (int)miLector["Cantidad"];
                        LineaPedidoMolde.PrecioVenta = (decimal)miLector["PrecioVenta"];
                        lineasPedido.Add(LineaPedidoMolde);
                    }
                }
                miLector.Close();

            }
            catch (Exception e)
            {
                throw e;
            }

            return lineasPedido;
        }

        /// <summary>
        /// Devuelve un listado con todos los productos, en caso de que no hubiese devuelve null.
        /// </summary>
        /// <returns></returns>
        public List<Producto> getProductos(SqlConnection conexion)
        {
            List<Producto> listaProductos = null;
            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector;
            //Buscamos las lineas de pedido
            try
            {
                
                miComando.CommandText = "SELECT * FROM Productos";
                miComando.Connection = conexion;
                miLector = miComando.ExecuteReader();
                //Si hay lineas en el lector
                if (miLector.HasRows)
                {
                    listaProductos = new List<Producto>();
                    Producto productoMolde;
                    while (miLector.Read())
                    {
                        productoMolde = new Producto();
                        productoMolde.ID = (int)miLector["ID"];
                        productoMolde.Nombre = (String)miLector["Nombre"];
                        productoMolde.Descripcion = (String)miLector["Descripcion"];
                        productoMolde.PrecioUnitario = (decimal)miLector["Precio_Unitario"];
                        productoMolde.Stock = (int)miLector["Stock"];
                        productoMolde.Baja = (bool)miLector["Baja"];

                        listaProductos.Add(productoMolde);
                    }
                }
                miLector.Close();               
            }
            catch (Exception e)
            {
                throw e;
            }
            return listaProductos;
        }

        /// <summary>
        /// Devuelve un listado con todos los productos, en caso de que no hubiese devuelve null.
        /// </summary>
        /// <returns></returns>
        public List<Producto> getProductos()
        {
            Conexion conexion = new Conexion();
            List<Producto> listaProductos = null;
            //Buscamos las lineas de pedido
            try
            {
                conexion.openConnection();
                listaProductos = getProductos(conexion.connection);
                conexion.connection.Close();
            }
            catch (Exception e)
            {
                throw e;
            }
            return listaProductos;
        }


    }
}
