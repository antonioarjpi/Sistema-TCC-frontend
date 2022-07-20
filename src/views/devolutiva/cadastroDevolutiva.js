import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import DevolutivaService from "../../services/resource/devolutivaService";
import { formatLocalDate } from "../../utils/format";
import DropDown from "../../components/dropdown/dropdown";
import OrientacaoService from "../../services/resource/orientacaoService";
import InputForm from "../../components/input/input";
import { Dropdown } from "primereact/dropdown";
import Button from "../../components/button/button";

const valoresInicial = {
    orientacaoId: "",
    dataMudanca: "",
    statusOrientacao: "",
    devolutivaDescricao: "",
    devolutivaVersaoDoc: "",
    devolutivaLocalCorrecaoLocal: "",
    devolutivaLocalCorrecaoCorrecaoSugerida: ""
}

function CadastroDevolutiva() {

    const [values, setValues] = useState(valoresInicial);
    const [atualizando, setAtualizando] = useState(false);
    const hoje = Date.now();

    const { id } = useParams();
    const navigate = useNavigate();
    const service = new DevolutivaService();

    useEffect(() => {
        if (id) {
            service.findId(id)
                .then(response => {
                    setValues(response.data)
                    setAtualizando(true);
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        } else {
            values.dataMudanca = formatLocalDate(hoje, "yyyy-MM-dd")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const submit = (event) => {
        event.preventDefault();
        if (atualizando === false) {
            try {
                service.validate(values)
            } catch (error) {
                const msgs = error.message;
                msgs.forEach(msg => messages.mensagemErro(msg));
                return false;
            }
            service.save(values)
                .then(() => {
                    navigate('/devolutivas')
                    messages.mensagemSucesso('Devolutiva cadastrado com sucesso!')
                }).catch(error => {
                    messages.mensagemErro(error.response.data.message)
                })
        } else {
            service.update(values)
                .then(() => {
                    navigate('/devolutivas')
                    messages.mensagemSucesso('Devolutiva atualizado com sucesso!')
                }).catch(error => {
                    messages.mensagemErro(error.response.data.message)
                })
        }
    }

    //Coloca dados no options de orientadores
    const [orientacaoOptions, setOrientacaoOptions] = useState();
    const orientacaoService = new OrientacaoService();

    useEffect(() => {
        orientacaoService.findAll()
            .then(response => {
                setOrientacaoOptions(response.data.content)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const options = [
        { label: 'Positivo', value: 'Positivo' },
        { label: 'Negativo', value: 'Negativo' },
    ];

    return (
        <div className="container">
            <Card title={atualizando ? 'Atualização de Devolutiva' : 'Cadastro de Devolutiva'}>
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col-md-3">
                            <Form id="orientacao" >
                                <DropDown
                                    span='Código da orientação' name="orientacaoId"
                                    options={orientacaoOptions}
                                    findBy="id" filterBy="id,descricaoTCC"
                                    value={values.orientacaoId}
                                    label1='id' label2='descricaoTCC'
                                    optionValue="id" onChange={onChange}
                                />
                            </Form>
                        </div>
                        <div className="col-md-3">
                            <Form id="dataMudanca" >
                                <InputForm id="dataMudanca" type="date"
                                    label='Data de mudança'
                                    name="dataMudanca"
                                    value={values.dataMudanca}
                                    onChange={onChange}
                                />
                            </Form>
                        </div>
                        <div className="col-md-3">
                            <Form id="statusOrientacao" >
                                <label className="input-label" htmlFor='status'>Status da devolutiva</label>
                                <Dropdown className="dropdown" style={{ width: '100%' }} options={options} id="statusOrientacao"
                                    name="statusOrientacao" value={values.statusOrientacao} onChange={onChange}
                                />

                            </Form>
                        </div>
                        <div className="col-md-3">
                            <Form id="versaoDoc" >
                                <InputForm id="versaoDoc" type="text"
                                    label="Tipo documento *" name="devolutivaVersaoDoc"
                                    value={values.devolutivaVersaoDoc} onChange={onChange}
                                />
                            </Form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <Form id="descricaoDaDevolutiva"  >
                                <InputForm id="descricaoDaDevolutiva" type="text"
                                    label="Descrição da devolutiva *"
                                    name="devolutivaDescricao"
                                    value={values.devolutivaDescricao}
                                    onChange={onChange}
                                />
                            </Form>
                        </div>

                        <div className="col-md-12">
                            <Form id="localDeCorrecao"  >
                                <InputForm id="localDeCorrecao" type="text"
                                    label="Local de correção *"
                                    name="devolutivaLocalCorrecaoLocal"
                                    value={values.devolutivaLocalCorrecaoLocal}
                                    onChange={onChange}
                                />
                            </Form>
                        </div>

                        <div className="col-md-12">
                            <Form id="correcaoSugerida" >
                                <InputForm id="correcaoSugerida" type="text"
                                    label="Correção sugerida *"
                                    name="devolutivaLocalCorrecaoCorrecaoSugerida"
                                    value={values.devolutivaLocalCorrecaoCorrecaoSugerida}
                                    onChange={onChange}
                                />
                            </Form>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6" >
                            {atualizando ? (
                                <Button type="submit" className="btn btn-primary" icon="pi pi-save">
                                    Salvar
                                </Button>

                            ) : (
                                <Button type="submit" className="btn btn-primary" icon="pi pi-save">
                                    Atualizar
                                </Button>
                            )}
                            <Link to={'/devolutivas'}>
                                <Button className="btn btn-danger" icon="pi pi-times">
                                    Cancelar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default CadastroDevolutiva;