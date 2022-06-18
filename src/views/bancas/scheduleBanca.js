import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import Form from "../../components/form/form";
import InputForm from "../../components/input/input";
import * as messages from '../../components/toastr/toastr'
import BancaService from "../../services/resource/bancaService";
import { formatLocalDate } from "../../utils/format";


function ScheduleDefesa(){

    const [, setDefesa] = useState('');
    const [data, setData] = useState('');
    const hoje = Date.now();

    const { id } = useParams();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setDefesa(response.data.id);
            setData(response.data.defesaDataDefesa)
        })
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }},[])
    

    const navigate = useNavigate();
    const service = new BancaService();

    const submit = () => {
        try{
            service.validateScheduling({
                data: data,
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.scheduling({
            id: id,
            data: data,
        }).then(response => {
            navigate('/bancas')
            messages.mensagemSucesso('Defesa agendada!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <div className="container">
            <Card title='Agendamento de Defesa'>
            <div className="row">
                <div className="col-md-6">
                    <Form id="data"  >
                        <InputForm id="data" type="date" 
                            label="Data de defesa *"
                            className="form-control" 
                            name="data"
                            value={data ? data : setData(formatLocalDate(hoje, 'yyyy-MM-dd'))}
                            onChange={e => setData(e.target.value)}
                                />
                    </Form>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-6" >
                <button  onClick={submit} className="btn btn-primary">
                    <i className="pi pi-save"></i>Alterar
                </button>
                    <Link to={'/bancas'}>
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

export default ScheduleDefesa;