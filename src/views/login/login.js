
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Password } from 'primereact/password';
import { useAuth } from "../../context/AuthContext";
import './styles.css'

import Form from "../../components/form/form";
import UserService from "../../services/resource/userService";
import Button from "../../components/button/button";
import InputForm from './../../components/input/input';

const valoresInicial = {
    nome: '',
    email: ''
}

function Login() {

    const [values, setValues] = useState(valoresInicial);
    const [loading1, setLoading1] = useState(false);
    const navigate = useNavigate();
    const service = new UserService();
    const auth = useAuth();

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const login = (event) => {
        event.preventDefault()
        setLoading1(true);

        service.authenticate(values).then(response => {
            auth.login(response.data, response.data.token);
            navigate('/home')
            setLoading1(false)
        }).catch(() => {
            setLoading1(false)
        })
    }

    const registrar = () => {
        navigate("/signup")
    }

    return (
        <div className="container col col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="row login">
                <img className="logo" src="https://i.ibb.co/QPd6SkD/logo-fundo.png" alt='LOGO SGTCC' />
                <div className="col-lg-12">
                    <form onSubmit={login}>
                        <Form>
                            <InputForm type="text" className="block" name="email" label="E-mail"
                                value={values.email} onChange={onChange} />
                        </Form>
                        <Form>
                            <label className="input-label" htmlFor="password">Senha</label>
                            <Password name="senha" className="password" style={{ width: '100%' }} value={values.senha} onChange={onChange} feedback={false} toggleMask />
                        </Form>
                        <Button type="submit" className="btn btn-primary submit-login" icon="pi pi-sign-in"
                            loading={loading1} onClick={login}>Entrar
                        </Button>
                        <div></div>
                        <span onClick={registrar} className="info-login" type="button">Não tem acesso? Cadastra-se</span>
                    </form>
                </div>
            </div>

        </div>
    )

}

export default Login;