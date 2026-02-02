import axios from "axios";

export const api = axios.create({
  baseURL: 'https://nutrilevebackend.onrender.com',
  headers: {
    "Content-Type": "application/json"
  }
})

// Cadastro
export async function cadastrarUsuario(url: string, dados: any) {

  const response = await api.post(url, dados)

  return response.data
}

// Login
export async function loginUsuario(url: string, dados: any) {
  try {

    const response = await api.post(url, dados)
    console.log("Resposta do login: Usuário logado com sucesso.")
    return response.data

  } catch (error: any) {

    console.error("Erro no login:", error)

    throw error
  }
}