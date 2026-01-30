import axios from "axios";

export const api = axios.create({
  baseURL: "https://nutrilevebackend.onrender.com",
});

//TEMPORÁRIO até o Auth ficar pronto
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGFpcy50ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE3Njk3ODYxNzUsImV4cCI6MTc2OTgwNDE3NX0.nAASdX3AOnwSlhgSa93a0PRzZRv2clZD-24sDCsuW8c";

api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = TOKEN;
  return config;
});

export const buscar = async (
  url: string,
  setDados: Function,
  header?: Object
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.put(url, dados)
  setDados(resposta.data)
}

export const deletar = async (url: string) => {
  await api.delete(url)
}

