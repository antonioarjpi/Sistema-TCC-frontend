import React, { useEffect, useState } from "react";
import { formatLocalDate } from "../../utils/format";
import * as messages from '../../components/toastr/toastr'
import EquipeService from "../../services/resource/equipeService";
import Form from "../../components/form/form";
import Info from "../../components/info/info";
import Card from "../../components/card/card";

function VisualizaEquipe(props) {

    const [nome, setNome] = useState('');
    const [dataCadastro, setDataCadastro] = useState();
    const [delimitacao, setDelimitacao] = useState();
    const [descricaoLinha, setDescricaoLinha] = useState();
    const [descricaoConhecimento, setDescricaoConhecimento] = useState();
    const [orientacaoId, setOrientacaoId] = useState();
    const [orientacaoDataOrientacao, setOrientacaoDataOrientacao] = useState();
    const [orientacaoOrientadorNome, setDrientacaoOrientadorNome] = useState();
    const [orientacaoOrientadorEmail, setOrientacaoOrientadorEmail] = useState();
    const [estruturaTCC, setEstruturaTCC] = useState();
    const [tipoTCC, setTipoTCC] = useState();
    const [, setStatusOrientacao] = useState();
    const [, setDataMudanca] = useState();
    const [devolutivaDescricao, setDevolutivaDescricao] = useState();
    const [devolutivaVersaoDoc, setDevolutivaVersaoDoc] = useState();
    const [devolutivaLocalCorrecao, setDevolutivaLocalCorrecao] = useState();
    const [devolutivaCorrecaoSugerida, setDevolutivaCorrecaoSugerida] = useState();
    const [aluno, setAluno] = useState([]);

    const service = new EquipeService();

    useEffect(() => {
        if (props.id) {
            service.findDevolutivas(props.id)
                .then(response => {
                    setNome(response.data.nome);
                    setDataCadastro(formatLocalDate(response.data.dataCadastro, "dd/MM/yyyy"))
                    for (let i = 0; i < response.data.alunos.length; i++) {
                        setAluno(response.data.alunos)
                    }
                    setDelimitacao(response.data.temaDelimitacao)
                    setDescricaoConhecimento(response.data.temaLinhaPesquisaAreaConhecimentoDescricao)
                    setDescricaoLinha(response.data.temaLinhaPesquisaDescricao)
                    setOrientacaoDataOrientacao(formatLocalDate(response.data.orientacaoDataOrientacao, 'dd/MM/yyyy'));
                    setDrientacaoOrientadorNome(response.data.orientacaoOrientadorNome);
                    setOrientacaoOrientadorEmail(response.data.orientacaoOrientadorEmail);
                    setEstruturaTCC(response.data.estruturaTCC);
                    setTipoTCC(response.data.tipoTCC);
                    setStatusOrientacao(response.data.statusOrientacao);
                    setDataMudanca(response.data.statusOrientacao);
                    setDevolutivaDescricao(response.data.devolutivaDescricao);
                    setDevolutivaVersaoDoc(response.data.devolutivaVersaoDoc);
                    setDevolutivaLocalCorrecao(response.data.devolutivaLocalCorrecao);
                    setDevolutivaCorrecaoSugerida(response.data.devolutivaCorrecaoSugerida);
                    setOrientacaoId(response.data.orientacaoId);
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rows = aluno.map(alunos => {
        return (
            <tr key={alunos.id}>
                <td style={{ color: 'blue' }}>{alunos.matricula} - {alunos.nome}</td>
            </tr>
        )
    })


    return (
        <Form>
            <div className="container">
                <Card title="Detalhes da equipe" >
                    <Info info="Data de defesa" />
                    <Info info="Nome da equipe" content={nome} />
                    <Info info="Data de cadastro" content={dataCadastro} />
                    <Info info="Alunos" content={rows} />
                </Card>
                <br />
                <Card title="Detalhes sobre orientador" >

                    <Info info="Nome do orientador" content={orientacaoOrientadorNome} />
                    <Info info="E-mail do orientador" content={orientacaoOrientadorEmail} />
                    <Info info="Linha de pesquisa" content={descricaoLinha} />
                    <Info info="Área de conhecimento" content={descricaoConhecimento} />
                </Card>
                <br />
                <Card title="Detalhes do TCC" >
                    <Info info="Tema" content={delimitacao} />
                    <Info info="Estrutura TCC" content={estruturaTCC} />
                    <Info info="Tipo TCC" content={tipoTCC} />
                </Card>
                <br />
                <Card title="Acompanhamento" >
                    <Info info="Data da orientação" content={orientacaoDataOrientacao} />
                    <Info info="Código da orientação" content={orientacaoId} />
                    <Info info="Descrição da devolutiva" content={devolutivaDescricao} />
                    <Info info="Versão de documento" content={devolutivaVersaoDoc} />
                    <Info info="Local de correção" content={devolutivaLocalCorrecao} />
                    <Info info="Correção sugerida" content={devolutivaCorrecaoSugerida} />
                </Card>
            </div>
        </Form>
    )
}

export default VisualizaEquipe;