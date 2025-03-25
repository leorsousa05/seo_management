import { useState, FormEvent } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/shared/contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/dashboard", {
          state: { message: "Login realizado com sucesso!" },
        });
      }, 1500);
    } catch (err: any) {
      let errorMessage = "Erro ao efetuar login.";
      if (err.response) {
        const contentType = err.response.headers?.["content-type"] || "";
        if (
          err.response.status === 500 ||
          contentType.includes("text/html")
        ) {
          errorMessage = "Erro do servidor";
        } else if (err.response.status === 401) {
          errorMessage = "Login não existe";
        } else if (err.response.errors && err.response.errors.email) {
          errorMessage = err.response.errors.email;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-[#16161a]">
        <div className="w-full max-w-sm bg-[#1a1a1e] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-[#fffffe] mb-6">
            Bem-vindo de volta!
          </h2>
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-[#fffffe] rounded text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#94a1b2] mb-2" htmlFor="email">
                Seu e-mail
              </label>
              <div className="flex items-center border border-[#94a1b2] rounded-lg bg-[#242427]">
                <span className="px-3">
                  <Icon icon="mdi:email-outline" width="24" height="24" color="#7f5af0" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent py-2 px-2 text-[#fffffe] focus:outline-none focus:border-[#7f5af0] rounded-r"
                  placeholder="seuemail@exemplo.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#94a1b2] mb-2" htmlFor="password">
                Sua senha
              </label>
              <div className="flex items-center border border-[#94a1b2] rounded-lg bg-[#242427]">
                <span className="px-3">
                  <Icon icon="mdi:lock-outline" width="24" height="24" color="#7f5af0" />
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-2 px-2 text-[#fffffe] focus:outline-none focus:border-[#7f5af0] rounded-r"
                  placeholder="********"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7f5af0] text-[#fffffe] py-2 rounded-lg hover:bg-[#6a4be2] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Carregando..." : "Entrar agora"}
            </button>
          </form>
          <p className="text-center text-sm text-[#94a1b2] mt-4 hover:text-[#7f5af0] cursor-pointer transition-all">
            Esqueceu sua senha?
          </p>
        </div>
      </div>
    </>
  );
}

