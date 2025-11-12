import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Services";
import CardProduto from "../cardproduto/CardProduto";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { SyncLoader } from "react-spinners";
import { Leaf, Package, Filter, X, Plus } from "lucide-react";

function ListaProdutos() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const token = usuario.token;

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState<number | null>(null);

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token]);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      await buscar("/produto", setProdutos, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.error("Erro ao buscar produtos:", error);
      if (error.toString().includes("403")) {
        ToastAlerta("Token expirado, faça login novamente", "info");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
    }
  }

  useEffect(() => {
    if (token !== "") {
      buscarProdutos();
      buscarCategorias();
    }
  }, [token]);

  const produtosFiltrados = categoriaFiltro
    ? produtos.filter((produto) => produto.categoria?.id === categoriaFiltro)
    : produtos;

  const produtosSaudaveis = produtosFiltrados.filter((p) => p.saudavel);
  const produtosNaoSaudaveis = produtosFiltrados.filter((p) => !p.saudavel);

  return (
    <section className="bg-gradient-to-b from-[#FFF0E0] to-white py-8 px-4 min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-4xl font-bold text-[#E12727]">Nossos Produtos</h2>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#E12727]" />
              <select
                value={categoriaFiltro || ""}
                onChange={(e) => {
                  const valor = e.target.value ? Number(e.target.value) : null;
                  console.log("Categoria selecionada:", valor);
                  setCategoriaFiltro(valor);
                }}
                className="px-4 py-2 border-2 border-[#E12727] rounded-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E12727] bg-white min-w-[200px]"
              >
                <option value="">Todas as Categorias</option>

                {categorias.length === 0 && (
                  <option disabled>Carregando categorias...</option>
                )}

                {categorias.length > 0 &&
                  categorias.map((cat) => {
                    console.log("Renderizando categoria:", cat);
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.nome || cat.descricao || `Categoria ${cat.id}`}
                      </option>
                    );
                  })}
              </select>

              {categoriaFiltro && (
                <button
                  onClick={() => setCategoriaFiltro(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all"
                  title="Limpar filtro"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <Link to="/produto/cadastrar">
              <button className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] hover:from-[#B22222] hover:to-[#CC7A00] text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Cadastrar Produto
              </button>
            </Link>
          </div>
        </div>

        {categoriaFiltro && (
          <div className="bg-[#E12727]/10 border-2 border-[#E12727] rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-[#E12727]" />
              <span className="font-semibold text-gray-800">
                Filtrando por:{" "}
                <span className="text-[#E12727]">
                  {categorias.find((c) => c.id === categoriaFiltro)?.nome}
                </span>
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {produtosFiltrados.length} produto(s) encontrado(s)
            </span>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center w-full my-12">
            <SyncLoader color="#E12727" size={18} />
          </div>
        )}

        {!isLoading && produtosFiltrados.length === 0 && (
          <div className="text-center my-12">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <span className="text-2xl text-gray-500 block mb-4">
              {categoriaFiltro
                ? "Nenhum produto encontrado nesta categoria"
                : "Nenhum produto cadastrado"}
            </span>
            {categoriaFiltro ? (
              <button
                onClick={() => setCategoriaFiltro(null)}
                className="bg-[#E12727] text-white px-6 py-2 rounded-lg hover:bg-[#B22222] transition-all"
              >
                Ver todos os produtos
              </button>
            ) : (
              <Link to="/produto/cadastrar">
                <button className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all">
                  Cadastrar Primeiro Produto
                </button>
              </Link>
            )}
          </div>
        )}

        {!isLoading && produtosSaudaveis.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-green-700">
                Produtos Saudáveis
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
              {produtosSaudaveis.map((produto) => (
                <CardProduto
                  key={produto.id}
                  produto={produto}
                  exibirTags={true}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && produtosNaoSaudaveis.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-8 h-8 text-[#E12727]" />
              <h3 className="text-2xl font-bold text-[#E12727]">
                Outros Produtos
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {produtosNaoSaudaveis.map((produto) => (
                <CardProduto
                  key={produto.id}
                  produto={produto}
                  exibirTags={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ListaProdutos;
