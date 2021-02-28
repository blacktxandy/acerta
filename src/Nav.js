import "./bulma.min.css";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <h3>Logo</h3>
      </Link>
      <ul className="nav-links">
        <Link to="/consulta">
          <li>Consulta</li>
        </Link>
        <Link to="/cadastro">
          <li>Cadastro</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
