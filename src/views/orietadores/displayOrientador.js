import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import OrientadorService from "../../services/resource/orientadorService";
import Profile from "../../components/profile/profile";
import Label from "../../components/label/label";
import { baseURL } from "../../services/api";

function DisplayOrientador(){

    const [orientador, setOrientador] = useState();
    const [nome, setNome] = useState();
    const [matricula, setMatricula] = useState();
    const [email, setEmail] = useState();
    const [titulacaoDescricao, setDescricaoTitulacao] = useState();
    const [titulacaoGrau, setGrau] = useState();
    const [titulacaoIes, setIes] = useState();
    const [linhaPesquisaDescricao, setLinhaPesquisaDescricao] = useState();
    const [linhaPesquisaAreaconhecimentoDescricao, setLinhaPesquisaAreaconhecimentoDescricao] = useState();
    const [imagem, setImagem] = useState();
    const [nullImage] = useState('https://sistema-gerenciamento-tcc.s3.sa-east-1.amazonaws.com/avatar-blank.png');

    const { id } = useParams();
    const service = new OrientadorService();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setOrientador(response.data.id)
            setNome(response.data.nome);
            setEmail(response.data.email); 
            if(response.data.imagem){
                setImagem(response.data.imagem);
            }else{
                setImagem(nullImage)
            }
            setMatricula(response.data.matricula);   
            setDescricaoTitulacao(response.data.titulacao.descricao);
            setIes(response.data.titulacao.ies);
            setGrau(response.data.titulacao.grau);
            setLinhaPesquisaDescricao(response.data.linhaPesquisa.descricao);
            setLinhaPesquisaAreaconhecimentoDescricao(response.data.linhaPesquisa.areaConhecimento.descricao);
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
      }},[]);

  
    const onBasicUploadAuto = () => {
        messages.mensagemSucesso("Foto carregada com sucesso")
        setTimeout(() => {
            window.location.reload(); 
          }, 1000);          
    }


    return(
        <>
        <Navbar />
        <Profile nome={nome} imagem={imagem} titulacao={titulacaoDescricao} grau={titulacaoGrau}
            onUpload={onBasicUploadAuto} preview={imagem === nullImage ? false : true}
            label={'nome'} name='file' url={`${baseURL}/orientadores/imagem/${orientador}`}>

            <Label label='Matrícula: '>{matricula}</Label>
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