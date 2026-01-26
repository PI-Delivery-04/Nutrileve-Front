import { ArrowRight, Clock, Leaf, Star } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export function Home() {

  const nav = useNavigate()

  function redirect(path: string) {
    switch (path) {
      case 'prod':
        nav('/produtos')
        break;
      case 'about':
        nav('/about')
        break;
      default:
        nav('/')
    }
  }


  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Alimentação Saudável e Prática</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Refeições Saudáveis{' '}
              <span className="text-emerald-600">Entregues na Sua Porta</span>
            </h1>

            <p className="text-lg text-gray-600">
              Descubra uma nova maneira de se alimentar bem. Pratos frescos,
              nutritivos e deliciosos, preparados especialmente para o seu estilo de vida.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 cursor-pointer" onClick={() => redirect('prod')}>
                Ver Cardápio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button size="lg" variant="outline" className="text-lg px-8 cursor-pointer" onClick={() => redirect('about')}>
                Sobre nós
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-gray-700">Entrega em 45min</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                <span className="text-sm text-gray-700">4.9 de avaliação</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-gray-700">100% Natural</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-3xl transform rotate-3"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1605291566628-6f0c7f5b9453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc2OTQzMDc2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Healthy food delivery"
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]"
            />

            <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-xl p-4 transform -rotate-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">+10.000</p>
                  <p className="text-sm text-gray-600">Clientes Felizes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
