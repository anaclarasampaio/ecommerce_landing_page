import { Link } from 'react-router-dom';
import { Product } from '../types';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            🛍️
          </div>
        )}
      </div>

      <div className="p-4">
        <span className="text-xs text-primary-600 font-medium uppercase tracking-wide">
          {product.category.name}
        </span>
        <h3 className="mt-1 font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {Number(product.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              product.stock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
          </span>
        </div>
      </div>
    </Link>
  );
}
