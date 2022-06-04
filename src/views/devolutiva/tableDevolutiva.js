import { formatLocalDate } from "../../utils/format"

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.devolutivas.map( devolutivas => {
        return(
            <tr key={devolutivas.id}>
                <td>{devolutivas.statusOrientacao}</td>
                <td>{devolutivas.devolutivaDescricao}</td>
                <td>{devolutivas.devolutivaVersaoDoc}</td>
                <td>{devolutivas.devolutivaLocalCorrecaoLocal}</td>
                <td>{devolutivas.devolutivaLocalCorrecaoCorrecaoSugerida}</td>
                <td>{formatLocalDate(devolutivas.dataMudanca, "dd/MM/yyyy")}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(devolutivas.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(devolutivas)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })


    return (
        <>
        <div className="container mt-3 mb-5">   
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Devolutiva</th>
                            <th>Versão doc</th>
                            <th>Local de correção</th>
                            <th>Correção sugerida</th>
                            <th>Data mudança</th>
                            <th className="td-table" scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>     
        </>

    )
}