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

    findAll(){
        return this.get(``)
    }

    findId(id){
        return this.get(`/${id}`)
    }

    findDevolutivas(id){
        return this.get(`/devolutivas/${id}`)
    }

    validate(equipe){
        const errors = []

        if(!equipe.nome){
            errors.push('O campo Nome é obrigatório.')
        }

        if(!equipe.alunos){
            errors.push('Nenhum aluno foi adicionada.')
        }

        if(!equipe.delimitacao){
            errors.push('O campo tema é obrigatório.')
        }

        if(!equipe.descricaoConhecimento){
            errors.push('Nenhuma conhecimento foi adicionada.')
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

    consult(filter){
        let params = `?size=10&page=${filter.pageNumber}&sort=id,asc&nome=${filter.nome}`

        if(filter.tema){
            params = `${params}&tema=${filter.tema}`
        }

        if(filter.dataCadastro){
            params = `${params}&dataCadastro=${filter.dataCadastro}`
        }

        if(filter.delimitacao){
            params = `${params}&delimitacao=${filter.delimitacao}`
        }

        if(filter.descricaoLinha){
            params = `${params}&descricaoLinha=${filter.descricaoLinha}`
        }

        if(filter.descricaoConhecimento){
            params = `${params}&descricaoConhecimento=${filter.descricaoConhecimento}`
        }
 
        return this.get(params);
    }

    

}