import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { User, Lock } from "lucide-react"; // Instale: npm install lucide-react

function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-sans bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500">
      {/* Formulário com glassmorphism */}
      <form
        className="relative flex justify-center items-center flex-col w-11/12 max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-12 gap-5 transition-all hover:shadow-orange-500/20"
        onSubmit={login}
      >
        {/* Efeito de brilho sutil no topo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60 rounded-full"></div>

        <div className="text-center mb-2">
          <h2 className="text-5xl text-white font-black tracking-tight drop-shadow-lg">
            Bem-vindo!
          </h2>
          <p className="text-white/80 text-sm mt-2">Entre para continuar</p>
        </div>

        {/* Campo Usuário com ícone */}
        <div className="flex flex-col w-full group">
          <label
            htmlFor="usuario"
            className="mb-2 text-sm text-white/90 font-medium"
          >
            Usuário
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5" />
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite seu usuário"
              className="w-full border-2 border-white/30 bg-white/20 backdrop-blur-sm rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/30 transition-all duration-300"
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
            />
          </div>
        </div>

        {/* Campo Senha com ícone */}
        <div className="flex flex-col w-full group">
          <label
            htmlFor="senha"
            className="mb-2 text-sm text-white/90 font-medium"
          >
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5" />
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className="w-full border-2 border-white/30 bg-white/20 backdrop-blur-sm rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/30 transition-all duration-300"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
            />
          </div>
        </div>

        {/* Botão com animação */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center text-white font-bold w-full py-3.5 mt-4 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          <span className="relative z-10">
            {isLoading ? <ClipLoader color="#fff" size={24} /> : "Entrar"}
          </span>
        </button>

        <div className="flex items-center w-full my-2">
          <div className="flex-grow h-px bg-white/30"></div>
          <span className="px-4 text-white/70 text-sm">ou</span>
          <div className="flex-grow h-px bg-white/30"></div>
        </div>

        <p className="text-sm text-white/90 text-center">
          Ainda não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="text-yellow-300 font-bold hover:text-yellow-200 underline underline-offset-2 transition-colors"
          >
            Cadastre-se
          </Link>
        </p>
      </form>

      {/* Imagem lateral com overlay melhorado */}
      <div className="hidden lg:block relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-700 hover:scale-110"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/19781592/pexels-photo-19781592.jpeg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-yellow-900/40 mix-blend-multiply"></div>
      </div>
    </div>
  );
}

export default Login;
