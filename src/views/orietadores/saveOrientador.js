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
    const [titulacaoDescricao, setDescricaoTitulacao] = useState();
    const [titulacaoGrau, setGrau] = useState();
    const [titulacaoIes, setIes] = useState();
    const [linhaPesquisaDescricao, setLinhaPesquisaDescricao] = useState();
    const [linhaPesquisaAreaconhecimentoDescricao, setLinhaPesquisaAreaconhecimentoDescricao] = useState();
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
            titulacaoIes: titulacaoIes,
            titulacaoDescricao: titulacaoDescricao,
            titulacaoGrau: titulacaoGrau,
            linhaPesquisaDescricao: linhaPesquisaDescricao,
            linhaPesquisaAreaconhecimentoDescricao: linhaPesquisaAreaconhecimentoDescricao
        }).then(response => {
            navigate('/orientadores')
            messages.mensagemSucesso('Orientador cadastrado com sucesso!')
        }).catch(error => {
            if (error.message === 'Network Error'){
                messages.mensagemAlert("Não foi possível conectar com servidor remoto")
                throw new ('');
            }   
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
            titulacaoIes: titulacaoIes,
            titulacaoDescricao: titulacaoDescricao,
            titulacaoGrau: titulacaoGrau
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
                <div className="col-md-4">
                    <Form id="titulacaoDescricao" label="Descricao da titulação: *" >
                        <input id="titulacaoDescricao" type="text" 
                            className="form-control" 
                            name="titulacaoDescricao"
                            value={titulacaoDescricao}
                            onChange={e => setDescricaoTitulacao(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="titulacaoGrau" label="Grau: *" >
                        <input id="titulacaoGrau" type="text" 
                            className="form-control" 
                            name="titulacaoGrau"
                            value={titulacaoGrau}
                            onChange={e => setGrau(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="titulacaoIes" label="Instituição de Ensino: *" >
                        <input id="titulacaoIes" type="text" 
                            className="form-control" 
                            name="titulacaoIes"
                            value={titulacaoIes}
                            onChange={e => setIes(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Form id="titulacaoDescricao" label="Área de conhecimento: *" >
                        <input id="titulacaoDescricao" type="text" 
                            className="form-control" 
                            name="titulacaoDescricao"
                            value={linhaPesquisaAreaconhecimentoDescricao}
                            onChange={e => setLinhaPesquisaAreaconhecimentoDescricao(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="linhaPesquisa" label="Linha de Pesquisa: *" >
                        <input id="linhaPesquisa" type="text" 
                            className="form-control" 
                            name="linhaPesquisa"
                            value={linhaPesquisaDescricao}
                            onChange={e => setLinhaPesquisaDescricao(e.target.value)}
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