import axios from 'axios';
import * as messages from '../components/toastr/toastr'

export const baseURL = process.env.REACT_APP_APP_BACKEND_URL ?? "http://localhost:8080"

const api = axios.create({
        baseURL: baseURL,
        timeout: 5000 
    });

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, obj){
        const requestUrl = `${this.apiurl}${url}`
        return api.post(requestUrl, obj)
        .catch(error => {
            if (error.message === 'Network Error'){
                messages.mensagemAlert("Não foi possível conectar com servidor remoto")
                throw new ('');
            }
        })
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
        .catch(error => {
            if (error.message === 'Network Error'){
                messages.mensagemAlert("Não foi possível conectar com servidor remoto")
            }
        })
    }
}


export default ApiService;