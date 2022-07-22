import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class OrientadorService extends ApiService {

    constructor() {
        super('/orientadores')
    }

    save(orientador) {
        return this.post('/', orientador);
    }

    update(orientador) {
        return this.put(`/${orientador.id}`, orientador);
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

    validate(orientador) {
        const errors = []

        if (!orientador.nome) {
            errors.push('O campo Nome é obrigatório.')
        }

        if (!orientador.email) {
            errors.push('O campo Email é obrigatório.')
        } else if (!orientador.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('Informe um Email válido.')
        }

        if (!orientador.titulacaoDescricao) {
            errors.push('O campo titulação é obrigatório.')
        }

        if (!orientador.titulacaoGrau) {
            errors.push('O campo grau é obrigatório.')
        }

        if (!orientador.senha || !orientador.senhaRepetida) {
            errors.push('Digite a senha 2x.')
        } else if (orientador.senha !== orientador.senhaRepetida) {
            errors.push('As senhas não batem.')
        }

        if (errors && errors.length > 0) {
            throw new ValidationError(errors);
        }
    }

    validateUpdate(orientador) {
        const errors = []

        if (!orientador.nome) {
            errors.push('O campo Nome é obrigatório.')
        }

        if (!orientador.titulacaoDescricao) {
            errors.push('O campo titulação é obrigatório.')
        }

        if (!orientador.titulacaoGrau) {
            errors.push('O campo grau é obrigatório.')
        }

        if (!orientador.email) {
            errors.push('O campo Email é obrigatório.')
        } else if (!orientador.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('Informe um Email válido.')
        }

        if (errors && errors.length > 0) {
            throw new ValidationError(errors);
        }
    }


    consult(filter) {
        let params = `?size=10&page=${filter.pageNumber}&sort=nome,asc&nome=${filter.nome}`

        if (filter.matricula) {
            params = `${params}&matricula=${filter.matricula}`
        }

        if (filter.email) {
            params = `${params}&email=${filter.email}`
        }

        if (filter.descricaoTitulacao) {
            params = `${params}&descricaoTitulacao=${filter.descricaoTitulacao}`
        }

        if (filter.grau) {
            params = `${params}&grau=${filter.grau}`
        }

        if (filter.ies) {
            params = `${params}&ies=${filter.ies}`
        }

        if (filter.linhaPesquisa) {
            params = `${params}&linhaPesquisa=${filter.linhaPesquisa}`
        }

        if (filter.conhecimento) {
            params = `${params}&conhecimento=${filter.conhecimento}`
        }
        return this.get(params);
    }

}