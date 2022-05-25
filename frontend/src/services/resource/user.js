import ApiService from '../api'
import ValidationError from '../exception/ValidationError';

class UserService extends ApiService {

    constructor(){
        super('/alunos')
    }

    authenticate(credenciais){
        return this.post('/auth', credenciais)
    }

    save(alunos){
        return this.post('/', alunos);
    }

    validate(alunos){
        const errors = []

        if(!alunos.nome){
            errors.push('O campo Nome é obrigatório.')
        }

        if(!alunos.email){
            errors.push('O campo Email é obrigatório.')
        }else if( !alunos.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            errors.push('Informe um Email válido.')
        }

        if(!alunos.senha || !alunos.senhaRepetida){
            errors.push('Digite a senha 2x.')
        }else if( alunos.senha !== alunos.senhaRepetida ){
            errors.push('As senhas não batem.')
        }        

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

}

export default UserService;