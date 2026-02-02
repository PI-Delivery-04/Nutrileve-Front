import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

import CardCategoria from "../cardcategoria/CardCategoria";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      setIsLoading(true);
      await buscar("/categoria", setCategorias);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full bg-emerald-50/30 pt-12">
      <div className="container mx-auto px-4 py-10">


        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-emerald-700">
              Categorias
            </h1>
            <p className="text-slate-600 mt-1">
              Organize e gerencie as categorias dos pratos
            </p>
          </div>

          <Link
            to="/cadastrarcategoria"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
          >
            Nova categoria
          </Link>
        </div>


        {isLoading && (
          <div className="flex justify-center py-14">
            <SyncLoader color="#166534" size={14} />
          </div>
        )}

        {!isLoading && categorias.length === 0 && (
          <div className="rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur p-10 text-center">
            <p className="text-2xl md:text-3xl font-semibold text-slate-900">
              Nenhuma categoria encontrada!
            </p>

            <div className="mt-6">
              <Link to="/cadastrarcategoria">
                <button className="rounded-xl bg-emerald-600 text-white font-medium px-6 py-3 hover:bg-emerald-700 transition shadow-sm">
                  Cadastrar categoria
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* GRID */}
        {!isLoading && categorias.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaCategorias;
