using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class PedidoConLineaPedidoYProductos:PedidoConLineaPedido
    {
        private List<Producto> _productos;

        public List<Producto> Productos
        {
            get
            {
                return _productos;
            }
            set
            {
                _productos = value;
            }
        }
    }
}
