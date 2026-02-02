import { useState, useRef } from 'react';
import { Camera, Save, Trash2, Edit2, User as UserIcon, Lock, Mail, Shield, X, ShoppingBag, Clock, Heart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Label } from '../../components/label/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/select/select';
import { toast } from 'sonner';
import { DialogContent, DialogFooter, DialogHeader } from '../../components/dialog/dialog';

interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  tipo_usuario: 'admin' | 'cliente' | 'nutricionista';
  foto: string;
  senha: string;
}

interface AtividadeRecente {
  id: number;
  tipo: 'pedido' | 'favorito' | 'avaliacao';
  descricao: string;
  data: string;
  icone: typeof ShoppingBag;
  cor: string;
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock - PRA TESTEEEEEEEE
  const [usuario, setUsuario] = useState<Usuario>({
    id: 1,
    nome: 'Beatriz Monteiro tralala',
    usuario: 'bea@email.com',
    tipo_usuario: 'cliente',
    foto: 'https://images.unsplash.com/premium_vector-1682269284255-8209b981c625?qw=400&h=400&fit=crop',
    senha: '********',
  });

  const [formData, setFormData] = useState<Usuario>(usuario);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Atividades recentes mockadas
  const atividadesRecentes: AtividadeRecente[] = [
    {
      id: 1,
      tipo: 'pedido',
      descricao: 'Pedido #1234 - Bowl de Quinoa',
      data: 'Há 2 horas',
      icone: ShoppingBag,
      cor: 'text-emerald-600',
    },
    {
      id: 2,
      tipo: 'favorito',
      descricao: 'Adicionou Salada Caesar aos favoritos',
      data: 'Ontem',
      icone: Heart,
      cor: 'text-red-500',
    },
    {
      id: 3,
      tipo: 'pedido',
      descricao: 'Pedido #1230 - Wrap Vegano',
      data: 'Há 3 dias',
      icone: ShoppingBag,
      cor: 'text-emerald-600',
    },
  ];

  const tipoUsuarioLabels = {
    admin: 'Administrador',
    cliente: 'Cliente',
    nutricionista: 'Nutricionista',
  };

  const tipoUsuarioColors = {
    admin: 'bg-red-100 text-red-700',
    cliente: 'bg-emerald-100 text-emerald-700',
    nutricionista: 'bg-blue-100 text-blue-700',
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, foto: reader.result as string });
        toast.success('Foto atualizada com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nome || !formData.usuario) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Simulação de salvamento
    setUsuario(formData);
    setIsEditing(false);
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleCancel = () => {
    setFormData(usuario);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Simulação de exclusão
    toast.success('Conta excluída com sucesso!');
    setShowDeleteDialog(false);
    // Aqui você redirecionaria para logout/login
  };

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error('Preencha todos os campos de senha');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (passwords.new.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    // Simulação de troca de senha
    toast.success('Senha alterada com sucesso!');
    setShowPasswordDialog(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>

        {/* Card Principal */}
        <Card className="p-6 md:p-8 shadow-lg border-emerald-100">
          {/* Foto e Informações Básicas */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-gray-200">
            {/* Foto do Usuário */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg">
                  {formData.foto ? (
                    <img
                      src={formData.foto}
                      alt={formData.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                      <UserIcon className="w-16 h-16 text-emerald-600" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              <Badge className={tipoUsuarioColors[formData.tipo_usuario]}>
                {tipoUsuarioLabels[formData.tipo_usuario]}
              </Badge>
            </div>

            {/* Informações */}
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="nome" className="text-gray-700">
                      Nome Completo
                    </Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      className="mt-1 border-emerald-200 focus-visible:ring-emerald-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="usuario" className="text-gray-700">
                      Email / Usuário
                    </Label>
                    <Input
                      id="usuario"
                      type="email"
                      value={formData.usuario}
                      onChange={(e) =>
                        setFormData({ ...formData, usuario: e.target.value })
                      }
                      className="mt-1 border-emerald-200 focus-visible:ring-emerald-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tipo_usuario" className="text-gray-700">
                      Tipo de Usuário
                    </Label>
                    <Select
                      value={formData.tipo_usuario}
                      onValueChange={(value: 'admin' | 'cliente' | 'nutricionista') =>
                        setFormData({ ...formData, tipo_usuario: value })
                      }
                    >
                      <SelectTrigger className="mt-1 border-emerald-200 focus:ring-emerald-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CLIENTE">Cliente</SelectItem>
                        <SelectItem value="VENDEDOR">Vendedor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {usuario.nome}
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4" />
                      {usuario.usuario}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>ID: #{usuario.id.toString().padStart(4, '0')}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Seção de Segurança */}
          {!isEditing && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                Segurança
              </h3>

              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Senha</p>
                  <p className="text-sm text-gray-600">••••••••</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordDialog(true)}
                  className="border-emerald-200 hover:bg-emerald-50"
                >
                  Alterar Senha
                </Button>
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            {isEditing ? (
              <>
                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Conta
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Informações Adicionais */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Card className="p-4 bg-emerald-50 border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Membro desde</p>
                <p className="font-semibold text-gray-900">Janeiro 2024</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pedidos realizados</p>
                <p className="font-semibold text-gray-900">47 pedidos</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Atividades Recentes */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Atividades Recentes
          </h3>
          <div className="space-y-4">
            {atividadesRecentes.map((atividade) => (
              <div
                key={atividade.id}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <atividade.icone className={`w-6 h-6 ${atividade.cor}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{atividade.descricao}</p>
                  <p className="text-sm text-gray-600">{atividade.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog de Exclusão */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser
              desfeita e todos os seus dados serão permanentemente removidos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Conta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Alteração de Senha */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Digite sua senha atual e escolha uma nova senha segura.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input
                id="current-password"
                type="password"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordDialog(false);
                setPasswords({ current: '', new: '', confirm: '' });
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handlePasswordChange}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Lock className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}