// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.alunos.map( alunos => {
        return(
            <tr key={alunos.id}>
                <td>{alunos.matricula}</td>
                <td>{alunos.nome}</td>
                <td>{alunos.email}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(alunos.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(alunos)}>
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