import ApiService from "../api";
import ValidationError from '../exception/ValidationError';

export default class DefesaService extends ApiService {

    constructor() {
        super('/defesas')
    }

    save(defesa) {
        return this.post('/', defesa);
    }

    update(defesa) {
        return this.put(`/${defesa.id}`, defesa);
    }

    del(id) {
        return this.delete(`/${id}`)
    }

    findId(id) {
        return this.get(`/${id}`)
    }

    validate(defesa) {
        const errors = []

        if (!defesa.data) {
            errors.push('É obrigatório informar a data.')
        }

        if (!defesa.banca) {
            errors.push('É obrigatório informar o código da banca.')
        }

        if (errors && errors.length > 0) {
            throw new ValidationError(errors);
        }
    }


    consult(filter) {
        let params = `?name=${filter.name}`

        if (filter.type) {
            params = `${params}&type=${filter.type}`
        }

        return this.get(params);
    }

}