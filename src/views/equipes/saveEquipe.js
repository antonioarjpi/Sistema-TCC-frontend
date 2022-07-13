import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import EquipeService from "../../services/resource/equipeService";
import { formatLocalDate } from "../../utils/format";
import AlunoService from "../../services/resource/alunoService";
import MultiSelectContainer from "../../components/multi-select/multiSelect";
import InputForm from "../../components/input/input";

function SaveEquipe(){

    const [equipe, setEquipe] = useState();
    const [nome, setNome] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [delimitacao, setDelimitacao] = useState('');
    const [descricaoLinha, setDescricaoLinha] = useState('');
    const [descricaoConhecimento, setDescricaoConhecimento] = useState('');
    const [loading, setLoading] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const [atualizando, setAtualizando] = useState(true);
    const hoje = Date.now();

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
        <div className="container">
            <Card title={ atualizando ? 'Cadastro Equipe' : 'Atualização de equipe'}>
            
            <div className="row">          
                <div className="col-md-6">
                    <Form id="nome">
                        <InputForm id="nome" type="text" label="Nome da equipe *"  name="nome" 
                               value={nome} onChange={e => setNome(e.target.value)}/>
                    </Form>
                </div>

                <div className="col-md-4">
                    <Form id="dataCadastro">
                        <InputForm id="dataCadastro" type="date"
                               label='Data de cadastro'  
                               name="dataCadastro" disabled value={dataCadastro ? dataCadastro : formatLocalDate(hoje, 'yyyy-MM-dd')}/>
                    </Form>                            
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Form id="dataCadastro" className='form-group'>
                        <MultiSelectContainer value={alunos} 
                            onChange={(e) => setAlunos(e.value)}
                            options={alunos}
                            filterBy="matricula,nome"
                            filterPlaceholder="Digite a matrícula"
                            placeholder='Matrícula dos alunos'
                            service={AlunoService}/>      
                                
                    </Form>
                </div>
            </div>  

            <div className="row">
                <div className="col-md-12">
                    <Form id="delimitacao">
                        <InputForm id="delimitacao" type="text"  name="delimitacao" label="Tema *" 
                                value={delimitacao} onChange={e => setDelimitacao(e.target.value)}/>
                    </Form>
                </div>
                    <div className="col-md-12">
                        <Form id="descricaoLinha" >
                            <InputForm id="descricaoLinha" type="text" label="Linha de pesquisa *" name="descricaoLinha"
                                    value={descricaoLinha} onChange={e => setDescricaoLinha(e.target.value)}
                                    rows={3}  autoResize/>
                        </Form>
                    </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Form id="descricaoConhecimento"  >
                        <InputForm id="descricaoConhecimento" label="Área de conhecimento *" name="descricaoConhecimento" 
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
    )
}

export default SaveEquipe;