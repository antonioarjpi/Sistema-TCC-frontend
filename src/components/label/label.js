import React from "react";
import './styles.css'

function Label(props){
    return(
        <>
        <div className="row">
            <div className="col-sm-3">
                <h6 className="mb-0">{props.label}</h6>
            </div>
            <div className="col-sm-9 text-dark">
                {props.children}
            </div>
        </div>  
            <hr />
        </>

    )
}

export default Label;