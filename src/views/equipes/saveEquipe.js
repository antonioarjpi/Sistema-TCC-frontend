import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import { MultiSelect } from 'primereact/multiselect';
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import EquipeService from "../../services/resource/equipeService";
import { formatLocalDate } from "../../utils/format";
import AlunoService from "../../services/resource/alunoService";

function SaveEquipe(){

    const [equipe, setEquipe] = useState();
    const [nome, setNome] = useState('');
    const [dataCadastro, setDataCadastro] = useState();
    const [delimitacao, setDelimitacao] = useState();
    const [descricaoLinha, setDescricaoLinha] = useState();
    const [descricaoConhecimento, setDescricaoConhecimento] = useState();
    const [selectedAlunos, setSelectedAlunos] = useState(null);
    const [alunos, setAlunos] = useState({});
    const [atualizando, setAtualizando] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();
    const service = new EquipeService();
    const alunoService = new AlunoService();
   

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setEquipe(response.data.id)
            setNome(response.data.nome);
            setDataCadastro(formatLocalDate(response.data.dataCadastro, "yyyy-MM-dd"))
            for (let i=0; i < response.data.alunos.length; i++){
                setSelectedAlunos(response.data.alunos)
            }         
            setDelimitacao(response.data.tema)
            setDescricaoConhecimento(response.data.conhecimento)
            setDescricaoLinha(response.data.linhaPesquisa)
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
      

      }},[]);
        
    const submit = () => {      
        try{
            service.validate({
                nome: nome,
                alunos: selectedAlunos,
                delimitacao: delimitacao,
                descricaoConhecimento: descricaoConhecimento
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
        service.save({
            nome: nome,
            temaDelimitacao: delimitacao,
            alunos: selectedAlunos,
            temaLinhapesquisaDescricao: descricaoLinha,
            temaLinhaPesquisaAreaConhecimentoDescricao: descricaoConhecimento
        }).then(response => {
            navigate('/equipes')
            messages.mensagemSucesso('Equipe cadastrado com sucesso!' )
        }).catch(error => {
            if (error.message === 'Network Error'){
                messages.mensagemAlert("Não foi possível conectar com servidor remoto")
                throw new ('');
            }   
            messages.mensagemErro(error.response.data.message)
        })
    }

    const update = () => {      
        try{
            service.validate({
                nome: nome,
                alunos: selectedAlunos,
                delimitacao: delimitacao,
                descricaoConhecimento: descricaoConhecimento
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
        service.update({
            id: equipe,
            nome: nome,
            temaDelimitacao: delimitacao,
            alunos: selectedAlunos,
            temaLinhapesquisaDescricao: descricaoLinha,
            temaLinhaPesquisaAreaConhecimentoDescricao: descricaoConhecimento
        }).then(response => {
            navigate('/equipes')
            messages.mensagemSucesso('Equipe atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }


    //Select from alunos
    useEffect(() => {
        alunoService.findAll()
        .then(response => {
            setAlunos(response.data) 
        }).catch(error =>{
            console.log()
            if(error.message  === "Network Error"   ){
                messages.mensagemErro("Não foi possível conectar com o servidor remoto") 
            }else{
                messages.mensagemErro(error.message)    
            }         
        }) 
    }, [])

    const alunoTemplate = (option) => {
        return (
            <div>
                <div>{option.matricula} - {option.nome}</div>  
            </div>
        );
    }

    const selectedAlunosTemplate = (option) => {
        if (option) {
            return (
                <span>
                    <span className="selected-alunos">{option.matricula} - {option.nome}</span>
                </span>
            );
        }
        return "Matrícula do aluno(s)";
    }

    const panelFooter = () => {
        const selectedItems = selectedAlunos;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> Aluno{length > 1 ? 's' : ''} selecionado{length > 1 ? 's' : ''}.
            </div>
        );
    }

    
    return(
        <>
        <Navbar />
        <div className="container">
            <Card title={ atualizando ? 'Cadastro Equipe' : 'Atualização de equipe'}>
            <div className="row">
                <div className="col-md-6">
                    <Form id="nome" label="Nome da equipe: *" >
                        <input id="nome" type="text" 
                            className="form-control" 
                            name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="dataCadastro" label="Data de cadastro: *" >
                        <input id="dataCadastro" type="date" 
                            className="form-control" 
                            name="dataCadastro"
                            disabled
                            value={dataCadastro}/>
                    </Form>                    
                          
                </div>
            </div>

                <div className="row">
                    <div className="col-md-12">
                        <Form id="dataCadastro" label="Alunos: *">
                        <MultiSelect value={selectedAlunos} options={alunos} 
                                    onChange={(e) => setSelectedAlunos(e.value)} 
                                    optionLabel="matricula"
                                    filter className="multiselect-custom"
                                    filterPlaceholder="Digite a matrícula"
                                    itemTemplate={alunoTemplate} 
                                    selectedItemTemplate={selectedAlunosTemplate} 
                                    panelFooterTemplate={panelFooter} />
                        
                        </Form>
                        
                    </div>
                </div> 
            

                <div className="row">
                <div className="col-md-12">
                    <Form id="delimitacao" label="Tema: *" >
                        <input id="delimitacao" type="text" 
                            className="form-control" 
                            name="delimitacao"
                            value={delimitacao}
                            onChange={e => setDelimitacao(e.target.value)}
                                />
                    </Form>
                </div>
                    <div className="col-md-12">
                        <Form id="descricaoLinha" label="Linha de pesquisa: *" >
                            <textarea id="descricaoLinha" type="text" 
                                className="form-control" 
                                name="descricaoLinha"
                                value={descricaoLinha}
                                onChange={e => setDescricaoLinha(e.target.value)}
                                    />
                        </Form>
                    </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Form id="descricaoConhecimento" label="Área de conhecimento: *" >
                        <input id="descricaoConhecimento" type="text" 
                            className="form-control" 
                            name="descricaoConhecimento"
                            value={descricaoConhecimento}
                            onChange={e => setDescricaoConhecimento(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-6" >
                { atualizando ? (
                        <button  onClick={submit} className="btn btn-primary">
                            <i className="pi pi-save"></i>Salvar
                        </button>
                    ) : (
                        <button  onClick={update} className="btn btn-primary">
                            <i className="pi pi-save"></i>Atualizar
                        </button>                      
                    )

                    }         
                    <Link to={'/equipes'}>
                    <button className="btn btn-danger">
                        <i className="pi pi-times"></i>Cancelar
                    </button>
                    </Link>
                </div>
            </div>
        </Card>
    </div>    
    </>
    )
}

export default SaveEquipe;