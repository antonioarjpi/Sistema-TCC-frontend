import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import EquipeService from "../../services/resource/equipeService";
import { formatLocalDate } from "../../utils/format";
import AlunoService from "../../services/resource/alunoService";
import MultiSelectContainer from "../../components/multi-select/multiSelect";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';

function SaveEquipe(){

    const [equipe, setEquipe] = useState();
    const [nome, setNome] = useState('');
    const [dataCadastro, setDataCadastro] = useState();
    const [delimitacao, setDelimitacao] = useState();
    const [descricaoLinha, setDescricaoLinha] = useState();
    const [descricaoConhecimento, setDescricaoConhecimento] = useState();
    const [alunos, setAlunos] = useState([]);
    const [atualizando, setAtualizando] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();
    const service = new EquipeService(); 
    
    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setEquipe(response.data.id)
            setNome(response.data.nome);
            setDataCadastro(formatLocalDate(response.data.dataCadastro, "yyyy-MM-dd"))
            for (let i=0; i < response.data.alunos.length; i++){
                setAlunos(response.data.alunos)
            }         
            setDelimitacao(response.data.tema)
            setDescricaoConhecimento(response.data.conhecimento)
            setDescricaoLinha(response.data.linhaPesquisa)
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);
        
    const submit = () => {      
        try{
            service.validate({
                nome: nome,
                alunos: alunos,
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
            alunos: alunos,
            temaLinhapesquisaDescricao: descricaoLinha,
            temaLinhaPesquisaAreaConhecimentoDescricao: descricaoConhecimento
        }).then(res => {
            navigate('/equipes')
            messages.mensagemSucesso('Equipe cadastrado com sucesso!' )
        }).catch(error => {
            messages.mensagemErro(error.res.data.message)
        })
    }

    const update = () => {      
        try{
            service.validate({
                nome: nome,
                alunos: alunos,
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
            alunos: alunos,
            temaLinhapesquisaDescricao: descricaoLinha,
            temaLinhaPesquisaAreaConhecimentoDescricao: descricaoConhecimento
        }).then(response => {
            navigate('/equipes')
            messages.mensagemSucesso('Equipe atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }
    
    return(
        <>
        <Navbar />
        <div className="container">
            <Card title={ atualizando ? 'Cadastro Equipe' : 'Atualização de equipe'}>
            
            <div className="row">          
                <div className="col-md-6">
                    <Form id="nome" label="Nome da equipe: *" >
                        <InputText id="nome" type="text" className="p-inputtext-sm block mb-1" name="nome" 
                               value={nome} onChange={e => setNome(e.target.value)}/>
                    </Form>
                </div>

                <div className="col-md-3">
                    <Form id="dataCadastro" label="Data de cadastro: *" >
                        <InputText id="dataCadastro" type="date" className="form-control" 
                               name="dataCadastro" disabled value={dataCadastro}/>
                    </Form>                            
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Form id="dataCadastro" label="Alunos: *">
                        <MultiSelectContainer value={alunos} className="p-inputtext-sm block mb-1"
                            onChange={(e) => setAlunos(e.value)}
                            options={alunos} findBy="matricula"
                            filterPlaceholder="Digite a matrícula"
                            placeholder='Nenhum aluno adicionado'
                            service={AlunoService}/>          
                    </Form>
                </div>
            </div>  

            <div className="row">
                <div className="col-md-12">
                    <Form id="delimitacao" label="Tema: *" >
                        <InputText id="delimitacao" type="text" className="p-inputtext-sm block mb-1" name="delimitacao"
                                value={delimitacao} onChange={e => setDelimitacao(e.target.value)}/>
                    </Form>
                </div>
                    <div className="col-md-12">
                        <Form id="descricaoLinha" label="Linha de pesquisa: *" >
                            <InputTextarea id="descricaoLinha" type="text" className="form-control" name="descricaoLinha"
                                    value={descricaoLinha} onChange={e => setDescricaoLinha(e.target.value)}
                                    rows={3}  autoResize/>
                        </Form>
                    </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Form id="descricaoConhecimento" label="Área de conhecimento: *" >
                        <InputText id="descricaoConhecimento" className="mb-1" name="descricaoConhecimento" 
                                value={descricaoConhecimento} onChange={e => setDescricaoConhecimento(e.target.value)}  />
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