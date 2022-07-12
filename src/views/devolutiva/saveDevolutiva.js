import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import DevolutivaService from "../../services/resource/devolutivaService";
import { formatLocalDate } from "../../utils/format";
import DropDown from "../../components/dropdown/dropdown";
import OrientacaoService from "../../services/resource/orientacaoService";
import InputForm from "../../components/input/input";
import { Dropdown } from "primereact/dropdown";


function SaveDevolutiva(){

    const [devolutiva, setDevolutiva] = useState(true);
    const [orientacao, setOrientacao] = useState();
    const [dataMudanca, setDataMudanca] = useState('');
    const [statusOrientacao, setStatusOrientacao] = useState();
    const [descricaoDaDevolutiva, setDescricaoDaDevolutiva] = useState('');
    const [versaoDoc, setVersaoDoc] = useState('');
    const [localDeCorrecao, setLocalDeCorrecao] = useState('');
    const [correcaoSugerida, setCorrecaoSugerida] = useState('');
    const [atualizando, setAtualizando] = useState(true);
    const hoje = Date.now();

    const {id} = useParams();
    const navigate = useNavigate();
    const service = new DevolutivaService();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setDevolutiva(response.data.id)
            setDataMudanca(formatLocalDate(response.data.dataMudanca, "yyyy-MM-dd"));
            setOrientacao(response.data.orientacaoId);
            setStatusOrientacao(response.data.statusOrientacao);
            setDescricaoDaDevolutiva(response.data.devolutivaDescricao);
            setVersaoDoc(response.data.devolutivaVersaoDoc);   
            setLocalDeCorrecao(response.data.devolutivaLocalCorrecaoLocal);
            setCorrecaoSugerida(response.data.devolutivaLocalCorrecaoCorrecaoSugerida);
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);

    const submit = () => {
        try{
            service.validate({
                orientacaoId: orientacao,
                dataMudanca: dataMudanca,
                statusOrientacao: statusOrientacao,
                devolutivaDescricao: descricaoDaDevolutiva,
                devolutivaVersaoDoc: versaoDoc,
                devolutivaLocalCorrecaoLocal: localDeCorrecao,
                devolutivaLocalCorrecaoCorrecaoSugerida: correcaoSugerida
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
        service.save({
            orientacaoId: orientacao,
            dataMudanca: dataMudanca,
            statusOrientacao: statusOrientacao,
            devolutivaDescricao: descricaoDaDevolutiva,
            devolutivaVersaoDoc: versaoDoc,
            devolutivaLocalCorrecaoLocal: localDeCorrecao,
            devolutivaLocalCorrecaoCorrecaoSugerida: correcaoSugerida
        }).then(response => {
            navigate('/devolutivas')
            messages.mensagemSucesso('Devolutiva cadastrado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    const update = () => {
        try{
            service.validate({
                orientacaoId: orientacao,
                dataMudanca: dataMudanca,
                statusOrientacao: statusOrientacao,
                devolutivaDescricao: descricaoDaDevolutiva,
                devolutivaVersaoDoc: versaoDoc,
                devolutivaLocalCorrecaoLocal: localDeCorrecao,
                devolutivaLocalCorrecaoCorrecaoSugerida: correcaoSugerida
                
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
        service.update({
            id: devolutiva,
            orientacaoId: orientacao,
            dataMudanca: dataMudanca,
            statusOrientacao: statusOrientacao,
            devolutivaDescricao: descricaoDaDevolutiva,
            devolutivaVersaoDoc: versaoDoc,
            devolutivaLocalCorrecaoLocal: localDeCorrecao,
            devolutivaLocalCorrecaoCorrecaoSugerida: correcaoSugerida
        }).then(response => {
            navigate('/devolutivas')
            messages.mensagemSucesso('Devolutiva atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    //Coloca dados no options de orientadores
            const [orientacaoOptions, setOrientacaoOptions] = useState();
            const orientacaoService = new OrientacaoService();
            useEffect(() => {
                orientacaoService.findAll()
                .then(response => {
                    setOrientacaoOptions(response.data) 
                })
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])

    const options = [
        { label: 'Positivo', value: 'Positivo' },
        { label: 'Negativo', value: 'Negativo' },
    ];

    return( 
        <div className="container">
            <Card title={ atualizando ? 'Cadastro de Devolutiva' : 'Atualização de Devolutiva' }>
            <div className="row">
                <div className="col-md-3">
                    <Form id="orientacao" >
                        <DropDown
                            span='Código da orientação'
                            options={orientacaoOptions}
                            findBy="id"
                            filterBy="id,descricaoTCC"
                            value={orientacao}
                            label1='id'
                            label2='descricaoTCC'
                            optionValue="id"
                            onChange={e => setOrientacao(e.target.value)}
                        />
                    </Form>  
                </div>
                <div className="col-md-3">
                    <Form id="dataMudanca" >
                        <InputForm id="dataMudanca" type="date" 
                            label='Data de mudança'
                            name="dataMudanca"
                            value={dataMudanca ? dataMudanca : setDataMudanca(formatLocalDate(hoje, "yyyy-MM-dd"))}
                            onChange={e => setDataMudanca(e.target.value)}
                        />
                    </Form>
                </div>
                <div className="col-md-3">
                    <Form id="statusOrientacao" >
                    <label className="input-label" htmlFor='status'>Status da devolutiva</label>
                            <Dropdown className="dropdown" style={{width: '100%'}} options={options} id="statusOrientacao" 
                                name="statusOrientacao" value={statusOrientacao} span='asdasdasd'
                                onChange={e => setStatusOrientacao(e.target.value)}
                            />
                            
                    </Form>
                </div>
                <div className="col-md-3">
                    <Form id="versaoDoc" >
                        <InputForm id="versaoDoc" type="text" 
                            label="Tipo documento *" 
                            name="versaoDoc"
                            value={versaoDoc}
                            onChange={e => setVersaoDoc(e.target.value)}
                                />
                    </Form>
                </div>
            </div>


            <div className="row">
                <div className="col-md-12">
                    <Form id="descricaoDaDevolutiva"  >
                        <InputForm id="descricaoDaDevolutiva" type="text" 
                            label="Descrição da devolutiva *"
                            name="descricaoDaDevolutiva"
                            value={descricaoDaDevolutiva}
                            onChange={e => setDescricaoDaDevolutiva(e.target.value)}
                                />
                    </Form>
                </div>        


                <div className="col-md-12">
                    <Form id="localDeCorrecao"  >
                        <InputForm id="localDeCorrecao" type="text" 
                            label="Local de correção *"
                            name="localDeCorrecao"
                            value={localDeCorrecao}
                            onChange={e => setLocalDeCorrecao(e.target.value)}
                                />
                    </Form>
                </div>

                <div className="col-md-12">
                    <Form id="correcaoSugerida" >
                        <InputForm id="correcaoSugerida" type="text" 
                            label="Correção sugerida *" 
                            name="correcaoSugerida"
                            value={correcaoSugerida}
                            onChange={e => setCorrecaoSugerida(e.target.value)}
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
                    )

                    }       
                    <Link to={'/devolutivas'}>
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

export default SaveDevolutiva;