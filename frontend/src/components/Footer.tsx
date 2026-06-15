import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
              Ecommerce
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Sua loja online com os melhores produtos e preços.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Início</Link></li>
              <li><Link to="/products" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Produtos</Link></li>
              <li><Link to="/orders" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Meus Pedidos</Link></li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Atendimento
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Prazo de Entrega</a></li>
              <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Institucional
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2026 Ecommerce. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visa.svg" alt="Visa" className="h-5 opacity-40 dark:invert" />
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mastercard.svg" alt="Mastercard" className="h-5 opacity-40 dark:invert" />
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pix.svg" alt="Pix" className="h-5 opacity-40 dark:invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}
