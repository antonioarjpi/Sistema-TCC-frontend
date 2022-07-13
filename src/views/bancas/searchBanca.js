import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import ButtonForm from './../../components/button/button';
import TableBanca from "./tableBanca";
import BancaService from "../../services/resource/bancaService";
import InputForm from "../../components/input/input";
import { formatLocalDate } from "../../utils/format";


function SearchBanca(){

    const [descricao, setDescricao] = useState('');
    const [dataBanca, setDataBanca] = useState('');
    const [equipeId, setEquipeId] = useState('');
    const [orientadorNome, setorientadorNome] = useState('');
    const [id, setId] = useState('');
    const [membroMatricula, setMembroMatricula] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [bancaDelete, setBancaDelete] = useState({});
    const [banca, setBanca] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState();

    const hoje = Date.now();
    const data = formatLocalDate(hoje, 'yyyy-MM-dd')
    const service = new BancaService();

    const search = () =>{
        setLoading(true)
        const filter = {
            descricao:descricao,
            membroMatricula: membroMatricula,
            orientadorNome: orientadorNome,
            equipeId: equipeId,
            dataBanca: dataBanca,
            id: id
        }

        service.consult(filter)
        .then(response => {
            const list = response.data
            setBanca(list)
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
            setLoading(false)
        }).catch(() =>{
            setLoading(false)
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
        <div className="container">
            <Card title="Consulta Bancas">
                <div className="row">
                    <div className="col-md-4">
                        <Form htmlFor="descricao" >
                            <InputForm type="text" 
                                    label="Descrição banca "
                                    id="descricao" 
                                    value={descricao} 
                                    onChange={e => setDescricao(e.target.value)}/>
                        </Form>          
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="dataBanca" >
                            <InputForm type="date" 
                                    label="Data Banca"
                                    id="dataBanca" 
                                    value={dataBanca ? dataBanca : data} 
                                    onChange={e => setDataBanca(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="codigo da Banca" >
                            <InputForm type="text" 
                                    label="Código da banca "
                                    id="dataBanca" 
                                    value={id} 
                                    onChange={e => setId(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="codigo" >
                            <InputForm type="text" 
                                    label="Código da equipe "
                                    id="codigo" 
                                    value={equipeId} 
                                    onChange={e => setEquipeId(e.target.value)}/>
                        </Form>          
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="matricula" >
                            <InputForm id="matricula" 
                                label="Nome orientador "
                                value={orientadorNome} 
                                onChange={e => setorientadorNome(e.target.value)}/>
                        </Form>
                    </div>

                    <div className="col-md-4">
                        <Form htmlFor="membro" >
                            <InputForm label="Membro banca " 
                                id="membro" value={membroMatricula} onChange={e => setMembroMatricula(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-12">
                        <ButtonForm loading={loading} icon="pi pi-search" type="button" className="btn btn-success mt-2" onClick={search}>
                            Buscar
                        </ButtonForm>
                        <Link to={'/cadastro-banca'}>
                            <ButtonForm icon="pi pi-plus" type="button" className="btn btn-danger mt-2">
                                Cadastrar
                            </ButtonForm>
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