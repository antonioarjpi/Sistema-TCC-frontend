import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavItem from "../nav-item/navbarItem";
import * as messages from '../../components/toastr/toastr'

function Navbar(props){

    const auth = useAuth();

    const logout = () =>{
      messages.mensagemSucesso("Logoff realizado com sucesso")
      auth.logout();
    }

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-light">
        <div className="container">
          <a className="m-1" href="/home"><img src="https://i.ibb.co/QPd6SkD/logo-fundo.png" className="mr-3" width={55}/></a>
          <button className="navbar-toggler" type="button" 
                  data-toggle="collapse" data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">

                <Link to={"/home"}>
                  <NavItem label="Home" />
                </Link>
                <Link to={"/alunos"}>
                  <NavItem label="Alunos" />
                </Link>
                <Link to={"/orientadores"}>
                  <NavItem label="Orientadores" />
                </Link>
                <Link to={"/equipes"}>
                  <NavItem label="Equipes" />
                </Link>
                <Link to={"/bancas"}>
                  <NavItem label="Bancas" />
                </Link>
                <Link to={"/orientacao"}>
                  <NavItem label="Orientação" />
                </Link>
                <Link to={"/devolutivas"}>
                  <NavItem label="Devolutivas" />
                </Link>
                <Link to={"/login"}>
                  <NavItem onClick={logout} label="Sair" />
                </Link>              
            </ul>
            </div>
        </div>
      </div>
    )
}

export default Navbar;