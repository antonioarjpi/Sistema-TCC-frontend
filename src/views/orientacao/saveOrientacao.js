import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import OrientacaoService from "../../services/resource/orientacaoService";
import { formatLocalDate } from "../../utils/format";


function SaveOrientacao(){

    const [orientacao, setOrientacao] = useState();
    const [descricaoTCC, setDescricaoTCC] = useState();
    const [dataOrientacao, setDataOrientacao] = useState();
    const [tipoTCC, setTipoTCC] = useState();
    const [matriculaOrientador, setMatriculaOrientador] = useState();
    const [equipe, setEquipe] = useState();
    const [atualizando, setAtualizando] = useState(true);


    const {id} = useParams();
    const navigate = useNavigate();
    const service = new OrientacaoService();

    useEffect(() =>{
        if(id){
            service.findId(id)
            .then(response =>{
                setOrientacao(response.data.id);
                setDescricaoTCC(response.data.descricaoTCC);
                setDataOrientacao(formatLocalDate(response.data.dataOrientacao,"yyyy-MM-dd"));
                setTipoTCC(response.data.tccDescricao);
                setMatriculaOrientador(response.data.matriculaOrientador);
                setEquipe(response.data.equipe)
                setAtualizando(false);
            })
            .catch(erros => {
                messages.mensagemErro(erros.response.data)
            })
        }}, [])

    const submit = () => {
        try{
            service.validate({
                descricaoTCC: descricaoTCC,
                dataOrientacao: dataOrientacao,
                tipoTCC: tipoTCC,
                matriculaOrientador: matriculaOrientador,
                equipe: equipe
                
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.save({
            equipe: equipe,
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

    const update = () => {
        try{
            service.validate({
                descricaoTCC: descricaoTCC,
                dataOrientacao: dataOrientacao,
                tipoTCC: tipoTCC,
                matriculaOrientador: matriculaOrientador,
                equipe: equipe
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.update({
            id: orientacao,
            descricaoTCC: descricaoTCC,
            dataOrientacao: dataOrientacao,
            tipoTCC: tipoTCC,
            matriculaOrientador: matriculaOrientador,
        }).then(response => {
            navigate('/orientacao')
            messages.mensagemSucesso('Orientação atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <>
        <Navbar />
        <div className="container">
            <Card title={ atualizando ? 'Cadastro de Orientação' : 'Atualização de orientação' }>
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
                <div className="col-md-4">
                    <Form id="dataOrientacao" label="Data da Orientacao: *" >
                        <input id="dataOrientacao" type="date" 
                            className="form-control" 
                            name="dataOrientacao"
                            value={dataOrientacao}
                            onChange={e => setDataOrientacao(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="tipoTCC" label="Tipo do tcc: *" >
                        <input id="tipoTCC" type="text" 
                            className="form-control" 
                            name="tipoTCC"
                            value={tipoTCC}
                            onChange={e => setTipoTCC(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">


                <div className="col-md-4">
                    <Form id="equipe" label="Código da equipe: *" >
                        <input id="equipe" type="text" 
                            className="form-control" 
                            name="equipe"
                            value={equipe}
                            disabled={ atualizando ? false : true }
                            onChange={e => setEquipe(e.target.value)}
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
                { atualizando ? (
                        <button  onClick={submit} className="btn btn-primary">
                            <i className="pi pi-save"></i>Salvar
                        </button>
                    ) : (
                        <button  onClick={update} className="btn btn-primary">
                            <i className="pi pi-save"></i>Atualizar
                        </button>                      
                    )}         
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