using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class LineaPedido
    {
        #region Propiedades
        private int _idProducto;
        private int _idPedido;
        private int _cantidad;
        private Decimal _precioVenta;

        #endregion Propiedades

        public LineaPedido()
        {
            _idProducto = -1;
            _idPedido = -1;
            _cantidad = 0;
            _precioVenta = 0;
        }


        #region Getters and Setters

        public int IDProducto
        {
            get
            {
                return _idProducto;
            }
            set
            {
                _idProducto = value;
            }
        }

        public int IDPedido
        {
            get
            {
                return _idPedido;
            }
            set
            {
                _idPedido = value;
            }
        }

        public int Cantidad
        {
            get
            {
                return _cantidad;
            }
            set
            {
                _cantidad = value;
            }
        }

        public Decimal PrecioVenta
        {
            get
            {
                return _precioVenta;
            }
            set
            {
                _precioVenta = value;
            }
        }

        #endregion Getters and Setters






    }
}
