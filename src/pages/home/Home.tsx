import { Link } from "react-router-dom";
import {
  ChefHat,
  Package,
  Leaf,
  TrendingUp,
  Users,
  Clock,
  Star,
} from "lucide-react";

function Home() {
  return (
    <>
      {/* Seção hero */}
      <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] flex justify-center items-center min-h-[90vh] text-white relative overflow-hidden">
        {/* Decorações de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFDD00] rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-16 py-8 md:py-10 gap-10">
          {/* Conteúdo à esquerda */}
          <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <ChefHat className="w-5 h-5 text-[#FFDD00]" />
              <span className="text-sm font-semibold">
                Plataforma #1 para Restaurantes
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Bem-vindo ao{" "}
              <span className="text-[#FFDD00] drop-shadow-lg">Delivoo</span>!
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Sua plataforma inteligente para{" "}
              <span className="font-semibold text-[#FFDD00]">
                restaurantes e lancherias
              </span>
              . Cadastre seus pratos, gerencie categorias e mantenha seu
              cardápio atualizado com facilidade.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <Link to="/produto/cadastrar">
                <button className="bg-[#FFDD00] text-[#B22222] font-bold px-8 py-4 rounded-full text-lg hover:bg-[#FFD000] hover:scale-105 transition-all shadow-xl flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Cadastrar Prato
                </button>
              </Link>
              <Link to="/produto">
                <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#E12727] transition-all flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  Ver Produtos
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm text-white/80">
              <Clock className="w-4 h-4" />
              <span>
                Suporte 24/7:{" "}
                <strong className="text-white">contato@delivoo.com</strong>
              </span>
            </div>
          </div>

          {/* Imagem à direita */}
          <div className="flex justify-center items-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFDD00]/20 to-transparent rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop"
              alt="Hambúrguer delicioso"
              className="relative rounded-full w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] object-cover drop-shadow-2xl animate-float"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/500x500?text=Delivoo";
              }}
            />
          </div>
        </div>
      </div>

      {/* status Seção */}
      <div className="bg-gradient-to-br from-[#FFF0E0] to-white py-12 px-6 border-y border-gray-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-[#E12727] mb-2">500+</div>
              <div className="text-gray-600">Restaurantes</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-[#E12727] mb-2">10k+</div>
              <div className="text-gray-600">Produtos Cadastrados</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-[#E12727] mb-2">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-[#E12727] mb-2">24/7</div>
              <div className="text-gray-600">Suporte</div>
            </div>
          </div>
        </div>
      </div>

      {/*Produtos mocks, são produtos criados localmente, eles não sao armazenados no banco de dados! Eu usei somente para exemplo de como iria ficar para o cliente*/}
      {/* Preview de Produtos Mock */}
      <div className="bg-white py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#E12727] mb-4">
              Produtos em Destaque
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja como seus produtos ficarão organizados e atraentes na
              plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Produto 1: Hambúrguer */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
                  alt="Hambúrguer Artesanal"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=Hamburguer";
                  }}
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Hambúrguer Artesanal
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Hambúrguer 180g com queijo cheddar e bacon crocante
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#E12727]">
                    R$ 25,90
                  </span>
                  <span className="text-sm text-gray-500">Estoque: 15</span>
                </div>
              </div>
            </div>

            {/* Produto 2: Salada Caesar */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664392002995-4ee10b7f91e5?w=600&q=80"
                  alt="Salada Caesar"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=Salada";
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Leaf className="w-3 h-3" />
                    Saudável
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Salada Caesar
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Alface, frango grelhado, parmesão e molho caesar
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#E12727]">
                    R$ 18,50
                  </span>
                  <span className="text-sm text-gray-500">Estoque: 20</span>
                </div>
              </div>
            </div>

            {/* Produto 3: Pizza Margherita */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80"
                  alt="Pizza Margherita"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=Pizza";
                  }}
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Pizza Margherita
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Molho, mussarela, tomate fresco e manjericão
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#E12727]">
                    R$ 35,00
                  </span>
                  <span className="text-sm text-gray-500">Estoque: 8</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/produto">
              <button className="bg-[#E12727] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#B22222] transition-all shadow-lg hover:shadow-xl hover:scale-105">
                Ver Todos os Produtos
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Seção */}
      <div className="bg-gradient-to-br from-[#FFF0E0] to-white py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#E12727] mb-4">
              Por que escolher o Delivoo?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seu cardápio de forma
              profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#E12727] mb-3">
                Gestão Simplificada
              </h4>
              <p className="text-gray-600">
                Cadastre e gerencie seus produtos de forma rápida e intuitiva.
                Interface moderna e fácil de usar.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#E12727] mb-3">
                Produtos Saudáveis
              </h4>
              <p className="text-gray-600">
                Destaque opções saudáveis no seu cardápio e atraia mais clientes
                preocupados com bem-estar.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#E12727] mb-3">
                Aumente suas Vendas
              </h4>
              <p className="text-gray-600">
                Organize melhor seu cardápio e aumente a satisfação dos clientes
                com um sistema profissional.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção como funciona */}
      <div className="bg-white py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#E12727] mb-4">
              Como Funciona?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comece a usar o Delivoo em 3 passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Passo 1 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Cadastre-se
              </h4>
              <p className="text-gray-600">
                Crie sua conta gratuitamente em menos de 1 minuto. Sem taxas ou
                mensalidades.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Adicione Produtos
              </h4>
              <p className="text-gray-600">
                Cadastre seus pratos com fotos, preços, descrições e estoques.
                Fácil e rápido!
              </p>
            </div>

            {/* Passo 3 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Organize Categorias
              </h4>
              <p className="text-gray-600">
                Mantenha seu cardápio organizado por categorias. Facilite a
                navegação dos clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Seção */}
      <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] py-16 px-6 text-white">
        <div className="container mx-auto text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-[#FFDD00]" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Junte-se a centenas de restaurantes!
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Comece agora a transformar a gestão do seu cardápio com o Delivoo.
            Simples, rápido e eficiente. 100% gratuito!
          </p>
          <Link to="/cadastro">
            <button className="bg-[#FFDD00] text-[#B22222] px-10 py-4 rounded-full text-xl font-bold hover:bg-[#FFD000] hover:scale-105 transition-all shadow-2xl">
              Criar Conta Grátis
            </button>
          </Link>
          <p className="text-sm text-white/70 mt-4">
            ⚡ Sem cartão de crédito • Sem mensalidade • Suporte 24/7
          </p>
        </div>
      </div>
      {/* Depoimentos Seção */}
      <div className="bg-gradient-to-br from-[#FFF0E0] to-white py-20 px-6">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-[#E12727] mb-12 text-center">
            O que nossos clientes dizem
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Depoimento 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 mb-4 text-[#FFDD00]">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-600 mb-4 italic">
                "O Delivoo transformou a gestão do nosso restaurante. Muito mais
                organizado!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E12727] rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="font-bold text-gray-800">Maria Silva</div>
                  <div className="text-sm text-gray-500">
                    Restaurante Bella Itália
                  </div>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 mb-4 text-[#FFDD00]">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Interface super intuitiva! Cadastramos nosso cardápio completo
                em menos de 1 hora."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF9B00] rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <div className="font-bold text-gray-800">João Santos</div>
                  <div className="text-sm text-gray-500">Burguer House</div>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 mb-4 text-[#FFDD00]">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Excelente sistema! O destaque de produtos saudáveis aumentou
                nossas vendas desse segmento."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="font-bold text-gray-800">Ana Costa</div>
                  <div className="text-sm text-gray-500">Green Salads & Co</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

export default Home;
