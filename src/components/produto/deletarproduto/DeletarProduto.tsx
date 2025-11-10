import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/service";
import { ClipLoader } from "react-spinners";

function DeletarProduto() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    titulo: "",
    descricao: "",
    valor: 0,
    status: false,
    cliente: { id: 0 },
  });

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      setIsLoadingData(true);
      console.log("Buscando produto ID:", id);

      await buscar(
        `/produto/${id}`,
        (dados) => {
          console.log("Produto solicitado:", dados);
          setProduto({
            id: dados.id,
            titulo: dados.titulo || "",
            descricao: dados.descricao || "",
            valor:
              typeof dados.valor === "string"
                ? parseFloat(dados.valor)
                : dados.valor || 0,
            status: dados.status || false,
            cliente: dados.cliente || { id: 0 },
          });
        },
        {}
      );
    } catch (error: any) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar produto: " + error.message);
      retornar();
    } finally {
      setIsLoadingData(false);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    if (!window.confirm("Tem certeza que deseja deletar este produto?")) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Deletando produto ID:", id);
      await deletar(`/produto/${id}`, {});
      alert("Produto removido com sucesso!");
      retornar();
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar o produto: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/produto");
  }

  if (isLoadingData) {
    return (
      <div className="bg-gradient-to-r from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] flex justify-center items-center w-full min-h-screen">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] flex justify-center items-center w-full min-h-screen p-4">
      <div className="container w-full max-w-md">
        <h1 className="text-4xl text-white text-center my-4">
          Deletar Produto
        </h1>

        <p className="text-center text-white font-semibold mb-4">
          Você tem certeza de que deseja apagar o seguinte produto?
        </p>

        {produto.id === 0 ? (
          <div className="text-center text-white">
            <p>Produto não encontrada</p>
            <button
              onClick={retornar}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Voltar
            </button>
          </div>
        ) : (
          <div className="border border-gray-200 flex flex-col rounded-2xl overflow-hidden justify-between shadow-xl">
            <header className="py-2 px-6 bg-[#0077B6] text-white font-bold text-2xl">
              {produto.titulo || "Sem título"}
            </header>

            <div className="p-6 bg-white min-h-[100px] flex flex-col gap-2">
              <p className="text-xl text-gray-700">
                {produto.descricao || "Sem descrição"}
              </p>
              <p className="text-lg font-bold text-green-600">
                R${" "}
                {(typeof produto.valor === "string"
                  ? parseFloat(produto.valor)
                  : produto.valor || 0
                ).toFixed(2)}
              </p>
              {produto.cliente && produto.cliente.id && (
                <p className="text-sm text-gray-500">
                  Cliente ID: {produto.cliente.id}
                </p>
              )}
              {produto.status && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded w-fit">
                  Ativa
                </span>
              )}
            </div>

            <div className="flex">
              <button
                className="w-full text-slate-100 bg-gray-500 hover:bg-gray-600
                  flex items-center justify-center py-3 transition-colors"
                onClick={retornar}
                disabled={isLoading}
              >
                Não
              </button>

              <button
                className="text-slate-100 bg-red-500 hover:bg-red-700 w-full
                  flex items-center justify-center transition-colors disabled:opacity-50"
                onClick={deletarProduto}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader color="white" size={24} />
                ) : (
                  <span>Sim</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeletarProduto;