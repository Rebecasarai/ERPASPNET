using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class PedidoConLineaPedido:Pedido
    {
        private List<LineaPedido> _lineasPedido;

        public PedidoConLineaPedido()
        {
            _lineasPedido = new List<LineaPedido>();
        }

        public List<LineaPedido> LineasPedido
        {
            get
            {
                return _lineasPedido;
            }
            set
            {
                _lineasPedido = value;
            }
        }

    }
}
