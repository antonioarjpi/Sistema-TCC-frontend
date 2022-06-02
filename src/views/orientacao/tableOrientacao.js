import { formatLocalDate } from "../../utils/format"

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.orientacoes.map( orientacoes => {
        return(
            <tr key={orientacoes.id}>
                <td>{orientacoes.id}</td>
                <td>{formatLocalDate(orientacoes.dataOrientacao, "dd/MM/yyyy")}</td>
                <td>{orientacoes.nomeOrientador}</td>
                <td>{orientacoes.matriculaOrientador}</td>
                <td>{orientacoes.descricaoTCC}</td>
                <td>{orientacoes.tccDescricao}</td>
                <td>{orientacoes.equipe}</td>
                <td>
                    <button type="button"  title="edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(orientacoes.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(orientacoes)}>
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
                            <th>Data de orientacao</th>
                            <th>Orientador</th>
                            <th>Matricula Orientador</th>
                            <th>Descrição de TCC</th>
                            <th>Tipo de TCC</th>
                            <th>Cód Equipe</th>
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