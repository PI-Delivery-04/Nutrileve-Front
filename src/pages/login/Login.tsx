import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { LogIn, ArrowLeft } from "lucide-react";

import { loginUsuario } from "../../services/ServiceLogin";
import { toastSucesso, toastErro, toastInfo } from "../../utils/toast";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { usuario, handleLogin } = useContext(AuthContext);
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin,
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  // const [formData, setFormData] = useState({
  //   email: '',
  //   senha: ''
  // })

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()

  //   // ===== VALIDAÇÃO =====

  //   if (!formData.email || !formData.senha) {
  //     toastInfo('Preencha email e senha para continuar')
  //     return
  //   }

  //   setIsLoading(true)

  //   try {

  //     const payload = {
  //       usuario: formData.email,
  //       senha: formData.senha
  //     }

  //     const response = await loginUsuario('/usuario/logar', payload)

  //     // ===== SALVAR SESSÃO =====

  //     localStorage.setItem('token', response.access_token)
  //     localStorage.setItem('usuario', JSON.stringify(response.usuario))

  //     toastSucesso('Login realizado com sucesso!')
  //     navigate('/')

  //   } catch (error: any) {

  //     console.error('Erro login:', error)

  //     const message =
  //       error.response?.data?.message ||
  //       'Email ou senha inválidos'

  //     toastErro(message)

  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-green-50 px-4 py-12">
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

            <CardTitle className="text-2xl">Bem-vindo de volta!</CardTitle>

            <CardDescription>
              Faça login para continuar sua jornada saudável
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  name="usuario"
                  type="email"
                  placeholder="seu@email.com"
                  // value={formData.email}
                  // onChange={e =>
                  //   setFormData({ ...formData, email: e.target.value })
                  // }
                  value={usuarioLogin.usuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Label>Senha</Label>
                <Input
                  name="senha"
                  type="password"
                  placeholder="••••••••"
                  // value={formData.senha}
                  // onChange={e =>
                  //   setFormData({ ...formData, senha: e.target.value })
                  // }
                  value={usuarioLogin.senha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
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
                {isLoading ? (
                  "Entrando..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>

              <p className="text-center text-sm">
                Não tem uma conta?{" "}
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
  );
}
