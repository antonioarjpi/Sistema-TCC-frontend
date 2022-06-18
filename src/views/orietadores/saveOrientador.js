import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import OrientadorService from "../../services/resource/orientadorService";
import InputForm from "../../components/input/input";

function SaveOrientador(){

    const [orientador, setOrientador] = useState('');
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [titulacaoDescricao, setDescricaoTitulacao] = useState('');
    const [titulacaoGrau, setGrau] = useState('');
    const [titulacaoIes, setIes] = useState('');
    const [linhaPesquisaDescricao, setLinhaPesquisaDescricao] = useState('');
    const [linhaPesquisaAreaconhecimentoDescricao, setLinhaPesquisaAreaconhecimentoDescricao] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');
    const [atualizando, setAtualizando] = useState(true);
    
    const navigate = useNavigate();
    const { id } = useParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const service = new OrientadorService();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setOrientador(response.data.id)
            setNome(response.data.nome);
            setEmail(response.data.email);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);

    const submit = () => {
        try{
            service.validate({
                nome: nome,
                email: email,
                senha: senha,
                senhaRepetida: senhaRepetida,
                titulacaoDescricao: titulacaoDescricao,
                titulacaoGrau: titulacaoGrau
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
                throw new ('')();
            }   
            messages.mensagemErro(error.response.data.message)
        })
    }

    const update = () => {
        try{
            service.validateUpdate({
                nome: nome,
                email: email,
                titulacaoDescricao: titulacaoDescricao,
                titulacaoGrau: titulacaoGrau
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
        <div className="container">
            <Card title={ atualizando ? 'Cadastro Orientador' : 'Atualização de Orientador' }>
            <div className="row">
                <div className="col-md-2">
                    <Form id="matricula"  >
                        <InputForm id="nome" type="text" label="Matricula"
                            className="p-inputtext-sm block mb-1" name="matricula"
                            disabled value={matricula} onChange={e => setMatricula(e.target.value)}/>
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Form id="nome" >
                        <InputForm className="p-inputtext-sm block mb-1" label="Nome *" 
                        keyfilter={/^[^</0!@#'+|$%´`¨&*"()1:;2=34,5_67}{[8\\9./>*!]+$/} value={nome} onChange={e => setNome(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-6">
                    <Form id="email"  >
                        <InputForm className="p-inputtext-sm block mb-1" label="Email *"
                        id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Form id="titulacaoDescricao" >
                        <InputForm className="p-inputtext-sm block mb-1" label="Descricao da titulação *"
                        id="titulacaoDescricao" value={titulacaoDescricao} 
                        onChange={e => setDescricaoTitulacao(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="titulacaoGrau"  >
                        <InputForm className="p-inputtext-sm block mb-1" label="Grau: *"
                        id="titulacaoGrau" value={titulacaoGrau} 
                        onChange={e => setGrau(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="titulacaoIes"  >
                        <InputForm className="p-inputtext-sm block mb-1" label="Instituição de Ensino *"
                        id="titulacaoIes" value={titulacaoIes} onChange={e => setIes(e.target.value)}/>
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Form id="areaconhecimento">
                        <InputForm className="p-inputtext-sm block mb-1" label="Área de conhecimento *" 
                        id="areaconhecimento" value={linhaPesquisaAreaconhecimentoDescricao} 
                        onChange={e => setLinhaPesquisaAreaconhecimentoDescricao(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-8">
                    <Form id="linhaPesquisa">
                        <InputForm className="p-inputtext-sm block mb-1" label="Linha de Pesquisa *" 
                        id="linhaPesquisa" value={linhaPesquisaDescricao} 
                        onChange={e => setLinhaPesquisaDescricao(e.target.value)}/>
                    </Form>
                </div>
            </div>

            { atualizando ? (
                <div className="row">
                    <div className="col-md-3">
                        <Form id="senha" >
                            <span className="p-float-label">
                                <Password style={{width: '100%'}} value={senha} onChange={(e) => setSenha(e.target.value)} toggleMask />
                                <label htmlFor="senha">Senha*</label>
                            </span>
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form id="senhaRepetida" >
                            <span className="p-float-label">
                                <Password style={{width: '100%'}} value={senhaRepetida} onChange={(e) => setSenhaRepetida(e.target.value)} toggleMask feedback={false} />
                                <label htmlFor="senhaRepetida">Repita a senha*</label>
                            </span>
                        </Form>
                    </div>
            </div>
            ) : (
                <></>
            )}

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
    )
}

export default SaveOrientador;