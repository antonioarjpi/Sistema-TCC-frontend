import { MultiSelect } from "primereact/multiselect";
import React, { useEffect, useState } from "react";
import './styles.css'

function MultiSelectContainer(props){
    const select = props.value;
    const [dados, setDados] = useState({});
    const [remove, setRemove] = useState({});

    const service = new props.service();

    //Procura no service o metodo findAll, se encontrar coloca todos os objetos dentro de um array
    useEffect(() => {
        service.findAll()
        .then(response => {
            setDados(response.data.content) 
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Função que obtém a opção e retorna o conteúdo para ela.
    const optionsItems = (option) => {
        return (
            <div>
                <div>{option.matricula} - {option.nome}</div>  
            </div>
        );
    }

    //Modelo de um item do grupo de opções.
    const selectedItems = (option) => {
        const remove = () =>{
            setRemove(option)
            const index = props.value.map(function(e) {return e.id} ).indexOf(option.id)
            select.splice(index, 1);           
        }
        
        if (option) {
            return (
                <div className="p-multiselect-token">
                    <span className="p-multiselect-token-label">{option.matricula} - {option.nome}</span>
                    <span className="p-multiselect-token-icon pi pi-times-circle" onClick={remove}></span>
                </div>
            );
        }
        return props.placeholder;
    }

    //Modelo do rodapé do painel.    
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
            className="multi-select"
            onChange={props.onChange}
            filter 
            filterBy={props.filterBy}
            filterPlaceholder={props.filterPlaceholder}
            itemTemplate={optionsItems} 
            selectedItemTemplate={selectedItems}
            display='chip' 
            panelFooterTemplate={panelFooter} 
        />
    )
}

export default MultiSelectContainer;