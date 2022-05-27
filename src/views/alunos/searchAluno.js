import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableAluno from "./tableAluno";
import AlunoService from "../../services/resource/alunoService";

function SearchAluno(){

    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [matricula, setMatricula] = useState();
    const [showConfirmDialog, setShowConfirmDialog] = useState();
    const [alunoDelete, setAlunoDelete] = useState({});
    const [aluno, setAluno] = useState([]);

    const navigate = useNavigate();

    const service = new AlunoService();

    const search = () =>{

        const filter = {
            nome: nome,
            email: email,
            matricula: matricula,
        }

        service.consult(filter)
        .then(response => {
            const list = response.data
            setAluno(list)
        }).catch(error =>{
            console.log(error.response.data.response)
        })
    }
  
    const edit = (id) =>{
        navigate(`/alunos/${id}`)
    }

    const erase = () => {
        service
        .del(alunoDelete.id)
        .then(response =>{
            const alunos = aluno;
            const index = alunos.indexOf(alunoDelete)
            alunos.splice(index, 1);
            setAluno( aluno )
            messages.mensagemSucesso('Aluno excluído com sucesso')
            setShowConfirmDialog(false)
        }).catch(error =>{
            messages.mensagemErro(error.message)
        })
    }

    const openDialog = (aluno) =>{
        setShowConfirmDialog(true)
        setAlunoDelete(aluno);
    }

     const cancelDialog = () =>{
        setShowConfirmDialog(false, {computerDeletar: {}  })
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
        <Card title="Consulta Alunos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <Form htmlFor="nome" label="Nome: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="nome" 
                                       value={nome} 
                                       onChange={e => setNome(e.target.value)}
                                       placeholder="Digite o nome" />
                            </Form>

                            <Form htmlFor="email" label="E-mail: ">
                                <input type="email" 
                                       className="form-control" 
                                       id="email" 
                                       value={email} 
                                       onChange={e => setEmail(e.target.value)}
                                       placeholder="Digite a descrição" />
                            </Form>

                            <Form htmlFor="matricula" label="Matricula: ">
                                <input id="matricula" 
                                    value={matricula} 
                                    onChange={e => setMatricula(e.target.value)}                           
                                    className="form-control"
                                    placeholder="Digite a matrícula" />
                            </Form>

                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-aluno'}>
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
        
        <TableAluno alunos={aluno}
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
                Confirma a exclusão deste ativo?
        </Dialog>        
        </>
    )
}


export default SearchAluno;