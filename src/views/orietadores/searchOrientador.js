import React from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import OrientadorService from "../../services/resource/orientadorService";
import TableOrientador from "./tableOrientador";



class SearchOrientador extends React.Component{

    state = {
        nome: '',
        matricula: '',
        ies: '', 
        descricaoTitulacao: '',
        grau: '',
        showConfirmDialog: false,
        orientadorDelete: {},
        orientador : []
    }

    constructor(){
        super();
        this.service = new OrientadorService();
    }

    search = () =>{

        const filter = {
            nome: this.state.nome,
            matricula: this.state.matricula,
            ies: this.state.ies,
            descricaoTitulacao: this.state.descricaoTitulacao,
            grau: this.state.grau
        }

        this.service.consult(filter)
        .then(response => {
            const list = response.data
            this.setState({orientador: list})
        }).catch(error =>{
            console.log(error)
        })
    }
  
    edit = (id) =>{
        this.props.navigation.navigate(`/register/${id}`)
    }

    erase = () => {
        
        this.service
        .del(this.state.orientadorDelete.id)
        .then(response =>{
            const orientador = this.state.orientador;
            const index = orientador.indexOf(this.state.orientadorDelete)
            orientador.splice(index, 1);
            this.setState( { orientador: orientador } )
            messages.mensagemSucesso('Orientador excluído com sucesso')
            this.setState({ showConfirmDialog: false})
        }).catch(error =>{
            
            this.setState({ showConfirmDialog: false})
            messages.mensagemErro('Ocorreu um erro ao deletar')
        })

    }

    openDialog = (orientador) =>{
        this.setState({ showConfirmDialog: true, orientadorDelete: orientador })
        console.log("computer Delete", orientador)
    }

    cancelDialog = () =>{
        this.setState({ showConfirmDialog : false, orientadorDelete: {}  })
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
        <Card title="Consulta Orientadores">
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

                            <Form htmlFor="matricula" label="Matrícula: ">
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
                            <Link to={'/cadastro-orientador'}>
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
        
        <TableOrientador orientador={this.state.orientador}
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

export default SearchOrientador;