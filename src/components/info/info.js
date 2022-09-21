import React from "react";
import './styles.css'

function Info(props){

    return(
        <div className="info">
            <div className="info-label">{props.info}</div>
            <div className="info-content">{props.content}</div>
        </div>
   
    )
}

export default Info;