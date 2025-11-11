import { Link } from "react-router-dom";
import { ChefHat, Package, Leaf, TrendingUp, Users, Clock } from "lucide-react";

function Home() {
  return (
    <>
      {/* Hero Section */}
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
              className="relative rounded-full w-116 h-106 max-w-[380px] md:max-w-[480px] lg:max-w-[550px] object-contain drop-shadow-2xl animate-float"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/500x500?text=Delivoo";
              }}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-[#E12727] mb-12 text-center">
            Por que escolher o Delivoo?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-[#FFF0E0] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
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
            <div className="bg-gradient-to-br from-[#FFF0E0] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
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
            <div className="bg-gradient-to-br from-[#FFF0E0] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
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

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] py-16 px-6 text-white">
        <div className="container mx-auto text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-[#FFDD00]" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Junte-se a centenas de restaurantes!
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Comece agora a transformar a gestão do seu cardápio com o Delivoo.
            Simples, rápido e eficiente.
          </p>
          <Link to="/cadastro">
            <button className="bg-[#FFDD00] text-[#B22222] px-10 py-4 rounded-full text-xl font-bold hover:bg-[#FFD000] hover:scale-105 transition-all shadow-2xl">
              Criar Conta Grátis
            </button>
          </Link>
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
