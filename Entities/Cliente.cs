using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Cliente
    {

        #region Propiedades
        private int _id;
        private string _nombre;
        private string _telefono;
        private string _direccion;

        #endregion Propiedades

        public Cliente()
        {
            _id = -1;
            _nombre = "";
            _telefono = "";
            _direccion = "";
        }


        #region Getters and Setters

        public int ID
        {
            get
            {
                return _id;
            }
            set
            {
                _id = value;
            }
        }

        //Longitud maxima de 30
        public string Nombre
        {
            get
            {
                return _nombre;
            }
            set
            {
                _nombre = value;
            }
        }

        //Longitud maxima de 15
        public string Telefono
        {
            get
            {
                return _telefono;
            }
            set
            {
                _telefono = value;
            }
        }

        //Longitud maxima de 200
        public string Direccion
        {
            get
            {
                return _direccion;
            }
            set
            {
                _direccion = value;
            }
        }

#endregion Getters and Setters


    }
}
