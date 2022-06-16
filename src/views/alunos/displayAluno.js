import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as messages from '../../components/toastr/toastr'
import Navbar from "../../components/navbar/navbar";
import Profile from "../../components/profile/profile";
import Label from "../../components/label/label";
import { baseURL } from "../../services/api";
import AlunoService from "../../services/resource/alunoService";

function DisplayAluno(){

    const [aluno, setAluno] = useState();
    const [nome, setNome] = useState();
    const [matricula, setMatricula] = useState();
    const [email, setEmail] = useState();
    const [imagem, setImagem] = useState();
    const [nullImage] = useState('https://sistema-gerenciamento-tcc.s3.sa-east-1.amazonaws.com/avatar-blank.png');

    const { id } = useParams();
    const service = new AlunoService();

    useEffect(() => {
        if(id){
        service.findId(id)
        .then(response =>{
            setAluno(response.data.id)
            setNome(response.data.nome);
            setEmail(response.data.email); 
            setMatricula(response.data.matricula); 
            if(response.data.imagem){
                setImagem(response.data.imagem);
            }else{
                setImagem(nullImage)
            }      
        })  
        .catch(erros => {
            messages.mensagemErro(erros.response.data)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }},[]);

  
    const onBasicUploadAuto = () => {
        messages.mensagemSucesso("Foto carregada com sucesso")
        setTimeout(() => {
            window.location.reload(); 
          }, 1500);          
    }


    return(
        <>
        <Navbar />
        <Profile imagem={imagem}
            onUpload={onBasicUploadAuto} preview={imagem === nullImage ? false : true}
            label={'nome'} name='file' url={`${baseURL}/alunos/imagem/${aluno}`}>

            <Label label='Nome: '>{nome}</Label>
            <Label label='Matrícula: '>{matricula}</Label>
            <Label label='E-mail: '>{email}</Label>
            
            <Link to={'/alunos'}>
                <button className="btn btn-primary"><i className="pi pi-replay m-2"></i>Voltar</button>
            </Link>

        </Profile>
    
    </>
    )
}

export default DisplayAluno;