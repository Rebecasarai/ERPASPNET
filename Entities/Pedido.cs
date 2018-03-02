using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Pedido
    {

        #region Propiedades
        private int _id;
        private int _idCliente;
        private DateTime _fecha;
        private Decimal _precioTotal;
        public String NombreCliente { get; set; }

        #endregion Propiedades

        public Pedido()
        {
            _id = -1;
            _idCliente = -1;
            _fecha = new DateTime();
            _precioTotal = 0;
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

        public int IDCliente
        {
            get
            {
                return _idCliente;
            }
            set
            {
                _idCliente = value;
            }
        }

        public DateTime Fecha
        {
            get
            {
                return _fecha;
            }
            set
            {
                _fecha = value;
            }
        }

        public Decimal PrecioTotal
        {
            get
            {
                return _precioTotal;
            }
            set
            {
                _precioTotal = value;
            }
        }

        #endregion Getters and Setters



    }
}
