import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { UserPlus, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { cadastrarUsuario } from '../../services/ServiceLogin'

export function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // ===== VALIDACOES =====

    if (formData.senha !== formData.confirmSenha) {
      toast.error('As senhas não coincidem', {
        description: 'Confira os campos de senha e tente novamente.',
        position: 'top-center',
        duration: 3500
      })
      return
    }

    if (formData.senha.length < 8) {
      toast.warning('Senha muito curta', {
        description: 'A senha deve conter no mínimo 8 caracteres.',
        position: 'top-center',
        duration: 3500
      })
      return
    }

    setIsLoading(true)

    try {
      const payload = {
        nome: formData.nome,
        usuario: formData.email,
        senha: formData.senha,
        tipo_usuario: 'CLIENTE',
        foto: null
      }

      await cadastrarUsuario('/usuario/cadastrar', payload)

      toast.success('Cadastro realizado com sucesso!', {
        description: 'Agora você pode fazer login na plataforma.',
        position: 'top-center',
        duration: 3000
      })

      navigate('/login')

    } catch (error: any) {

      console.error('Erro completo:', error)

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao realizar cadastro'

      toast.error('Falha no cadastro', {
        description: message,
        position: 'top-center',
        duration: 4000
      })

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

            <CardTitle className="text-2xl">Crie sua conta</CardTitle>
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
