import logo from "../logo.svg";
import "../bulma.min.css";
import "../App.css";
import React, { useState, useEffect } from "react";
function Cadastro({match}) {
    useEffect(() => {
        fetchLead();
      }, []);
    
      const [lead, setLead] = useState({});
    
      const fetchLead = async () => {
        const data = await fetch(`http://localhost:3010/leads/${match.params.id}`);
        const lead = await data.json();
        console.log(lead)
        setLead(lead);
      };
  return (
    <div className="container is-max-desktop">
      <img src={logo} className="logo-acerta" alt="logo" />
      <h2 className="subtitle is-4">Cadastro de Leads</h2>
      <div className="notification round mb-3">
        <h3 className="title is-5">Filtros</h3>
        <div className="columns is-desktop">
          <div className="column">
            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <input className="input" type="text" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">CPF</label>
              <div className="control">
                <input className="input" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button className="button is-acerta-orange">Filtrar</button>
          </div>
        </div>
      </div>
      <div className="field is-grouped is-grouped-left">
        <div className="control">
          <button className="button is-acerta-orange">Novo Lead</button>
        </div>
      </div>
      <div className="panel">
        <a className="panel-block">
          <span>
            {lead.nome}
          </span>
        </a>
      </div>
    </div>
  );
}

export default Cadastro;
