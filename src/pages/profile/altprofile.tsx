

import { useState, useEffect, useContext } from 'react'
import {
  Camera,
  Save,
  Trash2,
  Edit2,
  User as UserIcon,
  Lock,
  Mail,
  Shield,
  X
} from 'lucide-react'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Label } from '../../components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select'

import { toast } from 'sonner'
import { AuthContext } from '../../contexts/AuthContext'
import { Usuario } from '../../models/Usuario'
import { buscar, atualizar, deletar, trocarSenha } from '../../services/Service'

export function Profile() {
  const { usuario, handleLogout } = useContext(AuthContext)

  /* ============================
     ESTADO BASE
  ============================ */
  const emptyUsuario: Usuario = {
    id: usuario.id,
    nome: '',
    usuario: '',
    tipo_usuario: 'cliente',
    foto: ''
  }

  const [usuarioOriginal, setUsuarioOriginal] = useState<Usuario>(emptyUsuario)
  const [formData, setFormData] = useState<Usuario>(emptyUsuario)

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [loading, setLoading] = useState(true)

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  /* ============================
     AUTH HEADER
  ============================ */
  const authHeader = {
    headers: {
      Authorization: `${usuario.token}`
    }
  }

  /* ============================
     CARREGAR USUÁRIO
  ============================ */
  useEffect(() => {
    async function carregar() {
      try {
        await buscar(`/usuario/${usuario.id}`, (data: Usuario) => {
          const normalized = {
            ...data,
            foto: data.foto ?? ''
          }
          setUsuarioOriginal(normalized)
          setFormData(normalized)
        }, authHeader)
      } catch {
        toast.error('Erro ao carregar perfil')
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [usuario.id])

  /* ============================
     SALVAR PERFIL
  ============================ */
  async function handleSave() {
    if (!formData.nome || !formData.usuario) {
      toast.error('Nome e e-mail são obrigatórios')
      return
    }

    const payload: Usuario = {
      id: usuario.id,
      nome: formData.nome,
      usuario: formData.usuario,
      tipo_usuario: formData.tipo_usuario,
      foto: formData.foto || undefined
    }

    try {
      await atualizar('/usuario', payload, (data: Usuario) => {
        setUsuarioOriginal(data)
        setFormData({ ...data, foto: data.foto ?? '' })
      }, authHeader)

      setIsEditing(false)
      toast.success('Perfil atualizado com sucesso')
    } catch {
      toast.error('Erro ao atualizar perfil')
    }
  }

  function handleCancel() {
    setFormData(usuarioOriginal)
    setIsEditing(false)
  }

  /* ============================
     ALTERAR SENHA
  ============================ */
  async function handlePasswordChange() {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error('Preencha todos os campos')
      return
    }

    if (passwords.new !== passwords.confirm) {
      toast.error('As senhas não coincidem')
      return
    }

    try {
      await trocarSenha(passwords.current, passwords.new, authHeader)
      toast.success('Senha alterada com sucesso')
      setShowPasswordDialog(false)
      setPasswords({ current: '', new: '', confirm: '' })
    } catch {
      toast.error('Senha atual incorreta')
    }
  }

  /* ============================
     EXCLUIR CONTA
  ============================ */
  async function handleDelete() {
    try {
      await deletar(`/usuario/${usuario.id}`, authHeader)
      toast.success('Conta excluída com sucesso')
      handleLogout()
      localStorage.clear()
      window.location.href = '/login'
    } catch {
      toast.error('Erro ao excluir conta')
    }
  }

  if (loading) {
    return <div className="p-10">Carregando perfil...</div>
  }

  const tipoUsuarioLabels = {
    vendedor: 'Administrador',
    cliente: 'Cliente'
  }

  const tipoUsuarioColors = {
    vendedor: 'bg-red-100 text-red-700',
    cliente: 'bg-emerald-100 text-emerald-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pt-24">
      <div className="container mx-auto px-4 max-w-4xl">

        <Card className="p-6 md:p-8 shadow-lg border-emerald-100">
          <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b">

            {/* FOTO */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100">
                {formData.foto ? (
                  <img src={formData.foto} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                    <UserIcon className="w-16 h-16 text-emerald-600" />
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="w-full">
                  <Label>URL da foto</Label>
                  <Input
                    placeholder="https://imagem.com/foto.jpg"
                    value={formData.foto}
                    onChange={e => setFormData({ ...formData, foto: e.target.value })}
                  />
                </div>
              )}

              <Badge className={tipoUsuarioColors[formData.tipo_usuario]}>
                {tipoUsuarioLabels[formData.tipo_usuario]}
              </Badge>
            </div>

            {/* INFO */}
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label>Nome</Label>
                    <Input
                      value={formData.nome}
                      onChange={e => setFormData({ ...formData, nome: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input
                      value={formData.usuario}
                      onChange={e => setFormData({ ...formData, usuario: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Tipo</Label>
                    <Select
                      value={formData.tipo_usuario}
                      onValueChange={(value: 'cliente' | 'vendedor') =>
                        setFormData({ ...formData, tipo_usuario: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="vendedor">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{usuarioOriginal.nome}</h2>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" /> {usuarioOriginal.usuario}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4" /> ID #{usuarioOriginal.id}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* AÇÕES */}
          <div className="flex justify-between">
            {isEditing ? (
              <>
                <Button disabled onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" /> Salvar
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" /> Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-2" /> Editar
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="w-4 h-4 mr-2" /> Excluir
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* DIALOG EXCLUIR */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir conta</DialogTitle>
              <DialogDescription>
                Esta ação é permanente. Deseja continuar?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* DIALOG SENHA */}
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Alterar senha</DialogTitle>
            </DialogHeader>

            <Input
              type="password"
              placeholder="Senha atual"
              value={passwords.current}
              onChange={e => setPasswords({ ...passwords, current: e.target.value })}
            />

            <Input
              type="password"
              placeholder="Nova senha"
              value={passwords.new}
              onChange={e => setPasswords({ ...passwords, new: e.target.value })}
            />

            <Input
              type="password"
              placeholder="Confirmar senha"
              value={passwords.confirm}
              onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
            />

            <DialogFooter>
              <Button onClick={handlePasswordChange}>
                <Lock className="w-4 h-4 mr-2" /> Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}

