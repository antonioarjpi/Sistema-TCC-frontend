import React from "react";
import './styles.css'

function Button(props){
    return(
        <button {...props}>
            {props.loading === true ? (
                <i className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
            ) : ( 
                <i className={props.icon}/> 
            )}
            {props.children}          
            </button>
    )
}

export default Button;