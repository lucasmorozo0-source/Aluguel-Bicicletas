import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../servicos/api";

function PaginaAlugueis() {
  const [planos, setPlanos] = useState([]);
  const [alugueis, setAlugueis] = useState([]);

  const [nomeCliente, setNomeCliente] = useState("");
  const [dataHoraInicio, setDataHoraInicio] = useState("");
  const [dataHoraFim, setDataHoraFim] = useState("");
  const [planoId, setPlanoId] = useState("");

  async function carregarDados() {
    const planosRes = await api.get("/planos");
    const aluguelRes = await api.get("/alugueis");

    setPlanos(planosRes.data);
    setAlugueis(aluguelRes.data);
  }

  async function salvarAluguel(e) {
    e.preventDefault();

    if (!nomeCliente.trim()) {
      toast.error("Informe o nome do cliente.");
      return;
    }

    if (!dataHoraInicio || !dataHoraFim) {
      toast.error("Informe a data/hora.");
      return;
    }

    if (!planoId) {
      toast.error("Selecione um plano.");
      return;
    }

    const inicio = new Date(dataHoraInicio);
    const fim = new Date(dataHoraFim);

    if (fim <= inicio) {
      toast.error("A data final deve ser maior.");
      return;
    }

    await api.post("/alugueis", {
      nomeCliente,
      dataHoraInicio,
      dataHoraFim,
      planoId,
    });

    toast.success("Aluguel cadastrado!");

    setNomeCliente("");
    setDataHoraInicio("");
    setDataHoraFim("");
    setPlanoId("");

    carregarDados();
  }

  async function excluirAluguel(id) {
    const confirmar = window.confirm("Deseja realmente excluir este aluguel?");

    if (!confirmar) return;

    await api.delete(`/alugueis/${id}`);

    toast.success("Aluguel removido!");
    carregarDados();
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const faturamentoTotal = alugueis.reduce(
    (total, aluguel) => total + Number(aluguel.valorTotal || 0),
    0
  );

  const totalAlugueis = alugueis.length;

  const totalHoras = alugueis.reduce(
    (total, aluguel) => total + Number(aluguel.tempoUtilizado || 0),
    0
  );

  const mediaHoras = totalAlugueis > 0 ? totalHoras / totalAlugueis : 0;

  const contagemPlanos = {};

  alugueis.forEach((aluguel) => {
    const nomePlano = aluguel.Plano?.nome || "Sem plano";
    contagemPlanos[nomePlano] = (contagemPlanos[nomePlano] || 0) + 1;
  });

  const planoMaisUsado =
    Object.keys(contagemPlanos).length > 0
      ? Object.entries(contagemPlanos).sort((a, b) => b[1] - a[1])[0][0]
      : "Nenhum";

  const dadosGrafico = alugueis.map((aluguel) => ({
    cliente: aluguel.nomeCliente,
    valor: Number(aluguel.valorTotal || 0),
  }));

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h2>Aluguéis</h2>
          <p>Dashboard operacional com registros, valores e uso dos planos.</p>
        </div>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Faturamento total</span>
          <strong>R$ {faturamentoTotal.toFixed(2)}</strong>
          <small>Somando todos os aluguéis</small>
        </div>

        <div className="stat-card">
          <span>Total de aluguéis</span>
          <strong>{totalAlugueis}</strong>
          <small>Registros cadastrados</small>
        </div>

        <div className="stat-card">
          <span>Plano mais usado</span>
          <strong>{planoMaisUsado}</strong>
          <small>Baseado no histórico</small>
        </div>

        <div className="stat-card">
          <span>Média de horas</span>
          <strong>{mediaHoras.toFixed(2)}h</strong>
          <small>Tempo médio por aluguel</small>
        </div>
      </section>

      <section className="card chart-card">
        <h3 className="card-title">Faturamento por aluguel</h3>

        {dadosGrafico.length === 0 ? (
          <p className="empty">Nenhum dado disponível para o gráfico.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
  <BarChart
    data={dadosGrafico}
    margin={{
      top: 20,
      right: 30,
      left: 0,
      bottom: 10,
    }}
  >
    <XAxis
      dataKey="cliente"
      stroke="#94a3b8"
      tick={{ fill: "#cbd5e1" }}
    />

    <YAxis
      stroke="#94a3b8"
      tick={{ fill: "#cbd5e1" }}
    />

    <Tooltip
      contentStyle={{
        background: "#020617",
        border: "1px solid #334155",
        borderRadius: "12px",
        color: "#fff",
      }}
      labelStyle={{
        color: "#93c5fd",
      }}
    />

    <Bar
      dataKey="valor"
      fill="#38bdf8"
      radius={[10, 10, 0, 0]}
      barSize={55}
    />
  </BarChart>
</ResponsiveContainer>
        )}
      </section>

      <div className="grid">
        <section className="card">
          <h3 className="card-title">Novo aluguel</h3>

          <form onSubmit={salvarAluguel} className="form">
            <label>Cliente</label>
            <input
              placeholder="Ex: Lucas Morozo"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
            />

            <label>Início</label>
            <input
              type="datetime-local"
              value={dataHoraInicio}
              onChange={(e) => setDataHoraInicio(e.target.value)}
            />

            <label>Fim</label>
            <input
              type="datetime-local"
              value={dataHoraFim}
              onChange={(e) => setDataHoraFim(e.target.value)}
            />

            <label>Plano</label>
            <select value={planoId} onChange={(e) => setPlanoId(e.target.value)}>
              <option value="">Selecione um plano</option>

              {planos.map((plano) => (
                <option key={plano.id} value={plano.id}>
                  {plano.nome} - R$ {Number(plano.valorHora).toFixed(2)}/h
                </option>
              ))}
            </select>

            <button>Cadastrar aluguel</button>
          </form>
        </section>

        <section className="card table-card">
          <h3 className="card-title">Histórico de aluguéis</h3>

          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Plano</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Horas</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {alugueis.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty">
                    Nenhum aluguel cadastrado.
                  </td>
                </tr>
              )}

              {alugueis.map((aluguel) => (
                <tr key={aluguel.id}>
                  <td>{aluguel.nomeCliente}</td>

                  <td>
                    <span className="pill">
                      {aluguel.Plano?.nome || "Plano não encontrado"}
                    </span>
                  </td>

                  <td>{new Date(aluguel.dataHoraInicio).toLocaleString("pt-BR")}</td>
                  <td>{new Date(aluguel.dataHoraFim).toLocaleString("pt-BR")}</td>
                  <td>{Number(aluguel.tempoUtilizado).toFixed(2)}h</td>

                  <td className="price">
                    R$ {Number(aluguel.valorTotal).toFixed(2)}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => excluirAluguel(aluguel.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}

export default PaginaAlugueis;