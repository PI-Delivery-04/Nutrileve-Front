import { Search, ShoppingBag, User, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function Navbar() {

const location = useLocation()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-emerald-100/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Link to='/'>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white-500/90 rounded-xl flex items-center justify-center shadow-sm">
                    {/* <img src="https://ik.imagekit.io/jx4y334fq/nutrileveicon.png" alt="logo_nutrileve" className='w-900' /> */}
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
                <Link to='/about' className="text-gray-700 hover:text-emerald-600 transition-colors">
                  Sobre nós
                </ Link>
              </nav>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 hover:bg-emerald-50"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>

              <Link to="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-emerald-50"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

            </div>
          </div>
        </div >
      </header >

      {!["/login", "/cadastro", "/produtos", "/about"].includes(location.pathname) && (
  <section className="pt-20 pb-10 bg-gradient-to-t from-emerald-50 to-white">
    <div className="container mx-auto px-4">

      <div className="flex items-start gap-4">

        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
          <Input
            type="text"
            placeholder="Busque por pratos, dietas ou ingredientes..."
            className="pl-12 py-6 text-base rounded-xl border border-emerald-100 bg-white/80 shadow-sm focus-visible:ring-emerald-400"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 pt-1 ">
          {[
            'Todos',
            'Vegano',
            'Low Carb',
            'Alto em Proteína',
            'Sem Glúten',
            'Vegetariano',
          ].map(tag => (
            <button
              key={tag}
              className="px-4 py-2 bg-emerald-100/70 text-emerald-700 hover:bg-emerald-200/80 rounded-full text-sm font-medium whitespace-nowrap transition hover:bg-orange-300 hover:text-white"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  </section>
)}


    </>
  );
}
