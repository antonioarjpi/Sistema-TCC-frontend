import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class DevolutivaService extends ApiService {

    constructor(){
        super('/acompanhamentos')
    }

    save(devolutiva){
        return this.post('/', devolutiva);
    }

    update(devolutiva){
        return this.put(`/${devolutiva.id}`, devolutiva);
    }

    del(id){
        return this.delete(`/${id}`)
    }

    findId(id){
        return this.get(`/${id}`)
    }

    validate(devolutiva){
        const errors = []

        if(!devolutiva.dataMudanca){
            errors.push('O campo dataMudanca é obrigatório.')
        }

        if(!devolutiva.devolutivaVersaoDoc){
            errors.push('O campo versão de documento é obrigatório.')
        }

        if(!devolutiva.devolutivaDescricao){
            errors.push('O campo descrição da devolutiva é obrigatório.')
        }

        if(!devolutiva.devolutivaLocalCorrecaoCorrecaoSugerida){
            errors.push('O campo correção sugerida é obrigatório.')
        }

        if(!devolutiva.orientacaoId){
            errors.push('O campo código da orientação é obrigatório.')
        }

        if(!devolutiva.statusOrientacao){
            errors.push('O campo status da orientação é obrigatório.')
        }

        if(!devolutiva.devolutivaLocalCorrecaoLocal){
            errors.push('O campo local de correção da orientação é obrigatório.')
        }
        
        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }


    consult(filter){
        let params = `?statusOrientacao=${filter.statusOrientacao}`

        if(filter.dataMudanca){
            params = `${params}&dataMudanca=${filter.dataMudanca}`
        }

        if(filter.orientacaoId){
            params = `${params}&orientacaoId=${filter.orientacaoId}`
        }

        if(filter.devolutivaDescricao){
            params = `${params}&devolutivaDescricao=${filter.devolutivaDescricao}`
        }

        if(filter.devolutivaVersaoDoc){
            params = `${params}&devolutivaVersaoDoc=${filter.devolutivaVersaoDoc}`
        }

        if(filter.devolutivaLocalCorrecaoCorrecaoSugerida){
            params = `${params}&devolutivaLocalCorrecaoCorrecaoSugerida=${filter.devolutivaLocalCorrecaoCorrecaoSugerida}`
        }

        if(filter.devolutivaLocalCorrecaoLocal){
            params = `${params}&devolutivaLocalCorrecaoLocal=${filter.devolutivaLocalCorrecaoLocal}`
        }

        return this.get(params);
    }

}