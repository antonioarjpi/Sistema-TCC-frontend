import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ButtonForm from '../../components/button/button';
import DevolutivaService from "../../services/resource/devolutivaService";
import InputForm from "../../components/input/input";
import { Dropdown } from "primereact/dropdown";
import Pagination from "../../components/pagination/pagination";
import TabelaDevolutiva from "./tabelaDevolutiva";

const valoresInicial = {
    statusOrientacao: '',
    versaoDoc: '',
    descricaoDaDevolutiva: '',
    orientacaoId: '',
    localDeCorrecao: '',
    correcaoSugerida: '',
    dataMudanca: ''
}

function ConsultaDevolutiva() {

    const [values, setValues] = useState(valoresInicial)
    const [devolutivaDelete, setDevolutivaDelete] = useState({});
    const [devolutiva, setDevolutiva] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState();

    const navigate = useNavigate();
    const service = new DevolutivaService();

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const [pageNumber, setPageNumber] = useState(Number);
    const [right, setRight] = useState(false)
    const [left, setLeft] = useState(false)
    const pageNext = () => {
        setRight(true)
        values.pageNumber = pageNumber + 1
        setPageNumber(values.pageNumber)
        consulta()
    }

    const pageBack = () => {
        setLeft(true)
        values.pageNumber = pageNumber - 1
        setPageNumber(values.pageNumber)
        consulta()
    }

    const submitConsulta = (event) => {
        event.preventDefault();
        setCarregando(true);
        values.pageNumber = 0
        setPageNumber(values.pageNumber)
        consulta();
    }

    const consulta = () => {
        service.consult(values)
            .then(response => {
                const list = response.data
                setDevolutiva(list)
                if (list.totalElements < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                setCarregando(false)
                setRight(false)
                setLeft(false)
            }).catch(() => {
                setCarregando(false)
                setRight(false)
                setLeft(false)
            })
    }

    const editar = (id) => {
        navigate(`/atualizacao-devolutiva/${id}`)
    }

    const apagar = () => {
        service
            .del(devolutivaDelete.id)
            .then(() => {
                const devolutivas = devolutiva.content;
                const index = devolutivas.indexOf(devolutivaDelete);
                devolutivas.splice(index, 1);
                setDevolutiva(devolutiva);
                messages.mensagemSucesso('Devolutiva excluído com sucesso');
                setShowConfirmDialog(false);
            }).catch(error => {
                messages.mensagemErro(error.response.data.message);
            })
    }

    const abrirDialog = (devolutiva) => {
        setShowConfirmDialog(true);
        setDevolutivaDelete(devolutiva)
    }

    const cancelarDialog = () => {
        setShowConfirmDialog(false, { devolutivaDelete: {} });
    }

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={apagar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDialog} className="p-button-secondary" />
        </div>
    );

    const options = [
        { label: 'Nenhum', value: ' ' },
        { label: 'Positivo', value: 'Positivo' },
        { label: 'Negativo', value: 'Negativo' },
    ];

    return (
        <>
            <div className="container">
                <Card title="Consulta Devolutivas">
                    <form onSubmit={submitConsulta}>
                        <div className="row">
                            <div className="col-md-3">
                                <Form htmlFor="statusOrientacao">
                                    <label className="input-label" htmlFor='status'>Status da devolutiva</label>
                                    <Dropdown className="dropdown" style={{ width: '100%' }} options={options} id="statusOrientacao"
                                        name="statusOrientacao" value={values.statusOrientacao}
                                        onChange={onChange} />
                                </Form>
                            </div>

                            <div className="col-md-2">
                                <Form htmlFor="versaoDoc">
                                    <InputForm type="text" id="versaoDoc" name="versaoDoc" label="Tipo doc"
                                        value={values.versaoDoc} onChange={onChange} />
                                </Form>
                            </div>

                            <div className="col-md-2">
                                <Form htmlFor="orientacaoId" >
                                    <InputForm type="text" id="orientacaoId" name="orientacaoId" label="Cód Orientação"
                                        value={values.orientacaoId} onChange={onChange} />
                                </Form>
                            </div>

                            <div className="col-md-2">
                                <Form htmlFor="dataMudanca" >
                                    <InputForm type="date" name="dataMudanca" label="Data devolutiva"
                                        value={values.dataMudanca} onChange={onChange} />
                                </Form>
                            </div>

                            <div className="col-md-3">
                                <Form htmlFor="localCorrecao" >
                                    <InputForm type="text" id="localCorrecao" name="localDeCorrecao" label="Local de Correção"
                                        value={values.localDeCorrecao} onChange={onChange} />
                                </Form>
                            </div>

                            <div className="col-md-3">
                                <Form htmlFor="descricaoDaDevolutiva" >
                                    <InputForm type="text" id="descricaoDaDevolutiva" name="descricaoDaDevolutiva" label="Descrição da devolutiva"
                                        value={values.descricaoDaDevolutiva} onChange={onChange} />
                                </Form>
                            </div>

                            <div className="col-md-9">
                                <Form htmlFor="correcaoSugerida" >
                                    <InputForm type="text" id="correcaoSugerida" label="Correção sugerida" name="correcaoSugerida"
                                        value={values.correcaoSugerida} onChange={onChange} />
                                </Form>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <ButtonForm loading={carregando} icon="pi pi-search" type="submit" className="btn btn-success mt-2">
                                        Buscar
                                    </ButtonForm>
                                    <Link to={'/cadastro-devolutiva'}>
                                        <ButtonForm icon="pi pi-plus" type="button" className="btn btn-primary mt-2">
                                            Cadastrar
                                        </ButtonForm>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>

                <TabelaDevolutiva devolutivas={devolutiva}
                    deleteAction={abrirDialog}
                    editAction={editar} >
                    {devolutiva.totalElements === 0 || devolutiva.length === 0 ? (
                        <p>Nenhum resultado para exibir</p>
                    ) : (
                        <Pagination number={devolutiva.number} totalPages={devolutiva.totalPages}
                            first={devolutiva.first} last={devolutiva.last} right={right} left={left}
                            pageNext={pageNext} pageBack={pageBack} size={devolutiva.totalElements} numberOfElements={devolutiva.numberOfElements}
                        />
                    )}
                </TabelaDevolutiva>
            </div>
            <Dialog header="Confirmação"
                visible={showConfirmDialog}
                style={{ width: '50vw' }}
                footer={confirmDialogFooter}
                modal={true}
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão desta devolutiva?
            </Dialog>
        </>
    )
}

export default ConsultaDevolutiva;