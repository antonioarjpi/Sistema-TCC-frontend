import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import OrientadorService from "../../services/resource/orientadorService";
import TableOrientador from "./tableOrientador";


function SearchOrientador(){

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState();
    const [email, setEmail] = useState();
    const [descricaoTitulacao, setDescricaoTitulacao] = useState();
    const [grau, setGrau] = useState();
    const [ies, setIes] = useState();
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
            ies: ies            
        }

        service.consult(filter)
        .then(response => {
            const list = response.data
            setOrientador(list)
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
        }).catch(error =>{
            console.log(error.response.data.response)
        })
    }
  
    const edit = (id) =>{
        navigate(`/atualizacao-orientador/${id}`)
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
            messages.mensagemErro(error.message)
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
        <Navbar/>
        <div className="container">
        <Card title="Consulta Orientadores">
                
                <div className="row">
                    <div className="col-md-4"> 
                            <Form htmlFor="nome" label="Nome: ">
                                <input type="text" 
                                       className="form-control" 
                                       id="nome" 
                                       value={nome} 
                                       onChange={e => setNome(e.target.value)}
                                       placeholder="Digite o nome" />
                            </Form>
                            </div>
                            <div className="col-md-4"> 
                                <Form htmlFor="email" label="E-mail: ">
                                    <input type="email" 
                                        className="form-control" 
                                        id="email" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Digite a descrição" />
                                </Form>                   
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="matricula" label="Matricula: ">
                                    <input id="matricula" 
                                        value={matricula} 
                                        onChange={e => setMatricula(e.target.value)}                           
                                        className="form-control"
                                        placeholder="Digite a matrícula" />
                                </Form>
                            </div>
                        </div>   
                        <div className="row">
                            <div className="col-md-4">
                                <Form htmlFor="descricaoTitulacao" label="Titulação: ">
                                    <input id="descricaoTitulacao" 
                                        value={descricaoTitulacao} 
                                        onChange={e => setDescricaoTitulacao(e.target.value)}                           
                                        className="form-control"
                                        placeholder="Digite a titulação" />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="ies" label="Instituição de Ensino: ">
                                    <input id="ies" 
                                        value={ies} 
                                        onChange={e => setIes(e.target.value)}                           
                                        className="form-control"
                                        placeholder="Instituição de ensino" />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="grau" label="Grau: ">
                                    <input id="grau" 
                                        value={grau} 
                                        onChange={e => setGrau(e.target.value)}                           
                                        className="form-control"
                                        placeholder="Digite o grau" />
                                </Form>
                            </div>

                        </div> 
                            
                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-orientador'}>
                                <button 
                                        type="button" 
                                        className="btn btn-danger mt-2">
                                        <i className="pi pi-plus"></i> Cadastrar
                                </button>
                            </Link>

            </Card>
        
        <TableOrientador orientadores={orientador}
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
                Confirma a exclusão deste orientador?
        </Dialog>        
        </>
    )
}


export default SearchOrientador;