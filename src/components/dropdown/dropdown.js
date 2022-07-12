import React from "react";
import { Dropdown } from 'primereact/dropdown';
import './styles.css'

function DropDown(props){

    const optionItem = (option) => {
        return (
            <div>
                <div>{option[props.label1]} - {option[props.label2]}</div>
            </div>
        );
    }

    return(
        <>
        <label className="input-label" htmlFor={props.htmlFor}>{props.span}</label>
        <span className="p-float-label">
            <Dropdown style={{width: '100%'}}
                id={props.id}
                name={props.name}
                value={props.value}
                options={props.options} 
                className="dropdown-custom"  
                onChange={props.onChange} 
                optionLabel={props.findBy}
                optionValue={props.optionValue}  
                filter showClear 
                filterBy={props.filterBy}
                filterMatchMode={props.filterMatchMode}
                placeholder={props.placeholder}  
                filterPlaceholder={props.placeholderFilter}          
                itemTemplate={optionItem}
            />
         </span>
        </>
    )

}

export default DropDown;