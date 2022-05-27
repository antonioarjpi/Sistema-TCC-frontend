import {  mensagemSucesso, mensagemErro } from '../components/toastr/toastr';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../services/resource/user';
import Card from '../components/card/card';
import Form from '../components/form/form';
import Button from '../components/button/button';


function SignUp(){

     const navigate = useNavigate();
     const [nome, setNome] = useState();
     const [email, setEmail] = useState();
     const [senha, setSenha] = useState();
     const [senhaRepetida, setSenhaRepetida] = useState();       

    const service = new UserService();

    const signup = async () => {

         try{
             service.validate({
                 nome: nome,
                 email: email,
                 senha: senha,
                 senhaRepetida: senhaRepetida,
             })
         }catch(error){
             const msgs = error.message;
             msgs.forEach(msg=> mensagemErro(msg));
             return false;
         }

        service.save({
            nome: nome,
            email: email,
            senha: senha,
            senhaRepetida: senhaRepetida,
        }).then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso!')
            navigate('/login')
        }).catch(error => {
            mensagemErro(error.response.data.message)
        })

    }

    const cancel = () => {
       navigate("/")
    }

    return(
        <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card title="Cadastro de Usuário">
                <div classnome="row">
                    <div classnome="col-md-12">
                        
                            <Form label="Nome: *" htmlFor="nome">
                                <input type="text" onChange={e => setNome(e.target.value)} />
                            </Form>

                            <Form label="Email: *" htmlFor="123">
                                <input type="email" onChange={e => setEmail(e.target.value)} />
                            </Form>

                            <Form label="Senha: *" htmlFor="senha">
                                <input type="password" onChange={e => setSenha(e.target.value)} />
                            </Form>

                            <Form label="Repita a Senha: *" htmlFor="senhaRepetida">
                                <input classnome='mb-4' type="password" onChange={e => setSenhaRepetida(e.target.value)} />
                            </Form>

                            <Button onClick={cancel} type="button" classnome="btn btn-danger">Cancelar</Button>
                            <Button onClick={signup} type="button" classnome="btn btn-success mr-5">Salvar</Button>
                                    
                    </div>
                </div>
            </Card>
        </div>
        </>
    )
    
}

export default SignUp;