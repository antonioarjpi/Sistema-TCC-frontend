import { formatLocalDate } from "../../utils/format"

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.equipes.content?.map( equipes => {           
        return(
            <tr key={equipes.id}>
                <td>{equipes.id}</td>
                <td>{equipes.nome}</td>
                <td>{formatLocalDate(equipes.dataCadastro, "dd/MM/yyyy")}</td>
                <td>{equipes.alunos[0].nome}</td>
                <td>{equipes.tema}</td>
                <td>{equipes.conhecimento}</td>
                <td>
                    <td>
                        <button type="button"  title="Visualização completa"
                                className="btn btn-warning"
                                onClick={e => props.visualizar(equipes.id)}>
                                <i className="pi pi-eye"></i>
                        </button>
                    </td>
                    <td>
                        <button type="button"  title="edit"
                                className="btn btn-primary"
                                onClick={e => props.editar(equipes.id)}>
                                <i className="pi pi-pencil"></i>
                        </button>
                    </td>
                    <td>
                        <button type="button"  title="Excluir"
                                className="btn btn-danger" 
                                onClick={ e => props.deletar(equipes)}>
                                <i className="pi pi-trash"></i>
                        </button>
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
                            <th>COD</th>
                            <th>Nome</th>
                            <th>Data de cadastro</th>
                            <th>Lider da equipe</th>
                            <th>Tema</th>
                            <th>Conhecimento</th>
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
        </>

    )
}