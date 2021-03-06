import axios from 'axios';
import * as messages from '../components/toastr/toastr';

export const baseURL = process.env.REACT_APP_APP_BACKEND_URL ?? "http://localhost:8080"

const api = axios.create({
  baseURL: baseURL,
});

class ApiService {

  constructor(apiurl) {
    this.apiurl = apiurl;
  }

  async post(url, obj) {
    const requestUrl = `${this.apiurl}${url}`
    return api.post(requestUrl, obj)
  }

  async put(url, obj) {
    const requestUrl = `${this.apiurl}${url}`
    return api.put(requestUrl, obj);
  }

  async delete(url) {
    const requestUrl = `${this.apiurl}${url}`
    return api.delete(requestUrl)
  }

  async get(url) {
    try {
      const response = api.get(`${this.apiurl}${url}`)
      return response
    } catch (error) {
      return false;
    }
  }
}

api.interceptors.request.use(config => {
  const token = localStorage.getItem('@TCC:Token') || '';

  if (!token) return config;

  if (config?.headers) {
    config.headers = { Authorization: `Bearer ${token}` }
  }
  return config;
});

//Remove os tokens e redireciona para página de acesso negado
api.interceptors.response.use(response => response, error => {

  if (error.response.status === 0) {
    messages.mensagemErro("Não é possível conectar o computador para o servidor, tente novamente!")
    throw new ('error')()
  }

  if (error.response.status === 400) {
    messages.mensagemErro(error.response.data.message)
    throw new ('error')()
  }

  if (error.response.status === 401) {
    messages.mensagemErro(error.response.data.message)
    throw new ('error')()
  }
  if (error.response.status === 404) {
    messages.mensagemErro(error.response.data.message)
    throw new ('error')()
  }

  if (error.response.status === 500) {
    messages.mensagemErro("Ocorreu um erro de sistema! Por favor, entrar em contato com administrador.")
    throw new ('erro interno')()
  }

  if (error.response.status === 403) {
    messages.mensagemErro("Acesso negado!")
    throw new ('error')()
  }
});

export default ApiService;