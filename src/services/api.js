import axios from 'axios';

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

    async post(url, obj){
        const requestUrl = `${this.apiurl}${url}`
        return api.post(requestUrl, obj)
    }

    async put(url, obj){
        const requestUrl = `${this.apiurl}${url}`
        return api.put(requestUrl, obj);
    }

    async delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return api.delete(requestUrl)
    }

    async get(url){
        try{
            const response = api.get(`${this.apiurl}${url}`)
            return response
        } catch (error){
            return false;
        }
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


api.interceptors.response.use(
    (value) => {
      return Promise.resolve(value);
    },
    (error) => {
      const { isAxiosError = false, response = null } = error;
  
      if (isAxiosError && response && response.status === 401) {
        // Regra de redirecionamento de usuário para página de login
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
);

let counter = 1;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status >= 500 &&
      counter < Number(process.env.REACT_APP_RETRY)
    ) {
      counter++;
      return api.request(error.config);
    }
    counter = 1;
    return Promise.reject(error);
  }
);


export default ApiService;