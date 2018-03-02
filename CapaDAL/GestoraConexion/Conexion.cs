using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDAL.GestoraConexion
{
    public  class Conexion
    {
        private String server = "server=nervionerp.database.windows.net";
        private String dataBase = "database=erpes";
        private String uid = "uid=erpepe";
        private String pass = "pwd=Prueba123";

        public SqlConnection connection { get; }


        public Conexion()
        {
            connection = new SqlConnection();
        }


        /// <summary>
        /// Returns the data necessary for the connection to the database
        /// </summary>
        /// <returns></returns>
        public String getDataConnection()
        {
            String datosConexion = server + ";" + dataBase + ";" + uid + ";" + pass;
            return datosConexion;
        }

        /// <summary>
        /// Open connection with data base
        /// </summary>
        /// <returns>Boolean, true if open the connection correctly else false</returns>
        public Boolean openConnection()
        {
            Boolean ok = true;

            try
            {
                connection.ConnectionString = getDataConnection();
                connection.Open();
            }
            catch (SqlException e)
            {
                ok = false;
            }
            return ok;
        }


        /// <summary>
        /// Return state of Object SqlConnection
        /// </summary>
        /// <returns>String with value "Open" if connection is open, "Closed" if connection is closed </returns>
        public String getState()
        {
            String state = this.connection.State.ToString();
            return state;
        }



    }
}
