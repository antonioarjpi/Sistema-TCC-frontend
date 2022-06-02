import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class OrientacaoService extends ApiService {

    constructor(){
        super('/orientacao')
    }

    save(orientacao){
        return this.post('/', orientacao);
    }

    update(orientacao){
        return this.put(`/${orientacao.id}`, orientacao);
    }

    del(id){
        return this.delete(`/${id}`)
    }

    findId(id){
        return this.get(`/${id}`)
    }

    validate(orientacao){
        const errors = []

        if(!orientacao.dataOrientacao){
            errors.push('O campo data é obrigatório.')
        }

        if(!orientacao.matriculaOrientador){
            errors.push('Campo matricula é obrigatório.')
        }

        if(!orientacao.tipoTCC){
            errors.push('Campo tipo do tcc é obrigatório.')
        }

        if(!orientacao.descricaoTCC){
            errors.push('Campo descrição do TCC é obrigatório.')
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }


    consult(filter){
        let params = `?descricaoTCC=${filter.descricaoTCC}`

        if(filter.dataOrientacao){
            params = `${params}&dataOrientacao=${filter.dataOrientacao}`
        }

        if(filter.nomeOrientador){
            params = `${params}&nomeOrientador=${filter.nomeOrientador}`
        }

        if(filter.matriculaOrientador){
            params = `${params}&matriculaOrientador=${filter.matriculaOrientador}`
        }

        if(filter.tccDescricao){
            params = `${params}&tccDescricao=${filter.tccDescricao}`
        }

        return this.get(params);
    }

}