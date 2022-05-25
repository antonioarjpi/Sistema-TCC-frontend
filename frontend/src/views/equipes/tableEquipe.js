// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.equipe.map( equipe => {
        return(
            <tr key={equipe.id}>
                <td>{equipe.id}</td>
                <td>{equipe.nome}</td>
                <td>{equipe.dataCadastro}</td>
                <td>{equipe.delimitacao}</td>
                <td>{equipe.alunos}</td>
                <td>{equipe.descricaoLinha}</td>
                <td>{equipe.descricaoConhecimento}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(equipe.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(equipe)}>
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
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de cadastro</th>
                            <th>Delimitacao</th>
                            <th>Alunos</th>
                            <th>Linha</th>
                            <th>Conhecimento</th>
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