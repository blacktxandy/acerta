import logo from "../logo.svg";
function HeadComponent({ title }) {
  return (
    <>
      <img src={logo} className="logo-acerta" alt="logo" />
      <h2 className="subtitle is-4">{title}</h2>
    </>
  );
}
export default HeadComponent;
