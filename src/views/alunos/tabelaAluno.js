import Button from "../../components/button/button"

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.alunos.content?.map(alunos => {
        return (
            <tr key={alunos.id}>
                <td>{alunos.matricula}</td>
                <td>{alunos.nome}</td>
                <td>{alunos.email}</td>
                <td className="acao-tabela">
                    <td>
                        <Button type="button" title="Visualização completa"
                            className="btn btn-warning" icon="pi pi-eye"
                            onClick={e => props.visibleAction(alunos.id)}>
                        </Button>
                    </td>
                    <td>
                        <Button type="button" title="edit" icon="pi pi-pencil"
                            className="btn btn-primary" onClick={e => props.editAction(alunos.id)}>
                        </Button>
                    </td>
                    <td>
                        <Button type="button" title="Excluir"
                            className="btn btn-danger" icon="pi pi-trash"
                            onClick={e => props.deleteAction(alunos)}>
                        </Button>
                    </td>
                </td>
            </tr>
        )
    })


    return (
        <div className=" mt-3 mb-5">
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>E-mail</th>
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