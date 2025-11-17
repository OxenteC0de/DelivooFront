import {
  useEffect,
  useState,
  useContext,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import type Usuario from "../../../models/Usuario";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Services";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormProduto() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    descricao: "",
    preco: 0,
    quantidade: 0,
    saudavel: false,
    foto: "",
    categoria: { id: 0 },
    usuario: { id: 0 },
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();
  const isEdicao = id !== undefined; // ← Identificar se é edição

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    async function carregarDados() {
      if (token !== "") {
        try {
          // Sempre buscar categorias
          await buscarCategorias();

          // Buscar usuários apenas se for CADASTRO (não edição)
          if (!isEdicao) {
            await buscarUsuarios();
          }
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      }
    }

    carregarDados();
  }, []); 

  //  Buscar produto por ID apenas quando id mudar
  useEffect(() => {
    if (isEdicao && token !== "") {
      buscarPorId(id);
    } else {
      setIsLoadingData(false);
    }
  }, [id]);

  async function buscarUsuarios() {
    try {
      await buscar("/usuarios/all", setUsuarios, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      console.error("Erro ao buscar usuários:", error);
      ToastAlerta("Erro ao buscar usuários", "erro");
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
      ToastAlerta("Erro ao buscar categorias", "erro");
    }
  }

  async function buscarPorId(id: string) {
    try {
      setIsLoadingData(true);
      await buscar(
        `/produto/${id}`,
        (dados) => {
          console.log("Produto encontrado:", dados);
          setProduto({
            id: dados.id,
            nome: dados.nome || "",
            descricao: dados.descricao || "",
            preco:
              typeof dados.preco === "string"
                ? parseFloat(dados.preco)
                : dados.preco || 0,
            quantidade: dados.quantidade || 0,
            saudavel: dados.saudavel || false,
            foto: dados.foto || "",
            categoria: dados.categoria || { id: 0 },
            usuario: dados.usuario || { id: 0 },
          });
        },
        {
          headers: { Authorization: token },
        }
      );
    } catch (error: any) {
      console.error("Erro ao buscar produto:", error);
      ToastAlerta("Erro ao buscar produto", "erro");
      retornar();
    } finally {
      setIsLoadingData(false);
    }
  }

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "usuarioId") {
      setProduto({
        ...produto,
        usuario: { id: parseInt(value) || 0 },
      });
    } else if (name === "categoriaId") {
      setProduto({
        ...produto,
        categoria: { id: parseInt(value) || 0 },
      });
    } else if (name === "preco" || name === "quantidade") {
      setProduto({
        ...produto,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setProduto({
        ...produto,
        [name]: value,
      });
    }
  }

  function atualizarSaudavel(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      saudavel: e.target.checked,
    });
  }

  function retornar() {
    navigate("/produto");
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!produto.categoria?.id) {
      ToastAlerta("Selecione uma categoria!", "erro");
      setIsLoading(false);
      return;
    }

    if (!isEdicao && !produto.usuario?.id) {
      ToastAlerta("Selecione um usuário!", "erro");
      setIsLoading(false);
      return;
    }

    const precoNumerico =
      typeof produto.preco === "string"
        ? parseFloat(produto.preco)
        : produto.preco;

    if (precoNumerico <= 0 || isNaN(precoNumerico)) {
      ToastAlerta("Informe um preço válido!", "erro");
      setIsLoading(false);
      return;
    }

    if (produto.quantidade < 0) {
      ToastAlerta("Informe uma quantidade válida!", "erro");
      setIsLoading(false);
      return;
    }

    try {
      if (isEdicao) {
        // ATUALIZAR
        const dadosAtualizacao = {
          id: parseInt(id),
          nome: produto.nome,
          descricao: produto.descricao,
          preco: precoNumerico.toString(),
          quantidade: produto.quantidade,
          saudavel: produto.saudavel,
          foto: produto.foto || null,
          categoria: { id: produto.categoria.id },
        };

        console.log("Atualizando produto:", dadosAtualizacao);

        await atualizar(`/produto`, dadosAtualizacao, setProduto, {
          headers: { Authorization: token },
        });

        ToastAlerta("Produto atualizado com sucesso!", "sucesso");
      } else {
        // CRIAR
        const dados = {
          nome: produto.nome,
          descricao: produto.descricao,
          preco: precoNumerico.toString(),
          quantidade: produto.quantidade,
          saudavel: produto.saudavel,
          foto: produto.foto || null,
          categoria: { id: produto.categoria.id },
          usuario: { id: produto.usuario.id }, 
        };

        console.log("Criando produto:", dados);

        await cadastrar(`/produto`, dados, setProduto, {
          headers: { Authorization: token },
        });

        ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
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
      <div className="bg-gradient-to-r from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] flex justify-center w-full min-h-screen items-center">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#FFF0E0] to-white flex justify-center w-full min-h-screen items-center p-4">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center my-8 text-gray-800">
          {isEdicao ? "Editar Produto" : "Cadastrar Produto"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovoProduto}>
          {!isEdicao && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="usuarioId"
                className="font-semibold text-gray-700"
              >
                Usuário *
              </label>
              <select
                name="usuarioId"
                id="usuarioId"
                className="border-2 border-slate-700 rounded p-2"
                value={produto.usuario?.id || ""}
                onChange={atualizarEstado}
                required
              >
                <option value="">Selecione um usuário</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isEdicao && produto.usuario?.nome && (
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Criado por</label>
              <div className="border-2 border-slate-300 rounded p-2 bg-gray-100 text-gray-700">
                {produto.usuario.nome}
              </div>
            </div>
          )}

          {/* Categoria*/}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="categoriaId"
              className="font-semibold text-gray-700"
            >
              Categoria *
            </label>
            <select
              name="categoriaId"
              id="categoriaId"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.categoria?.id || ""}
              onChange={atualizarEstado}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </option>
              ))}
            </select>
          </div>

          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="font-semibold text-gray-700">
              Nome do Produto *
            </label>
            <input
              type="text"
              placeholder="Ex: Hambúrguer Vegano"
              name="nome"
              id="nome"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.nome || ""}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="font-semibold text-gray-700">
              Descrição
            </label>
            <input
              type="text"
              placeholder="Descreva o produto"
              name="descricao"
              id="descricao"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.descricao || ""}
              onChange={atualizarEstado}
            />
          </div>
          {/* Foto do Produto */}
          <div className="flex flex-col gap-2">
            <label htmlFor="foto" className="font-semibold text-gray-700">
              URL da Foto (Opcional)
            </label>
            <input
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              name="foto"
              id="foto"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.foto || ""}
              onChange={atualizarEstado}
            />

            {/* Preview da imagem */}
            {produto.foto && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img
                  src={produto.foto}
                  alt="Preview do produto"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=Imagem+Inválida";
                  }}
                />
              </div>
            )}
          </div>

          {/* Preço */}
          <div className="flex flex-col gap-2">
            <label htmlFor="preco" className="font-semibold text-gray-700">
              Preço (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 25.90"
              name="preco"
              id="preco"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.preco || 0}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Quantidade */}
          <div className="flex flex-col gap-2">
            <label htmlFor="quantidade" className="font-semibold text-gray-700">
              Quantidade *
            </label>
            <input
              type="number"
              placeholder="Ex: 50"
              name="quantidade"
              id="quantidade"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.quantidade || 0}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Saudável */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="saudavel"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="saudavel"
                id="saudavel"
                checked={produto.saudavel || false}
                onChange={atualizarSaudavel}
                className="mr-2 w-4 h-4"
              />
              <span className="font-semibold text-gray-700">
                Produto Saudável
              </span>
            </label>
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
              <span>{isEdicao ? "Atualizar" : "Cadastrar"}</span>
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

export default FormProduto;
