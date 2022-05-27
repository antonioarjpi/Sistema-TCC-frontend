import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class AlunoService extends ApiService {

    constructor(){
        super('/alunos')
    }

    save(alunos){
        return this.post('/', alunos);
    }

    update(alunos){
        return this.put(`/${alunos.id}`, alunos);
    }

    del(id){
        return this.delete(`/${id}`)
    }

    findId(id){
        return this.get(`/${id}`)
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


    consult(filter){
        let params = `?name=${filter.name}`

        if(filter.type){
            params = `${params}&type=${filter.type}`
        }

        return this.get(params);
    }

}