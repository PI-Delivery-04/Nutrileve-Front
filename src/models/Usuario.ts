// models/Usuario.ts
export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  tipo_usuario: 'vendedor' | 'cliente';
  foto?: string;
  senha?: string
}
