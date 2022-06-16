import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import DevolutivaService from "../../services/resource/devolutivaService";
import { formatLocalDate } from "../../utils/format";


function SaveDevolutiva(){

    const [devolutiva, setDevolutiva] = useState(true);
    const [orientacao, setOrientacao] = useState();
    const [dataMudanca, setDataMudanca] = useState();
    const [statusOrientacao, setStatusOrientacao] = useState();
    const [descricaoDaDevolutiva, setDescricaoDaDevolutiva] = useState();
    const [versaoDoc, setVersaoDoc] = useState();
    const [localDeCorrecao, setLocalDeCorrecao] = useState();
    const [correcaoSugerida, setCorrecaoSugerida] = useState();
    const [atualizando, setAtualizando] = useState(true);

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

    return(
        <>
        <Navbar />
        <div className="container">
            <Card title={ atualizando ? 'Cadastro de Devolutiva' : 'Atualização de Devolutiva' }>
            <div className="row">
                <div className="col-md-3">
                    <Form id="orientacao" label="Cód orientação: *" >
                        <input id="orientacao" type="text" 
                            className="form-control" 
                            name="orientacao"
                            value={orientacao}
                            onChange={e => setOrientacao(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-3">
                    <Form id="dataMudanca" label="Data da mudança:" >
                        <input id="dataMudanca" type="date" 
                            className="form-control" 
                            name="dataMudanca"
                            value={dataMudanca}
                            onChange={e => setDataMudanca(e.target.value)}
                                />
                    </Form>
                </div>
                <div className="col-md-3">
                    <Form id="statusOrientacao" label="Status: *" >
                        <select id="statusOrientacao" required className="form-control" name="statusOrientacao" value={statusOrientacao}
                            onChange={e => setStatusOrientacao(e.target.value)}>
                            <option disabled hidden selected></option>
                            <option>Cancelado</option>
                            <option>Pendente</option>
                            <option>Finalizado</option>
                            <option>Resolvido</option>

                        </select>
                    </Form>
                </div>
                <div className="col-md-3">
                    <Form id="versaoDoc" label="Tipo documento: *" >
                        <input id="versaoDoc" type="text" 
                            className="form-control" 
                            name="versaoDoc"
                            value={versaoDoc}
                            onChange={e => setVersaoDoc(e.target.value)}
                                />
                    </Form>
                </div>
            </div>


            <div className="row">
                <div className="col-md-12">
                    <Form id="descricaoDaDevolutiva" label="Descrição da devolutiva: *" >
                        <input id="descricaoDaDevolutiva" type="text" 
                            className="form-control" 
                            name="descricaoDaDevolutiva"
                            value={descricaoDaDevolutiva}
                            onChange={e => setDescricaoDaDevolutiva(e.target.value)}
                                />
                    </Form>
                </div>        


                <div className="col-md-12">
                    <Form id="localDeCorrecao" label="Local de correção: *" >
                        <input id="localDeCorrecao" type="text" 
                            className="form-control" 
                            name="localDeCorrecao"
                            value={localDeCorrecao}
                            onChange={e => setLocalDeCorrecao(e.target.value)}
                                />
                    </Form>
                </div>

                <div className="col-md-12">
                    <Form id="correcaoSugerida" label="Correção sugerida: *" >
                        <input id="correcaoSugerida" type="text" 
                            className="form-control" 
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
    
    </>
    )
}

export default SaveDevolutiva;