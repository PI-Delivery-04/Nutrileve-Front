import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import type Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"
import { toastErro, toastSucesso } from "../../../utils/toast"
import { AuthContext } from "../../../contexts/AuthContext"

function DeletarCategoria() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: ""
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
        headers: { Authorization: token }
      })
    } catch (error) {
      console.error("Erro ao buscar categoria", error)
    }
  }

  function retornar() {
    navigate("/categorias")
  }

  async function deletarCategoria() {
    if (!id) return

    setIsLoading(true)

    try {
      await deletar(`/categoria/${id}`, {
        headers: { Authorization: token }
      })
      toastSucesso("Categoria apagada com sucesso!")
    } catch (error) {
      toastErro("Erro ao deletar categoria")
    }

    setIsLoading(false)
    retornar()
  }

  return (
    <div className="w-full bg-emerald-50/30">
      <div className="container mx-auto px-4 py-12">


        <div className="text-center mb-10">
          <h1 className="text-emerald-700">
            Deletar categoria
          </h1>
        </div>


        <div className="max-w-2xl mx-auto rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur shadow-sm overflow-hidden">


          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold text-slate-900 truncate">
                  {categoria.nome || "Categoria"}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-rose-100 bg-rose-50 p-4">
              <p className="text-rose-800 font-medium">
                Tem certeza de que deseja apagar esta categoria?
              </p>

            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent" />

          <div className="p-5 flex flex-col sm:flex-row gap-3 sm:justify-end bg-white/40">
            <button
              type="button"
              onClick={retornar}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-100 transition hover:cursor-pointer"
              disabled={isLoading}
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={deletarCategoria}
              className="rounded-xl bg-rose-600 text-white px-6 py-3 font-medium hover:bg-rose-700 transition flex items-center justify-center min-w-[170px] hover:cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={22} />
              ) : (
                <span>Confirmar</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DeletarCategoria
