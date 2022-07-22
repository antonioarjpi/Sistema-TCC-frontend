import React, { useState } from "react";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ButtonForm from '../../components/button/button';
import TabelaEquipe from "./tabelaEquipe";
import EquipeService from "../../services/resource/equipeService";
import InputForm from "../../components/input/input";
import Pagination from "../../components/pagination/pagination";

const valoresInicial = {
    nome: '',
    dataCadastro: '',
    tema: '',
    descricaoLinha: '',
    descricaoConhecimento: ''
}

function ConsultaEquipe() {

    const [values, setValues] = useState(valoresInicial);
    const [equipeDelete, setEquipeDelete] = useState({});
    const [equipe, setEquipe] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState();
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const service = new EquipeService();

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
                setEquipe(list)
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
        navigate(`/atualizacao-equipe/${id}`)
    }

    const visualizar = (id) => {
        navigate(`/equipe/${id}`)
    }

    const deletar = () => {
        service
            .del(equipeDelete.id)
            .then(() => {
                const equipes = equipe.content;
                const index = equipes.indexOf(equipeDelete)
                equipes.splice(index, 1);
                setEquipe(equipe)
                messages.mensagemSucesso('Equipe excluído com sucesso')
                setShowConfirmDialog(false)
            }).catch(error => {
                messages.mensagemErro(error.response.data.message)
            })
    }

    const abrirDialog = (equipe) => {
        setShowConfirmDialog(true)
        setEquipeDelete(equipe);
    }

    const cancelarDialog = () => {
        setShowConfirmDialog(false, { equipeDelete: {} })
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
                <Card title="Consulta Equipes">
                    <form onSubmit={submitConsulta}>
                        <div className="row">
                            <div className="col-md-4">
                                <Form htmlFor="nome" >
                                    <InputForm type="text"
                                        label="Nome da equipe "
                                        name="nome"
                                        value={values.nome}
                                        onChange={onChange} />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="dataCadastro" >
                                    <InputForm type="date"
                                        label='Data de cadastro de equipe'
                                        name="dataCadastro"
                                        value={values.dataCadastro}
                                        onChange={onChange}
                                    />

                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="tema">
                                    <InputForm name="tema"
                                        value={values.tema}
                                        onChange={onChange}
                                        label="Tema" />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="descricaoLinha" >
                                    <InputForm name="descricaoLinha"
                                        value={values.descricaoLinha}
                                        onChange={onChange}
                                        label="Descrição da linha" />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="descricaoConhecimento" >
                                    <InputForm name="descricaoConhecimento"
                                        label="Área de conhecimento "
                                        value={values.descricaoConhecimento}
                                        onChange={onChange} />
                                </Form>
                            </div>
                        </div>
                        <ButtonForm loading={carregando} icon="pi pi-search" type="subtmit" className="btn btn-success mt-2">
                            Buscar
                        </ButtonForm>
                        <Link to={'/cadastro-equipe'}>
                            <ButtonForm icon="pi pi-plus" type="button" className="btn btn-primary mt-2">
                                Cadastrar
                            </ButtonForm>
                        </Link>
                    </form>
                </Card>
                <TabelaEquipe equipes={equipe}
                    visualizar={visualizar}
                    deletar={abrirDialog}
                    editar={editar}
                >
                    {equipe.totalElements === 0 || equipe.length === 0 ? (
                        <p>Nenhum resultado para exibir</p>
                    ) : (
                        <Pagination number={equipe.number} totalPages={equipe.totalPages}
                            first={equipe.first} last={equipe.last} right={right} left={left}
                            pageNext={pageNext} pageBack={pageBack} size={equipe.totalElements} numberOfElements={equipe.numberOfElements}
                        />
                    )}
                </TabelaEquipe>
            </div>
            <Dialog header="Confirmação"
                visible={showConfirmDialog}
                style={{ width: '50vw' }}
                footer={confirmDialogFooter}
                modal={true}
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão desta equipe?
            </Dialog>
        </>
    )
}

export default ConsultaEquipe;