import { Link } from "react-router-dom";
import CardProduto from "../cardproduto/CardProduto";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/service";

function ListaProdutos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      await buscar("/produto", setProdutos, {});
    } catch (error: any) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao buscar produtos: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] min-h-screen py-8">
      <div className="container mx-auto px-4">
        {isLoading && (
          <div className="flex justify-center my-8">
            <SyncLoader color="white" size={32} />
          </div>
        )}

        {!isLoading && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-white">Produtos</h1>
              <Link to="/produto/cadastrar">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300">
                  + Novo produto
                </button>
              </Link>
            </div>

            {produtos.length === 0 ? (
              <div className="text-center">
                <span className="text-3xl text-white">
                  Nenhum produto foi encontrado!
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {produtos.map((produto) => (
                  <CardProduto key={produto.id} produto={produto} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ListaProdutos;