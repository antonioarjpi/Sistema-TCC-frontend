import React from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableBanca from "./tableBanca";
import BancaService from "../../services/resource/bancaService";



class SearchBanca extends React.Component{

    state = {
        descricao: '',
        dataBanca: '', 
        ordemApresentacao: '',
        matriculaOrientador: '',
        equipe: '', 
        membroMatricula: '',
        showConfirmDialog: false,
        bancaDelete: {},
        banca : []
    }

    constructor(){
        super();
        this.service = new BancaService();
    }

    search = () =>{

        const filter = {
            descricao: this.state.descricao,
            email: this.state.email,
            ordemApresentacao: this.state.ordemApresentacao,
        }

        this.service.consult(filter)
        .then(response => {
            const list = response.data
            this.setState({banca: list})
        }).catch(error =>{
            console.log(error)
        })
    }
  
    edit = (id) =>{
        this.props.navigation.navigate(`/register/${id}`)
    }

    erase = () => {
        this.service
        .del(this.state.bancaDelete.id)
        .then(response =>{
            const banca = this.state.banca;
            const index = banca.indexOf(this.state.bancaDelete)
            banca.splice(index, 1);
            this.setState( { banca: banca } )
            messages.mensagemSucesso('Banca excluído com sucesso')
            this.setState({ showConfirmDialog: false})
        }).catch(error =>{
            messages.mensagemErro(error.response.data.error)
        })
    }

    openDialog = (banca) =>{
        this.setState({ showConfirmDialog: true, bancaDelete: banca })
    }

    cancelDialog = () =>{
        this.setState({ showConfirmDialog : false, bancaDeletar: {}  })
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
        <Card title="Consulta Bancas">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <Form htmlFor="descricao" label="Descrição: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="descricao" 
                                       value={this.state.descricao} 
                                       onChange={e => this.setState({descricao: e.target.value})}
                                       placeholder="Digite a descricao" />
                            </Form>

                            <Form htmlFor="dataBanca" label="Data Banca: ">
                                <input type="date" 
                                       className="form-control" 
                                       id="dataBanca" 
                                       value={this.state.dataBanca} 
                                       onChange={e => this.setState({dataBanca: e.target.value})}
                                       placeholder="Digite a descrição" />
                            </Form>

                            <Form htmlFor="ordemApresentacao" label="Matricula: ">
                                <input id="ordemApresentacao" 
                                    value={this.state.ordemApresentacao} 
                                    onChange={e => this.setState({ordemApresentacao: e.target.value})}                           
                                    className="form-control"
                                    placeholder="Digite a matrícula" />
                            </Form>

                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={this.search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-banca'}>
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
        
        <TableBanca banca={this.state.banca}
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

export default SearchBanca;