using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Producto
    {
        #region Propiedades
        private int _id;
        private string _nombre;
        private string _descripcion;
        private Decimal _precioUnitario;
        private int _stock;
        private Boolean _baja;

        #endregion Propiedades

        public Producto()
        {
            _id = -1;
            _nombre = "";
            _descripcion = "";
            _precioUnitario = 0;
            _stock = 0;
            _baja = false;
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

        //Longitud maxima de 50
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

        //Longitud maxima de 200
        public string Descripcion
        {
            get
            {
                return _descripcion;
            }
            set
            {
                _descripcion = value;
            }
        }

        public Decimal PrecioUnitario
        {
            get
            {
                return _precioUnitario;
            }
            set
            {
                _precioUnitario = value;
            }
        }

        public int Stock
        {
            get
            {
                return _stock;
            }
            set
            {
                _stock = value;
            }
        }

        public Boolean Baja
        {
            get
            {
                return _baja;
            }
            set
            {
                _baja = value;
            }
        }

        #endregion Getters and Setters




    }
}
