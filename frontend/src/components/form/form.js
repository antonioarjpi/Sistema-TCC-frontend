import React from 'react'

function Form(props){
    return(
        
            <div className='form-group'>
                <label htmlFor={props.htmlFor}>
                    {props.label}
                </label>
                <br/>
                    {props.children}
            </div>
       
    )
}

export default Form;