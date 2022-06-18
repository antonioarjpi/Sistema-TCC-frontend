import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/card/card";

import * as messages from '../../components/toastr/toastr'
import { formatLocalDate } from "../../utils/format";
import TableAlunoEquipe from "./tableAlunoEquipe";
import EquipeService from "../../services/resource/equipeService";

function SearchEquipeFull(){

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

    const { id } = useParams();

    useEffect(() => {
        if(id){
        
        service.findDevolutivas(id)
        .then(response =>{
            setNome(response.data.nome);
            setDataCadastro(formatLocalDate(response.data.dataCadastro, "dd/MM/yyyy"))
            for (let i=0; i < response.data.alunos.length; i++){
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);


    return(
        <div className="container">
            <Card >
            
            <Card title={'Dados da equipe'}>
                <div className="row">
                    <div className="col-md-8">
                        <strong>Nome Equipe: </strong>
                            <label>{nome}</label>  
                    </div>
                    <div className="col-md-4">
                        <strong>Data de cadastro: </strong>
                            <label>{dataCadastro}</label>                        
                    </div>

                    <TableAlunoEquipe alunos={aluno} />
                </div>
            </Card>

            <Card title="Orientador">
                <div className="row">
                    <div className="col-md-6">
                        <strong>Código da orientação: </strong>
                            <label>{orientacaoId}</label>  
                    </div>
                    <div className="col-md-6">
                        <strong>Data orientação: </strong>
                            <label>{orientacaoDataOrientacao}</label>                        
                    </div>
                    <div className="col-md-6">
                        <strong>Nome orientador: </strong>           
                            <label>{orientacaoOrientadorNome}</label>
                    </div>  
                    <div className="col-md-6">
                        <strong>E-mail do orientador: </strong>            
                            <label>{orientacaoOrientadorEmail}</label>
                    </div>  
                    </div>
            </Card>

            <Card title="Estrututa de TCC">
                <div className="row">
                    <div className="col-md-12">
                        <strong>Descrição de estrutura: </strong>
                            <label>{estruturaTCC}</label>  
                    </div>
                    <div className="col-md-12">
                        <strong>Tipo: </strong>
                            <label>{tipoTCC}</label>                        
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <strong>Tema: </strong>
                                <label>{delimitacao}</label>   
                        </div>
                        <div className="col-md-12">
                            <strong>Linha de Pesquisa: </strong>
                                <label>{descricaoLinha}</label>
                        </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Area de conhecimento: </strong>
                            <label>{descricaoConhecimento}</label>      
                    </div>
                </div>
            </Card>
            <Card title="Devolutivas">
                <div className="row">
                    <div className="col-md-8">
                        <strong>Descrição da devolutiva: </strong>
                            <label>{devolutivaDescricao}</label>  
                    </div>
                    <div className="col-md-4">
                        <strong>Versão do documento: </strong>
                            <label>{devolutivaVersaoDoc}</label>                        
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <strong>Local de correção: </strong>
                                <label>{devolutivaLocalCorrecao}</label>   
                        </div>
                        <div className="col-md-12">
                            <strong>Correção sugerida: </strong>
                                <label>{devolutivaCorrecaoSugerida}</label>
                        </div>
                </div>
            </Card>

            <div className="row mt-2">
                <div className="col-md-6" >
                    <Link to={'/equipes'}>
                    <button className="btn btn-danger">
                        <i className="pi pi-times"></i>Voltar
                    </button>
                    </Link>
                </div>
            </div>
        </Card>
    </div>    
    )
}

export default SearchEquipeFull;