import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';

function DropDown(props){

    const [dados, setDados] = useState({});
    //const service = new props.service();

    //Procura no service o metodo findAll, se encontrar coloca todos os objetos dentro de um array
    // useEffect(() => {
    //     service.findAll()
    //     .then(response => {
    //         setDados(response.data) 
    //     })
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    //Itens no options
    const optionItem = (option) => {
        return (
            <div>
                <div>{option[props.label1]} - {option[props.label2]}</div>
            </div>
        );
    }

    return(
        <>
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
            itemTemplate={optionItem}
         />
        </>
    )

}

export default DropDown;