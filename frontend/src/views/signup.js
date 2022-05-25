import {  mensagemSucesso, mensagemErro } from '../components/toastr/toastr';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button';
import Card from '../components/card/card';
import Form from '../components/form/form';
import UserService from '../services/resource/user';
import Navbar from '../components/navbar/navbar';


function SignUp(){

     const navigate = useNavigate();
     const [name, setName] = useState();
     const [email, setEmail] = useState();
     const [password, setPassword] = useState();
     const [passwordRepeat, setPasswordRepeat] = useState();
     const [error, setError] = useState();

       

    const service = new UserService();

    const signup = async () => {

        const user = {name,  email, password, passwordRepeat }

         try{
             service.validate({
                 name: name,
                 email: email,
                 password: password,
                 passwordRepeat: passwordRepeat,
             })
         }catch(error){
             const msgs = error.message;
             msgs.forEach(msg=> mensagemErro(msg));
             return false;
         }

        service.save({
            name: name,
            email: email,
            password: password,
            passwordRepeat: passwordRepeat,
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
        <Navbar />
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-md-12">
                        
                            <Form label="Nome: *" htmlFor="name">
                                <input type="text" onChange={e => setName(e.target.value)} />
                            </Form>

                            <Form label="Email: *" htmlFor="123">
                                <input type="email" onChange={e => setEmail(e.target.value)} />
                            </Form>

                            <Form label="Senha: *" htmlFor="password">
                                <input type="password" onChange={e => setPassword(e.target.value)} />
                            </Form>

                            <Form label="Repita a Senha: *" htmlFor="passwordRepeat">
                                <input className='mb-4' type="password" onChange={e => setPasswordRepeat(e.target.value)} />
                            </Form>

                            <Button onClick={cancel} type="button" className="btn btn-danger ">Cancelar</Button>
                            <Button onClick={signup} type="button" className="btn btn-success mr-5">Salvar</Button>
                            

                    
                    </div>
                </div>
            </Card>
        </div>
        </>
    )
    
}

export default SignUp;