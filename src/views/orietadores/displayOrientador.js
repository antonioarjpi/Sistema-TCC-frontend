import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Card from "../../components/card/card";
import Form from "../../components/form/form";

import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import OrientadorService from "../../services/resource/orientadorService";
import Profile from "../../components/profile/profile";
import Label from "../../components/label/label";

function DisplayOrientador(){

    const [orientador, setOrientador] = useState();
    const [nome, setNome] = useState();
    const [matricula, setMatricula] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [titulacaoDescricao, setDescricaoTitulacao] = useState();
    const [titulacaoGrau, setGrau] = useState();
    const [titulacaoIes, setIes] = useState();
    const [linhaPesquisaDescricao, setLinhaPesquisaDescricao] = useState();
    const [linhaPesquisaAreaconhecimentoDescricao, setLinhaPesquisaAreaconhecimentoDescricao] = useState();
    const [senhaRepetida, setSenhaRepetida] = useState();
    const [file, setFile] = useState();
    const [imagem, setImagem] = useState();
    const [atualizando, setAtualizando] = useState(true);
    
    const navigate = useNavigate();
    const { id } = useParams();
    const service = new OrientadorService();


    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setOrientador(response.data.id)
            setNome(response.data.nome);
            setEmail(response.data.email);
            setSenha(response.data.senha);
            setImagem(response.data.imagem);
            setSenhaRepetida(response.data.senha);
            setMatricula(response.data.matricula);   
            setDescricaoTitulacao(response.data.titulacao.descricao);
            setIes(response.data.titulacao.ies);
            setGrau(response.data.titulacao.grau);
            setLinhaPesquisaDescricao(response.data.linhaPesquisa.descricao);
            setLinhaPesquisaAreaconhecimentoDescricao(response.data.linhaPesquisa.areaConhecimento.descricao);
            setAtualizando(false);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
      }},[]);


    const submit = () => {
        try{
            service.validate({
                nome: nome,
                email: email,
                senha: senha,
                senhaRepetida: senhaRepetida
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.save({
            nome: nome,
            email: email,
            senha: senha,
            matricula: matricula,
            titulacaoIes: titulacaoIes,
            titulacaoDescricao: titulacaoDescricao,
            titulacaoGrau: titulacaoGrau,
            linhaPesquisaDescricao: linhaPesquisaDescricao,
            linhaPesquisaAreaconhecimentoDescricao: linhaPesquisaAreaconhecimentoDescricao
        }).then(response => {
            navigate('/orientadores')
            messages.mensagemSucesso('Orientador cadastrado com sucesso!')
        }).catch(error => {
            if (error.message === 'Network Error'){
                messages.mensagemAlert("Não foi possível conectar com servidor remoto")
                throw new ('');
            }   
            messages.mensagemErro(error.response.data.message)
        })
    }

    const update = () => {
        try{
            service.validate({
                nome: nome,
                email: email,
                senha: senha,
                senhaRepetida: senhaRepetida
            })
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg=> messages.mensagemErro(msg));
            return false;
        }
     
        service.update({
            id: orientador,
            nome: nome,
            email: email,
            senha: senha,
            matricula: matricula,
            titulacaoIes: titulacaoIes,
            titulacaoDescricao: titulacaoDescricao,
            titulacaoGrau: titulacaoGrau,
            linhaPesquisaDescricao: linhaPesquisaDescricao,
            linhaPesquisaAreaconhecimentoDescricao: linhaPesquisaAreaconhecimentoDescricao
        }).then(response => {
            navigate('/orientadores')
            messages.mensagemSucesso('Orientador atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data.message)
        })
    }

    return(
        <>
        <Navbar />
        <Profile nome={nome} imagem={imagem} titulacao={titulacaoDescricao} grau={titulacaoGrau} label={'nome'}>
            <Label label='Matrícula: '>{email}</Label>
            <Label label='E-mail: '>{email}</Label>
            <Label label='Linha de pesquisa:'>{linhaPesquisaDescricao}</Label>
            <Label label='Área de conhecimento: '>{linhaPesquisaAreaconhecimentoDescricao}</Label>
            <Label label='Instituição de ensino: '>{titulacaoIes}</Label>
            <Link to={'/orientadores'}>
                <button className="btn btn-primary"><i className="pi pi-replay m-2"></i>Voltar</button>
            </Link>
        </Profile>
    
    </>
    )
}

export default DisplayOrientador;