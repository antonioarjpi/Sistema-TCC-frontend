import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Password } from 'primereact/password';
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import OrientadorService from "../../services/resource/orientadorService";
import InputForm from "../../components/input/input";
import Button from "../../components/button/button";

const valoresInicial = {
    nome: '', 
    matricula: '',
    email: '',
    titulacaoDescricao: '',
    titulacaoGrau: '',
    titulacaoIes: '',
    linhaPesquisaDescricao: '',
    linhaPesquisaAreaconhecimentoDescricao: '',
    senha: '',
    senhaRepetida: '',
}

function CadastroOrientador(){

    const [values, setValues] = useState(valoresInicial)
    const [conhecimento, setConhecimento] = useState()
    const [atualizando, setAtualizando] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const service = new OrientadorService();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setValues(response.data)
            setAtualizando(true);
            setConhecimento(response.data.areaConhecimento)
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);

    

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value});        
    };

    const submit = (event) => {
        event.preventDefault();
        values.linhaPesquisaAreaconhecimentoDescricao = conhecimento;
        if(atualizando === false){
            try{
                service.validate(values)
            }catch(error){
                const msgs = error.message;
                msgs.forEach(msg=> messages.mensagemErro(msg));
                return false;
            }
            service.save(values)
            .then(() => {
                navigate('/orientadores')
                messages.mensagemSucesso('Orientador cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data.message)
            })
        }else if(atualizando === true){
            try{
                service.validateUpdate(values)
            }catch(error){
                const msgs = error.message;
                msgs.forEach(msg=> messages.mensagemErro(msg));
                return false;
            }
         
            service.update(values).then(response => {
                navigate('/orientadores')
                messages.mensagemSucesso('Orientador atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data.message)
            })
        }
    }

    return(
        <div className="container">
            <Card title={ atualizando ? 'Atualização de Orientador' : 'Cadastro de Orientador' }>
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col-md-2">
                            <Form id="matricula"  >
                                <InputForm id="matricula" type="text" label="Matricula"
                                    className="p-inputtext-sm block mb-1" name="matricula"
                                    disabled value={values.matricula} onChange={onChange}/>
                            </Form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form id="nome" >
                                <InputForm className="p-inputtext-sm block mb-1" label="Nome *" name="nome"
                                keyfilter={/^[^</0!@#'+|$%´`¨&*"()1:;2=34,5_67}{[8\\9./>*!]+$/} value={values.nome} onChange={onChange}/>
                            </Form>
                        </div>
                        <div className="col-md-6">
                            <Form id="email"  >
                                <InputForm className="p-inputtext-sm block mb-1" label="Email *"
                                name="email" value={values.email} onChange={onChange}/>
                            </Form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <Form id="titulacaoDescricao" >
                                <InputForm className="p-inputtext-sm block mb-1" label="Descricao da titulação *"
                                name="titulacaoDescricao" value={values.titulacaoDescricao} 
                                onChange={onChange}/>
                            </Form>
                        </div>
                        <div className="col-md-4">
                            <Form id="titulacaoGrau"  >
                                <InputForm className="p-inputtext-sm block mb-1" label="Grau: *"
                                name="titulacaoGrau" value={values.titulacaoGrau} 
                                onChange={onChange}/>
                            </Form>
                        </div>
                        <div className="col-md-4">
                            <Form id="titulacaoIes"  >
                                <InputForm className="p-inputtext-sm block mb-1" label="Instituição de Ensino *"
                                name="titulacaoIes" value={values.titulacaoIes} onChange={onChange}/>
                            </Form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <Form id="areaconhecimento">
                                <InputForm className="p-inputtext-sm block mb-1" label="Área de conhecimento *" 
                                name="linhaPesquisaAreaconhecimentoDescricao" value={conhecimento} 
                                onChange={e => setConhecimento(e.target.value)}/>
                            </Form>
                        </div>
                        <div className="col-md-8">
                            <Form id="linhaPesquisa">
                                <InputForm className="p-inputtext-sm block mb-1" label="Linha de Pesquisa *" 
                                name="linhaPesquisaDescricao" value={values.linhaPesquisaDescricao} 
                                onChange={onChange}/>
                            </Form>
                        </div>
                    </div>

                    { atualizando === false ? (
                        <div className="row">
                            <div className="col-md-3">
                                <Form id="senha" >
                                    <label className="input-label" htmlFor="passwordRepeat">Senha *</label>
                                    <Password className='password' name="senha" style={{width: '100%'}} value={values.senha} onChange={onChange} toggleMask /> 
                                </Form>
                            </div>
                            <div className="col-md-3">
                                <Form id="senhaRepetida" >
                                    <label className="input-label" htmlFor="passwordRepeat">Confirmação de senha *</label>
                                    <Password className='password' name="senhaRepetida"  style={{width: '100%'}} value={values.senhaRepetida} onChange={onChange} toggleMask feedback={false} />
                                </Form>
                            </div>
                    </div>
                    ) : (
                        <></>
                    )}
                    <div className="row mt-2">
                        <div className="col-md-6" >
                        { atualizando ? (
                            <Button  type="submit" className="btn btn-primary" icon="pi pi-save">
                                Atualizar
                            </Button>    
                        ) : (
                            <Button type="submit" className="btn btn-primary" icon="pi pi-save" >
                                Salvar
                            </Button>                    
                            )}         
                            <Link to={'/orientadores'}>
                            <button className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancelar
                            </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default CadastroOrientador;