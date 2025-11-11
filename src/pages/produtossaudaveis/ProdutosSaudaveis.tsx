import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import CardProduto from "../../components/produto/cardproduto/CardProduto";
import type Produto from "../../models/Produto";
import { Leaf, Sparkles } from "lucide-react";
import { buscar } from "../../services/Services";

function ProdutosSaudaveis() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      // Ajuste a rota conforme seu backend
      await buscar("/produto", setProdutos, {});
      // Filtra apenas produtos saudáveis no frontend (se necessário)
      // setProdutos(produtos.filter(p => p.saudavel));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#FFF0E0] to-white py-16 px-6 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-10 h-10 text-green-600" />
            <h2 className="text-4xl font-extrabold text-[#E12727]">
              Produtos Saudáveis
            </h2>
            <Sparkles className="w-10 h-10 text-yellow-500" />
          </div>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Escolha alimentos equilibrados e nutritivos para o seu cardápio.
            Promova sua saúde com nossas recomendações de pratos saudáveis!
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center w-full my-12">
            <SyncLoader color="#E12727" size={18} />
          </div>
        )}

        {/* Mensagem quando não há produtos */}
        {!isLoading && produtos.length === 0 && (
          <div className="text-center my-12">
            <Leaf className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <span className="text-2xl text-gray-500 block">
              Nenhum produto saudável foi encontrado!
            </span>
            <p className="text-gray-400 mt-2">
              Cadastre produtos marcados como saudáveis para vê-los aqui.
            </p>
          </div>
        )}

        {/* Grid de Produtos */}
        {!isLoading && produtos.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtos.map((produto) => (
              <CardProduto
                key={produto.id}
                produto={produto}
                exibirTags={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProdutosSaudaveis;
