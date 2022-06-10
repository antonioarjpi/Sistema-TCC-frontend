import LocalStorageService from '../services/resource/localstorageService'
import { createContext, useContext, useState } from "react";

export const USUARIO_LOGADO = '@TCC-Usuario'
export const TOKEN = '@TCC:Token'

const AuthContext = createContext(null)

export const AuthProvider = ( {children} ) => {
 
    const [usuario, setUsuario] = useState(() => {
        const usuario = localStorage.getItem(USUARIO_LOGADO);
        if(usuario){
            return JSON.parse(usuario)
        }
        return {}
    });

    const login = (usuario, token) => {
        setUsuario(usuario);
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
        localStorage.setItem(TOKEN, token)
  
    }

    const logout = () => {
        setUsuario(null);
        LocalStorageService.removerItem(USUARIO_LOGADO)
        LocalStorageService.removerItem(TOKEN)
    }

    return(
        <AuthContext.Provider value={{usuario, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('Contexto não encontrado')
    }

    return context;    
}