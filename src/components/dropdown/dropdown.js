import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';

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
        <span className="p-float-label">
            <Dropdown style={{width: '100%'}}
                id={props.id}
                name={props.name}
                value={props.value}
                options={props.options} 
                className={props.className}   
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
            <label>
                {props.span}
            </label>
         </span>
        </>
    )

}

export default DropDown;