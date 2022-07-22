import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button";
import Footer from "../components/footer/footer";
import LocalStorage from "../services/resource/localstorageService";

function Home() {

    const [usuario, setUsuario] = useState('');

    useEffect(() => {
        const item = LocalStorage.getItem("@TCC-Usuario");
        setUsuario(item.nome)
    }, [])

    return (
        <>
            <Footer />
            <div className="container">
                <h1 className="display-3">Bem vindo, {usuario}!</h1>
                <p className="lead">Esse é o sistema de gerenciamento de TCC.</p>
                <hr className="my-4" />
                <p>Essa é área administrativa, fique a vontade para testar o sistema utilizando um dos menus ou botões para navegar pelo sistema</p>
                <p className="lead">
                    <Link to={'/cadastro-aluno'}>
                        <Button className="btn btn-primary btn-lg" role="button"><i className="pi pi-user" />
                            Cadastrar Aluno
                        </Button>
                    </Link>
                    <Link to={'/cadastro-orientador'}>
                        <Button className="btn btn-danger btn-lg" role="button"><i className="pi pi-users" />
                            Cadastrar Orientador
                        </Button>
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Home;