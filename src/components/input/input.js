import { InputText } from "primereact/inputtext";
import React from "react";

function InputForm(props){
    return(
        <span className="p-float-label">
            <InputText 
                type={props.type} 
                className={props.className} 
                id={props.id} 
                disabled={props.disabled} 
                value={props.value} 
                onChange={props.onChange} />

            <label htmlFor={props.htmlFor}>
                {props.label}
            </label>
            
        </span>
    )
}

export default InputForm;