import React from "react";

function NavItem(props){
    return(
        <li className="nav-item">
            <a className="nav-link" href={props.href}> {props.label} </a>
        </li>
    )
}

export default NavItem;