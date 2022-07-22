import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavItem from "../nav-item/navbarItem";
import './styles.css'
import * as messages from '../../components/toastr/toastr'

function Navbar() {

  const { logout } = useAuth();

  const sair = () => {
    logout();
    messages.mensagemSucesso("Logoff realizado com sucesso")
  }

  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-light">
      <div className="container">
        <a href="/home"><img src="https://i.ibb.co/QPd6SkD/logo-fundo.png" className="mr-3" width={40} alt="Logo SGTCC" /></a>
        <button className="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavItem href="/home" label="Home" />
            <NavItem href="/alunos" label="Alunos" />
            <NavItem href="/orientadores" label="Orientadores" />
            <NavItem href="/equipes" label="Equipes" />
            <NavItem href="/bancas" label="Bancas" />
            <NavItem href="/orientacao" label="Orientação" />
            <NavItem href="/devolutivas" label="Devolutivas" />
            <Link to={"/login"}>
              <NavItem onClick={sair} label="Sair" />
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;