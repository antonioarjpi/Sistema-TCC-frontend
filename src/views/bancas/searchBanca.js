import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableBanca from "./tableBanca";
import BancaService from "../../services/resource/bancaService";


function SearchBanca(){

    const [descricao, setDescricao] = useState('');
    const [dataBanca, setDataBanca] = useState();
    const [equipeId, setEquipeId] = useState();
    const [orientadorNome, setorientadorNome] = useState();
    const [id, setId] = useState();
    const [membroMatricula, setMembroMatricula] = useState();

    const navigate = useNavigate();
    const [bancaDelete, setBancaDelete] = useState({});
    const [banca, setBanca] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState();


    const service = new BancaService();

    const search = () =>{
        const filter = {
            descricao:descricao,
            membroMatricula: membroMatricula,
            orientadorNome: orientadorNome,
            equipeId: equipeId,
            id: id
        }

        service.consult(filter)
        .then(response => {
            const list = response.data
            setBanca(list)
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
        }).catch(error =>{
            console.log(error)
        })
    }
  
    const edit = (id) =>{
        navigate(`/atualizacao-banca/${id}`)
    }

    const scheduling = (id) =>{
        navigate(`/agendamento-defesa/${id}`)
    }

    const erase = () => {
        service
        .del(bancaDelete.id)
        .then(response =>{
            const bancas = banca;
            const index = bancas.indexOf(bancaDelete);
            bancas.splice(index, 1);
            setBanca( banca );
            messages.mensagemSucesso('Banca excluído com sucesso');
            setShowConfirmDialog(false);
        }).catch(error =>{
            messages.mensagemErro(error.response.data.message)
        })
    }

    const openDialog = (banca) =>{
        setShowConfirmDialog(true);
        setBancaDelete(banca);
    }

    const cancelDialog = () =>{
        setShowConfirmDialog(false, {bancaDelete: {} })
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
            <Card title="Consulta Bancas">
                <div className="row">
                    <div className="col-md-4">
                        <Form htmlFor="descricao" label="Descrição banca: ">
                            <input type="text" 
                                    className="form-control" 
                                    id="descricao" 
                                    value={descricao} 
                                    onChange={e => setDescricao(e.target.value)}/>
                        </Form>          
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="dataBanca" label="Data Banca: ">
                            <input type="" 
                                    className="form-control" 
                                    id="dataBanca" 
                                    disabled
                                    value={dataBanca} 
                                    onChange={e => setDataBanca(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="codigo da Banca" label="Código da banca: ">
                            <input type="text" 
                                    className="form-control" 
                                    id="dataBanca" 
                                    value={id} 
                                    onChange={e => setId(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="codigo" label="Código da equipe: ">
                            <input type="text" 
                                    className="form-control" 
                                    id="codigo" 
                                    value={equipeId} 
                                    onChange={e => setEquipeId(e.target.value)}/>
                        </Form>          
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="matricula" label="Nome orientador: ">
                            <input id="matricula" 
                                value={orientadorNome} 
                                onChange={e => setorientadorNome(e.target.value)}                           
                                className="form-control"/>
                        </Form>
                    </div>

                    <div className="col-md-4">
                        <Form htmlFor="membro" label="Membro: ">
                            <input className="form-control"id="membro" value={membroMatricula} onChange={e => setMembroMatricula(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <button type="button" className="btn btn-success mt-2" onClick={search}>
                            <i className="pi pi-search"></i> Buscar
                        </button>
                        <Link to={'/cadastro-banca'}>
                            <button type="button" className="btn btn-danger mt-2">
                                <i className="pi pi-plus"></i> Cadastrar
                            </button>
                        </Link>
                    </div>
                </div>      
            </Card>
        
        <TableBanca bancas={banca} schedule={scheduling} deleteAction={openDialog} editAction={edit} />
        </div>
        <Dialog header="Confirmação" 
                visible={showConfirmDialog} 
                style={{width: '50vw'}}
                footer={confirmDialogFooter} 
                modal={true} 
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão desta banca?
        </Dialog>          
        </>
    )
}

export default SearchBanca;