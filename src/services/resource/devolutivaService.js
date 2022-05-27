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