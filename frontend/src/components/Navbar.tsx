import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { count, openCart } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-primary-600">
            Ecommerce
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/products" className="text-gray-600 hover:text-primary-600 transition-colors">
              Produtos
            </Link>

            <button
              onClick={openCart}
              className="relative text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="Carrinho"
            >
              <span className="text-xl">🛒</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Meus Pedidos
                </Link>
                <span className="text-sm text-gray-500">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
