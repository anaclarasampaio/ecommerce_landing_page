import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Bem-vindo à nossa loja</h1>
          <p className="text-xl text-primary-100 mb-10">
            Encontre os melhores produtos com os melhores preços.
          </p>
          <Link
            to="/products"
            className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-primary-50 transition-colors text-lg inline-block"
          >
            Ver Produtos
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🚚', title: 'Frete Grátis', desc: 'Em compras acima de R$ 99' },
            { icon: '🔒', title: 'Pagamento Seguro', desc: 'Suas informações protegidas' },
            { icon: '↩️', title: 'Devolução Fácil', desc: 'Até 30 dias após a compra' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
