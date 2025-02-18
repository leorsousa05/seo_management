import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const Dashboard = () => {
  const data = [
    { name: "Jan", visits: 4000, conversions: 2400 },
    { name: "Fev", visits: 3000, conversions: 1398 },
    { name: "Mar", visits: 2000, conversions: 9800 },
    { name: "Abr", visits: 2780, conversions: 3908 },
    { name: "Mai", visits: 1890, conversions: 4800 },
    { name: "Jun", visits: 2390, conversions: 3800 },
    { name: "Jul", visits: 3490, conversions: 4300 },
  ];

  return (
    <div className="p-6 h-[calc(100vh-60px)] overflow-y-auto bg-[#16161a]">
      {/* Headline */}
      <h2 className="text-3xl font-bold mb-6 text-[#fffffe]">📊 Painel de Controle</h2>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#24242a] p-6 rounded-lg">
          <h3 className="text-sm mb-1 text-[#94a1b2]">Visitas Totais</h3>
          <p className="text-2xl font-semibold text-[#fffffe]">12,345</p>
        </div>

        <div className="bg-[#24242a] p-6 rounded-lg">
          <h3 className="text-sm mb-1 text-[#94a1b2]">Conversões</h3>
          <p className="text-2xl font-semibold text-[#fffffe]">1,234</p>
        </div>

        <div className="bg-[#24242a] p-6 rounded-lg">
          <h3 className="text-sm mb-1 text-[#94a1b2]">Taxa de Conversão</h3>
          <p className="text-2xl font-semibold text-[#fffffe]">10%</p>
        </div>
      </div>

      {/* Gráfico de Linhas */}
      <div className="bg-[#24242a] p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4 text-[#fffffe]">
          📈 Visitas vs Conversões (Últimos 7 Meses)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a1b2" opacity={0.2} />
            <XAxis dataKey="name" stroke="#94a1b2" />
            <YAxis stroke="#94a1b2" />
            <Tooltip contentStyle={{ backgroundColor: "#24242a", border: "none" }} itemStyle={{ color: "#fffffe" }} />
            <Legend wrapperStyle={{ color: "#fffffe" }} />
            <Line type="monotone" dataKey="visits" stroke="#7f5af0" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="conversions" stroke="#94a1b2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Últimos Blogs e Websites Gerenciados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#24242a] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-[#fffffe]">📝 Últimos Blogs Criados</h3>
          <ul className="text-[#94a1b2] space-y-2">
            <li>- Como aumentar suas conversões</li>
            <li>- Dicas de SEO para 2023</li>
            <li>- Tendências de Marketing Digital</li>
          </ul>
          <div className="mt-4">
            <button className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
              Ver mais
            </button>
          </div>
        </div>

        <div className="bg-[#24242a] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-[#fffffe]">🌐 Websites Gerenciados</h3>
          <ul className="text-[#94a1b2] space-y-2">
            <li>- www.exemplo1.com</li>
            <li>- www.exemplo2.com</li>
            <li>- www.exemplo3.com</li>
          </ul>
          <div className="mt-4">
            <button className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
              Ver detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

