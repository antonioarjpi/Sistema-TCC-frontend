import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import AlunoService from "../../services/resource/alunoService";


function SaveAluno(){

    const [aluno, setAluno] = useState();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [matricula, setMatricula] = useState();
    const [senhaRepetida, setSenhaRepetida] = useState();
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
            setSenha(response.data.senha);
            setMatricula(response.data.matricula)
            setSenhaRepetida(response.data.senha);
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })

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
     
        service.update({
            id: aluno,
            nome: nome,
            email: email,
            senha: senha
        }).then(response => {
            navigate('/alunos')
            messages.mensagemSucesso('Aluno atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <>
        <Navbar />
        <div className="container">
            <Card title={ atualizando ? 'Cadastro Aluno' : 'Atualização de Aluno ' }>
                <div className="row">
                    <div className="col-md-2">
                        <Form id="matricula" label="Matricula: " >
                            <input id="nome" type="text" 
                                className="form-control" 
                                name="matricula"
                                disabled
                                value={matricula}
                                onChange={e => setMatricula(e.target.value)}
                                    />
                        </Form>
                    </div>
                </div> 

            <div className="row">
                <div className="col-md-8">
                    <Form id="nome" label="Nome: *" >
                        <input id="nome" type="text" 
                            className="form-control" 
                            name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <Form id="email" label="Email: *" >
                        <input id="email" type="text" 
                            className="form-control" 
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Form id="senha" label="Senha: *" >
                        <input id="senha" type="password" 
                            className="form-control" 
                            name="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-4">
                    <Form id="senhaRepetida" label="Repita a senha: *" >
                        <input id="senhaRepetida" type="password" 
                            className="form-control" 
                            name="senhaRepetida"
                            value={senhaRepetida}
                            onChange={e => setSenhaRepetida(e.target.value)}
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
                    <Link to={'/alunos'}>
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

export default SaveAluno;