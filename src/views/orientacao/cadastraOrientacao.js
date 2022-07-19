import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import OrientacaoService from "../../services/resource/orientacaoService";
import DropDown from "../../components/dropdown/dropdown";
import OrientadorService from "../../services/resource/orientadorService";
import EquipeService from "../../services/resource/equipeService";
import InputForm from "../../components/input/input";

const valoresInicial = {
    descricaoTCC: "",
    tipoTCC: "",
    dataOrientacao: "",
    equipe: "",
    matriculaOrientador: ""    
}

function CadastraOrientacao(){

    const [values, setValues] = useState(valoresInicial)
    const [atualizando, setAtualizando] = useState(true);

    const {id} = useParams();
    const navigate = useNavigate();
    const service = new OrientacaoService();

    useEffect(() =>{
        if(id){
            service.findId(id)
            .then(response =>{
                console.log(response.data)
                setValues(response.data)
                setAtualizando(false);
            })
            .catch(erros => {
                messages.mensagemErro(erros.response.data)
            })
        
        }}, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value});        
    };

    const submit = () => {
        try{
            service.validate(values)
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.save(values).then(() => {
            navigate('/orientacao')
            messages.mensagemSucesso('Orientação cadastrado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    const update = () => {
        try{
            service.validate(values)
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.update(values)
        .then(() => {
            navigate('/orientacao')
            messages.mensagemSucesso('Orientação atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
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
            <Card title={ atualizando ? 'Cadastro de Orientação' : 'Atualização de orientação' }>
            <div className="row">
                <div className="col-md-12">
                    <Form id="descricaoTCC"  >
                        <InputForm id="descricaoTCC" type="text" 
                            label="Descrição *"
                            className="form-control" 
                            name="descricaoTCC"
                            value={values.descricaoTCC}
                            onChange={onChange}/>
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <Form id="dataOrientacao" >
                        <InputForm id="dataOrientacao" type="date"
                            label="Data da Orientacao: *" 
                            className="form-control" 
                            name="dataOrientacao"
                            value={values.dataOrientacao}
                            onChange={onChange}
                        />
                    </Form>
                </div>
                <div className="col-md-3">
                    <Form id="tipoTCC"  >
                        <InputForm id="tipoTCC" type="text" 
                            label="Tipo do tcc *"
                            className="form-control" 
                            name="tipoTCC"
                            value={values.tipoTCC}
                            onChange={onChange}
                                />
                    </Form>
                </div>
                <div className="col-md-3">
                    <Form id="orientador"  >
                        <DropDown
                            options={orientadorOptions}
                            findBy="matricula"
                            filterBy="matricula,nome"
                            span="Orientador"
                            name="matriculaOrientador"
                            placeholderFilter='Matrícula orientador'
                            value={values.matriculaOrientador}
                            label1='matricula'
                            label2='nome'
                            optionValue="matricula"
                            onChange={onChange}
                        />
                    </Form>
                </div>
                <div className="col-md-3">
                    <Form id="equipe" >
                        <DropDown
                            options={equipeOptions}
                            findBy="id"
                            filterBy="id,nome"
                            span="Equipe"
                            name="equipe"
                            placeholderFilter='Código da equipe'
                            value={values.equipe}
                            label1='id'
                            label2='nome'
                            optionValue="id"
                            onChange={onChange}
                        />
                    </Form>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-6" >
                { atualizando ? (
                        <button  onClick={submit} className="btn btn-primary">
                            <i className="pi pi-save"></i>Salvar
                        </button>
                    ) : (
                        <button  onClick={update} className="btn btn-primary">
                            <i className="pi pi-save"></i>Atualizar
                        </button>                      
                    )}         
                    <Link to={'/orientacao'}>
                    <button className="btn btn-danger">
                        <i className="pi pi-times"></i>Cancelar
                    </button>
                    </Link>
                </div>
            </div>
        </Card>
    </div>
    )
}

export default CadastraOrientacao;