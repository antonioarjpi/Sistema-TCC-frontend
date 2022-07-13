import LocalStorageService from './localstorageService'
import decode from 'jwt-decode'

export const USUARIO_LOGADO = '@TCC-Usuario'
export const TOKEN = '@TCC:Token'

export default class AuthService {

    state = {
        roles: [],
        isAutenticado: false,
        isLoading: true
    }

    static isAutenticado(){
        const token = localStorage.getItem(TOKEN)
        if(token){
            const tokenDecodificado = decode(token)
            const expiracao = tokenDecodificado.exp
            const isTokenInvalido = Date.now() >= (expiracao * 1000)
            if(!isTokenInvalido === true){
                return true
            }
        }
        return false;
    }

    static logout(){
        localStorage.removeItem(USUARIO_LOGADO)
        localStorage.removeItem(TOKEN);
    }

    static login(usuario, token){
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
        LocalStorageService.addItem(TOKEN, token);
    }

    static getUser(){
        const user = localStorage.getItem(TOKEN)
        if(user){
            const decoded = decode(user);
            return decoded ;
        }else{
            return null
        } 
    }

    static refreshSession(){
        const token  = LocalStorageService.getItem(TOKEN)
        const usuario = AuthService.getItem()
        AuthService.logar(usuario, token)
        return usuario;
    }
}