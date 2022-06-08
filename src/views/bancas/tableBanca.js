
import { Button } from "primereact/button"
import { formatLocalDate } from "../../utils/format"
// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.bancas.map( bancas => {
        return(
            <tr key={bancas.id}>
                <td>{bancas.id}</td>
                <td>{bancas.descricao}</td>
                
                <td>{bancas.ordemApresentacao}</td>
                <td>{bancas.orientadorNome}</td>
                <td>{bancas.equipeAlunos[0].nome}</td>
                <td>{bancas.equipeId}</td>
                
                <td>{bancas.membroMatricula}</td>
                {bancas.defesaDataDefesa !== null && (
                    <td>{formatLocalDate(bancas.defesaDataDefesa, "dd/MM/yyyy")}</td>
                )} 
                 {bancas.defesaDataDefesa === null && (
                    <td><Button label="Agendar Defesa" className="p-button-outlined p-button-sm"  onClick={e => props.schedule(bancas.id)} /></td>
                )} 
                
                <td>
                    <button type="button"  title="Agendamento de defesa"
                            className="btn btn-secondary"
                            onClick={e => props.schedule(bancas.id)}>
                            <i className="pi pi-calendar-plus"></i>
                    </button>
                </td> 
                <td>   
                    <button type="button"  title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(bancas.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                </td>
                <td>    
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(bancas)}>
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
                            <th>Descrição banca</th>
                            
                            <th>Ordem</th>
                            <th>Orientador</th>
                            <th>Lider de equipe</th>
                            <th>Cod Equipe</th>
                            
                            <th>Membro Banca</th>
                            <th>Data Defesa</th>
                            <th className="td-table" scope="col">Defesa</th>
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