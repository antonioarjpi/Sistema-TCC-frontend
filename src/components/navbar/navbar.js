import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavItem from "../nav-item/navbarItem";


function Navbar(props){

    const auth = useAuth();

    const logout = () =>{
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
                  <NavItem render={props.isUsuarioAutenticado} label="Home" />
                </Link>
                <Link to={"/alunos"}>
                  <NavItem render={props.isUsuarioAutenticado} label="Alunos" />
                </Link>
                <Link to={"/orientadores"}>
                  <NavItem render={props.isUsuarioAutenticado}label="Orientadores" />
                </Link>
                <Link to={"/equipes"}>
                  <NavItem render={props.isUsuarioAutenticado}label="Equipes" />
                </Link>
                <Link to={"/bancas"}>
                  <NavItem render={props.isUsuarioAutenticado} label="Bancas" />
                </Link>
                <Link to={"/orientacao"}>
                  <NavItem render={props.isUsuarioAutenticado} label="Orientação" />
                </Link>
                <Link to={"/devolutivas"}>
                  <NavItem render={props.isUsuarioAutenticado} label="Devolutivas" />
                </Link>

                <NavItem render={props.isUsuarioAutenticado} onClick={logout} href="/login" label="Sair" />
                
            </ul>
            </div>
        </div>
      </div>
    )
}

export default Navbar;