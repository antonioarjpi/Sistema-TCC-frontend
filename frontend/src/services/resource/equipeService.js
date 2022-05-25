import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class EquipeService extends ApiService {

    constructor(){
        super('/equipes')
    }

    save(equipe){
        return this.post('/', equipe);
    }

    update(equipe){
        return this.put(`/${equipe.id}`, equipe);
    }

    del(id){
        return this.delete(`/${id}`)
    }

    findId(id){
        return this.get(`/${id}`)
    }

    validate(equipe){
        const errors = []

        if(!equipe.nome){
            errors.push('O campo Nome é obrigatório.')
        }

        if(!equipe.matricula){
            errors.push('Nenhuma matrícula foi adicionada.')
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