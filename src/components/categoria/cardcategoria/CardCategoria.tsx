import { Link } from "react-router-dom"
import type Categoria from "../../../models/Categoria"

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900 capitalize truncate">
              {categoria.nome}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {categoria.descricao}
        </p>
      </div>

      <div className="mt-5 h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent" />

      <div className="p-4 flex gap-3">
        <Link to={`/editarcategoria/${categoria.id}`} className="w-full">
          <button className="w-full rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-medium py-2 hover:bg-emerald-100 transition hover:cursor-pointer">
            Editar
          </button>
        </Link>

        <Link to={`/deletarcategoria/${categoria.id}`} className="w-full">
          <button className="w-full rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-medium py-2 hover:bg-rose-100 transition hover:cursor-pointer">
            Deletar
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CardCategoria
