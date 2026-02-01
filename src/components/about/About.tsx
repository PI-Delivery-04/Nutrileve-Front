import { CheckCircle, Clock, ShoppingBag, Truck, Star, Leaf, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: ShoppingBag,
    title: 'Escolha seu Prato',
    description: 'Navegue pelo nosso cardápio personalizado e selecione refeições que se adequam à sua dieta',
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    icon: CheckCircle,
    title: 'Personalize',
    description: 'Adicione suas preferências, restrições alimentares e veja as informações nutricionais completas',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Clock,
    title: 'Preparamos com Carinho',
    description: 'Nossas lojas parceiras preparam sua refeição com ingredientes frescos e de qualidade',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Receba em casa em até 45 minutos, sempre fresquinho e pronto para consumo',
    color: 'bg-purple-100 text-purple-600'
  }
];

export function About() {
  return (
    <section id="como-funciona" className="py-16 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sobre Nós
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            O projeto NutriLeve é um aplicativo de delivery que conecta clientes a restaurantes parceiros especializados em refeições saudáveis. A plataforma funcionará como intermediadora de pedidos, oferecendo catálogo, carrinho e finalização da compra, enquanto os restaurantes ficam responsáveis pela produção e entrega.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line (hidden on mobile, shown on larger screens) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-200 to-transparent"></div>
              )}

              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-2 shadow-lg`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">45min</p>
              <p className="text-gray-600">Tempo médio de entrega</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">100%</p>
              <p className="text-gray-600">Ingredientes naturais</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <ThumbsUp className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">10k+</p>
              <p className="text-gray-600">Clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 my-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Avaliações dos Clientes
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "Melhor delivery saudável de SP! Comida deliciosa e entrega rápida."
              </p>
              <p className="text-sm font-semibold text-gray-900">Yuri Silva</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "Adoro poder ver as informações nutricionais de cada prato. Perfeito!"
              </p>
              <p className="text-sm font-semibold text-gray-900">Felipe Andrade</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "Opções veganas incríveis! Finalmente um delivery que me atende."
              </p>
              <p className="text-sm font-semibold text-gray-900">Mariana Araujo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
