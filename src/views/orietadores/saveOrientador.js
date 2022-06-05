import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
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
            setLinhaPesquisaDescricao(response.data.linhaPesquisa.descricao);
            setLinhaPesquisaAreaconhecimentoDescricao(response.data.linhaPesquisa.areaConhecimento.descricao);
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
            titulacaoGrau: titulacaoGrau,
            linhaPesquisaDescricao: linhaPesquisaDescricao,
            linhaPesquisaAreaconhecimentoDescricao: linhaPesquisaAreaconhecimentoDescricao
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
                        <InputText className="p-inputtext-sm block mb-1"  keyfilter={/^[^</0!@#'+|$%´`¨&*"()1:;2=34,5_67}{[8\\9./>*!]+$/} value={nome} onChange={e => setNome(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-6">
                    <Form id="email" label="Email: *" >
                        <InputText className="p-inputtext-sm block mb-1" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Form id="titulacaoDescricao" label="Descricao da titulação: *" >
                        <InputText className="p-inputtext-sm block mb-1" id="titulacaoDescricao" value={titulacaoDescricao} onChange={e => setDescricaoTitulacao(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="titulacaoGrau" label="Grau: *" >
                        <InputText className="p-inputtext-sm block mb-1" id="titulacaoGrau" value={titulacaoGrau} onChange={e => setGrau(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="titulacaoIes" label="Instituição de Ensino: *" >
                        <InputText className="p-inputtext-sm block mb-1" id="titulacaoIes" value={titulacaoIes} onChange={e => setIes(e.target.value)}/>
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Form id="areaconhecimento" label="Área de conhecimento: *" >
                        <InputText className="p-inputtext-sm block mb-1" id="areaconhecimento" value={linhaPesquisaAreaconhecimentoDescricao} onChange={e => setLinhaPesquisaAreaconhecimentoDescricao(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-8">
                    <Form id="linhaPesquisa" label="Linha de Pesquisa: *" >
                        <InputText className="p-inputtext-sm block mb-1" id="linhaPesquisa" value={linhaPesquisaDescricao} onChange={e => setLinhaPesquisaDescricao(e.target.value)}/>
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <Form id="senha" label="Senha: *" >
                        <Password className="p-inputtext-sm block mb-1" toggleMask value={senha} onChange={(e) => setSenha(e.target.value)} feedback={false} />        
                    </Form>
                </div>
                <div className="col-md-2">
                    <Form id="senhaRepetida" label="Repita a senha: *" >
                        <Password className="p-inputtext-sm block mb-1" toggleMask value={senhaRepetida} onChange={(e) => setSenhaRepetida(e.target.value)} feedback={false} />  
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