import axios from "axios";
import Usuario from "../models/Usuario";

export const api = axios.create({
  baseURL: "https://nutrilevebackend.onrender.com",
});

//interceptor auth 
api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb290QHJvb3QuY29tIiwiaWF0IjoxNzY5OTcyNTMwLCJleHAiOjE3Njk5OTA1MzB9.XS4ACPBv9mGelgBytB3iNvtMVWRF7TMBeJyiNR6yOec';

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = token;
  }

  return config;
});

export const buscar = async (url: string, setDados: Function) => {
  const resposta = await api.get(url);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.put(url, dados);
  setDados(resposta.data);
};

export const deletar = async (url: string) => {
  await api.delete(url);
};

export async function buscarUsuarioLogado() {
  const response = await api.get('/usuario/me');
  return response.data;
}

export async function atualizarUsuario(dados: any) {
  const response = await api.put('/usuario/me', dados);
  return response.data;
}

export async function trocarSenha(senhaAtual: string, novaSenha: string) {
  return api.put('/usuario/me/senha', {
    senhaAtual,
    novaSenha
  });
}

export async function excluirConta() {
  return api.delete('/usuario/me');
}
