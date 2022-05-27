// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.orientacao.map( orientacao => {
        return(
            <tr key={orientacao.id}>
                <td>{orientacao.id}</td>
                <td>{orientacao.nome}</td>
                <td>{orientacao.matriculaOrientador}</td>
                <td>{orientacao.descricaoTCC}</td>
                <td>{orientacao.tipoTCC}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(orientacao.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(orientacao)}>
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
                            <th>Orientador</th>
                            <th>Matricula Orientador</th>
                            <th>Descrição de TCC</th>
                            <th>Tipo de TCC</th>
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