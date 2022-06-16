import React from "react";
import './styles.css'

class Forbidden extends React.Component{

    render(){
        return(
            <>
            <div className="forbidden">
            <div className="scene">
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <span className="bg-403">403</span>
                <div className="text">
                    <span className="hero-text"></span>
                    <span className="msg">Não posso deixar<span>você</span> acessar.</span>
                    <span className="support">
                    <a href="/login"><span>Tente fazer login ou contate o administrador</span></a>
                    <a href="mailto:antonioarjpi@gmail.com?subject=Erro 403 ao acessar o sistema">suporte</a>
                    </span>
                </div>
                <div className="lock"></div>
            </div>
            </div>
            </>
        )
    }
}

export default Forbidden;