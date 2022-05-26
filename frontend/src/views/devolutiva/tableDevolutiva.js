// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.devolutiva.map( devolutiva => {
        return(
            <tr key={devolutiva.id}>
                <td>{devolutiva.statusOrientacao}</td>
                <td>{devolutiva.descricaoDaDevolutiva}</td>
                <td>{devolutiva.versaoDoc}</td>
                <td>{devolutiva.localDeCorrecao}</td>
                <td>{devolutiva.correcaoSugerida}</td>
                <td>{devolutiva.dataMudancao}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(devolutiva.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(devolutiva)}>
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
                            <th scope="col">Ações</th>
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