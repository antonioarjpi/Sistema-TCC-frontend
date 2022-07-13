// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.alunos.content?.map( alunos => {
        return(
            <tr key={alunos.id}>
                <td>{alunos.matricula}</td>
                <td>{alunos.nome}</td>
                <td>{alunos.email}</td>
                <td>
                    <button type="button"  title="Visualização completa"
                            className="btn btn-warning"
                            onClick={e => props.visibleAction(alunos.id)}>
                            <i className="pi pi-eye"></i>
                    </button>
                </td>
                <td >
                    <button type="button"  title="edit"
                        className="btn btn-primary" onClick={e => props.editAction(alunos.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                </td >
                <td >
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
        <div className=" mt-3 mb-5">   
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th className="td-table" scope="col">Exibir</th>
                            <th className="td-table" >Editar</th>
                            <th className="td-table" >Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                {props.children}
            </div>
        </div>     
        </>

    )
}