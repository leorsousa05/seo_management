// src/pages/Login.tsx
import { useState, FormEvent } from "react";
import { Icon } from "@iconify/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao efetuar login.");
      } else {
        console.log("Login realizado com sucesso!", data);
      }
    } catch (err) {
      setError("Erro na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xs bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Bem-vindo de volta!
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Seu e-mail
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3">
                <Icon icon="mdi:email-outline" width="24" height="24" color="#6e2390" />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2 px-2 focus:outline-none focus:border-purple-700 rounded-r"
                placeholder="seuemail@exemplo.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Sua senha
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3">
                <Icon icon="mdi:lock-outline" width="24" height="24" color="#6e2390" />
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-2 px-2 focus:outline-none focus:border-purple-700 rounded-r"
                placeholder="********"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition-colors mb-4 disabled:opacity-50"
          >
            {loading ? "Carregando..." : "Entrar agora"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 hover:underline cursor-pointer">
          Esqueceu sua senha?
        </p>
      </div>
    </div>
  );
}

