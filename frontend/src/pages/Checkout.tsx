import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

type Step = 'review' | 'confirm' | 'success';

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('review');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <p className="text-lg">Você precisa estar logado para finalizar a compra.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Entrar
        </button>
      </div>
    );
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <span className="text-5xl">🛒</span>
        <p>Seu carrinho está vazio.</p>
        <button
          onClick={() => navigate('/products')}
          className="text-primary-600 hover:underline"
        >
          Ver produtos
        </button>
      </div>
    );
  }

  async function placeOrder() {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/orders', {
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      });
      setOrderId(data.id);
      clearCart();
      setStep('success');
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Erro ao finalizar pedido. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <span className="text-6xl">✅</span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pedido realizado com sucesso!</h1>
        <p className="text-gray-500">
          Seu pedido <span className="font-mono font-semibold">#{orderId.slice(-8).toUpperCase()}</span> foi
          confirmado com sucesso.
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate('/orders')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Ver meus pedidos
          </button>
          <button
            onClick={() => navigate('/products')}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continuar comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>

      <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
        <span className={step === 'review' ? 'text-primary-600 font-semibold' : ''}>
          Revisão
        </span>
        <span>→</span>
        <span className={step === 'confirm' ? 'text-primary-600 font-semibold' : ''}>
          Confirmação
        </span>
      </div>

      {step === 'review' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
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
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">Qtd: {quantity}</p>
                </div>
                <span className="font-semibold text-gray-900">
                  {(Number(product.price) * quantity).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 flex justify-between font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>

          <button
            onClick={() => setStep('confirm')}
            className="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 'confirm' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-700 text-sm">
            Confirme os dados do seu pedido antes de finalizar.
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Itens ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Frete</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep('review')}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Voltar
            </button>
            <button
              onClick={placeOrder}
              disabled={loading}
              className="flex-1 bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
