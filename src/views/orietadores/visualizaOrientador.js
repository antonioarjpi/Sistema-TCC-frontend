import React, { useEffect, useState } from "react";
import * as messages from '../../components/toastr/toastr'
import OrientadorService from "../../services/resource/orientadorService";
import Profile from "../../components/profile/profile";
import Label from "../../components/label/label";
import { baseURL } from "../../services/api";

const valoresInicial = {
    nome: '',
    matricula: '',
    email: '',
    titulacaoDescricao: '',
    titulacaoGrau: '',
    titulacaoIes: '',
    linhaPesquisaDescricao: '',
    linhaPesquisaAreaconhecimentoDescricao: ''
}

function VisualizaOrientador(props) {

    const [orientador, setOrientador] = useState();
    const [values, setValues] = useState(valoresInicial)
    const [imagem, setImagem] = useState();
    const [nullImage] = useState('https://sistema-gerenciamento-tcc.s3.sa-east-1.amazonaws.com/avatar-blank.png');

    const service = new OrientadorService();

    useEffect(() => {
        if (props.id) {
            service.findId(props.id)
                .then(response => {
                    setOrientador(response.data.id)
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
        messages.mensagemSucesso("Foto carregada com sucesso")
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (
        <Profile nome={values.nome} imagem={imagem} titulacao={values.titulacaoDescricao} grau={values.titulacaoGrau}
            onUpload={onBasicUploadAuto} preview={imagem === nullImage ? false : true}
            label={'nome'} name='file' url={`${baseURL}/orientadores/imagem/${orientador}`}>
            <Label label='Matrícula: '>{values.matricula}</Label>
            <Label label='E-mail: '>{values.email}</Label>
            <Label label='Linha de pesquisa:'>{values.linhaPesquisaDescricao}</Label>
            <Label label='Área de conhecimento: '>{values.areaConhecimento}</Label>
            <Label label='Instituição de ensino: '>{values.titulacaoIes}</Label>
        </Profile>
    )
}

export default VisualizaOrientador;