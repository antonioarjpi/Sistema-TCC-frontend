import React from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableOrientacao from "./tableOrientacao";
import OrientacaoService from "../../services/resource/orientacaoService";



class SearchOrientacao extends React.Component{

    state = {
        descricaoTCC: '',
        dataOrientacao: '', 
        tipoTCC: '',
        matriculaOrientador: '',
        showConfirmDialog: false,
        orientacaoDelete: {},
        orientacao : []
    }

    constructor(){
        super();
        this.service = new OrientacaoService();
    }

    search = () =>{

        const filter = {
            descricaoTCC: this.state.descricaoTCC,
            tipoTCC: this.state.tipoTCC,
           
        }

        this.service.consult(filter)
        .then(response => {
            const list = response.data
            this.setState({orientacao: list})
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
        }).catch(error =>{
            console.log(error)
        })
    }
  
    edit = (id) =>{
        this.props.navigation.navigate(`/register/${id}`)
    }

    erase = () => {
        this.service
        .del(this.state.orientacaoDelete.id)
        .then(response =>{
            const orientacao = this.state.orientacao;
            const index = orientacao.indexOf(this.state.orientacaoDelete)
            orientacao.splice(index, 1);
            this.setState( { orientacao: orientacao } )
            messages.mensagemSucesso('Orientação excluído excluído com sucesso')
        }).catch(error =>{
            messages.mensagemErro(error.response.data.error)
        })
        this.setState({ showConfirmDialog: false})
    }

    openDialog = (orientacao) =>{
        this.setState({ showConfirmDialog: true, orientacaoDelete: orientacao })
    }

    cancelDialog = () =>{
        this.setState({ showConfirmDialog : false, orientacaoDelete: {}  })
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
        <Card title="Consulta Orientação">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <Form htmlFor="descricaoTCC" label="Descrição: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="descricaoTCC" 
                                       value={this.state.descricaoTCC} 
                                       onChange={e => this.setState({descricaoTCC: e.target.value})}
                                       placeholder="Digite a descricaoTCC" />
                            </Form>

                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={this.search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-orientacao'}>
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
        
        <TableOrientacao orientacao={this.state.orientacao}
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
                Confirma a exclusão dessa orientação?
        </Dialog>        
        </>
    )
}
}

export default SearchOrientacao;