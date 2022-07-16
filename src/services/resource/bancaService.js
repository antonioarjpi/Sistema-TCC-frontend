import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class BancaService extends ApiService {

    constructor(){
        super('/bancas')
    }

    save(banca){
        return this.post('/', banca);
    }

    update(banca){
        return this.put(`/${banca.id}`, banca);
    }

    del(id){
        return this.delete(`/${id}`)
    }

    findId(id){
        return this.get(`/${id}`)
    }

    scheduling(banca){
        return this.put(`/agendamento/${banca.id}`, banca);
    }

    validate(banca){
        const errors = []

        if(!banca.descricao){
            errors.push('É obrigatório a descrição.')
        }
        if(!banca.dataBanca){
            errors.push('É obrigatório informar a data da banca.')
        }
        if(!banca.ordemApresentacao){
            errors.push('É obrigatório informar a ordem de apresentação.')
        }
        if(!banca.matriculaOrientador){
            errors.push('É obrigatório informar a matrícula do orientador.')
        }
        if(!banca.equipe){
            errors.push('É obrigatório informar o código de equipe.')
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

    validateScheduling(banca){
        const errors = []

        if(!banca.data){
            errors.push('É obrigatório a data.')
        }
    
        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

    consult(filter){
        let params = `?size=10&page=${filter.pageNumber}&sort=id,asc&descricao=${filter.descricao}`

        if(filter.dataBanca){
            params = `${params}&dataBanca=${filter.dataBanca}`
        }

        if(filter.orientadorNome){
            params = `${params}&orientadorNome=${filter.orientadorNome}`
        }

        if(filter.equipeId){
            params = `${params}&equipeId=${filter.equipeId}`
        }

        if(filter.id){
            params = `${params}&id=${filter.id}`
        }

        if(filter.membroMatricula){
            params = `${params}&membroMatricula=${filter.membroMatricula}`
        }

        return this.get(params);
    }

}