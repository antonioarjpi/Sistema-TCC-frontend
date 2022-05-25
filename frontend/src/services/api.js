import axios from 'axios';

const api = axios.create({
    baseURL: `https://tcc-estacio.herokuapp.com`
});

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, obj){
        const requestUrl = `${this.apiurl}${url}`
        return api.post(requestUrl, obj);
    }

    put(url, obj){
        const requestUrl = `${this.apiurl}${url}`
        return api.put(requestUrl, obj);
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return api.delete(requestUrl)
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return api.get(requestUrl)
    }
}


export default ApiService;