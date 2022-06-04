// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.orientadores.map( orientadores => {
        return(
            <tr key={orientadores.id}>
                <td>{orientadores.matricula}</td>
                <td>{orientadores.nome}</td>
                <td>{orientadores.email}</td>
                <td>{orientadores.titulacaoGrau}</td>
                <td>{orientadores.titulacaoDescricao}</td>
                <td>{orientadores.linhaPesquisaDescricao}</td>
                <td>{orientadores.areaConhecimento}</td>
                <td>{orientadores.titulacaoIes}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(orientadores.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                </td>
                <td>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(orientadores)}>
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
                            <th>Matricula</th>
                            <th>Nome</th>
                            <th>E-mail</th>      
                            <th>Grau</th>        
                            <th>Titulação</th>
                            <th>Linha</th>
                            <th>Conhecimento</th>
                            <th>IES</th>
                            <th className="td-table" scope="col">Editar</th>
                            <th className="td-table" scope="col">Excluir</th>
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