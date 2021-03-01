import "./bulma.min.css";
import "./App.css";
import Nav from "./Nav";
import Consulta from "./views/consulta";
import Cadastro from "./views/cadastro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="hero is-fullheight">
      <Router>
        <div>
          <Nav />
          <div className="hero-body">
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/consulta" component={Consulta}></Route>
              <Route path="/cadastro" exact component={Cadastro}></Route>
              <Route path="/cadastro/:id" component={Cadastro}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default App;
