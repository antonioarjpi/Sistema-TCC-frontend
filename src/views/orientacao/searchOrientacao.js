import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableOrientacao from "./tableOrientacao";
import OrientacaoService from "../../services/resource/orientacaoService";
import InputForm from "../../components/input/input";
import { formatLocalDate } from "../../utils/format";


function SearchOrientacao(){

    const [descricaoTCC, setDescricaoTCC] = useState('');
    const [dataOrientacao, setDataOrientacao] = useState('');
    const [tipoTCC, setTipoTCC] = useState('');
    const [matriculaOrientador, setMatriculaOrientador] = useState('');
    const [nomeOrientador, setNomeOrientador] = useState('');
    const [orientacao, setOrientacao] = useState([]);
    const [orientacaoDelete, setOrientacaoDelete] = useState({});
    const [showConfirmDialog, setShowConfirmDialog] = useState('');

    const hoje = Date.now();
    const data = formatLocalDate(hoje, 'yyyy-MM-dd')
    const navigate = useNavigate();
    const service = new OrientacaoService();

    const search = () =>{
        const filter = {
            descricaoTCC: descricaoTCC,
            tipoTCC: tipoTCC,
            dataOrientacao:dataOrientacao,
            nomeOrientador: nomeOrientador,
            matriculaOrientador: matriculaOrientador
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
        <div className="container">
            <Card title="Consulta Orientação">
                <div className="row">
                    <div className="col-md-4"> 
                        <Form htmlFor="descricaoTCC">
                            <InputForm type="text" label="Descrição de TCC "
                                 id="descricaoTCC" 
                                value={descricaoTCC} onChange={e => setDescricaoTCC(e.target.value)}/>
                        </Form>
                    </div>
                    
                    <div className="col-md-4"> 
                        <Form htmlFor="tipoTCC">
                            <InputForm type="text" label="Tipo de tcc" id="tipoTCC" 
                                value={tipoTCC} onChange={e => setTipoTCC(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="dataOrientacao" >
                            <InputForm id="dataOrientacao" type='date'  label="Data da orientação"
                                value={dataOrientacao ? dataOrientacao : data} onChange={e => setDataOrientacao(e.target.value)}/>
                        </Form>
                    </div>
                </div>   
                <div className="row">
                    <div className="col-md-4">
                        <Form htmlFor="nomeOrientador" >
                            <InputForm id="descricaoTitulacao"  label="Nome orientador "
                                value={nomeOrientador} onChange={e => setNomeOrientador(e.target.value)}/>
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="matriculaOrientador" >
                            <InputForm id="matriculaOrientador"  label="Matrícula do orientador "
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