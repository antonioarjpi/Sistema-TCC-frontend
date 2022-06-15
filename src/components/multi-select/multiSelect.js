import { MultiSelect } from "primereact/multiselect";
import React, { useEffect, useState } from "react";

function MultiSelectContainer(props){
    const select = props.value;
    const [dados, setDados] = useState({});
    const [remove, setRemove] = useState({});

    const service = new props.service();

    //Procura no service o metodo findAll, se encontrar coloca todos os objetos dentro de um array
    useEffect(() => {
        service.findAll()
        .then(response => {
            setDados(response.data) 
        })
    }, [])

    //Options
    const optionsItems = (option) => {
        return (
            <div>
                <div>{option.matricula} - {option.nome}</div>  
            </div>
        );
    }

    //Itens Selecionados
    const selectedItems = (option) => {
        const remove = () =>{
            setRemove(option)
            const index = props.value.map(function(e) {return e.id} ).indexOf(option.id)
            select.splice(index, 1);           
        }
        
        if (option) {
            return (
                <div class="p-multiselect-token">
                    <span class="p-multiselect-token-label">{option.matricula} - {option.nome}</span>
                    <span class="p-multiselect-token-icon pi pi-times-circle" onClick={remove}></span>
                </div>
            );
        }
        return props.placeholder;
    }

    //Footer do select
    const panelFooter = () => {
        const selectedItems = select;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> Aluno{length > 1 ? 's' : ''} selecionado{length > 1 ? 's' : ''}.
            </div>
        );
    }

    return(
        <MultiSelect 
            value={props.value} options={dados}
            className={props.className} 
            onChange={props.onChange}
            optionLabel={props.optionLabel}
            filter 
            filterPlaceholder={props.filterPlaceholder}
            itemTemplate={optionsItems} 
            selectedItemTemplate={selectedItems}
            display='chip' 
            panelFooterTemplate={panelFooter} 
        />
    )
}

export default MultiSelectContainer;