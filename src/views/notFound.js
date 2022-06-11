import { Link } from "react-router-dom";

function NotFound(){
    return(
        <div className="not-found">
            <Link to="/home">
                <button className="btn btn-primary">Início</button>
            </Link>
        </div>
    )
}

export default NotFound;