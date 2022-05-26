import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import OrientacaoService from "../../services/resource/orientacaoService";


function SaveOrientacao(){

    const [descricaoTCC, setDescricaoTCC] = useState();
    const [dataOrientacao, setDataOrientacao] = useState();
    const [tipoTCC, setTipoTCC] = useState();
    const [matriculaOrientador, setMatriculaOrientador] = useState();


    const navigate = useNavigate();

    const service = new OrientacaoService();

    const submit = () => {

        try{
            service.validate({
                descricaoTCC: descricaoTCC,
                dataOrientacao: dataOrientacao,
                tipoTCC: tipoTCC,
                matriculaOrientador: matriculaOrientador,
                
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.save({
            descricaoTCC: descricaoTCC,
            dataOrientacao: dataOrientacao,
            tipoTCC: tipoTCC,
            matriculaOrientador: matriculaOrientador,
        }).then(response => {
            navigate('/orientacao')
            messages.mensagemSucesso('Orientação cadastrado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <>
        <Navbar />
        <div className="container">
            <Card title='Cadastro de Orientação'>
            <div className="row">
                <div className="col-md-12">
                    <Form id="descricaoTCC" label="Descrição: *" >
                        <input id="descricaoTCC" type="text" 
                            className="form-control" 
                            name="descricaoTCC"
                            value={descricaoTCC}
                            onChange={e => setDescricaoTCC(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <Form id="dataOrientacao" label="Data da Orientacao: *" >
                        <input id="dataOrientacao" type="date" 
                            className="form-control" 
                            name="dataOrientacao"
                            value={dataOrientacao}
                            onChange={e => setDataOrientacao(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <Form id="tipoTCC" label="Tipo do tcc: *" >
                        <input id="tipoTCC" type="text" 
                            className="form-control" 
                            name="tipoTCC"
                            value={tipoTCC}
                            onChange={e => setTipoTCC(e.target.value)}
                                />
                    </Form>
                </div>
   
                <div className="col-md-4">
                    <Form id="matriculaOrientador" label="Matricula orientador: *" >
                        <input id="matriculaOrientador" type="text" 
                            className="form-control" 
                            name="matriculaOrientador"
                            value={matriculaOrientador}
                            onChange={e => setMatriculaOrientador(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-6" >
                <button  onClick={submit} className="btn btn-primary">
                    <i className="pi pi-save"></i>Salvar
                </button>
                    <Link to={'/orientacao'}>
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

export default SaveOrientacao;