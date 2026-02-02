import { api } from './api';

export const buscar = async (url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function, header: Object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function, header: Object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: Object) => {
  await api.delete(url);
};

export async function buscarUsuarioLogado(id: number, dados: Object, header: Object) {
  const response = await api.get('/usuario/:id', header);
  return response.data;
}

export async function atualizarUsuario(dados: any, header: Object) {
  const response = await api.put('/usuario', dados);
  return response.data;
}

export async function trocarSenha(senhaAtual: string, novaSenha: string, header: Object) {
  return api.put('/usuario/me/senha', {
    senhaAtual,
    novaSenha
  });
}

export async function excluirConta(header: Object) {
  return api.delete('/usuario/me');
}
