import { Search, ShoppingBag, User, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toastSucesso } from '../../utils/toast';

export function Navbar() {

  const location = useLocation()
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext)


  function logout() {
    handleLogout()
    toastSucesso('O Usuário foi desconectado com sucesso!')
    navigate('/')
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-emerald-100/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Link to='/'>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white-500/90 rounded-xl flex items-center justify-center shadow-sm">
                    <img src="https://ik.imagekit.io/f9nzlij8o/Gemini_Generated_Image_burmusburmusburm.png" alt="Logo" className="w-10 h-10 object-contain rounded-full" />
                  </div>
                  <span className="font-semibold text-lg text-gray-900">
                    NutriLeve
                  </span>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>São Paulo · SP</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <nav className="hidden md:flex gap-8 pr-4">
                <Link to='/produtos' className="text-gray-700 hover:text-emerald-600 transition-colors">
                  Cardápio
                </ Link>
                {usuario.token !== '' &&
                  <Link to="/categorias" className="text-gay-700 hover:text-emerald-600 transition-colors">
                    Categorias
                  </Link>
                }
                <Link to='/about' className="text-gray-700 hover:text-emerald-600 transition-colors">
                  Sobre nós
                </ Link>
              </nav>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 hover:bg-emerald-50 hover:cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center hover:cursor-pointer">
                  0
                </span>
              </Button>

              {/* LOGIN */}
              {/* <Link to="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-emerald-50 hover:cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {usuario.token !== '' &&
                <Link to='' onClick={logout}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                    Sair
                  </Button>
                </Link>
              }\ */}
              {/* Se o token estiver vazio, mostra o botão de Login. Caso contrário, mostra o de Sair */}
              {usuario.token === '' ? (
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-700 hover:bg-emerald-50 hover:cursor-pointer"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <div>
                  <Link to="/perfil">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-700 hover:bg-emerald-50 hover:cursor-pointer"
                    >
                      <User className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    onClick={logout}
                    className="bg-emerald-600 hover:bg-emerald-700 ml-2"
                  >
                    Sair
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div >
      </header >
    </>
  );
}
