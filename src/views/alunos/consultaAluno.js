import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import AlunoService from "../../services/resource/alunoService";
import InputForm from "../../components/input/input";
import Button from '../../components/button/button';

import TabelaAluno from "./tabelaAluno";
import Pagination from "../../components/pagination/pagination";

const valoresInicial = {
    nome: '',
    email: '',
    matricula: ''
}

function ConsultaAluno() {

    const [values, setValues] = useState(valoresInicial);
    const [carregando, setCarregando] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState();
    const [alunoDeletado, setAlunoDeletado] = useState({});
    const [aluno, setAluno] = useState([]);
    const navigate = useNavigate();
    const service = new AlunoService();

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
        service.consulta(values)
            .then(response => {
                const lista = response.data
                setAluno(lista)
                if (lista.totalElements < 1) {
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
        navigate(`/atualizacao-aluno/${id}`)
    }

    const visualizar = (id) => {
        navigate(`/aluno/${id}`)
    }

    const apagar = () => {
        service
            .del(alunoDeletado.id)
            .then(response => {
                const alunos = aluno.content;
                const index = alunos.indexOf(alunoDeletado)
                alunos.splice(index, 1);
                setAluno(aluno)
                messages.mensagemSucesso('Aluno excluído com sucesso')
                setShowConfirmDialog(false)
            }).catch(error => {
                messages.mensagemErro(error.response.data.message)
            })
    }

    const abrirDialog = (aluno) => {
        setShowConfirmDialog(true)
        setAlunoDeletado(aluno);
    }

    const cancelarDialog = () => {
        setShowConfirmDialog(false)
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
                <Card title="Consulta Alunos">
                    <form onSubmit={submitConsulta}>
                        <div className="row">
                            <div className="col-md-4">
                                <Form htmlFor="nome">
                                    <InputForm type="text"
                                        label="Nome "
                                        name="nome"
                                        value={values.nome}
                                        onChange={onChange} />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="email" >
                                    <InputForm type="text"
                                        label="E-mail "
                                        name="email"
                                        value={values.email}
                                        onChange={onChange} />
                                </Form>
                            </div>
                            <div className="col-md-4">
                                <Form htmlFor="matricula" >
                                    <InputForm name="matricula"
                                        label="Matricula"
                                        value={values.matricula}
                                        onChange={onChange} />
                                </Form>
                            </div>
                            <div className="col-md-12">
                                <Button loading={carregando} icon="pi pi-search" type="submit" className="btn btn-success mt-2">
                                    Buscar
                                </Button>
                                <Link to={'/cadastro-aluno'}>
                                    <Button icon="pi pi-plus" type="button" className="btn btn-primary mt-2">
                                        Cadastrar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </Card>
                
                <TabelaAluno alunos={aluno}
                    visibleAction={visualizar}
                    deleteAction={abrirDialog}
                    editAction={editar}>
                    {aluno.totalElements === 0 || aluno.length === 0 ? (
                        <p>Nenhum resultado para exibir</p>
                    ) : (
                        <Pagination number={aluno.number} totalPages={aluno.totalPages}
                            first={aluno.first} last={aluno.last} right={right} left={left}
                            pageNext={pageNext} pageBack={pageBack} size={aluno.totalElements} numberOfElements={aluno.numberOfElements}
                        />
                    )}
                </TabelaAluno>
            </div>

            <Dialog header="Confirmação"
                visible={showConfirmDialog}
                style={{ width: '50vw' }}
                footer={confirmDialogFooter}
                modal={true}
                onHide={() => setShowConfirmDialog(false)}>
                Confirma a exclusão deste aluno?
            </Dialog>
        </>
    )
}


export default ConsultaAluno;