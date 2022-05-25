// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.banca.map( banca => {
        return(
            <tr key={banca.id}>
                <td>{banca.id}</td>
                <td>{banca.descricao}</td>
                <td>{banca.dataBanca}</td>
                <td>{banca.ordemDeApresentacao}</td>
                <td>{banca.nomeOrientador}</td>
                <td>{banca.integrantes}</td>
                <td>{banca.nomeEquipe}</td>
                <td>{banca.membroMatricula}</td>
                <td>{banca.dataEquipe}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(banca.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(banca)}>
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
                            <th>Data da Banca</th>
                            <th>Ordem</th>
                            <th>Orientador</th>
                            <th>integrantes da equipe</th>
                            <th>Nome da equipe</th>
                            <th>Membro Banca</th>
                            <th>Data Equipe</th>
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