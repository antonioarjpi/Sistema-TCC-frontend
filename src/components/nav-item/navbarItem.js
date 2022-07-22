import React from "react";

function NavItem(props) {
    return (
        <li className="nav-item">
            <a href={props.href} className="nav-link" type="button" onClick={props.onClick}>{props.label} </a>
        </li>
    )
}

export default NavItem;