import logo from "../logo.svg";
import "../bulma.min.css";
import "../App.css";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import InputMask from "react-input-mask";

function Consulta() {
  useEffect(() => {
    fetchItems();
  }, []);
  const askForDelete = async (p) => {
    console.log(p);
    if (window.confirm(`Esta ação excluirá o lead ${p.nome}.`)) {
      fetch(`http://localhost:3010/leads/${p.id}`, { method: "DELETE" }).then((r) => {
        if (r.status == 200) {
          window.alert("Lead excluído com sucesso.");
          fetchItems();
        } else {
          window.alert("Ocorreu um erro na exlusão deste lead.");
        }
      });
    }
  };
  const [leads, setLeads] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:3010/leads");
    const leads = await data.json();
    setLeads(leads);
  };
  const formatCpf = (cpf) => {
    var r = "";
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
    return r;
  };
  const unformatCpf = (cpf) => {
    var r = cpf.replace(/[.]/g, "");
    return r.replace("-", "");
  };

  return (
    <div className="container is-max-desktop">
      <img src={logo} className="logo-acerta" alt="logo" />
      <h2 className="subtitle is-4">Consulta de Leads</h2>
      <div className="notification round mb-3">
        <h3 className="title is-5">Filtros</h3>

        <Formik
          initialValues={{ nome: "", cpf: "" }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            var cpf = unformatCpf(values.cpf);
            var nome = values.nome;
            console.log(cpf);
            const data = await fetch(`http://localhost:3010/leads/${cpf ? (nome ? "?cpf_like=" + cpf + "&nome_like=" + nome : "?cpf_like=" + cpf) : nome ? "?nome_like=" + nome : ""}`);
            const lead = await data.json();
            setLeads(lead);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="columns is-desktop">
                <div className="column">
                  <div className="field">
                    <label className="label">Nome</label>
                    <div className="control">
                      <input type="text" className="input" name="nome" onChange={handleChange} onBlur={handleBlur} value={values.nome} />
                      {errors.nome && touched.nome && errors.nome}
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">CPF</label>
                    <div className="control">
                      <InputMask className="input" name="cpf" mask="999.999.999-99" maskChar={null} alwaysShowMask={false} onChange={handleChange} onBlur={handleBlur} value={values.cpf} />
                      {errors.cpf && touched.cpf && errors.cpf}
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <button type="submit" disabled={isSubmitting} className="button is-acerta-orange">
                    Filtrar
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
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
                  <Link to={`/cadastro/${lead.id}`}>
                    <span className="icon clickable">
                      <BsPencilSquare />
                    </span>
                  </Link>
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
    </div>
  );
}

export default Consulta;
