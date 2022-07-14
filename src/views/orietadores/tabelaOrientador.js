import Button from "../../components/button/button"

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.orientadores.content?.map( orientadores => {
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
                    <td>
                        <Button type="button"  title="Visualização completa"
                                className="btn btn-warning" icon="pi pi-eye"
                                onClick={e => props.visibleAction(orientadores.id)}>
                        </Button>
                    </td>
                    <td>
                        <Button type="button"  title="edit"
                                className="btn btn-primary" icon="pi pi-pencil"
                                onClick={e => props.editAction(orientadores.id)}>
                        </Button>
                    </td>
                    <td>
                    <Button type="button"  title="Excluir"
                            className="btn btn-danger" icon="pi pi-trash"
                            onClick={ e => props.deleteAction(orientadores)}>
                    </Button>
                    </td>
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
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
            {props.children}
        </div>     
        </>

    )
}