import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/resource/user';
import Form from '../../components/form/form';
import { Password } from 'primereact/password';
import * as messages from '../../components/toastr/toastr';
import InputForm from './../../components/input/input';
import Button from '../../components/button/button';


function SignUp(){

     const navigate = useNavigate();
     const [nome, setNome] = useState('');
     const [email, setEmail] = useState('');
     const [senha, setSenha] = useState('');
     const [senhaRepetida, setSenhaRepetida] = useState(''); 
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
            setLoading(false);
        }).catch(error => {

        })
    }

    const cancel = () => {
       navigate("/login")
    }

    return(
        <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
     
                <div className="row login">
                <img className="logo" src="https://i.ibb.co/QPd6SkD/logo-fundo.png" alt='LOGO SGTCC' />
                    <div className="col-md-12 align-middle">
                            <Form htmlFor="nome"> 
                                <InputForm type="text" className="block" id="nome" label="Nome *"
                                    value={nome} onChange={e => setNome(e.target.value)}/>
                            </Form>

                            <Form>
                                <InputForm type="text" className="block" id="email" label='E-mail'
                                    value={email} onChange={e => setEmail(e.target.value)}/>                   
                            </Form>

                            <Form htmlFor="senha">
                                <label className="input-label" htmlFor="password">Senha *</label>
                                <Password className='password block' style={{width: '100%'}} value={senha} onChange={(e) => setSenha(e.target.value)} toggleMask />      
                            </Form>

                            <Form htmlFor="senhaRepetida">
                                <label className="input-label" htmlFor="password">Confirmação de senha *</label>
                                <Password className='password block' style={{width: '100%'}} feedback={false} value={senhaRepetida} onChange={(e) => setSenhaRepetida(e.target.value)} toggleMask />
                                   
                            </Form>
            
                            <div className='row mt-4'>
                                <div className='col-md-6'>
                                    <Button onClick={cancel} style={{width: '100%'}} type="button" icon="pi pi-arrow-left" className="btn btn-danger">Voltar</Button>
                                </div>
                                <div className='col-md-6'>
                                    <Button loading={loading} className='btn btn-primary' icon='pi pi-check-circle' onClick={signup} style={{width: '100%',aling: 'center', marginRight: '6px'}}>Cadastrar-se</Button>
                                </div>
                            </div>
                            
                                    
                    </div>
                </div>
       
        </div>
        </>
    )
    
}

export default SignUp;