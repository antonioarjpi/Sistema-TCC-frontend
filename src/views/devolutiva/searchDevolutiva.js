import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableDevolutiva from "./tableDevolutiva";
import DevolutivaService from "../../services/resource/devolutivaService";


function SearchDevolutiva(){

    const [orientacao, setOrientacao] = useState();
    const [dataMudanca, setDtaMudanca] = useState();
    const [statusOrientacao, setStatusOrientacao] = useState();
    const [descricaoDaDevolutiva, setDescricaoDaDevolutiva] = useState();
    const [versaoDoc, setVersaoDoc] = useState();
    const [localDeCorrecao, setLocalDeCorrecao] = useState();
    const [correcaoSugerida, setCorrecaoSugerida] = useState();
    const [devolutivaDelete, setDevolutivaDelete] = useState({});
    const [devolutiva, setDevolutiva] = useState([]);

    const [showConfirmDialog, setShowConfirmDialog] = useState();

    const navigate = useNavigate();
    const service = new DevolutivaService();

    const search = () =>{
        const filter = {
            statusOrientacao: statusOrientacao,
            descricaoDaDevolutiva: descricaoDaDevolutiva,
        }

        service.consult(filter)
        .then(response => {
            const list = response.data
            setDevolutiva(list)
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
        }).catch(error =>{
            console.log(error)
        })
    }
  
    const edit = (id) =>{
        navigate(`/atualiza-devolutiva/${id}`)
    }

    const erase = () => {
        service
        .del(devolutivaDelete.id)
        .then(response =>{
            const devolutivas = devolutiva;
            const index = devolutivas.indexOf(devolutivaDelete);
            devolutivas.splice(index, 1);
            setDevolutiva( devolutiva );
            messages.mensagemSucesso('Devolutiva excluído com sucesso');
            setShowConfirmDialog(false);
        }).catch(error =>{
            messages.mensagemErro(error.response.data.error);
        })
    }

    const openDialog = (devolutiva) =>{
        setShowConfirmDialog(true);
        setDevolutivaDelete(devolutiva)
    }

    const cancelDialog = () =>{
        setShowConfirmDialog(false, {devolutivaDelete: {}});
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
        <Card title="Consulta Devolutivas">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <Form htmlFor="statusOrientacao" label="Status: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="statusOrientacao" 
                                       value={statusOrientacao} 
                                       onChange={e => setStatusOrientacao(e.target.value)} />
                            </Form>

                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-devolutiva'}>
                                <button 
                                        type="button" 
                                        className="btn btn-danger mt-2">
                                        <i className="pi pi-plus"></i> Cadastrar
                                </button>
                            </Link>

                        </div>
                        
                    </div>
                </div>   
                
              
            </Card>
        
        <TableDevolutiva devolutivas={devolutiva}
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
                Confirma a exclusão desta devolutiva?
        </Dialog>              
        </>
    )
}


export default SearchDevolutiva;