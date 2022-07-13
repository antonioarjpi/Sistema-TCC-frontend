import { InputText } from "primereact/inputtext";
import './styles.css'
import React from "react";

function InputForm(props){
    return(
        <>
        <label className="input-label" htmlFor={props.htmlFor}>{props.label}</label>
            <InputText 
                type={props.type} 
                className="input-text-sm"
                id={props.id} 
                name={props.name}
                disabled={props.disabled} 
                value={props.value} 
                onChange={props.onChange} />
            </>    
    
    )
}

export default InputForm;