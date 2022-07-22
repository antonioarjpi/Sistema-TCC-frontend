import React from 'react'

function SelectMenu(props){
    return (
        <select {...props}  >
            {props.children}
        </select>
    )
}

export default SelectMenu;  