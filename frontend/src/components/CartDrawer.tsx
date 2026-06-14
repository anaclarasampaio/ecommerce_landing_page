import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export function CartDrawer() {
  const { items, total, count, isOpen, closeCart, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={closeCart} />

      <aside className="fixed right-0 top-0 h-full w-full max-w-sm z-50 bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            Carrinho{' '}
            {count > 0 && (
              <span className="ml-1 text-sm font-normal text-gray-400">({count} itens)</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
            aria-label="Fechar carrinho"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <span className="text-5xl">🛒</span>
            <p className="text-sm">Seu carrinho está vazio.</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-gray-100 px-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="py-4 flex gap-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">🛍️</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {Number(product.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm leading-none"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm leading-none disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {(Number(product.price) * quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 px-5 py-4 space-y-3">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
                className="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
