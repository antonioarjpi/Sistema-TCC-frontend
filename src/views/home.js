import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

function Home(){

    return(
        <>
        <Navbar />
        <div className="container">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">Esse é seu sistema de gerenciamento de TCC.</p>
            <hr className="my-4" />
            <p>E essa é área administrativa, fique a vontade para utilizar um dos menus ou botões para navegar pelo sistema</p>
            <p className="lead">
                <Link to={'/cadastro-aluno'}>
                    <Button className="btn btn-primary btn-lg" role="button"><i className="pi pi-users"/>
                        Cadastrar Aluno
                    </Button>
                </Link>
                    <Link to={'/cadastro-orientador'}>
                    <Button className="btn btn-danger btn-lg" role="button"><i className="pi pi-money-bill"/>
                        Cadastrar Orientador
                    </Button>
                </Link>
            </p>
        </div>
        </>
    )
}

export default Home;