// import axios from "axios";

// export const api = axios.create({
//   baseURL: 'https://nutrilevebackend.onrender.com',
//   headers: {
//     "Content-Type": "application/json"
//   }
// })
import { api } from './api';

// Cadastro
export async function cadastrarUsuario(url: string, dados: any, header: Object) {

  const response = await api.post(url, dados, header)

  return response.data
}

// Login
export async function loginUsuario(url: string, dados: any, setDados: Function) {
  try {
    const response = await api.post(url, dados)
    console.log("Resposta do login: Usuário logado com sucesso.")
    setDados(response.data)

  } catch (error: any) {

    console.error("Erro no login:", error)

    throw error
  }
}
