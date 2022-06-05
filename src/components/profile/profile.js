import './styles.css'
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
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
                    <Image p-image-toolbar preview={props.preview}  src={props.imagem} alt="Profile" className="img" width="170" height='180' />
                    <FileUpload mode="basic" name={props.name} url={props.url} accept="image/*" maxFileSize={1000000} onBeforeDrop
                     onUpload={props.onUpload} auto chooseLabel="Alterar foto de perfil"/>
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