
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import Card from "../components/card/card";
import Form from "../components/form/form";
import UserService from "../services/resource/user";
import * as messages from '../components/toastr/toastr';

import { Panel } from 'primereact/panel';
import { useAuth } from "../context/AuthContext";


function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [loading1, setLoading1] = useState(false);
    const navigate = useNavigate();
    const service = new UserService();
    const auth = useAuth();
    

    const login = () =>{      
        setLoading1(true);
        setTimeout(() => {
        service.authenticate({
            email: email,
            senha: senha
        }).then( response => {
            auth.login(response.data, response.data.token);
            navigate('/home')
        }).catch( error => {
            setTimeout(() => {
                setLoading1(false);              
                if (error.response.data.message  === "Senha incorreta."){
                    messages.mensagemErro("Senha incorreta!") 
                }
                if (error.response.data.message  === "Usuário não encontrado."){
                    messages.mensagemErro("Usuário não encontrado!") 
                }
                
            }, 1000);   
        })
    }, 700)
    }
        
    const signup = () => {
        navigate("/signup")
    }

    return(
        <>
        <div className="col col-md-12" style={{display: 'flex', justifyContent: 'center'}}>
            <Card title='Acesso ao sistema'>
                <div className="row">
                    <div className="col-lg-12">
                        <Form>
                            <span className="p-float-label">
                                <InputText type="text" className="block" id="email"
                                value={email} onChange={e => setEmail(e.target.value)}/>
                                <label htmlFor="email">E-mail</label>
                            </span>
                        </Form>
                        
                        <Form>
                            <span className="p-float-label">
                                <Password id="senha" value={senha} onChange={e => setSenha(e.target.value)} feedback={false} toggleMask/>
                                <label >Senha</label>
                            </span>
                        </Form>
                    
                        <Button className="mb-2" label="Entrar" loading={loading1} onClick={login} style={{display: 'flex', aling: 'center', marginTop: "10px"}}/>            
                        <a onClick={signup} href='/signup' type="buttom">Não tem acesso? Cadastra-se</a>
                    </div>
                </div>
            </Card>

            
            
        </div>
        <Form>
        <div className="col col-md-12" >
        <div className="container" style={{display: 'flex', justifyContent: 'center', verticalAlign: 'middle', width: '800px', alignItems: 'middle', }}>
            <div className="row">
                <Panel toggleable header="Aviso">
                <p>O Site é hospedado de forma gratuita, então pode levar um tempo até carregar todas as informações.</p>
                </Panel>
            </div>
        </div>
        </div>  
        </Form>
    </>
    )
    
}

export default Login;