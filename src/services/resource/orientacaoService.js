import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class OrientacaoService extends ApiService {

    constructor() {
        super('/orientacao')
    }

    save(orientacao) {
        return this.post('/', orientacao);
    }

    update(orientacao) {
        return this.put(`/${orientacao.id}`, orientacao);
    }

    del(id) {
        return this.delete(`/${id}`)
    }

    findId(id) {
        return this.get(`/${id}`)
    }

    findAll() {
        return this.get(``)
    }

    validate(orientacao) {
        const errors = []

        if (!orientacao.dataOrientacao) {
            errors.push('O campo data é obrigatório.')
        }

        if (!orientacao.matriculaOrientador) {
            errors.push('Campo matricula é obrigatório.')
        }

        if (!orientacao.tipoTCC) {
            errors.push('Campo tipo do tcc é obrigatório.')
        }

        if (!orientacao.descricaoTCC) {
            errors.push('Campo descrição do TCC é obrigatório.')
        }

        if (!orientacao.equipe) {
            errors.push('Campo código da equipe obrigatório.')
        }

        if (errors && errors.length > 0) {
            throw new ValidationError(errors);
        }

    }

    consult(filter) {
        let params = `?size=10&page=${filter.pageNumber}&sort=id,asc&descricaoTCC=${filter.descricaoTCC}`

        if (filter.dataOrientacao) {
            params = `${params}&dataOrientacao=${filter.dataOrientacao}`
        }

        if (filter.nomeOrientador) {
            params = `${params}&nomeOrientador=${filter.nomeOrientador}`
        }

        if (filter.matriculaOrientador) {
            params = `${params}&matriculaOrientador=${filter.matriculaOrientador}`
        }

        if (filter.tccDescricao) {
            params = `${params}&tccDescricao=${filter.tccDescricao}`
        }

        if (filter.tipoTCC) {
            params = `${params}&tipoTCC=${filter.tipoTCC}`
        }

        return this.get(params);
    }

}