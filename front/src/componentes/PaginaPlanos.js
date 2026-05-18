import { useEffect, useState } from "react";
import api from "../servicos/api";

function PaginaPlanos() {
  const [planos, setPlanos] = useState([]);

  const [nome, setNome] = useState("");
  const [valorHora, setValorHora] = useState("");

  async function carregarPlanos() {
    const resposta = await api.get("/planos");
    setPlanos(resposta.data);
  }

  async function salvarPlano(e) {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Informe o nome do plano.");
      return;
    }

    if (!valorHora || Number(valorHora) <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    await api.post("/planos", {
      nome,
      valorHora,
    });

    setNome("");
    setValorHora("");

    carregarPlanos();
  }

  async function excluirPlano(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este plano?"
    );

    if (!confirmar) return;

    await api.delete(`/planos/${id}`);
    carregarPlanos();
  }

  useEffect(() => {
    carregarPlanos();
  }, []);

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h2>Planos</h2>
          <p>
            Cadastre os tipos de aluguel e defina o valor cobrado por hora.
          </p>
        </div>

        <span className="pill">
          {planos.length} planos ativos
        </span>
      </div>

      <div className="grid">
        <section className="card">
          <h3 className="card-title">Novo plano</h3>

          <form onSubmit={salvarPlano} className="form">
            <label>Nome do plano</label>

            <input
              placeholder="Ex: Premium"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Valor por hora</label>

            <input
              type="number"
              placeholder="Ex: 15"
              value={valorHora}
              onChange={(e) => setValorHora(e.target.value)}
            />

            <button>Cadastrar plano</button>
          </form>
        </section>

        <section className="card table-card">
          <h3 className="card-title">
            Planos cadastrados
          </h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Plano</th>
                <th>Valor/Hora</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {planos.map((plano) => (
                <tr key={plano.id}>
                  <td>{plano.id}</td>

                  <td>
                    <span className="pill">
                      {plano.nome}
                    </span>
                  </td>

                  <td className="price">
                    R${" "}
                    {Number(plano.valorHora).toFixed(2)}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() =>
                        excluirPlano(plano.id)
                      }
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

export default PaginaPlanos;