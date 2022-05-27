import ApiService from '../api'
import ValidationError from '../exception/ValidationError';

class UserService extends ApiService {

    constructor(){
        super('/usuarios')
    }

    authenticate(credenciais){
        return this.post('/auth', credenciais)
    }

    save(usuario){
        return this.post('/', usuario);
    }

    validate(usuario){
        const errors = []

        if(!usuario.nome){
            errors.push('O campo Nome é obrigatório.')
        }

        if(!usuario.email){
            errors.push('O campo Email é obrigatório.')
        }else if( !usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            errors.push('Informe um Email válido.')
        }

        if(!usuario.senha || !usuario.senhaRepetida){
            errors.push('Digite a senha 2x.')
        }else if( usuario.senha !== usuario.senhaRepetida ){
            errors.push('As senhas não batem.')
        }        

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

}

export default UserService;