// src/components/categorias/formcategoria/FormCategoria.tsx
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Services";

function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    descricao: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      setIsLoadingData(true);
      await buscar(
        `/categorias/${id}`,
        (dados: { id: any; descricao: any; }) => {
          console.log("Categoria encontrada:", dados);
          setCategoria({
            id: dados.id,
            descricao: dados.descricao || "",
          });
        },
        {}
      );
    } catch (error: any) {
      console.error("Erro ao buscar categoria:", error);
      alert("Erro ao buscar categoria: " + error.message);
    } finally {
      setIsLoadingData(false);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    } else {
      setIsLoadingData(false);
    }
  }, [id]);

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
      alert("A descrição é obrigatória!");
      setIsLoading(false);
      return;
    }

    try {
      if (id !== undefined) {
        // ATUALIZAR
        await atualizar(
          `/categorias/${id}`,
          { descricao: categoria.descricao },
          setCategoria,
          {}
        );
        alert("Categoria atualizada com sucesso!");
      } else {
        // CRIAR
        await cadastrar(
          `/categorias`,
          { descricao: categoria.descricao },
          setCategoria, {}
        );
        alert("Categoria cadastrada com sucesso!");
      }
      retornar();
    } catch (error: any) {
      console.error("Erro:", error);
      alert("Erro: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoadingData) {
    return (
      <div className="bg-gradient-to-r from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] flex justify-center w-full min-h-screen items-center">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] flex justify-center w-full min-h-screen items-center p-4">
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
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 
              rounded-lg font-semibold shadow-lg 
              hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300"
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
            className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold 
              hover:bg-gray-600 transition-colors duration-300"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCategoria;
