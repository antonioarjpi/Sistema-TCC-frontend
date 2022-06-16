import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import BancaService from "../../services/resource/bancaService";
import { formatLocalDate } from "../../utils/format";

function SaveBanca(){

    const [banca, setBanca] = useState();
    const [descricao, setDescricao] = useState();
    const [dataBanca, setDataBanca] = useState();
    const [ordemApresentacao, setOrdemApresentacao] = useState();
    const [matriculaOrientador, setMatriculaOrientador] = useState();
    const [equipe, setEquipe] = useState();
    const [membroMatricula, setMembroMatricula] = useState();
    const [atualizando, setAtualizando] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setBanca(response.data.id)
            setDescricao(response.data.descricao);
            setDataBanca(formatLocalDate(response.data.dataBanca, "yyyy-MM-dd"))      
            setOrdemApresentacao(response.data.ordemApresentacao)
            setMatriculaOrientador(response.data.orientadorMatricula)
            setEquipe(response.data.equipeId)
            setMembroMatricula(response.data.membroMatricula)
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);

    const service = new BancaService();

    const submit = () => {
        try{
            service.validate({
                descricao: descricao,
                dataBanca: dataBanca,
                ordemApresentacao: ordemApresentacao,
                matriculaOrientador: matriculaOrientador,
                equipe: equipe
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;           
        }
     
        service.save({
            descricao: descricao,
            dataBanca: dataBanca,
            ordemApresentacao: ordemApresentacao,
            matriculaOrientador: matriculaOrientador,
            equipe: equipe,
            membroMatricula: membroMatricula
        }).then(response => {
            messages.mensagemSucesso('Banca cadastrada com sucesso!')
            navigate('/bancas')
        }).catch(error => {        
            messages.mensagemErro(error.response.data.message)
            return false
        })
    }

    const update = () => {
        try{
            service.validate({
                descricao: descricao,
                dataBanca: dataBanca,
                ordemApresentacao: ordemApresentacao,
                matriculaOrientador: matriculaOrientador,
                equipe: equipe
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;           
        }
     
        service.update({
            id: banca,
            descricao: descricao,
            dataBanca: dataBanca,
            ordemApresentacao: ordemApresentacao,
            matriculaOrientador: matriculaOrientador,
            equipe: equipe,
            membroMatricula: membroMatricula
        }).then(response => {
            messages.mensagemSucesso('Banca atualizada com sucesso!')
            navigate('/bancas')
        }).catch(error => {       
            messages.mensagemErro(error.response.data.message)
            return false
        })
    }


    return(
        <>
        <Navbar />
        <div className="container">
        <Card title={ atualizando ? 'Cadastro de banca' : 'Atualização de banca' }>
            <div className="row">
                <div className="col-md-12">
                    <Form id="descricao" label="Descrição: *" >
                        <input id="descricao" type="text" 
                            className="form-control" 
                            name="descricao"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <Form id="dataBanca" label="Data da Banca: *" >
                        <input id="dataBanca" type="date" className="form-control" 
                            name="dataBanca" value={dataBanca}
                            onChange={e => setDataBanca(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="ordemApresentacao" label="Ordem de apresentação:" >
                        <input id="ordemApresentacao" type="number" className="form-control" 
                            name="ordemApresentacao" value={ordemApresentacao}
                            onChange={e => setOrdemApresentacao(e.target.value)}/>
                    </Form>
                </div>
            </div>

            <div className="row">

   
                <div className="col-md-4">
                    <Form id="matriculaOrientador" label="Matricula orientador: *" >
                        <input id="matriculaOrientador" type="text" className="form-control" 
                            name="matriculaOrientador" maxLength={8} max={5}
                            value={matriculaOrientador} onChange={e => setMatriculaOrientador(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="equipe" label="Código da equipe: *" >
                        <input id="equipe" type="text" className="form-control" 
                            name="equipe" value={equipe}
                            onChange={e => setEquipe(e.target.value)}/>
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="membroMatricula" label="Convidado banca: *" >
                        <input id="membroMatricula" type="text" className="form-control" 
                            name="membroMatricula" value={membroMatricula}
                            onChange={e => setMembroMatricula(e.target.value)}/>
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
                    <Link to={'/bancas'}>
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

export default SaveBanca;