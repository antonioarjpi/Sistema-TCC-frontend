import './styles.css'

function Pagination(props) {
    return (
        <div className="pagination">
            <div style={{textAlign: 'left', display:'flex'}}>
                <span className="info-size">Exibindo {props.numberOfElements} de {props.size} {props.numberOfElements < 2 ? 'encontrado' : 'encontrados'}</span>
            </div>
            <button className="btn btn-outline button-pagination" onClick={props.pageBack} disabled={props.first} >
                {props.left === true ? (
                    <i className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                ) : (
                    <i className="pi pi-arrow-left"></i>
                )}
            </button>
            <p className='page-info' >{`pág ${props.number + 1} de ${props.totalPages}`}</p>
            <button className="btn btn-outline button-pagination" onClick={props.pageNext} disabled={props.last} >
                {props.right === true ? (
                    <i className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                ) : (
                    <i className="pi pi-arrow-right"></i>
                )}
            </button>
        </div>
    )
}

export default Pagination;