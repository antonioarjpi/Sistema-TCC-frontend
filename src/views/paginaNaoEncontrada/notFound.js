import React from "react";
import './styles.css'
import { useNavigate } from 'react-router-dom';

function NotFound() {

    const navigate = useNavigate();

    return (
        <div class="mainbox">
            <div class="err">4</div>
            <i class="pi pi-question-circle"></i>
            <div class="err2">4</div>
            <div class="msg">Talvez esta página mudou? Foi deletado? Se escondeu na quarentena?
                Nunca existiu em primeiro lugar? <span className="span-pointer" onClick={e => navigate(-1)}>Vamos voltar!</span>
            </div>
        </div>
    )
}

export default NotFound;