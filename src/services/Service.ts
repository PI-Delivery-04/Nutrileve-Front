import { api } from './api';

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
