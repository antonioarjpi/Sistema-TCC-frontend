import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import ButtonForm from './../../components/button/button';
import TableDevolutiva from "./tableDevolutiva";
import DevolutivaService from "../../services/resource/devolutivaService";
import InputForm from "../../components/input/input";
import { Dropdown } from "primereact/dropdown";
import { formatLocalDate } from "../../utils/format";


function SearchDevolutiva(){

    const [orientacao, setOrientacao] = useState('');
    const [dataMudanca, setDataMudanca] = useState('');
    const [statusOrientacao, setStatusOrientacao] = useState('');
    const [descricaoDaDevolutiva, setDescricaoDaDevolutiva] = useState('');
    const [versaoDoc, setVersaoDoc] = useState('');
    const [localDeCorrecao, setLocalDeCorrecao] = useState('');
    const [correcaoSugerida, setCorrecaoSugerida] = useState('');
    const [devolutivaDelete, setDevolutivaDelete] = useState({});
    const [devolutiva, setDevolutiva] = useState([]);
    const [loading, setLoading] = useState(false);

    const hoje = Date.now();
    const data = formatLocalDate(hoje, 'yyyy-MM-dd')

    const [showConfirmDialog, setShowConfirmDialog] = useState();

    const navigate = useNavigate();
    const service = new DevolutivaService();

    const search = () =>{
        setLoading(true)
        const filter = {
            statusOrientacao: statusOrientacao,
            descricaoDaDevolutiva: descricaoDaDevolutiva,
            dataMudanca: dataMudanca,
            orientacaoId: orientacao,
            devolutivaDescricao: descricaoDaDevolutiva,
            devolutivaVersaoDoc: versaoDoc,
            devolutivaLocalCorrecaoCorrecaoSugerida: correcaoSugerida,
            devolutivaLocalCorrecaoLocal: localDeCorrecao
        }

        service.consult(filter)
        .then(response => {
            const list = response.data
            setDevolutiva(list)
            if(list.length < 1){
                messages.mensagemAlert("Nenhum resultado encontrado.");
            }
            setLoading(false)
        }).catch(() =>{
            setLoading(false)
        })
    }
  
    const edit = (id) =>{
        navigate(`/atualizacao-devolutiva/${id}`)
    }

    const erase = () => {
        service
        .del(devolutivaDelete.id)
        .then(response =>{
            const devolutivas = devolutiva;
            const index = devolutivas.indexOf(devolutivaDelete);
            devolutivas.splice(index, 1);
            setDevolutiva( devolutiva );
            messages.mensagemSucesso('Devolutiva excluído com sucesso');
            setShowConfirmDialog(false);
        }).catch(error =>{
            messages.mensagemErro(error.response.data.message);
        })
    }

    const openDialog = (devolutiva) =>{
        setShowConfirmDialog(true);
        setDevolutivaDelete(devolutiva)
    }

    const cancelDialog = () =>{
        setShowConfirmDialog(false, {devolutivaDelete: {}});
    }

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={erase} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelDialog} className="p-button-secondary" />
        </div>
    );

    const options = [
        { label: 'Nenhum', value: ' ' },
        { label: 'Positivo', value: 'Positivo' },
        { label: 'Negativo', value: 'Negativo' },
    ];
        
    return(
        <>
        <div className="container">
        <Card title="Consulta Devolutivas">
                <div className="row">
                    <div className="col-md-3">
                            <Form htmlFor="statusOrientacao">
                            <label className="input-label" htmlFor='status'>Status da devolutiva</label>
                                    <Dropdown className="dropdown" style={{width: '100%'}} options={options} id="statusOrientacao" 
                                        name="statusOrientacao" value={statusOrientacao}
                                        onChange={e => setStatusOrientacao(e.target.value)}/>
                            </Form>
                        </div>

                        <div className="col-md-2">
                            <Form htmlFor="versaoDoc">
                                <InputForm type="text" id="versaoDoc" label="Tipo doc"
                                    value={versaoDoc} onChange={e => setVersaoDoc(e.target.value)} />
                            </Form>
                        </div>
                        
                        <div className="col-md-2">
                            <Form htmlFor="orientacaoId" >
                                <InputForm type="text" id="orientacaoId" label="Cód Orientação"
                                    value={orientacao} onChange={e => setOrientacao(e.target.value)}/>
                            </Form>
                        </div>

                        <div className="col-md-2">
                            <Form htmlFor="dataMudanca" >
                                <InputForm type="date" id="dataMudanca" label="Data devolutiva"
                                    value={dataMudanca ? dataMudanca : data} onChange={e => setDataMudanca(e.target.value)} />
                            </Form>
                        </div>

                        <div className="col-md-3">
                            <Form htmlFor="localCorrecao" >
                                <InputForm type="text" id="localCorrecao" label="Local de Correção"
                                    value={localDeCorrecao} onChange={e => setLocalDeCorrecao(e.target.value)} />
                            </Form>
                        </div>

                        <div className="col-md-3">
                            <Form htmlFor="descricaoDaDevolutiva" >
                                <InputForm type="text" id="descricaoDaDevolutiva" label="Descrição da devolutiva"
                                    value={descricaoDaDevolutiva} onChange={e => setDescricaoDaDevolutiva(e.target.value)} />
                            </Form>
                        </div>

                    
                        <div className="col-md-9">
                            <Form htmlFor="correcaoSugerida" >
                                <InputForm type="text" id="correcaoSugerida" label="Correção sugerida"
                                    value={correcaoSugerida} onChange={e => setCorrecaoSugerida(e.target.value)} />
                            </Form>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <ButtonForm loading={loading} icon="pi pi-search" type="button" className="btn btn-success mt-2" onClick={search}>
                                    Buscar
                                </ButtonForm>
                                <Link to={'/cadastro-devolutiva'}>
                                    <ButtonForm icon="pi pi-plus" type="button" className="btn btn-danger mt-2">
                                        Cadastrar
                                    </ButtonForm>
                                </Link>
                            </div> 
                        </div> 
                </div>   
          
            </Card>
        
        <TableDevolutiva devolutivas={devolutiva}
                        deleteAction={openDialog}
                        editAction={edit} />
        </div>
        <Dialog header="Confirmação" 
                visible={showConfirmDialog} 
                style={{width: '50vw'}}
                footer={confirmDialogFooter} 
                modal={true} 
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão desta devolutiva?
        </Dialog>              
        </>
    )
}

export default SearchDevolutiva;