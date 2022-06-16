
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Panel } from 'primereact/panel';
import { useAuth } from "../context/AuthContext";

import Card from "../components/card/card";
import Form from "../components/form/form";
import UserService from "../services/resource/user";

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
            setTimeout(()=>{
            }, 1000)              
        })
        setLoading1(false);  
    }, 2000)
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
                                <Password id="senha" style={{width: '100%'}} value={senha} onChange={e => setSenha(e.target.value)} feedback={false} toggleMask/>
                                <label >Senha</label>
                            </span>
                        </Form>
                        <Button className="mb-3 mt-3" label="Entrar" loading={loading1} onClick={login}/><br/>            
                        <span onClick={signup} className="register" type="button">Não tem acesso? Cadastra-se</span>
                    </div>
                </div>
            </Card>  
        </div>

        <Form>
        <div className="col col-md-12" >
            <div className="container" style={{display: 'flex', justifyContent: 'center', verticalAlign: 'middle', alignItems: 'middle', }}>
                <div className="row">
                    <Panel toggleable header="Aviso" >
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