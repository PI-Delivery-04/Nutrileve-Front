import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { LogIn, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { loginUsuario } from '../../services/ServiceLogin'

export function Login() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // ===== VALIDACAO DE CAMPOS =====

    if (!formData.email || !formData.senha) {
      toast.warning('Campos obrigatórios', {
        description: 'Preencha email e senha para continuar.',
        position: 'top-center',
        duration: 3500
      })
      return
    }

    setIsLoading(true)

    try {

      const payload = {
        usuario: formData.email,
        senha: formData.senha
      }

      const response = await loginUsuario('/usuario/logar', payload)

      // ===== SALVAR SESSAO =====

      localStorage.setItem('token', response.access_token)
      localStorage.setItem('usuario', JSON.stringify(response.usuario))

      toast.success('Login realizado com sucesso!', {
        description: 'Você será redirecionado para a página principal.',
        position: 'top-center',
        duration: 3000
      })

      navigate('/')

    } catch (error: any) {

      console.error('Erro login:', error)

      const message =
        error.response?.data?.message ||
        'Email ou senha inválidos'

      toast.error('Falha no login', {
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

            <CardTitle className="text-2xl">
              Bem-vindo de volta!
            </CardTitle>

            <CardDescription>
              Faça login para continuar sua jornada saudável
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Label>Senha</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.senha}
                  onChange={e =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>

              <p className="text-center text-sm">
                Não tem uma conta?{' '}
                <Link
                  to="/cadastro"
                  className="text-emerald-600 hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>

            </form>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}
