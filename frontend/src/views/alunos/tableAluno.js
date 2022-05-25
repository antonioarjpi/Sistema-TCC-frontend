// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.aluno.map( aluno => {
        return(
            <tr key={aluno.id}>
                <td>{aluno.matricula}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
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
                            onClick={e => props.editAction(aluno.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(aluno)}>
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
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>E-mail</th>
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