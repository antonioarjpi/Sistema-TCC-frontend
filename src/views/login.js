
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/button";
import Card from "../components/card/card";
import Form from "../components/form/form";
import UserService from "../services/resource/user";
import * as messages from '../components/toastr/toastr';
import LocalStorageService from "../services/resource/localstorageService";

function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const navigate = useNavigate();
    
    const service = new UserService();

    const login = () =>{
        service.authenticate({
            email: email,
            senha: senha
        }).then( response => {
            LocalStorageService.addItem('_usuario_logado', response.data )
            navigate('/home')
        }).catch( error => {
            messages.mensagemErro(error.response.data.message)
        })
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
                            <input type="text" className="form-control" id="email" placeholder="E-mail"
                            value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </Form>
                        <Form>
                            <input type="password" className="form-control" id="senha" placeholder="Senha"
                            value={senha} onChange={e => setSenha(e.target.value)}
                            />
                        </Form>                 
                        <Button onClick={login} className="btn btn-success align-middle mb-3 mt-3" style={{display: 'flex', aling: 'center'}}>Entrar</Button>
                        <a onClick={signup} href='/signup' type="buttom">Não tem acesso? Cadastra-se</a>
                    </div>
                </div>
            </Card>
            
        </div>  
    )
    
}

export default Login;