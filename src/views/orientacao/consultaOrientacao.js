import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ButtonForm from '../../components/button/button';
import TabelaOrientacao from "./tabelaOrientacao";
import OrientacaoService from "../../services/resource/orientacaoService";
import InputForm from "../../components/input/input";
import Pagination from "../../components/pagination/pagination";

const valoresInicial = {
    descricaoTCC: "",
    tipoTCC: "",
    dataOrientacao: "",
    nomeOrientador: "",
    matriculaOrientador: ""
}

function ConsultaOrientacao() {
    const [values, setValues] = useState(valoresInicial)
    const [pageNumber, setPageNumber] = useState(Number);
    const [right, setRight] = useState(false)
    const [left, setLeft] = useState(false)
    const [orientacao, setOrientacao] = useState([]);
    const [orientacaoDelete, setOrientacaoDelete] = useState({});
    const [showConfirmDialog, setShowConfirmDialog] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();
    const service = new OrientacaoService();

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

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
        setCarregando(true)
        service.consult(values)
            .then(response => {
                const list = response.data
                setOrientacao(list)
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
        navigate(`/atualizacao-orientacao/${id}`)
    }

    const apagar = () => {
        service
            .del(orientacaoDelete.id)
            .then(response => {
                const orientacoes = orientacao.content;
                const index = orientacoes.indexOf(orientacaoDelete)
                orientacoes.splice(index, 1);
                setOrientacao(orientacao);
                messages.mensagemSucesso('Orientação excluído excluído com sucesso')
                setShowConfirmDialog(false)
            }).catch(error => {
                messages.mensagemErro(error.response.data.message)
            })
    }

    const abrirDialog = (orientacao) => {
        setShowConfirmDialog(true);
        setOrientacaoDelete(orientacao);
    }

    const cancelarDialog = () => {
        setShowConfirmDialog(false, { orientacaoDelete: {} })
    }

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={apagar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDialog} className="p-button-secondary" />
        </div>
    );

    return (
        <>
            <div className="container">
                <Card title="Consulta Orientação">
                    <form onSubmit={submitConsulta}>
                        <div className="row">
                            <div className="col-md-4">
                                <Form htmlFor="descricaoTCC">
                                    <InputForm type="text" label="Descrição de TCC "
                                        name="descricaoTCC"
                                        value={values.descricaoTCC} onChange={onChange} />
                                </Form>
                            </div>

                            <div className="col-md-4">
                                <Form htmlFor="tipoTCC">
                                    <InputForm type="text" label="Tipo de tcc" name="tipoTCC"
                                        value={values.tipoTCC} onChange={onChange} />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="dataOrientacao" >
                                    <InputForm name="dataOrientacao" type='date' label="Data da orientação"
                                        value={values.dataOrientacao} onChange={onChange} />
                                </Form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Form htmlFor="nomeOrientador" >
                                    <InputForm name="nomeOrientador" label="Nome orientador "
                                        value={values.nomeOrientador} onChange={onChange} />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="matriculaOrientador" >
                                    <InputForm name="matriculaOrientador" label="Matrícula do orientador "
                                        value={values.matriculaOrientador} onChange={onChange} />
                                </Form>
                            </div>
                        </div>

                        <ButtonForm loading={carregando} icon="pi pi-search" type="submit" className="btn btn-success mt-2">
                            Buscar
                        </ButtonForm>
                        <Link to={'/cadastro-orientacao'}>
                            <ButtonForm icon="pi pi-plus" type="button" className="btn btn-primary mt-2">
                                Cadastrar
                            </ButtonForm>
                        </Link>
                    </form>
                </Card>

                <TabelaOrientacao orientacoes={orientacao}
                    deleteAction={abrirDialog}
                    editAction={editar}>

                    {orientacao.totalElements === 0 || orientacao.length === 0 ? (
                        <p>Nenhum resultado para exibir</p>
                    ) : (
                        <Pagination number={orientacao.number} totalPages={orientacao.totalPages}
                            first={orientacao.first} last={orientacao.last} right={right} left={left}
                            pageNext={pageNext} pageBack={pageBack} size={orientacao.totalElements} numberOfElements={orientacao.numberOfElements}
                        />
                    )}

                </TabelaOrientacao>
            </div>
            <Dialog header="Confirmação"
                visible={showConfirmDialog}
                style={{ width: '50vw' }}
                footer={confirmDialogFooter}
                modal={true}
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão desta orientação?
            </Dialog>
        </>
    )
}

export default ConsultaOrientacao;