import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import OrientadorService from "../../services/resource/orientadorService";

function SaveOrientador(){

    const [orientador, setOrientador] = useState();
    const [nome, setNome] = useState();
    const [matricula, setMatricula] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [descricaoTitulacao, setDescricaoTitulacao] = useState();
    const [grau, setGrau] = useState();
    const [ies, setIes] = useState();
    const [senhaRepetida, setSenhaRepetida] = useState();
    const [atualizando, setAtualizando] = useState(true);
    
    const navigate = useNavigate();
    const { id } = useParams();
    const service = new OrientadorService();


    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setOrientador(response.data.id)
            setNome(response.data.nome);
            setEmail(response.data.email);
            setSenha(response.data.senha);
            setSenhaRepetida(response.data.senha);
            setMatricula(response.data.matricula);   
            setDescricaoTitulacao(response.data.titulacao.descricao);
            setIes(response.data.titulacao.ies);
            setGrau(response.data.titulacao.grau);
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })

      }},[]);


    const submit = () => {
        try{
            service.validate({
                nome: nome,
                email: email,
                senha: senha,
                senhaRepetida: senhaRepetida
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.save({
            nome: nome,
            email: email,
            senha: senha,
            matricula: matricula,
            ies: ies,
            descricaoTitulacao: descricaoTitulacao,
            grau: grau
        }).then(response => {
            navigate('/orientadores')
            messages.mensagemSucesso('Orientador cadastrado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    const update = () => {
        try{
            service.validate({
                nome: nome,
                email: email,
                senha: senha,
                senhaRepetida: senhaRepetida
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.update({
            id: orientador,
            nome: nome,
            email: email,
            senha: senha,
            matricula: matricula,
            ies: ies,
            descricaoTitulacao: descricaoTitulacao,
            grau: grau
        }).then(response => {
            navigate('/orientadores')
            messages.mensagemSucesso('Orientador atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <>
        <Navbar />
        <div className="container">
            <Card title={ atualizando ? 'Cadastro Orientador' : 'Atualização de Orientador' }>
            <div className="row">
                    <div className="col-md-2">
                        <Form id="matricula" label="Matricula: " >
                            <input id="nome" type="text" 
                                className="form-control" 
                                name="matricula"
                                disabled
                                value={matricula}
                                onChange={e => setMatricula(e.target.value)}
                                    />
                        </Form>
                    </div>
                </div> 
            <div className="row">
                <div className="col-md-6">
                    <Form id="nome" label="Nome: *" >
                        <input id="nome" type="text" 
                            className="form-control" 
                            name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-6">
                    <Form id="email" label="Email: *" >
                        <input id="email" type="text" 
                            className="form-control" 
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Form id="descricaoTitulacao" label="Descricao da titulação: *" >
                        <input id="descricaoTitulacao" type="text" 
                            className="form-control" 
                            name="descricaoTitulacao"
                            value={descricaoTitulacao}
                            onChange={e => setDescricaoTitulacao(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="grau" label="Grau: *" >
                        <input id="grau" type="text" 
                            className="form-control" 
                            name="grau"
                            value={grau}
                            onChange={e => setGrau(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-6">
                    <Form id="ies" label="Instituição de Ensino: *" >
                        <input id="ies" type="text" 
                            className="form-control" 
                            name="ies"
                            value={ies}
                            onChange={e => setIes(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <Form id="senha" label="Senha: *" >
                        <input id="senha" type="password" 
                            className="form-control" 
                            name="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                                />
                    </Form>
                </div>
            
            
                <div className="col-md-2">
                    <Form id="senhaRepetida" label="Repita a senha: *" >
                        <input id="senhaRepetida" type="password" 
                            className="form-control" 
                            name="senhaRepetida"
                            value={senhaRepetida}
                            onChange={e => setSenhaRepetida(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-6" >
                { atualizando ? (
                        <button  onClick={submit} className="btn btn-primary">
                            <i className="pi pi-save"></i>Salvar
                        </button>
                    ) : (
                        <button  onClick={update} className="btn btn-primary">
                            <i className="pi pi-save"></i>Atualizar
                        </button>                      
                    )

                    }         
                    <Link to={'/orientadores'}>
                    <button className="btn btn-danger">
                        <i className="pi pi-times"></i>Cancelar
                    </button>
                    </Link>
                </div>
            </div>
        </Card>
    </div>
    
    </>
    )
}

export default SaveOrientador;