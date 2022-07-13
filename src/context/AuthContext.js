import LocalStorageService from '../services/resource/localstorageService'
import { createContext, useContext, useEffect, useState } from "react";
import AuthService from '../services/resource/AuthService';

export const USUARIO_LOGADO = '@TCC-Usuario'
export const TOKEN = '@TCC:Token'

const AuthContext = createContext(null)

export const AuthProvider = ( {children} ) => {
    const [autenticado, setAutenticado] = useState(false)
 
    const [usuario, setUsuario] = useState(() => {
        setAutenticado(AuthService.isAutenticado)
        return AuthService.getUser();
    });

    useEffect(() => {
        if (autenticado === false){
            LocalStorageService.removerItem(USUARIO_LOGADO)
            LocalStorageService.removerItem(TOKEN)
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const login = (usuario, token) => {
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
        localStorage.setItem(TOKEN, token)
        setUsuario(AuthService.getUser);
        setAutenticado(true)
    }

    const logout = () => {
        AuthService.logout();
        setUsuario(null);
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