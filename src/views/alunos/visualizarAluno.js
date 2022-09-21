import React, { useEffect, useState } from "react";
import * as messages from '../../components/toastr/toastr'
import Profile from "../../components/profile/profile";
import Label from "../../components/label/label";
import { baseURL } from "../../services/api";
import AlunoService from "../../services/resource/alunoService";

const valoresInicial = {
    id: '',
    nome: '',
    email: '',
    matricula: ''
}

function DisplayAluno(props) {

    const [values, setValues] = useState(valoresInicial);
    const [imagem, setImagem] = useState();
    const [nullImage] = useState('https://sistema-gerenciamento-tcc.s3.sa-east-1.amazonaws.com/avatar-blank.png');

    const service = new AlunoService();

    useEffect(() => {
        if (props.id) {
            service.findId(props.id)
                .then(response => {
                    setValues(response.data)
                    if (response.data.imagem) {
                        setImagem(response.data.imagem);
                    } else {
                        setImagem(nullImage)
                    }
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onBasicUploadAuto = () => {
        try {
            messages.mensagemSucesso("Foto carregada com sucesso")
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (e) {
            messages.mensagemErro(e.data.message)
        }
    }

    return (
        <Profile imagem={imagem}
            onUpload={onBasicUploadAuto} preview={imagem === nullImage ? false : true}
            label={'nome'} name='file' url={`${baseURL}/alunos/imagem/${values.id}`}>
            <Label label='Nome: '>{values.nome}</Label>
            <Label label='Matrícula: '>{values.matricula}</Label>
            <Label label='E-mail: '>{values.email}</Label>
        </Profile>
    )
}

export default DisplayAluno;