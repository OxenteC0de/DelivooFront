import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { ClipLoader } from "react-spinners";
import { buscar, deletar } from "../../../services/Services";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarCategoria() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    descricao: "",
  });
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token, navigate]);

  async function buscarPorId(id: string) {
    try {
      setIsLoadingData(true);
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.error("Erro ao buscar categoria:", error);
      ToastAlerta("Erro ao buscar categoria", "erro");
      retornar();
    } finally {
      setIsLoadingData(false);
    }
  }

  useEffect(() => {
    if (id !== undefined && token !== "") {
      buscarPorId(id);
    }
  }, [id, token]);

  async function deletarCategoria() {
    if (!window.confirm("Tem certeza que deseja deletar esta categoria?")) {
      return;
    }

    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Categoria removida com sucesso!", "sucesso");
      retornar();
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      ToastAlerta("Erro ao deletar a categoria", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/categorias");
  }

  if (isLoadingData) {
    return (
      <div className="bg-gradient-to-b from-[#FFF0E0] to-white flex justify-center items-center w-full min-h-screen">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#FFF0E0] to-white flex justify-center items-center w-full min-h-screen p-4">
      <div className="container w-full max-w-md">
        <h1 className="text-4xl text-black text-center my-4">
          Deletar Categoria
        </h1>

        <p className="text-center text-black font-semibold mb-4">
          Você tem certeza de que deseja apagar a seguinte categoria?
        </p>

        {categoria.id === 0 ? (
          <div className="text-center text-white">
            <p>Categoria não encontrada</p>
            <button
              onClick={retornar}
              className="mt-4 bg-orange-500 hover:bg-yellow-500 text-black px-4 py-2 rounded"
            >
              Voltar
            </button>
          </div>
        ) : (
          <div className="border border-gray-200 flex flex-col rounded-2xl overflow-hidden justify-between shadow-xl">
            <header className="py-4 px-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold text-2xl">
              {categoria.descricao || "Sem descrição"}
            </header>

            <div className="p-6 bg-gradient-to-b from-[#FFF0E0] to-white min-h-[100px] flex flex-col gap-2">
              <p className="text-sm text-gray-500">ID: {categoria.id}</p>
            </div>

            <div className="flex">
              <button
                className="w-full text-slate-100 bg-orange-400 hover:bg-yellow-600
                  flex items-center justify-center py-3 transition-colors"
                onClick={retornar}
                disabled={isLoading}
              >
                Não
              </button>

              <button
                className="text-slate-100 bg-red-500 hover:bg-red-700 w-full
                  flex items-center justify-center transition-colors disabled:opacity-50"
                onClick={deletarCategoria}
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

export default DeletarCategoria;
