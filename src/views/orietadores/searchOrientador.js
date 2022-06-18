import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import OrientadorService from "../../services/resource/orientadorService";
import TableOrientador from "./tableOrientador";
import InputForm from "../../components/input/input";


function SearchOrientador(){

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [descricaoTitulacao, setDescricaoTitulacao] = useState('');
    const [grau, setGrau] = useState('');
    const [ies, setIes] = useState('');
    const [linhaPesquisaDescricao, setLinhaPesquisaDescricao] = useState('');
    const [conhecimento, setConhecimento] = useState('');

    const [showConfirmDialog, setShowConfirmDialog] = useState();
    const [orientadorDelete, setOrientadorDelete] = useState({});
    const [orientador, setOrientador] = useState([]);

    const navigate = useNavigate();

    const service = new OrientadorService();

    const search = () =>{
        const filter = {
            nome: nome,
            email: email,
            matricula: matricula,
            descricaoTitulacao: descricaoTitulacao,
            grau: grau,
            ies: ies,
            linhaPesquisa: linhaPesquisaDescricao,
            conhecimento: conhecimento            
        }

        service.consult(filter)
        .then(response => {
            const list = response.data
            setOrientador(list)
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
        }).catch(error =>{
            
        })
    }
  
    const edit = (id) =>{
        navigate(`/atualizacao-orientador/${id}`)
    }

    const display = (id) =>{
        navigate(`/orientador/${id}`)
    }

    const erase = () => {
        service
        .del(orientadorDelete.id)
        .then(response =>{
            const orientadores = orientador;
            const index = orientadores.indexOf(orientadorDelete)
            orientadores.splice(index, 1);
            setOrientador( orientador )
            messages.mensagemSucesso('Orientador excluído com sucesso')
            setShowConfirmDialog(false)
        }).catch(error =>{
            messages.mensagemErro(error.response.data.message)
        })
    }

    const openDialog = (orientador) =>{
        setShowConfirmDialog(true)
        setOrientadorDelete(orientador);
    }

     const cancelDialog = () =>{
        setShowConfirmDialog(false, {orientadorDelete: {}  })
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
            <Card title="Consulta Orientadores"> 
                <div className="row">
                    <div className="col-md-3"> 
                        <Form htmlFor="nome" >
                            <InputForm type="text"  id="nome" label="Nome"
                                value={nome} onChange={e => setNome(e.target.value)}
                            />
                        </Form>
                    </div>
                    <div className="col-md-3"> 
                        <Form htmlFor="email">
                            <InputForm type="email" id="email" label="E-mail "
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </Form>                   
                    </div>
                    <div className="col-md-2">
                        <Form htmlFor="matricula">
                            <InputForm id="matricula" label="Matrícula "   
                                value={matricula} onChange={e => setMatricula(e.target.value)}                           
                            />
                        </Form>
                    </div>
                    <div className="col-md-4">
                        <Form htmlFor="descricaoTitulacao" >
                            <InputForm id="descricaoTitulacao" label="Titulação"
                                value={descricaoTitulacao} onChange={e => setDescricaoTitulacao(e.target.value)}                           
                            />
                        </Form>
                    </div>
                </div>   
                <div className="row">
                    <div className="col-md-3">
                        <Form htmlFor="linhaPesquisa" >
                            <InputForm id="linhaPesquisa" label="Linha de pesquisa"
                                value={linhaPesquisaDescricao} onChange={e => setLinhaPesquisaDescricao(e.target.value)}                           
                            />
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form htmlFor="conhecimento">
                            <InputForm id="conhecimento"  label="Área de conhecimento "
                                value={conhecimento} onChange={e => setConhecimento(e.target.value)}                           
                            />
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form htmlFor="grau" >
                            <InputForm id="grau" label="Grau"
                                value={grau} onChange={e => setGrau(e.target.value)}                           
                            />
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form htmlFor="ies" >
                            <InputForm id="ies" label="Instituição de Ensino"
                                value={ies} onChange={e => setIes(e.target.value)}                           
                            />
                        </Form>
                    </div>
                </div> 
                <button type="button" className="btn btn-success mt-2" onClick={search}>
                    <i className="pi pi-search"></i> Buscar
                </button>
                <Link to={'/cadastro-orientador'}>
                    <button type="button" className="btn btn-danger mt-2">
                        <i className="pi pi-plus"></i> Cadastrar
                    </button>
                </Link>

                </Card>
            
            <TableOrientador orientadores={orientador}
                        deleteAction={openDialog}
                        editAction={edit}
                        visibleAction={display}/>
        </div>
        <Dialog header="Confirmação" 
                visible={showConfirmDialog} 
                style={{width: '50vw'}}
                footer={confirmDialogFooter} 
                modal={true} 
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão deste orientador?
        </Dialog>        
        </>
    )
}


export default SearchOrientador;