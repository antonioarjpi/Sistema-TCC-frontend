// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.defesa.map( defesa => {
        return(
            <tr key={defesa.id}>
                <td>{defesa.id}</td>
                <td>{defesa.descricao}</td>
                <td>{defesa.dataBanca}</td>
                <td>{defesa.datadefesas}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(defesa.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(defesa)}>
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
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Data Banca</th>
                            <th>Data defesa</th>
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