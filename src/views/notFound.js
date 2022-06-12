import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component{

    render(){
        return(
            <div className="not-found">
                <Link to="/home">
                    <button className="btn btn-primary">Início</button>
                </Link>
            </div>
        )
    }
}

export default NotFound;