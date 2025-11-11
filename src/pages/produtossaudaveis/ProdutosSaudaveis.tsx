import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { buscar } from "../../services/Service";
import CardProduto from "../../components/produtos/CardProduto";


function ProdutosSaudaveis() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      await buscar("/produto/recomendacoes", setProdutos);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <section className="bg-linear-to-r from-[#E12727] to-[#FF9B00] py-16 px-6 text-white min-h-screen">
      <h2 className="text-3xl font-extrabold mb-2 text-center drop-shadow-md">
        Produtos Saudáveis Recomendados
      </h2>

      <p className="text-white/90 text-center mb-10 max-w-2xl mx-auto">
        Escolha alimentos equilibrados e nutritivos para o seu cardápio.  
        Promova sua saúde com nossas recomendações de pratos saudáveis!
      </p>

      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#ffffff" size={18} />
        </div>
      )}

      {!isLoading && produtos.length === 0 && (
        <span className="text-2xl text-center my-8 block">
          Nenhum produto saudável foi encontrado!
        </span>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            exibirTags={true} /*as tags saudavél e disponivel devem estar configuradas no componente CardProduto.
                            A exibição depende da interface CardProdutoProps e só vai ser ativada quando a alternativa é
                                marcada como saudável. Uma boa ideia seria deixar as tags para produtos não-saudáveis tmb.
                                Tipo propagandas de cigarro, mas não... Isso não seria atraente para os clientes*/

/>
        ))}
      </div>
    </section>
  );
}

export default ProdutosSaudaveis;
