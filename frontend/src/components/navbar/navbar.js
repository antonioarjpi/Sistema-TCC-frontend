import { Link } from "react-router-dom";
import NavItem from "../nav-item/navbarItem";


function Navbar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="/home" className="navbar-brand">Gerenciamento de TCC</a>
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
                
                  <li className="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Bancas
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to={"/bancas"}><span className="dropdown-item">Bancas</span></Link>
                    <Link to={"/defesas"}><a className="dropdown-item" href="#">Defesa</a></Link>
                    </div>
                  </li>
                




                <NavItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="/login" label="Sair" />
                
            </ul>
            </div>
        </div>
      </div>
    )
}

export default Navbar;