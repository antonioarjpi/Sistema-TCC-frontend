import './styles.css'

function Pagination(props){
    return (      
        <div className="pagination">
                <div className='col-md-6'>
                    <span className="info-size">Tamanho da página: {props.numberOfElements}</span>
                    <span style={{marginLeft:'10px'}} className='info-size'> Total de registro encontrado: {props.size}</span>
                </div>
                <button className="btn btn-outline button-pagination" onClick={props.pageBack} disabled={props.first} >              
                    {props.left === true ? (
                        <i className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                    ) : ( 
                        <i className="pi pi-arrow-left"></i>
                    )}
                </button>
                <p className='page-info' >{`pág ${props.number + 1} de ${props.totalPages}`}</p>
                <button className="btn btn-outline button-pagination" onClick={props.pageNext} disabled={props.last} >
                    {props.right === true ? (
                        <i className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                    ) : ( 
                        <i className="pi pi-arrow-right"></i>
                    )}
                </button>
            </div>
    )
}

export default Pagination;