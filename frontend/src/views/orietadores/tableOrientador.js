// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.orientador.map( orientador => {
        return(
            <tr key={orientador.id}>
                <td>{orientador.matricula}</td>
                <td>{orientador.nome}</td>
                <td>{orientador.email}</td>
                <td>{orientador.grau}</td>
                <td>{orientador.ies}</td>
                <td>{orientador.descricaoTitulacao}</td>
                <td>
                <button className="btn btn-success" title="Efetivar"             
                            type="button" disabled>
                            <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning"  title="Cancelar"             
                            type="button" disabled>
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(orientador.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(orientador)}>
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
                            <th>Matriula</th>
                            <th>Nome</th>
                            <th>E-mail</th>      
                            <th>Grau</th>
                            <th>IES</th>
                            <th>Titulação</th>
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