
import "./bulma.min.css";
import "./App.css";
import Nav from "./Nav";
import Consulta from "./views/consulta";
import Cadastro from "./views/cadastro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="button is-acerta-orange">Filtrar</button>
        <button className="button is-acerta-grey">Cancelar</button>
      </header> */}
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/consulta" component={Consulta}></Route>
          <Route path="/cadastro" component={Cadastro}></Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () =>(
  <div>
    <h1>Home</h1>
  </div>
)

export default App;
