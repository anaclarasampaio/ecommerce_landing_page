import { useEffect } from 'react';
import { Product } from '../types';

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 aspect-square bg-gray-100 shrink-0">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
                🛍️
              </div>
            )}
          </div>

          <div className="flex flex-col p-6 flex-1">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-primary-600 font-semibold uppercase tracking-wide">
                {product.category.name}
              </span>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none ml-4"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h2>

            {product.description && (
              <p className="mt-3 text-gray-500 text-sm leading-relaxed flex-1">
                {product.description}
              </p>
            )}

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  {Number(product.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    product.stock > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                </span>
              </div>

              {onAddToCart && (
                <button
                  disabled={product.stock === 0}
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="btn-primary w-full bg-gradient-to-r from-navy-800 to-navy-900 text-white py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adicionar ao carrinho
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
