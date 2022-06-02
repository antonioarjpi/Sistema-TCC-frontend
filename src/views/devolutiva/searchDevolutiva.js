import React from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableDevolutiva from "./tableDevolutiva";
import DevolutivaService from "../../services/resource/devolutivaService";


class SearchDevolutiva extends React.Component{

    state = {
        statusOrientacao: '',
        dataMudancao: '', 
        descricaoDaDevolutiva: '',
        versaoDoc: '',
        localDeCorrecao: '',
        correcaoSugerida: '',
        showConfirmDialog: false,
        acompanhamentoDelete: {},
        devolutiva : []
    }

    constructor(){
        super();
        this.service = new DevolutivaService();
    }

    search = () =>{

        const filter = {
            statusOrientacao: this.state.statusOrientacao,
            descricaoDaDevolutiva: this.state.descricaoDaDevolutiva,
        }

        this.service.consult(filter)
        .then(response => {
            const list = response.data
            this.setState({devolutiva: list})
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
        .del(this.state.acompanhamentoDelete.id)
        .then(response =>{
            const devolutiva = this.state.devolutiva;
            const index = devolutiva.indexOf(this.state.acompanhamentoDelete)
            devolutiva.splice(index, 1);
            this.setState( { devolutiva: devolutiva } )
            messages.mensagemSucesso('Devolutiva excluído excluído com sucesso')
        }).catch(error =>{
            messages.mensagemErro(error.response.data.error)
        })
        this.setState({ showConfirmDialog: false})
    }

    openDialog = (devolutiva) =>{
        this.setState({ showConfirmDialog: true, acompanhamentoDelete: devolutiva })
    }

    cancelDialog = () =>{
        this.setState({ showConfirmDialog : false, acompanhamentoDelete: {}  })
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
        <Card title="Consulta Devolutivas">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <Form htmlFor="statusOrientacao" label="Status: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="statusOrientacao" 
                                       value={this.state.statusOrientacao} 
                                       onChange={e => this.setState({statusOrientacao: e.target.value})}
                                       placeholder="Digite a statusOrientacao" />
                            </Form>

                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={this.search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-devolutiva'}>
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
        
        <TableDevolutiva devolutiva={this.state.devolutiva}
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

export default SearchDevolutiva;