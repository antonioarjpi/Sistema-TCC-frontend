import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import DefesaService from "../../services/resource/defesaService";


function SaveDefesa(){

    const [data, setData] = useState();
    const [banca, setBanca] = useState();

    const navigate = useNavigate();

    const service = new DefesaService();

    const submit = () => {

        try{
            service.validate({
                data: data,
                banca: banca
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.save({
            data: data,
            banca: banca
        }).then(response => {
            navigate('/defesas')
            messages.mensagemSucesso('Defesa agendada!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <>
        <Navbar />
        <div className="container">
            <Card title='Cadastro de Defesa'>
            <div className="row">
                <div className="col-md-6">
                    <Form id="banca" label="Código da banca: *" >
                        <input id="banca" type="text" 
                            className="form-control" 
                            name="banca"
                            value={banca}
                            onChange={e => setBanca(e.target.value)}
                                />
                    </Form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Form id="data" label="Data de defesa: *" >
                        <input id="data" type="date" 
                            className="form-control" 
                            name="data"
                            value={data}
                            onChange={e => setData(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-6" >
                <button  onClick={submit} className="btn btn-primary">
                    <i className="pi pi-save"></i>Salvar
                </button>
                    <Link to={'/defesas'}>
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

export default SaveDefesa;