import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import Button from '../../components/button/button';
import OrientadorService from "../../services/resource/orientadorService";
import InputForm from "../../components/input/input";
import Pagination from "../../components/pagination/pagination";
import TabelaOrientador from "./tabelaOrientador";

import * as messages from '../../components/toastr/toastr'

const valoresInicial = {
    nome: '',
    matricula: '',
    descricaoTitulacao: '',
    grau: '',
    ies: '',
    linhaPesquisa: '',
    conhecimento: '',
}

function ConsultaOrientador() {

    const [values, setValues] = useState(valoresInicial)
    const [carregando, setCarregando] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState();
    const [orientadorDelete, setOrientadorDelete] = useState({});
    const [orientador, setOrientador] = useState([]);

    const navigate = useNavigate();
    const service = new OrientadorService();

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const [pageNumber, setPageNumber] = useState(Number);
    const [proximo, setProximo] = useState(false)
    const [anterior, setAnterior] = useState(false)
    const pageNext = () => {
        setProximo(true)
        values.pageNumber = pageNumber + 1
        setPageNumber(values.pageNumber)
        consulta()
    }

    const pageBack = () => {
        setAnterior(true)
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
                setOrientador(list)
                if (list.totalElements < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                setCarregando(false)
                setProximo(false)
                setAnterior(false)
            }).catch(() => {
                setCarregando(false)
                setProximo(false)
                setAnterior(false)
            })
    }

    const editar = (id) => {
        navigate(`/atualizacao-orientador/${id}`)
    }

    const visualizar = (id) => {
        navigate(`/orientador/${id}`)
    }

    const deletar = () => {
        service
            .del(orientadorDelete.id)
            .then(() => {
                const orientadores = orientador.content;
                const index = orientadores.indexOf(orientadorDelete)
                orientadores.splice(index, 1);
                setOrientador(orientador)
                messages.mensagemSucesso('Orientador excluído com sucesso')
                setShowConfirmDialog(false)
            }).catch(error => {
                messages.mensagemErro(error.response.data.message)
            })
    }

    const abrirDialog = (orientador) => {
        setShowConfirmDialog(true)
        setOrientadorDelete(orientador);
    }

    const cancelarDialog = () => {
        setShowConfirmDialog(false)
    }

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={deletar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDialog} className="p-button-secondary" />
        </div>
    );

    return (
        <>
            <div className="container">
                <Card title="Consulta Orientadores">
                    <form onSubmit={submitConsulta}>
                        <div className="row">
                            <div className="col-md-3">
                                <Form htmlFor="nome" >
                                    <InputForm type="text" name="nome" label="Nome"
                                        value={values.nome} onChange={onChange}
                                    />
                                </Form>
                            </div>
                            <div className="col-md-3">
                                <Form htmlFor="email">
                                    <InputForm type="text" name="email" label="E-mail "
                                        value={values.email} onChange={onChange}
                                    />
                                </Form>
                            </div>
                            <div className="col-md-2">
                                <Form htmlFor="matricula">
                                    <InputForm name="matricula" label="Matrícula "
                                        value={values.matricula} onChange={onChange}
                                    />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="descricaoTitulacao" >
                                    <InputForm name="descricaoTitulacao" label="Titulação"
                                        value={values.descricaoTitulacao} onChange={onChange}
                                    />
                                </Form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Form htmlFor="linhaPesquisa" >
                                    <InputForm name="linhaPesquisa" label="Linha de pesquisa"
                                        value={values.linhaPesquisa} onChange={onChange}
                                    />
                                </Form>
                            </div>
                            <div className="col-md-3">
                                <Form htmlFor="conhecimento">
                                    <InputForm name="conhecimento" label="Área de conhecimento "
                                        value={values.conhecimento} onChange={onChange}
                                    />
                                </Form>
                            </div>
                            <div className="col-md-3">
                                <Form htmlFor="grau" >
                                    <InputForm name="grau" label="Grau"
                                        value={values.grau} onChange={onChange}
                                    />
                                </Form>
                            </div>
                            <div className="col-md-3">
                                <Form htmlFor="ies" >
                                    <InputForm name="ies" label="Instituição de Ensino"
                                        value={values.ies} onChange={onChange}
                                    />
                                </Form>
                            </div>
                        </div>
                        <Button loading={carregando} icon="pi pi-search" type="submit" className="btn btn-success mt-2">
                            Buscar
                        </Button>
                        <Link to={'/cadastro-orientador'}>
                            <Button icon="pi pi-plus" type="button" className="btn btn-primary mt-2">
                                Cadastrar
                            </Button>
                        </Link>
                    </form>
                </Card>
            </div>
            <TabelaOrientador orientadores={orientador}
                deleteAction={abrirDialog}
                editAction={editar}
                visibleAction={visualizar}>

                {orientador.totalElements === 0 || orientador.length === 0 ? (
                    <p>Nenhum resultado para exibir</p>
                ) : (
                    <Pagination number={orientador.number} totalPages={orientador.totalPages}
                        first={orientador.first} last={orientador.last} proximo={proximo} anterior={anterior}
                        pageNext={pageNext} pageBack={pageBack} size={orientador.totalElements} numberOfElements={orientador.numberOfElements}
                    />
                )}
            </TabelaOrientador>
            <Dialog header="Confirmação"
                visible={showConfirmDialog}
                style={{ width: '50vw' }}
                footer={confirmDialogFooter}
                modal={true}
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão deste orientador?
            </Dialog>
        </>
    )
}


export default ConsultaOrientador;