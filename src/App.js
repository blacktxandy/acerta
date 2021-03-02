import "./bulma.min.css";
import "./App.css";
import Consulta from "./views/consulta";
import Cadastro from "./views/cadastro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="hero is-fullheight">
      <Router>
          <div className="px-1 pt-5">
            <Switch>
              <Route path="/" exact component={Consulta}></Route>
              <Route path="/cadastro" exact component={Cadastro}></Route>
              <Route path="/cadastro/:id" component={Cadastro}></Route>
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
