import {  mensagemSucesso, mensagemErro } from '../components/toastr/toastr';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../services/resource/user';
import Card from '../components/card/card';
import Form from '../components/form/form';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';


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
                <div className="row">
                    <div className="col-md-12">
                        
                            <Form label="Nome: *" htmlFor="nome">
                                <InputText className='block' id="nome" onChange={e => setNome(e.target.value)} />
                            </Form>

                            <Form label="Email: *" htmlFor="123">
                                <InputText className='block' type="email" onChange={e => setEmail(e.target.value)} />
                            </Form>

                            <Form label="Senha: *" htmlFor="senha">
                                <Password className='block' value={senha} onChange={(e) => setSenha(e.target.value)} toggleMask />
                            </Form>

                            <Form label="Repita a Senha: *" htmlFor="senhaRepetida">
                                <Password className='block mb-3' feedback={false} value={senhaRepetida} onChange={(e) => setSenhaRepetida(e.target.value)} toggleMask />
                            </Form>
            

                            <Button onClick={cancel} type="button" className="p-button-danger" style={{marginRight: '6px'}}>Cancelar</Button>
                            <Button onClick={signup} type="button" className="p-button-success">Salvar</Button>
                                    
                    </div>
                </div>
            </Card>
        </div>
        </>
    )
    
}

export default SignUp;