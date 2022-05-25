import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class OrientadorService extends ApiService {

    constructor(){
        super('/orientadores')
    }

    save(orientador){
        return this.post('/', orientador);
    }

    update(orientador){
        return this.put(`/${orientador.id}`, orientador);
    }

    del(id){
        return this.delete(`/${id}`)
    }

    findId(id){
        return this.get(`/${id}`)
    }

    validate(orientador){
        const errors = []

        if(!orientador.nome){
            errors.push('O campo Nome é obrigatório.')
        }

        if(!orientador.email){
            errors.push('O campo Email é obrigatório.')
        }else if( !orientador.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            errors.push('Informe um Email válido.')
        }

        if(!orientador.senha || !orientador.senhaRepetida){
            errors.push('Digite a senha 2x.')
        }else if( orientador.senha !== orientador.senhaRepetida ){
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