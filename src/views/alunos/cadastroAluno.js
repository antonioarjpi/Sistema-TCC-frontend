import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Password } from 'primereact/password';
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import AlunoService from "../../services/resource/alunoService";
import InputForm from "../../components/input/input";
import Button from "../../components/button/button";

const valoresInicial = {
    nome: '',
    email: '',
    matricula:'',
    senha: '',
    senhaRepetida: ''
}

function CadastroAluno(){

    const [values, setValues] = useState(valoresInicial)
    const [atualizando, setAtualizando] = useState(false);
    const service = new AlunoService();

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setValues(response.data)
            setAtualizando(true);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);


    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value});        
    };

    const submit = (event) => {
        event.preventDefault();

        if(atualizando === false){
            try{
                service.validate(values)
            }catch(error){
                const msgs = error.message;
                msgs.forEach(msg=> messages.mensagemErro(msg));
                return false;
            }
         
            service.save(values).then(response => {
                navigate('/alunos')
                messages.mensagemSucesso('Aluno cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data.message)
            })

        }else if(atualizando === true){
            try{
                service.validateUpdate(values)
            }catch(error){
                const msgs = error.message;
                msgs.forEach(msg=> messages.mensagemErro(msg));
                return false;
            }
            service.update(values).then(response => {
                navigate('/alunos')
                messages.mensagemSucesso('Aluno atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data.message)
            })
        }
    }

    return(
        <div className="container">
            <Card title={ atualizando ? 'Atualização Aluno' : 'Cadastro de Aluno ' }>
                <form onSubmit={submit}>
                <div className="row">
                    <div className="col-md-2">
                        <Form id="matricula" >
                            <InputForm id="nome" type="text" 
                                name="matricula"
                                disabled
                                label="Matricula"
                                value={values.matricula}
                                onChange={onChange}
                                    />
                        </Form>
                    </div>
                </div> 

            <div className="row">
                <div className="col-md-6">
                    <Form id="nome" >
                        <InputForm label="Nome *" name="nome" keyfilter={/^[^</0!@#'+|$%´`¨&*"()1:;2=34,5_67}{[8\\9./>*!]+$/} value={values.nome} onChange={onChange}/>        
                    </Form> 
                </div>

                <div className="col-md-6">
                    <Form id="email" >
                        <InputForm id="email" name="email" label="E-mail *" value={values.email} onChange={onChange}/>
                    </Form>
                </div>

            </div>

            { !atualizando ? (
                <div className="row">
                    <div className="col-md-3">
                        <Form id="senha" >
                            <label className="input-label" htmlFor="passwordRepeat">Senha *</label>
                            <Password className='password' name="senha" style={{width: '100%'}} value={values.senha} onChange={onChange} toggleMask />                           
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form id="senhaRepetida" >
                            <label className="input-label" htmlFor="passwordRepeat">Confirmação de senha *</label>
                            <Password className='password' name="senhaRepetida" style={{width: '100%'}} value={values.senhaRepetida} onChange={onChange} toggleMask feedback={false} />         
                        </Form>
                    </div>
            </div>
            ) : (
                <></>
            )}

            <div className="row mt-4">
                <div className="col-md-6" >
                    { !atualizando ? (
                        <Button type="submit" className="btn btn-primary" icon="pi pi-save">
                            Salvar
                        </Button>
                    ) : (
                        <Button  type="submit" className="btn btn-primary" icon="pi pi-save">
                           Atualizar
                        </Button>                      
                    )
                    }         
                    <Link to={'/alunos'}>
                    <Button className="btn btn-danger" icon="pi pi-times">
                        Cancelar
                    </Button>
                    </Link>
                </div>
            </div>
            </form>
        </Card>
    </div>
    )
}

export default CadastroAluno;