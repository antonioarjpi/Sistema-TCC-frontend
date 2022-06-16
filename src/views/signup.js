import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../services/resource/user';
import Card from '../components/card/card';
import Form from '../components/form/form';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import * as messages from '../components/toastr/toastr';


function SignUp(){

     const navigate = useNavigate();
     const [nome, setNome] = useState();
     const [email, setEmail] = useState();
     const [senha, setSenha] = useState();
     const [senhaRepetida, setSenhaRepetida] = useState(); 
     const [loading, setLoading] = useState(false);
      

    const service = new UserService();

    const signup = async () => {
        setLoading(true)
         try{
             service.validate({
                 nome: nome,
                 email: email,
                 senha: senha,
                 senhaRepetida: senhaRepetida,
             })
         }catch(error){
             const msgs = error.message;
             msgs.forEach(msg=> messages.mensagemErro(msg));
             setLoading(false);
             return false;
         }

        service.save({
            nome: nome,
            email: email,
            senha: senha,
            senhaRepetida: senhaRepetida,
        }).then(response => {
            messages.mensagemSucesso('Usuário cadastrado com sucesso!')
            navigate('/login')
        }).catch(error => {
            setTimeout(() => { 
                messages.mensagemErro(error.response.data.message)            
            }, 1000)
            setLoading(false);
        })
    }

    const cancel = () => {
       navigate("/login")
    }

    return(
        <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-md-12 align-middle">
                            <Form htmlFor="nome">
                                <span className="p-float-label mb-1">
                                    <InputText type="text" className="block" id="email"
                                        value={nome} onChange={e => setNome(e.target.value)}/>
                                    <label htmlFor="email">Nome*</label>
                                </span>  
                            </Form>

                            <Form>
                                <span className="p-float-label mb-1">
                                    <InputText type="text" className="block" id="email"
                                        value={email} onChange={e => setEmail(e.target.value)}/>
                                    <label htmlFor="email">E-mail*</label>
                                </span> 
                            </Form>

                            <Form htmlFor="senha" className="mb-3">
                                <span className="p-float-label mb-1">
                                    <Password className='block' style={{width: '100%'}} value={senha} onChange={(e) => setSenha(e.target.value)} toggleMask />
                                    <label htmlFor="email">Senha*</label>
                                </span>
                            </Form>

                            <Form htmlFor="senhaRepetida">
                                <span className="p-float-label mb-1 mb-3">
                                    <Password className='block' style={{width: '100%'}} feedback={false} value={senhaRepetida} onChange={(e) => setSenhaRepetida(e.target.value)} toggleMask />
                                    <label htmlFor="email">Senha Repetida*</label>
                                </span>
                            </Form>
            
                            <Button label="Cadastrar" loading={loading} onClick={signup} style={{aling: 'center', marginRight: '6px'}}/> 
                            <Button onClick={cancel} type="button" className="p-button-danger" style={{}}>Cancelar</Button>
                            
                                    
                    </div>
                </div>
            </Card>
        </div>
        </>
    )
    
}

export default SignUp;