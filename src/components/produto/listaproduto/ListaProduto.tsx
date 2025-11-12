import { Link, useNavigate } from "react-router-dom";
import CardProduto from "../cardproduto/CardProduto";
import { SyncLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Services";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Package, Leaf, Apple } from "lucide-react";

function ListaProdutos() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token !== "") {
      buscarProdutos();
    }
  }, [token]);

  async function buscarProdutos() {
    try {
      setIsLoading(true);

      await buscar("/produto", setProdutos, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      console.error("Erro ao buscar produtos:", error);
      ToastAlerta("Erro ao buscar produtos: " + error.message, "erro");
    } finally {
      setIsLoading(false);
    }
  }

  //  Separar produtos saudáveis dos demais
  const produtosSaudaveis = produtos.filter((p) => p.saudavel);
  const produtosNormais = produtos.filter((p) => !p.saudavel);

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
            {/* Header Principal */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <Package className="w-10 h-10" />
                Produtos
              </h1>
              <Link to="/produto/cadastrar">
                <button className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300">
                  + Novo Produto
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
              <>
                {/*  SEÇÃO: Produtos Saudáveis */}
                {produtosSaudaveis.length > 0 && (
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl shadow-lg">
                        <Leaf className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">
                          Produtos Saudáveis
                        </h2>
                        <p className="text-white/80 text-sm">
                          {produtosSaudaveis.length} produto
                          {produtosSaudaveis.length !== 1 ? "s" : ""} saudável
                          {produtosSaudaveis.length !== 1 ? "is" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {produtosSaudaveis.map((produto) => (
                        <CardProduto
                          key={produto.id}
                          produto={produto}
                          exibirTags={true}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* SEÇÃO: Outros Produtos */}
                {produtosNormais.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
                        <Apple className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">
                          Outros Produtos
                        </h2>
                        <p className="text-white/80 text-sm">
                          {produtosNormais.length} produto
                          {produtosNormais.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {produtosNormais.map((produto) => (
                        <CardProduto
                          key={produto.id}
                          produto={produto}
                          exibirTags={false}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ListaProdutos;
