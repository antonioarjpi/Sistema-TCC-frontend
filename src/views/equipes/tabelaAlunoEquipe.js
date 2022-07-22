// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.alunos.map(alunos => {
        return (
            <tr key={alunos.id}>
                <td>{alunos.matricula}</td>
                <td>{alunos.nome}</td>
                <td>{alunos.email}</td>
            </tr>
        )
    })

    return (
        <div className="container mt-3 mb-5">
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}