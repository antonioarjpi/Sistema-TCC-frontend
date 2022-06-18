import React from 'react'
import './styles.css'

function Form(props){
    return(
        
            <div className='form-group'>
                <label htmlFor={props.htmlFor} className={props.className}>
                    {props.label}
                </label>
                <br/>
                    {props.children}
            </div>
       
    )
}

export default Form;