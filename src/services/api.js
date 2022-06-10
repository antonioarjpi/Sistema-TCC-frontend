import axios from 'axios';
import * as messages from '../components/toastr/toastr'

export const baseURL = process.env.REACT_APP_APP_BACKEND_URL ?? "http://localhost:8080"

const api = axios.create({
        baseURL: baseURL,
    });

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    static registrarToken(token){
        if(token){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            console.log(token)
        }        
    }

    post(url, obj){
        const requestUrl = `${this.apiurl}${url}`
        return api.post(requestUrl, obj)
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
                messages.mensagemAlert(error.message)
            }
        })
    }
}

api.interceptors.request.use(config => {
   const token = localStorage.getItem('@TCC:Token') || '';
   
   if(!token) return config;
   
   if(config?.headers){
        config.headers = { Authorization: `Bearer ${token}`}
    }
     return config;
});


export default ApiService;