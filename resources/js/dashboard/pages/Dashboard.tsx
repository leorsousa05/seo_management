import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Dashboard = () => {
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
    <div className="p-6 h-[calc(100vh-92px)] overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Painel de Controle</h2>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm">Visitas Totais</h3>
          <p className="text-2xl font-semibold">12,345</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm">Conversões</h3>
          <p className="text-2xl font-semibold">1,234</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm">Taxa de Conversão</h3>
          <p className="text-2xl font-semibold">10%</p>
        </div>
      </div>

      {/* Gráfico de Linhas */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">📈 Visitas vs Conversões (Últimos 7 Meses)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="conversions" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Últimos Blogs e Websites Gerenciados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">📝 Últimos Blogs Criados</h3>
          <ul className="text-gray-600">
            <li>- Como aumentar suas conversões</li>
            <li>- Dicas de SEO para 2023</li>
            <li>- Tendências de Marketing Digital</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">🌐 Websites Gerenciados</h3>
          <ul className="text-gray-600">
            <li>- www.exemplo1.com</li>
            <li>- www.exemplo2.com</li>
            <li>- www.exemplo3.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

