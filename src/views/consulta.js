import logo from "../logo.svg";
import "../bulma.min.css";
import "../App.css";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Consulta() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [leads, setLeads] = useState([]);
  const cpf = useState('');
  const nome = useState('');
  const fetchItems = async () => {
    const data = await fetch("http://localhost:3010/leads");
    const leads = await data.json();
    setLeads(leads);
  };
  const fetchFilter = async () => {
    const data = await fetch(`http://localhost:3010/leads${cpf ? "?cpf=" : ""}${cpf}${nome && !cpf ? "?nome=" : nome && cpf ? "&nome" : ""}${nome}`);
    const leads = await data.json();
    if (leads.id) {
      const leadArr = [leads];
      setLeads(leadArr);
    }
  };
  return (
    <div className="container is-max-desktop">
      <img src={logo} className="logo-acerta" alt="logo" />
      <h2 className="subtitle is-4">Consulta de Leads</h2>
      <div className="notification round mb-3">
        <h3 className="title is-5">Filtros</h3>
        <div className="columns is-desktop">
          <div className="column">
            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <input className="input" value={nome} type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">CPF</label>
              <div className="control">
                <input className="input" value={cpf} type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button onClick={fetchFilter} className="button is-acerta-orange">
              Filtrar
            </button>
          </div>
        </div>
      </div>
      <div className="field is-grouped is-grouped-left">
        <div className="control">
          <Link to="/cadastro">
            <button className="button is-acerta-orange">Novo Lead</button>
          </Link>
        </div>
      </div>
      <div className="table-container pb-4">
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
                    <Link to={`/cadastro/${lead.id}`}>
                      <BsPencilSquare />
                    </Link>
                  </span>
                  <span className="icon clickable">
                    <BsTrash />
                  </span>
                </th>
                <td>{lead.email}</td>
                <td>{lead.nome}</td>
                <td>{lead.cpf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Consulta;
