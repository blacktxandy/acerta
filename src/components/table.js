import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useHistory } from "react-router-dom";
function Table({ leads, reloadTable }) {
    const history = useHistory();
    const formatCpf = (cpf) => {
        var r = "";
        if (cpf) {
          for (let ch = 0; ch < cpf.length; ch++) {
            switch (ch) {
              case 2:
                r += cpf.charAt(ch) + ".";
                break;
              case 5:
                r += cpf.charAt(ch) + ".";
                break;
              case 8:
                r += cpf.charAt(ch) + "-";
                break;
              default:
                r += cpf.charAt(ch);
                break;
            }
          }
        }
        return r;
      };
      const askForDelete = async (p) => {
        console.log(p);
        if (window.confirm(`Esta ação excluirá o lead ${p.nome}.`)) {
          fetch(`http://localhost:3333/leads/${p.id}`, { method: "DELETE" }).then((r) => {
            if (r.status == 200) {
              window.alert("Lead excluído com sucesso.");
              reloadTable()
            } else {
              window.alert("Ocorreu um erro na exlusão deste lead.");
            }
          });
        }
      };
  return (
    <div className="table-container">
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr className="no-background">
            <th></th>
            <th>Email</th>
            <th>Nome</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <th>
                <span className="icon clickable">
                  <BsPencilSquare
                    onClick={() => {
                      history.push(`/cadastro/${lead.id}`);
                    }}
                  />
                </span>
                <span className="icon clickable">
                  <BsTrash
                    onClick={() => {
                      askForDelete(lead);
                    }}
                  />
                </span>
              </th>
              <td>{lead.email}</td>
              <td>{lead.nome}</td>
              <td>{formatCpf(lead.cpf)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
