import LocalStorageService from '../services/resource/localstorageService'
import { createContext, useContext, useEffect, useState } from "react";
import AuthService from '../services/resource/AuthService';
import UserService from '../services/resource/userService';
import * as messages from '../components/toastr/toastr';

export const USUARIO_LOGADO = '@TCC-Usuario'
export const TOKEN = '@TCC:Token'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(false)

    const [usuario, setUsuario] = useState(() => {
        setAutenticado(AuthService.isAutenticado)

        return AuthService.obterUsuario();
    });

    useEffect(() => {
        if (autenticado === false) {
            if (localStorage.getItem(USUARIO_LOGADO)) {
                messages.mensagemErro("Sessão expirada!")
            }
            LocalStorageService.removerItem(USUARIO_LOGADO)
            LocalStorageService.removerItem(TOKEN)
        } else {
            const service = new UserService();
            service.refreshToken()
                .then(response => {
                    localStorage.setItem(TOKEN, response.data.token)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    setInterval(() => {
        const service = new UserService();
        service.refreshToken()
        .then(response => {
            localStorage.setItem(TOKEN, response.data.token)
        })
        
    }, 3540000)

    const login = (usuario, token) => {
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
        localStorage.setItem(TOKEN, token)
        setUsuario(AuthService.obterUsuario);
        setAutenticado(true)
    }

    const logout = () => {
        AuthService.logout();
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout, autenticado }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('Contexto não encontrado')
    }

    return context;
}