import {
  useEffect,
  useState,
  useContext,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Services";
import { AuthContext } from "../../../contexts/AuthContext"; 
import { ToastAlerta } from "../../../utils/ToastAlerta"; 

function FormCategoria() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext); 
  const token = usuario.token; 

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    descricao: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

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
    } finally {
      setIsLoadingData(false);
    }
  }

  useEffect(() => {
    if (id !== undefined && token !== "") {
      buscarPorId(id);
    } else if (id === undefined) {
      setIsLoadingData(false);
    }
  }, [id, token]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categorias");
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!categoria.descricao.trim()) {
      ToastAlerta("A descrição é obrigatória!", "erro");
      setIsLoading(false);
      return;
    }

    try {
      if (id !== undefined) {
        // ATUALIZAR
        await atualizar(
          `/categorias`,
          {
            id: parseInt(id),
            descricao: categoria.descricao,
          },
          setCategoria,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        ToastAlerta("Categoria atualizada com sucesso!", "sucesso");
      } else {
        // CRIAR
        await cadastrar(
          `/categorias`,
          { descricao: categoria.descricao },
          setCategoria,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        ToastAlerta("Categoria cadastrada com sucesso!", "sucesso");
      }
      retornar();
    } catch (error: any) {
      console.error("Erro:", error);
      ToastAlerta(
        "Erro: " + (error.response?.data?.message || error.message),
        "erro"
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoadingData) {
    return (
      <div className="bg-gradient-to-b from-[#FFF0E0] to-white flex justify-center w-full min-h-screen items-center">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#FFF0E0] to-white flex justify-center w-full min-h-screen items-center p-4">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center my-8 text-gray-800">
          {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="font-semibold text-gray-700">
              Descrição da Categoria *
            </label>
            <input
              type="text"
              placeholder="Ex: Bebidas, Lanches, Sobremesas..."
              name="descricao"
              id="descricao"
              className="border-2 border-slate-700 rounded p-2"
              value={categoria.descricao || ""}
              onChange={atualizarEstado}
              required
            />
          </div>

          <button
            className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] 
    hover:from-[#B22222] hover:to-[#CC7A00] 
    text-white px-8 py-3 rounded-lg font-semibold 
    shadow-lg hover:shadow-xl hover:scale-105 
    transition-all duration-300 
    disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="white" size={24} />
            ) : (
              <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
            )}
          </button>

          <button
            type="button"
            onClick={retornar}
            className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold 
              hover:bg-red-800 transition-colors duration-300"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCategoria;
