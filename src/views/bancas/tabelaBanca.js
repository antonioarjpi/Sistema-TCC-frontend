

import { Button } from "primereact/button"
import { formatLocalDate } from "../../utils/format"

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.bancas.content?.map(bancas => {
        return (
            <tr key={bancas.id}>
                <td>{bancas.id}</td>
                <td>{bancas.descricao}</td>
                <td>{formatLocalDate(bancas.dataBanca, "dd/MM/yyyy")}</td>
                <td>{bancas.ordemApresentacao}</td>
                <td>{bancas.orientadorNome}</td>
                <td>{bancas.equipeId}</td>
                <td>{formatLocalDate(bancas.equipeDataCadastro, "dd/MM/yyyy")}</td>
                <td>{bancas.membroMatricula}</td>
                {bancas.defesaDataDefesa !== null && (
                    <td align="center"><Button label={formatLocalDate(bancas.defesaDataDefesa, "dd/MM/yyyy")} className="btn btn-defesa" onClick={e => props.schedule(bancas.id)} /></td>
                )}
                {bancas.defesaDataDefesa === null && (
                    <td align="center"><Button label="Não Agendado" className="btn btn-defesa" onClick={e => props.schedule(bancas.id)} /></td>
                )}
                <td>
                    <td>
                        <button type="button" title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(bancas.id)}>
                            <i className="pi pi-pencil"></i>
                        </button>
                    </td>
                    <td>
                        <button type="button" title="Excluir"
                            className="btn btn-danger"
                            onClick={e => props.deleteAction(bancas)}>
                            <i className="pi pi-trash"></i>
                        </button>
                    </td>
                </td>
            </tr>
        )
    })


    return (
        <div className="container mt-3 mb-5">
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Desc banca</th>
                            <th>DT Banca</th>
                            <th>Ordem</th>
                            <th>Orientador</th>
                            <th>Cod Equipe</th>
                            <th>DT Equipe</th>
                            <th>Membro</th>
                            <th style={{ justifyContent: 'center', display: 'flex' }} align="center">Data Defesa</th>
                            <th className="td-table" scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
            {props.children}
        </div>
    )
}