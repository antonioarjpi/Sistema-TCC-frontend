import LocalStorageService from './localstorageService'
import decode from 'jwt-decode'
import UserService from './userService';

export const USUARIO_LOGADO = '@TCC-Usuario'
export const TOKEN = '@TCC:Token'

export default class AuthService {

    state = {
        roles: [],
        isAutenticado: false,
        isLoading: true
    }

    static isAutenticado() {
        const token = localStorage.getItem(TOKEN)
        if (token) {
            const tokenDecodificado = decode(token)
            const expiracao = tokenDecodificado.exp
            const isTokenInvalido = Date.now() >= (expiracao * 1000)
            if (!isTokenInvalido === true) {
                return true
            }
        }
        return false;
    }

    static logout() {
        localStorage.removeItem(USUARIO_LOGADO)
        localStorage.removeItem(TOKEN);
    }

    static login(usuario, token) {
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
        LocalStorageService.addItem(TOKEN, token);
    }

    static getUser() {
        const user = localStorage.getItem(TOKEN)
        if (user) {
            const decoded = decode(user);
            return decoded;
        } else {
            return null
        }
    }

    static refreshSession() {
        UserService.refreshToken()
        const usuario = AuthService.getItem()
        return usuario;
    }
}