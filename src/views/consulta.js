import logo from "../logo.svg";

import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import InputMask from "react-input-mask";
import Table from "../components/table";
import NewLeadButton from "../components/newLeadButton";
import HeadComponent from "../components/headComponent";

function Consulta() {
  useEffect(() => {
    fetchItems();
  }, []);
 
  
  const [leads, setLeads] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:3333/leads");
    const leads = await data.json();
    setLeads(leads);
  };
  
  const unformatCpf = (cpf) => {
    var r = cpf.replace(/[.]/g, "");
    return r.replace("-", "");
  };

  return (
    <div className="container is-max-desktop">
      <HeadComponent title="Consulta de Leads"/>
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
            const data = await fetch(`http://localhost:3333/leads/${cpf ? (nome ? "?cpf_like=" + cpf + "&nome_like=" + nome : "?cpf_like=" + cpf) : nome ? "?nome_like=" + nome : ""}`);
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
      <NewLeadButton/>
      <Table leads={leads} reloadTable={fetchItems}/>
    </div>
  );
}

export default Consulta;
