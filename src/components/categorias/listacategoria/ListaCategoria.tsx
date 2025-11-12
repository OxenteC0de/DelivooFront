// src/components/categorias/listacategorias/ListaCategorias.tsx
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Services";
import { Edit, Trash2, FolderOpen } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaCategorias() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  
    
    useEffect(() => {
      if (token === "") {
        ToastAlerta("Você precisa estar logado", "info");
        navigate("/");
      }
    }, [token]);
  
    useEffect(() => {
      buscarCategorias();
    }, []);
  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      setIsLoading(true);
      await buscar("/categorias", setCategorias, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
      alert("Erro ao buscar categorias: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#f75f41] to-[#F09819] min-h-screen py-8">
      <div className="container mx-auto px-4">
        {isLoading && (
          <div className="flex justify-center my-8">
            <SyncLoader color="white" size={32} />
          </div>
        )}

        {!isLoading && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <FolderOpen className="w-10 h-10" />
                Categorias
              </h1>
              <Link to="/categorias/cadastrar">
                <button className="bg-gradient-to-r bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300">
                  + Nova Categoria
                </button>
              </Link>
            </div>

            {categorias.length === 0 ? (
              <div className="text-center">
                <span className="text-3xl text-white">
                  Nenhuma categoria encontrada!
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categorias.map((categoria) => (
                  <div
                    key={categoria.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-4">
                      <h3 className="text-white font-bold text-xl flex items-center gap-2">
                        <FolderOpen className="w-5 h-5" />
                        {categoria.descricao}
                      </h3>
                    </div>

                    <div className="p-4">
                      <p className="text-gray-500 text-sm mb-4">
                        ID: {categoria.id}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          to={`/categorias/editar/${categoria.id}`}
                          className="flex-1 bg-gradient-to-r bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 hover:to-orange-200 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Link>

                        <Link
                          to={`/categorias/deletar/${categoria.id}`}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold"
                        >
                          <Trash2 className="w-4 h-4" />
                          Deletar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ListaCategorias;
