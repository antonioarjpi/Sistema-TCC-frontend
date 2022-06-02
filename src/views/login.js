
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import Card from "../components/card/card";
import Form from "../components/form/form";
import UserService from "../services/resource/user";
import * as messages from '../components/toastr/toastr';
import LocalStorageService from "../services/resource/localstorageService";

function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const navigate = useNavigate();
    const service = new UserService();

    const login = () =>{
        setLoading1(true);
        setTimeout(() => {
        service.authenticate({
            email: email,
            senha: senha
        }).then( response => {
            LocalStorageService.addItem('_usuario_logado', response.data )
            navigate('/home')
        }).catch( error => {
            setTimeout(() => {
                setLoading1(false);
                messages.mensagemErro("Usuário ou senha inválida!")
            }, 1000)
            
    
        })
    }, 700)
    }
        
    const signup = () => {
        navigate("/signup")
    }

    return(
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
                                <Password className='' id="senha"
                                value={senha} onChange={e => setSenha(e.target.value)} feedback={false} toggleMask/>
                                <label >Senha</label>
                            </span>
                        </Form>
                        <Button className="mb-2" label="Entrar" loading={loading1} onClick={login} style={{display: 'flex', aling: 'center', marginTop: "10px"}}/>            
                        <a onClick={signup} href='/signup' type="buttom">Não tem acesso? Cadastra-se</a>
                    </div>
                </div>
            </Card>
            
        </div>  
    )
    
}

export default Login;