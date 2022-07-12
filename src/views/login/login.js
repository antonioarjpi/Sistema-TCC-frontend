
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useAuth } from "../../context/AuthContext";
import './styles.css'

import Form from "../../components/form/form";
import UserService from "../../services/resource/user";
import Button from "../../components/button/button";
import InputForm from './../../components/input/input';

function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading1, setLoading1] = useState(false);
    const navigate = useNavigate();
    const service = new UserService();
    const auth = useAuth();
    
    const login = () =>{      
        setLoading1(true);
       
        service.authenticate({
            email: email,
            senha: senha
        }).then( response => {
            auth.login(response.data, response.data.token);
            navigate('/home')
            setLoading1(false)
        }).catch( error => {            
            setLoading1(false)          
        })

    }
        
    const signup = () => {
        navigate("/signup")
    }

    return(
        <>
        <div className="container col col-md-12" style={{display: 'flex', justifyContent: 'center'}}>
                <div className="row login">
                <img className="logo" src="https://i.ibb.co/QPd6SkD/logo-fundo.png" alt='LOGO SGTCC' />
                    <div className="col-lg-12">
                        <Form>
                            <InputForm type="text" className="block" id="email" label="E-mail"
                                value={email} onChange={e => setEmail(e.target.value)}/>
                        </Form>      
                        <Form>
                            <label className="input-label" htmlFor="password">Senha</label>
                            <Password id="senha" className="password" style={{width: '100%'}} value={senha} onChange={e => setSenha(e.target.value)} feedback={false} toggleMask/>                            
                        </Form>
                        <Button className="btn btn-primary mb-2 mt-3" style={{width: '100%'}} icon="pi pi-sign-in"
                            loading={loading1} onClick={login}>Entrar
                        </Button>            
                        <span onClick={signup} className="info-login" type="button">Não tem acesso? Cadastra-se</span>
                    </div>
                </div>
        
        </div>

        {/* <Form>
        <div className="col col-md-12" >
            <div className="container" style={{display: 'flex', justifyContent: 'center', verticalAlign: 'middle', alignItems: 'middle', }}>
                <div className="row">
                    <Panel toggleable header="Aviso" >
                    <p>O Site é hospedado de forma gratuita, então pode levar um tempo até carregar todas as informações.</p>
                    </Panel>
                </div>
            </div>
        </div>  
        </Form> */}
    </>
    )
    
}

export default Login;