import { Flame, TrendingDown, Award, X, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../../assets/imgfallback/ImageWithFallback";
import { RecomendacaoCategoria } from "../../models/Recomendacao";

interface RecommendationsSectionProps {
  recomendacoes: RecomendacaoCategoria[];
  onClose?: () => void;
}

export function Recommendacao({
  recomendacoes,
  onClose,
}: RecommendationsSectionProps) {
  if (!recomendacoes || recomendacoes.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-linear-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm font-medium">Opções Leves</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recomendações <span className="text-emerald-600">Especiais</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Selecionamos as melhores opções com menos calorias de cada categoria
            para você!
          </p>

          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-0 right-0 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="mt-12 text-center pb-5">
          <Card className="inline-block bg-emerald-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-emerald-800">
                <TrendingDown className="w-6 h-6" />
                <p className="text-sm">
                  <strong>Dica:</strong> As recomendações são baseadas nas
                  opções com menor quantidade de calorias em cada categoria,
                  mantendo todos os nutrientes essenciais para sua saúde!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recomendações por Categoria */}
        <div className="space-y-12">
          {recomendacoes.map((categoria) => (
            <div key={categoria.categoriaId}>
              {/* Categoria Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {categoria.categoriaNome}
                  </h3>
                </div>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Cards de Encomendas */}
              <div className="grid md:grid-cols-3 gap-6">
                {categoria.encomendas.map((encomenda, index) => (
                  <Card
                    key={encomenda.id}
                    className={`overflow-hidden hover:shadow-lg transition-all group ${
                      index === 0 ? "border-2 border-emerald-500" : ""
                    }`}
                  >
                    {/* Medal para o primeiro lugar */}
                    {index === 0 && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-yellow-500 hover:bg-yellow-500 text-white gap-1 shadow-lg">
                          <Award className="w-3 h-3" />
                          #1 Mais Leve
                        </Badge>
                      </div>
                    )}

                    <div className="relative">
                      <ImageWithFallback
                        src={encomenda.foto}
                        alt={encomenda.nome}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badge de ranking */}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                          #{index + 1}
                        </Badge>
                      </div>

                      {/* Caloria destaque */}
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-emerald-600 hover:bg-emerald-600 gap-1">
                          <TrendingDown className="w-3 h-3" />
                          {Math.floor(encomenda.caloria)} kcal
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h4 className="font-bold text-lg text-gray-900 mb-2">
                        {encomenda.nome}
                      </h4>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {encomenda.ingredientes}
                      </p>

                      {/* Informações Nutricionais */}
                      <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-gray-900">
                            {encomenda.caloria}
                          </p>
                          <p className="text-xs text-gray-600">kcal</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-semibold text-gray-900">
                            {encomenda.proteina}g
                          </p>
                          <p className="text-xs text-gray-600">Prot.</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-semibold text-gray-900">
                            {encomenda.carboidrato}g
                          </p>
                          <p className="text-xs text-gray-600">Carb.</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-semibold text-gray-900">
                            {encomenda.gordura}g
                          </p>
                          <p className="text-xs text-gray-600">Gord.</p>
                        </div>
                      </div>

                      {/* Preço e Disponibilidade */}
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-emerald-600">
                          R${" "}
                          {encomenda.preco
                            ? Number(encomenda.preco).toFixed(2)
                            : "0,00"}
                        </p>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>

                      {/* Medalha visual para destaque */}
                      {index === 0 && (
                        <div className="mt-4 p-2 bg-linear-to-r from-yellow-50 to-emerald-50 rounded-lg text-center">
                          <p className="text-xs font-semibold text-emerald-700">
                            🏆 Melhor escolha desta categoria
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
