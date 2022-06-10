import React from "react";

function NavItem(props){
    return(
        <li className="nav-item">
            <a className="nav-link" href={props.href} onClick={props.onClick}>{props.label} </a>
        </li>
    )
}

export default NavItem;