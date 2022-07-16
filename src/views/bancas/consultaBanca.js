import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import ButtonForm from '../../components/button/button';
import TabelaBanca from "./tabelaBanca";
import BancaService from "../../services/resource/bancaService";
import InputForm from "../../components/input/input";
import { formatLocalDate } from "../../utils/format";
import Pagination from "../../components/pagination/pagination";

const valoresInicial = {
    id: '',
    descricao: '',
    dataBanca: '',
    equipeId: '',
    orientadorNome: '',
    membroMatricula: ''
}

function ConsultaBancas(){

    const [values, setValues] = useState(valoresInicial)
    const [carregando, setCarregando] = useState(false);
    const [bancaDelete, setBancaDelete] = useState({});
    const [banca, setBanca] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState();

    const navigate = useNavigate();
    const hoje = Date.now();
    const data = formatLocalDate(hoje, 'yyyy-MM-dd')
    const service = new BancaService();

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value});        
    };

    const [pageNumber, setPageNumber] = useState(Number);
    const [right, setRight] = useState(false)
    const [left, setLeft] = useState(false)
    const pageNext = () => {
        setRight(true)
        values.pageNumber = pageNumber + 1
        setPageNumber(values.pageNumber)
        consulta()
    }

    const pageBack = () => {
        setLeft(true)
        values.pageNumber = pageNumber - 1
        setPageNumber(values.pageNumber)
        consulta()
    }

    const submitConsulta = (event) => {
        event.preventDefault();
        setCarregando(true);
        values.pageNumber = 0
        setPageNumber(values.pageNumber)
        consulta();
    }

    const consulta = () =>{
         service.consult(values)
        .then(response => {
            const list = response.data
            setBanca(list)
            if(list.totalElements < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
            setCarregando(false)
            setRight(false)
            setLeft(false)
        }).catch(() =>{
            setCarregando(false)
            setRight(false)
            setLeft(false)
        })
    }
  
    const editar = (id) =>{
        navigate(`/atualizacao-banca/${id}`)
    }

    const agendamentoDefesa = (id) =>{
        navigate(`/agendamento-defesa/${id}`)
    }

    const apagar = () => {
        service
        .del(bancaDelete.id)
        .then(() =>{
            const bancas = banca.content;
            const index = bancas.indexOf(bancaDelete);
            bancas.splice(index, 1);
            setBanca( banca );
            messages.mensagemSucesso('Banca excluído com sucesso');
            setShowConfirmDialog(false);
        }).catch(error =>{
            messages.mensagemErro(error.response.data.message)
        })
    }

    const abrirDialog = (banca) =>{
        setShowConfirmDialog(true);
        setBancaDelete(banca);
    }

    const cancelarDialog = () =>{
        setShowConfirmDialog(false, {bancaDelete: {} })
    }

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={apagar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDialog} className="p-button-secondary" />
        </div>
    );

    return(
        <>
        <div className="container">
            <Card title="Consulta Bancas">
                <form onSubmit={submitConsulta}>
                    <div className="row">
                        <div className="col-md-4">
                            <Form htmlFor="descricao" >
                                <InputForm type="text" 
                                        label="Descrição banca "
                                        name="descricao" 
                                        value={values.descricao} 
                                        onChange={onChange}/>
                            </Form>          
                        </div>
                        <div className="col-md-4">
                            <Form htmlFor="dataBanca" >
                                <InputForm type="date" 
                                        label="Data Banca"
                                        name="dataBanca" 
                                        value={values.dataBanca ? values.dataBanca : data} 
                                        onChange={onChange}/>
                            </Form>
                        </div>
                        <div className="col-md-4">
                            <Form htmlFor="codigo da Banca" >
                                <InputForm type="text" 
                                        label="Código da banca "
                                        name="id" 
                                        value={values.id} 
                                        onChange={onChange}/>
                            </Form>
                        </div>
                        <div className="col-md-4">
                            <Form htmlFor="codigo" >
                                <InputForm type="text" 
                                        label="Código da equipe "
                                        name="equipeId" 
                                        value={values.equipeId} 
                                        onChange={onChange}/>
                            </Form>          
                        </div>
                        <div className="col-md-4">
                            <Form htmlFor="matricula" >
                                <InputForm name="orientadorNome" 
                                    label="Nome orientador "
                                    value={values.orientadorNome} 
                                    onChange={onChange}/>
                            </Form>
                        </div>

                        <div className="col-md-4">
                            <Form htmlFor="membro" >
                                <InputForm label="Membro banca " 
                                    name="membroMatricula" value={values.membroMatricula} onChange={onChange}/>
                            </Form>
                        </div>
                        <div className="col-md-12">
                            <ButtonForm loading={carregando} icon="pi pi-search" type="submit" className="btn btn-success mt-2">
                                Buscar
                            </ButtonForm>
                            <Link to={'/cadastro-banca'}>
                                <ButtonForm icon="pi pi-plus" type="button" className="btn btn-danger mt-2">
                                    Cadastrar
                                </ButtonForm>
                            </Link>
                        </div>
                    </div>      
                </form>
            </Card>
        
        <TabelaBanca bancas={banca} schedule={agendamentoDefesa} deleteAction={abrirDialog} editAction={editar} >
            
            {banca.totalElements === 0 || banca.length === 0 ? (
                <p>Nenhum resultado para exibir</p>
            ):(
            <Pagination number={banca.number} totalPages={banca.totalPages} 
                first={banca.first} last={banca.last} right={right} left={left}
                pageNext={pageNext} pageBack={pageBack} size={banca.totalElements } numberOfElements={banca.numberOfElements}
                />
            )}
        </TabelaBanca>
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

export default ConsultaBancas;