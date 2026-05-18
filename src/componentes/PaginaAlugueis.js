import { useEffect, useState } from "react";
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

    await api.post("/alugueis", {
      nomeCliente,
      dataHoraInicio,
      dataHoraFim,
      planoId,
    });

    setNomeCliente("");
    setDataHoraInicio("");
    setDataHoraFim("");
    setPlanoId("");

    carregarDados();
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <main className="container">
      <h1>Aluguéis</h1>

      <form onSubmit={salvarAluguel} className="card">
        <input
          placeholder="Nome do cliente"
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

        <select
          value={planoId}
          onChange={(e) => setPlanoId(e.target.value)}
        >
          <option value="">Selecione um plano</option>

          {planos.map((plano) => (
            <option key={plano.id} value={plano.id}>
              {plano.nome} - R$ {plano.valorHora}/h
            </option>
          ))}
        </select>

        <button>Cadastrar aluguel</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Plano</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Horas</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {alugueis.map((aluguel) => (
            <tr key={aluguel.id}>
              <td>{aluguel.nomeCliente}</td>

              <td>{aluguel.Plano?.nome}</td>

              <td>
                {new Date(aluguel.dataHoraInicio).toLocaleString("pt-BR")}
              </td>

              <td>
                {new Date(aluguel.dataHoraFim).toLocaleString("pt-BR")}
              </td>

              <td>
                {Number(aluguel.tempoUtilizado).toFixed(2)}h
              </td>

              <td>
                R$ {Number(aluguel.valorTotal).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default PaginaAlugueis;