import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableOrientacao from "./tableOrientacao";
import OrientacaoService from "../../services/resource/orientacaoService";


function SearchOrientacao(){

    const [descricaoTCC, setDescricaoTCC] = useState('');
    const [dataOrientacao, setDataOrientacao] = useState();
    const [tipoTCC, setTipoTCC] = useState();
    const [matriculaOrientador, setMatriculaOrientador] = useState();
    const [nomeOrientador, setNomeOrientador] = useState();
    const [orientacao, setOrientacao] = useState([]);
    const [orientacaoDelete, setOrientacaoDelete] = useState({});
    const [showConfirmDialog, setShowConfirmDialog] = useState();

    const navigate = useNavigate();
    const service = new OrientacaoService();

    const search = () =>{
        const filter = {
            descricaoTCC: descricaoTCC,
            tipoTCC: tipoTCC
        }
        service.consult(filter)
        .then(response => {
            const list = response.data
            setOrientacao(list)
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
        }).catch(error =>{
            console.log(error)
        })
    }
  
    const edit = (id) =>{
        navigate(`/atualizacao-orientacao/${id}`)
    }

    const erase = () => {
        service
        .del(orientacaoDelete.id)
        .then(response =>{
            const orientacoes = orientacao;
            const index = orientacoes.indexOf(orientacaoDelete)
            orientacoes.splice(index, 1);
            setOrientacao(orientacao);
            messages.mensagemSucesso('Orientação excluído excluído com sucesso')
            setShowConfirmDialog(false)
        }).catch(error =>{
            messages.mensagemErro(error.response.data.message)
        })
    }

    const openDialog = (orientacao) =>{
       setShowConfirmDialog(true);
       setOrientacaoDelete(orientacao);
    }

    const cancelDialog = () =>{
        setShowConfirmDialog(false, {orientacaoDelete: {}  })
    }

  
    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={erase} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelDialog} className="p-button-secondary" />
        </div>
    );

    return(
        <>
        <Navbar/>
        <div className="container">
            <Card title="Consulta Orientação">
                <div className="row">
                    <div className="col-md-4"> 
                        <Form htmlFor="descricaoTCC" label="Descrição de TCC: ">
                            <input type="text" className="form-control" id="descricaoTCC" 
                                value={descricaoTCC} onChange={e => setDescricaoTCC(e.target.value)}/>
                        </Form>
                    </div>
                    
                    <div className="col-md-4"> 
                        <Form htmlFor="tipoTCC" label="Tipo de TCC: ">
                            <input type="text" className="form-control" id="tipoTCC" 
                                value={tipoTCC} onChange={e => setTipoTCC(e.target.value)}/>
                        </Form>                   
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="dataOrientacao" label="Data da orientação: ">
                            <input id="dataOrientacao" className="form-control"
                                value={dataOrientacao} onChange={e => setDataOrientacao(e.target.value)}/>
                        </Form>
                    </div>
                </div>   
                <div className="row">
                    <div className="col-md-4">
                        <Form htmlFor="nomeOrientador" label="Nome orientador: ">
                            <input id="descricaoTitulacao" className="form-control"
                                value={nomeOrientador} onChange={e => setNomeOrientador(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="matriculaOrientador" label="Matrícula do orientador: ">
                            <input id="matriculaOrientador" className="form-control"
                                value={matriculaOrientador} onChange={e => setMatriculaOrientador(e.target.value)}/>
                        </Form>
                    </div>
                </div> 
                            
                <button type="button" className="btn btn-success mt-2"onClick={search}>
                    <i className="pi pi-search"></i> Buscar
                </button>
                <Link to={'/cadastro-orientacao'}>
                    <button type="button" className="btn btn-danger mt-2">
                        <i className="pi pi-plus"></i> Cadastrar
                    </button>
                </Link>
            </Card>
        
        <TableOrientacao orientacoes={orientacao}
                        deleteAction={openDialog}
                        editAction={edit}/>
        </div>
        <Dialog header="Confirmação" 
                visible={showConfirmDialog} 
                style={{width: '50vw'}}
                footer={confirmDialogFooter} 
                modal={true} 
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão desta orientação?
        </Dialog>         
        </>
    )
}


export default SearchOrientacao;