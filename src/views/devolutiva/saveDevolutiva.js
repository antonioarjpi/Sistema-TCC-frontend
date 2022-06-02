import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import DevolutivaService from "../../services/resource/devolutivaService";


function SaveDevolutiva(){

    const [orientacao, setOrientacao] = useState();
    const [dataMudanca, setDtaMudanca] = useState();
    const [statusOrientacao, setStatusOrientacao] = useState();
    const [descricaoDaDevolutiva, setDescricaoDaDevolutiva] = useState();
    const [versaoDoc, setVersaoDoc] = useState();
    const [localDeCorrecao, setLocalDeCorrecao] = useState();
    const [correcaoSugerida, setCorrecaoSugerida] = useState();

    const navigate = useNavigate();
    const service = new DevolutivaService();

    const submit = () => {
        try{
            service.validate({
              
                
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
            messages.mensagemSucesso('Orientação cadastrado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <>
        <Navbar />
        <div className="container">
            <Card title='Devolutivas'>
            <div className="row">
                <div className="col-md-12">
                    <Form id="orientacao" label="Código da orientação: *" >
                        <input id="orientacao" type="text" 
                            className="form-control" 
                            name="orientacao"
                            value={orientacao}
                            onChange={e => setOrientacao(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <Form id="dataMudanca" label="Data da mudança: *" >
                        <input id="dataMudanca" type="date" 
                            className="form-control" 
                            name="dataMudanca"
                            value={dataMudanca}
                            onChange={e => setDtaMudanca(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <Form id="statusOrientacao" label="Status: *" >
                        <input id="statusOrientacao" type="text" 
                            className="form-control" 
                            name="statusOrientacao"
                            value={statusOrientacao}
                            onChange={e => setStatusOrientacao(e.target.value)}
                                />
                    </Form>
                </div>
   
                <div className="col-md-4">
                    <Form id="descricaoDaDevolutiva" label="Descrição da devolutiva: *" >
                        <input id="descricaoDaDevolutiva" type="text" 
                            className="form-control" 
                            name="descricaoDaDevolutiva"
                            value={descricaoDaDevolutiva}
                            onChange={e => setDescricaoDaDevolutiva(e.target.value)}
                                />
                    </Form>
                </div>        
                <div className="col-md-4">
                    <Form id="versaoDoc" label="Versão do documento: *" >
                        <input id="versaoDoc" type="text" 
                            className="form-control" 
                            name="versaoDoc"
                            value={versaoDoc}
                            onChange={e => setVersaoDoc(e.target.value)}
                                />
                    </Form>
                </div>

                <div className="col-md-4">
                    <Form id="localDeCorrecao" label="Local de correção: *" >
                        <input id="localDeCorrecao" type="text" 
                            className="form-control" 
                            name="localDeCorrecao"
                            value={localDeCorrecao}
                            onChange={e => setLocalDeCorrecao(e.target.value)}
                                />
                    </Form>
                </div>

                <div className="col-md-4">
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
                <button  onClick={submit} className="btn btn-primary">
                    <i className="pi pi-save"></i>Salvar
                </button>
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