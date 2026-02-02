import { useContext, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

import { UserPlus, ArrowLeft } from 'lucide-react'

import { cadastrarUsuario } from '../../services/ServiceLogin'
import { toastSucesso, toastErro, toastInfo } from '../../utils/toast'
import { AuthContext } from '../../contexts/AuthContext'

export function Register() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
    foto: '',
    tipo_usuario: ''
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // ===== VALIDAÇÕES =====

    if (!formData.tipo_usuario) {
      toastInfo('Selecione o tipo de usuário')
      return
    }

    if (formData.senha !== formData.confirmSenha) {
      toastErro('As senhas não coincidem')
      return
    }

    if (formData.senha.length < 8) {
      toastInfo('A senha deve conter no mínimo 8 caracteres')
      return
    }

    setIsLoading(true)

    try {

      const form = new FormData()

      form.append('nome', formData.nome)
      form.append('usuario', formData.email)
      form.append('senha', formData.senha)
      form.append('tipo_usuario', formData.tipo_usuario)

      if (formData.foto) {
        form.append('foto', formData.foto)
      }

      await cadastrarUsuario('/usuario/cadastrar', form, {
        headers: { Authorization: token }
      })
      toastSucesso('Cadastro realizado com sucesso!')
      navigate('/login')

    } catch (error: any) {

      console.error('Erro completo:', error)

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao realizar cadastro'

      toastErro(message)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-12">
      <div className="w-full max-w-md">

        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">

            <div className="flex justify-center mb-4">
              <img
                src="https://ik.imagekit.io/f9nzlij8o/Gemini_Generated_Image_burmusburmusburm.png"
                className="w-10 h-10 rounded-full"
              />
            </div>

            <CardTitle className="text-2xl">
              Crie sua conta
            </CardTitle>

            <CardDescription>
              Comece sua jornada por uma vida mais saudável
            </CardDescription>

          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <Label>Nome completo</Label>
                <Input
                  value={formData.nome}
                  onChange={e =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label>Tipo de usuário</Label>

                <select
                  className="w-full border rounded-md p-2 text-sm"
                  value={formData.tipo_usuario}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      tipo_usuario: e.target.value
                    })
                  }
                  disabled={isLoading}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="CLIENTE">Cliente</option>
                  <option value="VENDEDOR">Vendedor</option>
                </select>
              </div>

              <div>
                <Label>Senha</Label>
                <Input
                  type="password"
                  value={formData.senha}
                  onChange={e =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label>Confirmar senha</Label>
                <Input
                  type="password"
                  value={formData.confirmSenha}
                  onChange={e =>
                    setFormData({ ...formData, confirmSenha: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label>Foto de perfil</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/imagem.jpg"
                  disabled={isLoading}
                  value={formData.foto}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      foto: e.target.value
                    })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? 'Criando conta...' : (
                  <>
                    <UserPlus className="mr-2 w-4 h-4" />
                    Criar conta
                  </>
                )}
              </Button>

              <p className="text-center text-sm">
                Já tem conta?{' '}
                <Link
                  to="/login"
                  className="text-emerald-600 hover:underline"
                >
                  Faça login
                </Link>
              </p>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
