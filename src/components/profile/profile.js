import './styles.css'
import React from "react";

function Profile(props){

  return(
      <>
        <div className="container">
          <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={props.imagem} alt="Admin" className="rounded" width="170" />
                    <div className="mt-3">
                      <h4>{props.nome}</h4>
                      <p className="text-secondary mb-1">{props.grau}</p>
                      <p className="text-dark font-size-sm">{props.titulacao}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  {props.children}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </>
    )
}

export default Profile;