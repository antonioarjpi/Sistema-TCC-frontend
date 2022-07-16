import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import BancaService from "../../services/resource/bancaService";
import OrientadorService from "../../services/resource/orientadorService";
import EquipeService from "../../services/resource/equipeService";
import DropDown from "../../components/dropdown/dropdown";
import InputForm from "../../components/input/input";
import Button from "../../components/button/button";

const valoresInicial = {
    id: '',
    descricao: '',
    dataBanca: '',
    equipe: '',
    matriculaOrientador: '',
    membroMatricula: '',
    ordemApresentacao: ''
}

function CadastraBanca(){

    const [values, setValues] = useState(valoresInicial)
    const [equipe, setEquipe] = useState('')
    const [matriculaOrientador, setMatriculaOrientador] = useState();
    const [atualizando, setAtualizando] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setValues(response.data)
            setEquipe(response.data.equipeId)
            setMatriculaOrientador(response.data.orientadorMatricula)
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);

    const service = new BancaService();

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value});        
    };

    const submit = (event) => {
        event.preventDefault()

        values.equipe = equipe;
        values.matriculaOrientador = matriculaOrientador;

        try{
            service.validate(values)
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;           
        }

        if (atualizando === true){
            service.update(values).then(() => {
                messages.mensagemSucesso('Banca atualizada com sucesso!')
                navigate('/bancas')
            }).catch(error => {       
                messages.mensagemErro(error.response.data.message)
                return false
            })
        }else if(atualizando === false ){
            service.save(values)
            .then(() => {
                messages.mensagemSucesso('Banca cadastrada com sucesso!')
                navigate('/bancas')
            }).catch(error => {        
                messages.mensagemErro(error.response.data.message)
                return false
            })
        }
    }

    //Coloca dados no options de equipes
    const [equipeOptions, setEquipeOptions] = useState();
    const equipeService = new EquipeService();
    useEffect(() => {
        equipeService.findAll()
        .then(response => {
            setEquipeOptions(response.data.content) 
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Coloca dados no options de orientadores
    const [orientadorOptions, setOrientadorOptions] = useState();
    const orientadorService = new OrientadorService();
    useEffect(() => {
        orientadorService.findAll()
        .then(response => {
            setOrientadorOptions(response.data.content) 
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return(
        <div className="container">
        <Card title={ atualizando ? 'Atualização de banca' : 'Cadastro de banca' }>
            <form onSubmit={submit} >
                <div className="row">
                    <div className="col-md-12">
                        <Form id="descricao"  >
                            <InputForm id="descricao" type="text" 
                                label="Descrição *"
                                name="descricao"
                                value={values.descricao}
                                onChange={onChange}/>
                        </Form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Form id="dataBanca" >
                            <InputForm id="dataBanca" type="date" label='Data da banca'  name="dataBanca" 
                                value={values.dataBanca}
                                onChange={onChange}/>
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form id="ordemApresentacao" >
                            <InputForm id="ordemApresentacao" type="number"
                                label="Ordem de apresentação"  
                                name="ordemApresentacao" value={values.ordemApresentacao}
                                onChange={onChange}/>
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form id="orientador">
                            <DropDown name="matriculaOrientador"
                                options={orientadorOptions}
                                findBy="matricula"
                                filterBy="matricula,nome"
                                span="Orientador"
                                value={matriculaOrientador}
                                label1='matricula'
                                label2='nome'
                                optionValue="matricula"
                                onChange={e => setMatriculaOrientador(e.target.value)}
                            />
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form id="equipe" >
                            <DropDown id="equipe" name="equipe"
                                options={equipeOptions}
                                findBy="id"
                                filterBy="id,nome"           
                                span="Equipe"
                                value={equipe}
                                label1='id'
                                label2='nome'
                                optionValue="id"
                                onChange={e => setEquipe(e.target.value)}
                            />
                        </Form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <Form id="membroMatricula" >
                            <InputForm id="membroMatricula" type="text" 
                                label="Membro banca" 
                                name="membroMatricula" 
                                value={values.membroMatricula}
                                onChange={onChange}/>
                        </Form>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-6" >
                        { atualizando === false ? (
                            <Button type="submit" icon="pi pi-save" className="btn btn-primary">
                                Atualizar
                            </Button>    
                        ) : (
                            <Button type="submit" icon="pi pi-save" className="btn btn-primary">
                                Salvar
                            </Button>                  
                        )}         
                        <Link to={'/bancas'}>
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

export default CadastraBanca;