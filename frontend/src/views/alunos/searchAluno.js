import React from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableAluno from "./tableAluno";
import AlunoService from "../../services/resource/alunoService";



class SearchAluno extends React.Component{

    state = {
        nome: '',
        email: '', 
        matricula: '',
        showConfirmDialog: false,
        alunoDelete: {},
        aluno : []
    }

    constructor(){
        super();
        this.service = new AlunoService();
    }

    search = () =>{

        const filter = {
            nome: this.state.nome,
            email: this.state.email,
            matricula: this.state.matricula,
        }

        this.service.consult(filter)
        .then(response => {
            const list = response.data
            this.setState({aluno: list})
        }).catch(error =>{
            console.log(error)
        })
    }
  
    edit = (id) =>{
        this.props.navigation.navigate(`/register/${id}`)
    }

    erase = () => {
        this.service
        .del(this.state.alunoDelete.id)
        .then(response =>{
            const aluno = this.state.aluno;
            const index = aluno.indexOf(this.state.alunoDelete)
            aluno.splice(index, 1);
            this.setState( { aluno: aluno } )
            messages.mensagemSucesso('Aluno excluído com sucesso')
            this.setState({ showConfirmDialog: false})
        }).catch(error =>{
            messages.mensagemErro('Ocorreu um erro ao deletar')
        })
    }

    openDialog = (aluno) =>{
        this.setState({ showConfirmDialog: true, alunoDelete: aluno })
    }

    cancelDialog = () =>{
        this.setState({ showConfirmDialog : false, computerDeletar: {}  })
    }

  
render(){
    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={this.erase} />
            <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelDialog} className="p-button-secondary" />
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
                                       value={this.state.nome} 
                                       onChange={e => this.setState({nome: e.target.value})}
                                       placeholder="Digite o nome" />
                            </Form>

                            <Form htmlFor="email" label="E-mail: ">
                                <input type="email" 
                                       className="form-control" 
                                       id="email" 
                                       value={this.state.email} 
                                       onChange={e => this.setState({email: e.target.value})}
                                       placeholder="Digite a descrição" />
                            </Form>

                            <Form htmlFor="matricula" label="Matricula: ">
                                <input id="matricula" 
                                    value={this.state.matricula} 
                                    onChange={e => this.setState({matricula: e.target.value})}                           
                                    className="form-control"
                                    placeholder="Digite a matrícula" />
                            </Form>

                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={this.search}>
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
        
        <TableAluno aluno={this.state.aluno}
                        deleteAction={this.openDialog}
                        editAction={this.edit}
        />
        </div>
        <Dialog header="Confirmação" 
                visible={this.state.showConfirmDialog} 
                style={{width: '50vw'}}
                footer={confirmDialogFooter} 
                modal={true} 
                onHide={() => this.setState({showConfirmDialog: false})}>
                Confirma a exclusão deste ativo?
        </Dialog>        
        </>
    )
}
}

export default SearchAluno;