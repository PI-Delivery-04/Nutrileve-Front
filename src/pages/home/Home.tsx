import { ArrowRight, Clock, Leaf, Sparkles, Star } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RecomendacaoCategoria } from '../../models/Recomendacao';
import { getRecomendacoes } from '../../services/apiProduto';
import { toastErro, toastInfo, toastSucesso } from '../../utils/toast';
import { Recommendacao } from '../../components/recomendacao/Recomendacao';

export function Home() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recomendacoes, setRecomendacoes] = useState<RecomendacaoCategoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetRecommendations() {
    if (showRecommendations) {
      // Se já está mostrando, apenas fechar
      setShowRecommendations(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getRecomendacoes();

      if (data.length === 0) {
        toastInfo('Nenhuma recomendação disponível no momento');
        return;
      }

      setRecomendacoes(data);
      setShowRecommendations(true);
      toastSucesso('Recomendações carregadas com sucesso!');

      // Scroll suave para as recomendações
      setTimeout(() => {
        const element = document.getElementById('recommendations-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      console.error('Erro ao buscar recomendações:', error);
      toastErro('Erro ao carregar recomendações. Tente novamente.');

      setShowRecommendations(true);
      toastInfo('Mostrando dados de exemplo (API não conectada)');
    } finally {
      setIsLoading(false);
    }
  }

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
    <>
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

                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 cursor-pointer border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                  onClick={handleGetRecommendations}
                  disabled={isLoading}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isLoading ? 'Carregando...' : showRecommendations ? 'Ocultar Recomendações' : 'Ver Recomendações'}
                </Button>

                <Button size="lg" variant="outline" className="text-lg px-8 cursor-pointer" onClick={() => redirect('about')}>
                  Sobre nós
                </Button>
              </div>

              <div className="flex flex-wrap gap-12 pt-4">
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
                src="https://plus.unsplash.com/premium_photo-1712507237450-69c5421d9d11?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

      {/* Seção de Recomendações */}
      {
        showRecommendations && (
          <div id="recommendations-section">
            <Recommendacao
              recomendacoes={recomendacoes}
              onClose={() => setShowRecommendations(false)}
            />
          </div>
        )
      }
    </>
  );
}
