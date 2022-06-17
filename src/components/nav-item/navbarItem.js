import React from "react";

function NavItem(props){
    return(
        <li className="nav-item">
            <span className="nav-link" type="button" onClick={props.onClick}>{props.label} </span>
        </li>
    )
}

export default NavItem;