import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar } from "../../services/Services";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { User, Mail, Lock, Camera, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Perfil() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [usuario.token, navigate]);

  useEffect(() => {
    // Preencher dados do usuário logado
    setNome(usuario.nome || "");
    setEmail(usuario.usuario || "");
    setFoto(usuario.foto || "");
  }, [usuario]);

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();

    // Validações
    if (!nome.trim()) {
      ToastAlerta("O nome não pode estar vazio", "erro");
      return;
    }

    if (senhaNova && senhaNova !== confirmarSenha) {
      ToastAlerta("As senhas não coincidem", "erro");
      return;
    }

    if (senhaNova && senhaNova.length < 8) {
      ToastAlerta("A senha deve ter no mínimo 8 caracteres", "erro");
      return;
    }

    setIsLoading(true);

    try {
      const dadosAtualizados: any = {
        id: usuario.id,
        nome: nome.trim(),
        usuario: email,
        foto: foto || null,
      };

      // Se está alterando senha, adiciona
      if (senhaNova) {
        dadosAtualizados.senha = senhaNova;
      }

      await atualizar("/usuarios/atualizar", dadosAtualizados, () => {}, {
        headers: { Authorization: usuario.token },
      });

      ToastAlerta("Perfil atualizado com sucesso!", "sucesso");
      setIsEditMode(false);
      setSenhaAtual("");
      setSenhaNova("");
      setConfirmarSenha("");

      // Se alterou senha, faz logout para relogin
      if (senhaNova) {
        ToastAlerta("Senha alterada! Faça login novamente.", "info");
        setTimeout(() => {
          handleLogout();
        }, 2000);
      }
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      ToastAlerta("Erro ao atualizar perfil. Tente novamente.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#FFF0E0] via-white to-[#FFF5E6] min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <button className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <ArrowLeft className="w-5 h-5 text-[#E12727]" />
              </button>
            </Link>
            <h1 className="text-4xl font-bold text-[#E12727]">Meu Perfil</h1>
          </div>
          
          {!isEditMode && (
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Editar Perfil
            </button>
          )}
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Banner/Header do Card */}
          <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] h-32 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={
                    foto ||
                    `https://ui-avatars.com/api/?name=${nome}&size=128&background=E12727&color=fff&bold=true`
                  }
                  alt={nome}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${nome}&size=128&background=E12727&color=fff&bold=true`;
                  }}
                />
                {isEditMode && (
                  <div className="absolute bottom-0 right-0 bg-[#E12727] p-2 rounded-full cursor-pointer hover:bg-[#B22222] transition-all">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="pt-20 pb-8 px-8">
            {/* Modo Visualização */}
            {!isEditMode && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{nome}</h2>
                  <p className="text-gray-600">{email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#FFF0E0] to-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-[#E12727]" />
                      <span className="font-semibold text-gray-700">Nome</span>
                    </div>
                    <p className="text-gray-800 text-lg">{nome || "Não informado"}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#FFF0E0] to-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-[#E12727]" />
                      <span className="font-semibold text-gray-700">Email</span>
                    </div>
                    <p className="text-gray-800 text-lg">{email || "Não informado"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Modo Edição */}
            {isEditMode && (
              <form onSubmit={handleSalvar} className="space-y-6">
                {/* Nome */}
                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <User className="w-5 h-5 text-[#E12727]" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#E12727] focus:outline-none transition-all"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <Mail className="w-5 h-5 text-[#E12727]" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#E12727] focus:outline-none transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                {/* Foto */}
                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <Camera className="w-5 h-5 text-[#E12727]" />
                    URL da Foto de Perfil (Opcional)
                  </label>
                  <input
                    type="url"
                    value={foto}
                    onChange={(e) => setFoto(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#E12727] focus:outline-none transition-all"
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                  {foto && (
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={foto}
                        alt="Preview"
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${nome}&size=128`;
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t-2 border-gray-200 my-6"></div>

                {/* Alterar Senha */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#E12727]" />
                    Alterar Senha (Opcional)
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="font-semibold text-gray-700 mb-2 block">
                        Nova Senha
                      </label>
                      <input
                        type="password"
                        value={senhaNova}
                        onChange={(e) => setSenhaNova(e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#E12727] focus:outline-none transition-all"
                        placeholder="Mínimo 8 caracteres"
                        minLength={8}
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 mb-2 block">
                        Confirmar Nova Senha
                      </label>
                      <input
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#E12727] focus:outline-none transition-all"
                        placeholder="Digite a senha novamente"
                        minLength={8}
                      />
                    </div>
                  </div>

                  {senhaNova && senhaNova !== confirmarSenha && (
                    <p className="text-red-500 text-sm mt-2">
                      ⚠️ As senhas não coincidem
                    </p>
                  )}
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      setNome(usuario.nome || "");
                      setEmail(usuario.usuario || "");
                      setFoto(usuario.foto || "");
                      setSenhaNova("");
                      setConfirmarSenha("");
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-[#E12727] to-[#FF9B00] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      "Salvando..."
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
