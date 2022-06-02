import { formatLocalDate } from "../../utils/format"

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.equipes.map( equipes => {           
        return(
            <tr key={equipes.id}>
                <td>{equipes.id}</td>
                <td>{equipes.nome}</td>
                <td>{formatLocalDate(equipes.dataCadastro, "dd/MM/yyyy")}</td>
                <td>{equipes.alunos[0].nome}</td>
                <td>{equipes.tema}</td>
                <td>{equipes.linhaPesquisa}</td>
                <td>{equipes.conhecimento}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-warning"
                            onClick={e => props.visibleAction(equipes)}>
                            <i className="pi pi-eye"></i>
                    </button>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(equipes.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(equipes)}>
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
                            <th>Lider da equipe</th>
                            <th>Tema</th>
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