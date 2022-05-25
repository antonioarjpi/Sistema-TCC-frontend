import React from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import TableDefesa from "./tableDefesa";
import DefesaService from "../../services/resource/defesaService";



class SearchDefesa extends React.Component{

    state = {
        banca: '',
        descricao: '', 
        dataBanca: '',
        dataDefesa: '',
        showConfirmDialog: false,
        defesaDelete: {},
        defesa : []
    }

    constructor(){
        super();
        this.service = new DefesaService();
    }

    search = () =>{

        const filter = {
            banca: this.state.banca,
            descricao: this.state.descricao,
        }

        this.service.consult(filter)
        .then(response => {
            const list = response.data
            this.setState({defesa: list})
        }).catch(error =>{
            console.log(error)
        })
    }
  
    edit = (id) =>{
        this.props.navigation.navigate(`/register/${id}`)
    }

    erase = () => {      
        this.service
        .del(this.state.defesaDelete.id)
        .then(response =>{
            const defesa = this.state.defesa;
            const index = defesa.indexOf(this.state.defesaDelete)
            defesa.splice(index, 1);
            this.setState( { defesa: defesa } )
            messages.mensagemSucesso('Defesa excluído com sucesso')
        }).catch(error =>{
            messages.mensagemErro(error.response.data.error)
        })
        this.setState({ showConfirmDialog: false})
    }

    openDialog = (defesa) =>{
        this.setState({ showConfirmDialog: true, defesaDelete: defesa })
        console.log(defesa)
    }

    cancelDialog = () =>{
        this.setState({ showConfirmDialog : false, defesaDelete: {}  })
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
        <Card title="Consulta Defesas">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <Form htmlFor="banca" label="Banca: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="banca" 
                                       value={this.state.banca} 
                                       onChange={e => this.setState({banca: e.target.value})}
                                       placeholder="Digite código da banca" />
                            </Form>

                            <Form htmlFor="descricao" label="Descrição: ">
                                <input type="descricao" 
                                       className="form-control" 
                                       id="descricao" 
                                       value={this.state.descricao} 
                                       onChange={e => this.setState({descricao: e.target.value})}
                                       placeholder="Digite a descrição" />
                            </Form>

                            <button 
                                    type="button" 
                                    className="btn btn-success mt-2"
                                    onClick={this.search}>
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <Link to={'/cadastro-defesa'}>
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
        
        <TableDefesa defesa={this.state.defesa}
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
                Confirma a exclusão desta defesa?
        </Dialog>        
        </>
    )
}
}

export default SearchDefesa;