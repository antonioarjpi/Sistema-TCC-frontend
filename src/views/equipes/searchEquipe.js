import React from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableEquipe from "./tableEquipe";
import EquipeService from "../../services/resource/equipeService";

class SearchEquipe extends React.Component{

    state = {
        nome: '',
        dataCadastro: '', 
        delimitacao: '',
        showConfirmDialog: false,
        equipeDelete: {},
        equipe : []
    }

    constructor(){
        super();
        this.service = new EquipeService();
    }

    search = () =>{

        const filter = {
            nome: this.state.nome,
            dataCadastro: this.state.dataCadastro,
            delimitacao: this.state.delimitacao,
        }

        this.service.consult(filter)
        .then(response => {
            const list = response.data
            this.setState({equipe: list})
        }).catch(error =>{
            console.log(error)
        })
    }
  
    edit = (id) =>{
        this.props.navigation.navigate(`/register/${id}`)
    }

    erase = () => {
        this.service
        .del(this.state.equipeDelete.id)
        .then(response =>{
            const equipe = this.state.equipe;
            const index = equipe.indexOf(this.state.equipeDelete)
            equipe.splice(index, 1);
            this.setState( { equipe: equipe } )
            messages.mensagemSucesso('Ativo excluído com sucesso')       
        }).catch(error =>{
            messages.mensagemErro(error.response.data.message)
        })
        this.setState({ showConfirmDialog: false})
    }

    openDialog = (equipe) =>{
        this.setState({ showConfirmDialog: true, equipeDelete: equipe })
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
        <Card title="Consulta Equipes">
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

                            <Form htmlFor="dataCadastro" label="E-mail: ">
                                <input type="email" 
                                       className="form-control" 
                                       id="dataCadastro" 
                                       value={this.state.dataCadastro} 
                                       onChange={e => this.setState({dataCadastro: e.target.value})}
                                       placeholder="Digite a descrição" />
                            </Form>

                            <Form htmlFor="delimitacao" label="Matricula: ">
                                <input id="delimitacao" 
                                    value={this.state.delimitacao} 
                                    onChange={e => this.setState({delimitacao: e.target.value})}                           
                                    className="form-control"
                                    placeholder="Digite a matrícula" />
                            </Form>

                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={this.search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-equipe'}>
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
        
        <TableEquipe equipe={this.state.equipe}
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

export default SearchEquipe;