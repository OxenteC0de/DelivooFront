import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { CircleLoader } from "react-spinners";
import { User, Mail, Lock, Image, CheckCircle2, XCircle } from "lucide-react";
import { cadastrarUsuario } from "../../services/Services";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [senhaForte, setSenhaForte] = useState<boolean>(false);

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  useEffect(() => {
    // Validação de força de senha
    setSenhaForte(
      usuario.senha.length >= 8 &&
        /[A-Za-z]/.test(usuario.senha) &&
        /[0-9]/.test(usuario.senha)
    );
  }, [usuario.senha]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        alert("Usuário cadastrado, bem-vindo!");
      } catch (error) {
        alert("Erro ao cadastrar o usuário, tente novamente!");
        console.log(error);
      }
    } else {
      alert("Senha incorreta ou muito curta!");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }

  const senhasCoincidem =
    confirmarSenha === usuario.senha && confirmarSenha !== "";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans">
      {/* Seção de informações com imagem */}
      <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-700"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/31038188/pexels-photo-31038188.jpeg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-yellow-500/90"></div>

        <div className="relative z-10 text-white px-12 text-center">
          <h1 className="text-6xl font-black mb-6 drop-shadow-2xl">
            Bem-vindo ao <span className="text-yellow-300">Delivoo!</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-lg drop-shadow-lg">
            Cadastre seus pratos e mantenha seu cardápio atualizado com
            facilidade. Transforme a gestão do seu restaurante!
          </p>

          {/* Elementos decorativos */}
          <div className="mt-12 flex justify-center gap-8">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <p className="text-4xl font-bold">500+</p>
              <p className="text-sm mt-2">Restaurantes</p>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <p className="text-4xl font-bold">10k+</p>
              <p className="text-sm mt-2">Pratos Cadastrados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de cadastro */}
      <div className="flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-orange-50 p-8 lg:p-12">
        <form
          className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 space-y-5 border border-gray-100"
          onSubmit={cadastrarNovoUsuario}
        >
          <div className="text-center mb-6">
            <h2 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
              Criar Conta
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Preencha seus dados para começar
            </p>
          </div>

          {/* Campo Nome */}
          <div className="space-y-2">
            <label
              htmlFor="nome"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-orange-600" />
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Seu nome completo"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Campo Usuário/Email */}
          <div className="space-y-2">
            <label
              htmlFor="usuario"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-orange-600" />
              E-mail
            </label>
            <input
              type="email"
              name="usuario"
              id="usuario"
              placeholder="seu@email.com"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Campo Foto */}
          <div className="space-y-2">
            <label
              htmlFor="foto"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Image className="w-4 h-4 text-orange-600" />
              URL da Foto (opcional)
            </label>
            <input
              type="url"
              name="foto"
              id="foto"
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              value={usuario.foto}
              onChange={atualizarEstado}
            />
          </div>

          {/* Campo Senha com indicador */}
          <div className="space-y-2">
            <label
              htmlFor="senha"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-orange-600" />
              Senha
            </label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Mínimo 8 caracteres"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              value={usuario.senha}
              onChange={atualizarEstado}
              required
            />
            {usuario.senha && (
              <div className="flex items-center gap-2 text-sm">
                {senhaForte ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">
                      Senha forte
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 font-medium">
                      Senha fraca (use letras e números)
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Campo Confirmar Senha */}
          <div className="space-y-2">
            <label
              htmlFor="confirmarSenha"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-orange-600" />
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Repita sua senha"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
              required
            />
            {confirmarSenha && (
              <div className="flex items-center gap-2 text-sm">
                {senhasCoincidem ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">
                      Senhas coincidem
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 font-medium">
                      Senhas não coincidem
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={retornar}
              className="flex-1 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 transition-all active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !senhaForte || !senhasCoincidem}
              className="flex-1 rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <CircleLoader color="#fff" size={24} />
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-orange-600 font-bold hover:text-orange-700 underline underline-offset-2 transition-colors"
              >
                Fazer Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
