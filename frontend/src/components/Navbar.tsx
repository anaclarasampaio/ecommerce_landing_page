import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoSun } from 'react-icons/go';
import { LuMoon } from 'react-icons/lu';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { count, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="bg-navy-900 shadow-sm border-b border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl text-white tracking-widest" style={{ fontFamily: 'Raleway, sans-serif' }} onClick={closeMenu}>
            Ecommerce
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/products" className="text-gray-200 hover:text-primary-400 transition-colors">
              Produtos
            </Link>

            <button
              onClick={toggleTheme}
              className="btn-icon text-gray-300 hover:text-primary-400"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <GoSun size={20} /> : <LuMoon size={20} />}
            </button>

            <button
              onClick={openCart}
              className="btn-icon relative text-gray-200 hover:text-primary-400"
              aria-label="Carrinho"
            >
              <FiShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-navy-900 text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/orders" className="text-gray-200 hover:text-primary-400 transition-colors">
                  Meus Pedidos
                </Link>
                <span className="text-sm text-gray-300">{user?.name}</span>
                <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 transition-colors">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-200 hover:text-primary-400 transition-colors">
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="btn-primary bg-white text-navy-900 font-semibold px-4 py-2 text-sm"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Mobile: icons + hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn-icon text-gray-300 hover:text-primary-400"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <GoSun size={20} /> : <LuMoon size={20} />}
            </button>

            <button
              onClick={openCart}
              className="btn-icon relative text-gray-200 hover:text-primary-400"
              aria-label="Carrinho"
            >
              <FiShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-navy-900 text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="btn-icon text-gray-200 hover:text-primary-400"
              aria-label="Menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-navy-800 bg-navy-900">
          <div className="flex flex-col px-4 py-3 gap-4">
            <Link to="/products" onClick={closeMenu} className="text-gray-200 hover:text-primary-400 transition-colors">
              Produtos
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/orders" onClick={closeMenu} className="text-gray-200 hover:text-primary-400 transition-colors">
                  Meus Pedidos
                </Link>
                <span className="text-sm text-gray-300">{user?.name}</span>
                <button onClick={handleLogout} className="text-left text-sm text-red-400 hover:text-red-300 transition-colors">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="text-gray-200 hover:text-primary-400 transition-colors">
                  Entrar
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="bg-white text-navy-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm text-center"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
