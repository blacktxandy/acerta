
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import InputMask from "react-input-mask";
import HeadComponent from "../components/headComponent";
import ErrorIcon from "../components/errorIcon";
function Cadastro({ match }) {
  useEffect(() => {
    fetchLead();
  }, []);
  const history = useHistory();
  const [lead, setLead] = useState({});
  const estado = 0;
  const getCivilStatus = (s) => {
    switch (s) {
      case 0:
        return "Solteiro(a)";
      case 1:
        return "Casado(a)";
      case 2:
        return "Viuvo(a)";
      case 3:
        return "Separado(a)";

      default:
        break;
    }
  };
  const fetchLead = async () => {
    if (match.params.id) {
      const data = await fetch(`http://localhost:3333/leads/${match.params.id}`);
      if (data.status === 200) {
        const lead = await data.json();
        setLead(lead);
      } else {
        if (window.confirm("Houve um erro ao carregar os dados do servidor. Gostaria de voltar a página de consulta?")) {
          history.push("/");
        }
      }
    }
  };
  const unformatCpf = (cpf) => {
    var r = cpf.replace(/[.]/g, "");
    return r.replace("-", "");
  };

  return (
    <div className="container is-max-desktop">
      <HeadComponent title="Cadastro de Leads"/>
      <div className="notification round mb-3">
        <h3 className="title is-5">Filtros</h3>

        <Formik
          initialValues={{ nome: "", cpf: "", email: "", estadoCivil: "", nomeConjugue: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "requerido";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = "Endereço de email inválido";
            }
            if (!values.nome) {
              errors.nome = "Campo requerido";
            } 
            if (!values.cpf) {
              errors.cpf = "Campo requerido";
            } 
            
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            var cpf = unformatCpf(values.cpf);
            var nome = values.nome;
            var email = values.email;
            var estadoCivil = getCivilStatus(values.estadoCivil);
            var nomeConjugue = values.nomeConjugue;
            var requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ cpf: cpf, nome: nome, email: email, estadoCivil: estadoCivil, nomeConjugue: nomeConjugue }),
            };
            fetch(`http://localhost:3333/leads/`, requestOptions).then((r) => {
              if(r.status===200||r.status===201){
                  history.push('/')
              }else{
                  window.alert('Ocorreu um erro na criação deste lead.')
              }
              setSubmitting(false);
            });
          }}
         
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="columns is-desktop">
                <div className="column">
                  <div className="field">
                    <label className="label"><span>Nome</span><span className="has-text-right has-text-danger is-pulled-right is-size-7 mr-1 mt-2">{errors.nome}</span></label>
                    <div className="control has-icons-right">
                      <input type="text" className={errors.nome?'input has-background-danger-light':'input'} name="nome" onChange={handleChange} onBlur={handleBlur} value={values.nome} />
                      {errors.nome?<ErrorIcon/>:''}
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                  <label className="label"><span>CPF</span><span className="has-text-right has-text-danger is-pulled-right is-size-7 mr-1 mt-2">{errors.cpf}</span></label>
                    <div className="control has-icons-right">
                      <InputMask className={errors.cpf?'input has-background-danger-light':'input'} name="cpf" mask="999.999.999-99" maskChar={null} alwaysShowMask={false} onChange={handleChange} onBlur={handleBlur} value={values.cpf} />
                      {errors.cpf?<ErrorIcon/>:''}
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns is-desktop">
                <div className="column">
                  <div className="field">
                  <label className="label"><span>Email</span><span className="has-text-right has-text-danger is-pulled-right is-size-7 mr-1 mt-2">{errors.email}</span></label>
                    <div className="control has-icons-right">
                      <input className={errors.email?'input has-background-danger-light':'input'} name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                      {errors.email?<ErrorIcon/>:''}
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Estado civil</label>
                    <div className="select is-fullwidth">
                      <Field as="select" className="input" name="estadoCivil" onChange={handleChange} onBlur={handleBlur} value={values.estadoCivil}>
                        <option value="0">Solteiro(a)</option>
                        <option value="1">Casado(a)</option>
                        <option value="2">Viúvo(a)</option>
                        <option value="3">Separado(a)</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns is-desktop">
                <div className="column is-half">
                  <div className="field">
                  <label className="label"><span>Nome Conjugue</span><span className="has-text-right has-text-danger is-pulled-right is-size-7 mr-1 mt-2">{errors.nomeConjugue}</span></label>
                    <div className="control has-icons-right">
                      <input className="input" disabled={estado !== 1} name="nomeConjugue" onChange={handleChange} onBlur={handleBlur} value={values.nomeConjugue} />
                      {errors.nomeConjugue?<ErrorIcon/>:''}
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-half">
                  <div className="field is-grouped is-grouped-left">
                    <div className="control">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => {
                          history.push("/");
                        }}
                        className="button is-acerta-grey"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field is-grouped is-grouped-right">
                    <div className="control">
                      <button type="submit" disabled={isSubmitting} className="button is-acerta-orange">
                        Cadastrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Cadastro;
