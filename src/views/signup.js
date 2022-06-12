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
                if(error.message  === "Network Error"   ){
                    messages.mensagemErro("Servidor não está disponível. tente novamente em alguns instantes") 
                }else{
                    messages.mensagemErro(error.response.data.message)     
                }         
                setLoading(false);
            }, 1000)
            
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
                            <Button className="" label="Cadastrar" loading={loading} onClick={signup} style={{aling: 'center'}}/> 
                                    
                    </div>
                </div>
            </Card>
        </div>
        </>
    )
    
}

export default SignUp;