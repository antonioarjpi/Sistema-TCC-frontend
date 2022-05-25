import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import EquipeService from "../../services/resource/equipeService";


function SaveEquipe(){

    const [nome, setNome] = useState();
    const [dataCadastro, setDataCadastro] = useState();
    const [delimitacao, setDelimitacao] = useState();
    const [matricula, setMatricula] = useState();
    const [array, setArray] = useState([]);
    const [descricaoLinha, setDescricaoLinha] = useState();
    const [descricaoConhecimento, setDescricaoConhecimento] = useState();

    const navigate = useNavigate();

    const service = new EquipeService();

    const sum = () => {
        if(!matricula){
            throw new messages.mensagemErro("Matrícula em branco.")
        }
        array.push(matricula);
        setMatricula('')       
    }
    
    const submit = () => {      
        try{
            service.validate({
                nome: nome,
                matricula: array
            })
        }catch(error){
            console.log(matricula)
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
        console.log("array: ", array)
        service.save({
            nome: nome,
            dataCadastro: dataCadastro,
            delimitacao: delimitacao,
            matricula: array,
            descricaoLinha: descricaoLinha,
            descricaoConhecimento: descricaoConhecimento
        }).then(response => {
            navigate('/equipes')
            messages.mensagemSucesso('Equipe cadastrado com sucesso!')
        }).catch(error => {
            console.log(matricula)
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <>
        <Navbar />
        <div className="container">
            <Card title='Cadastro de Equipe'>
            <div className="row">
                <div className="col-md-6">
                    <Form id="nome" label="Nome da equipe: *" >
                        <input id="nome" type="text" 
                            className="form-control" 
                            name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="dataCadastro" label="Data de cadastro: *" >
                        <input id="dataCadastro" type="date" 
                            className="form-control" 
                            name="dataCadastro"
                            value={dataCadastro}
                            onChange={e => setDataCadastro(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Form id="matricula" label="Matricula do aluno: *" >
                        <input id="matricula" type="text" 
                            className="form-control" 
                            name="matricula"
                            value={matricula}
                            onChange={e => setMatricula(e.target.value)}
                                />
                    </Form>

                    
                    <div>{array.map(entry =>
                        <div className="bg-success m-1">Matrícula: {entry}</div>
                        )}
                    </div>

                </div>        
                <div className="col-md-4" style={{justifyContent: 'left', alignItems:'center', display: 'grid'}}>
                    <label>Adicione o aluno</label>
                <button className="btn btn-primary" onClick={sum}>
                        <i className="pi pi-plus"></i>
                    </button>
                </div>        
            </div>

                <div className="row">
                    <div className="col-md-12">
                        <Form id="descricaoLinha" label="Descrição da linha: *" >
                            <input id="descricaoLinha" type="text" 
                                className="form-control" 
                                name="descricaoLinha"
                                value={descricaoLinha}
                                onChange={e => setDescricaoLinha(e.target.value)}
                                    />
                        </Form>
                    </div>
                <div className="col-md-12">
                    <Form id="delimitacao" label="Delimitação: *" >
                        <input id="delimitacao" type="text" 
                            className="form-control" 
                            name="delimitacao"
                            value={delimitacao}
                            onChange={e => setDelimitacao(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Form id="descricaoConhecimento" label="Descrição de conhecimento: *" >
                        <input id="descricaoConhecimento" type="text" 
                            className="form-control" 
                            name="descricaoConhecimento"
                            value={descricaoConhecimento}
                            onChange={e => setDescricaoConhecimento(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-6" >
                <button  onClick={submit} className="btn btn-primary">
                    <i className="pi pi-save"></i>Salvar
                </button>
                    <Link to={'/equipes'}>
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

export default SaveEquipe;