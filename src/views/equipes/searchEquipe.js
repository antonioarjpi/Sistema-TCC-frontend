import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableEquipe from "./tableEquipe";
import EquipeService from "../../services/resource/equipeService";

function SearchEquipe(){

    const [nome, setNome] = useState('');
    const [dataCadastro, setDataCadastro] = useState();
    const [tema, setTema] = useState();
    const [equipeDelete, setEquipeDelete] = useState({});
    const [equipe, setEquipe] = useState([]);
    const [descricaoLinha, setDescricaoLinha] = useState();
    const [descricaoConhecimento, setDescricaoConhecimento] = useState();
    const [showConfirmDialog, setShowConfirmDialog] = useState();

    const navigate = useNavigate();
    const service = new EquipeService();

    const search = () =>{
        const filter = {
            nome: nome,
            dataCadastro: dataCadastro,
            tema: tema,
            descricaoLinha: descricaoLinha,
            descricaoConhecimento: descricaoConhecimento
        }

        service.consult(filter)
        .then(response => {
            const list = response.data
            setEquipe(list)
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
        }).catch(error =>{
            console.log(error)
        })
    }
  
    const edit = (id) =>{
        navigate(`/atualizacao-equipe/${id}`)
    }

    const find = (id) =>{
        navigate(`/equipe/${id}`)
    }

    const erase = () => {
        service
        .del(equipeDelete.id)
        .then(response =>{
            const equipes = equipe;
            const index = equipes.indexOf(equipeDelete)
            equipes.splice(index, 1);
            setEquipe( equipe )
            messages.mensagemSucesso('Equipe excluído com sucesso')
            setShowConfirmDialog(false)     
        }).catch(error =>{
            messages.mensagemErro(error.response.data.message)
        })
    }

    const openDialog = (equipe) =>{
        setShowConfirmDialog(true)
        setEquipeDelete(equipe);
    }

    const cancelDialog = () =>{
        setShowConfirmDialog(false, {equipeDelete: {}  })
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
        <Card title="Consulta Equipes">      
                <div className="row">
                    <div className="col-md-4"> 
                            <Form htmlFor="nome" label="Nome da equipe: ">
                                <input type="text" 
                                       className="form-control" 
                                       id="tema" 
                                       value={nome} 
                                       onChange={e => setNome(e.target.value)} />
                            </Form>
                            </div>
                            <div className="col-md-4"> 
                                <Form htmlFor="dataCadastro" label="Data de cadastro: ">
                                    <input type="text" 
                                        className="form-control" 
                                        id="dataCadastro" 
                                        disabled
                                        value={dataCadastro} 
                                        onChange={e => setDataCadastro(e.target.value)}
                                        />
                                </Form>                   
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="tema" label="Tema: ">
                                    <input id="tema" 
                                        value={tema} 
                                        onChange={e => setTema(e.target.value)}                           
                                        className="form-control"/>
                                </Form>
                            </div>
                        </div>   
                        <div className="row">
                            <div className="col-md-4">
                                <Form htmlFor="descricaoLinha" label="Descrição da linha: ">
                                    <input id="descricaoLinha" 
                                        value={descricaoLinha} 
                                        onChange={e => setDescricaoLinha(e.target.value)}                           
                                        className="form-control"/>
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="descricaoConhecimento" label="Área de conhecimento: ">
                                    <input id="descricaoConhecimento" 
                                        value={descricaoConhecimento} 
                                        onChange={e => setDescricaoConhecimento(e.target.value)}                           
                                        className="form-control"/>
                                </Form>
                            </div>
                        </div>           
                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-equipe'}>
                                <button 
                                        type="button" 
                                        className="btn btn-danger mt-2">
                                        <i className="pi pi-plus"></i> Cadastrar
                                </button>
                            </Link>
            </Card>
        
        <TableEquipe equipes={equipe}
                        visibleAction={find}
                        deleteAction={openDialog}
                        editAction={edit}
        />
        </div>
        <Dialog header="Confirmação" 
                visible={showConfirmDialog} 
                style={{width: '50vw'}}
                footer={confirmDialogFooter} 
                modal={true} 
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão desta equipe?
        </Dialog>           
        </>
    )
}

export default SearchEquipe;