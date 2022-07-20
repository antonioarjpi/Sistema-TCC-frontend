import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class DevolutivaService extends ApiService {

    constructor(){
        super('/acompanhamentos')
    }

    optionsStatus(){
        return  [
            { label: 'Positivo', value: 'Positivo' },
            { label: 'Negativo', value: 'Negativo' }
        ]
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
        let params = `?size=10&page=${filter.pageNumber}&sort=id,asc&statusOrientacao=${filter.statusOrientacao}`

        if(filter.dataMudanca){
            params = `${params}&dataMudanca=${filter.dataMudanca}`
        }

        if(filter.orientacaoId){
            params = `${params}&orientacaoId=${filter.orientacaoId}`
        }

        if(filter.descricaoDaDevolutiva){
            params = `${params}&devolutivaDescricao=${filter.descricaoDaDevolutiva}`
        }

        if(filter.versaoDoc){
            params = `${params}&devolutivaVersaoDoc=${filter.versaoDoc}`
        }

        if(filter.correcaoSugerida){
            params = `${params}&devolutivaLocalCorrecaoCorrecaoSugerida=${filter.correcaoSugerida}`
        }

        if(filter.localDeCorrecao){
            params = `${params}&devolutivaLocalCorrecaoLocal=${filter.localDeCorrecao}`
        }

        return this.get(params);
    }

}