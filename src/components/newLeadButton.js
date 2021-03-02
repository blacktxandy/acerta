import { Link } from "react-router-dom";
function NewLeadButton() {
  return (
    <div className="columns is-mobile">
      <div className="column">
        <div className="field is-grouped is-grouped-left">
          <div className="control">
            <Link to="/cadastro">
              <button className="button is-acerta-orange">Novo Lead</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLeadButton;
