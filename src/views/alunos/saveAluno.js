import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import AlunoService from "../../services/resource/alunoService";
import InputForm from "../../components/input/input";

function SaveAluno(){

    const [aluno, setAluno] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [matricula, setMatricula] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');
    const [atualizando, setAtualizando] = useState(true);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setAluno(response.data.id)
            setNome(response.data.nome);
            setEmail(response.data.email);
            setMatricula(response.data.matricula);
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);

    

    const service = new AlunoService();

    const submit = () => {
        try{
            service.validate({
                nome: nome,
                email: email,
                senha: senha,
                senhaRepetida: senhaRepetida
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.save({
            nome: nome,
            email: email,
            senha: senha
        }).then(response => {
            navigate('/alunos')
            messages.mensagemSucesso('Aluno cadastrado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }


    const update = () => {
        try{
            service.validateUpdate({
                nome: nome,
                email: email
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.update({
            id: aluno,
            nome: nome,
            email: email
        }).then(response => {
            navigate('/alunos')
            messages.mensagemSucesso('Aluno atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <div className="container">
            <Card title={ atualizando ? 'Cadastro Aluno' : 'Atualização de Aluno ' }>
                <div className="row">
                    <div className="col-md-2">
                        <Form id="matricula" >
                            <InputForm id="nome" type="text" 
                                name="matricula"
                                disabled
                                label="Matricula"
                                value={matricula}
                                onChange={e => setMatricula(e.target.value)}
                                    />
                        </Form>
                    </div>
                </div> 

            <div className="row">
                <div className="col-md-12">
                    <Form id="nome" >
                        <InputForm label="Nome *" keyfilter={/^[^</0!@#'+|$%´`¨&*"()1:;2=34,5_67}{[8\\9./>*!]+$/} value={nome} onChange={e => setNome(e.target.value)}/>        
                    </Form>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Form id="email" >
                        <InputForm id="email" label="E-mail *" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form>
                </div>
            </div>

            { atualizando ? (
                <div className="row">
                    <div className="col-md-3">
                        <Form id="senha" >
                            <span className="p-float-label">
                                <Password style={{width: '100%'}} value={senha} onChange={(e) => setSenha(e.target.value)} toggleMask />
                                <label htmlFor="senha">Senha*</label>
                            </span>
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form id="senhaRepetida" >
                            <span className="p-float-label">
                                <Password style={{width: '100%'}} value={senhaRepetida} onChange={(e) => setSenhaRepetida(e.target.value)} toggleMask feedback={false} />
                                <label htmlFor="senhaRepetida">Repita a senha*</label>
                            </span>
                        </Form>
                    </div>
            </div>
            ) : (
                <></>
            )}

            <div className="row">
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
                    <Link to={'/alunos'}>
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

export default SaveAluno;