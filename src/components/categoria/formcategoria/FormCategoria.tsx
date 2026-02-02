import { useContext, useEffect, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import type Categoria from "../../../models/Categoria"
import { buscar, cadastrar, atualizar } from "../../../services/Service"
import { toastErro, toastSucesso } from "../../../utils/toast"
import { AuthContext } from "../../../contexts/AuthContext"

function FormCategoria() {

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: ""
  } as Categoria)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (id !== undefined) {
      buscarCategoriaPorId(id)
    }
  }, [id])

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
        headers: { Authorization: token }
      })
    } catch (error) {
      console.error("Erro ao buscar categoria", error)
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    })
  }

  async function gerarCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (id !== undefined) {
        await atualizar("/categoria", categoria, setCategoria, {
          headers: { Authorization: token }
        })
        toastSucesso("Categoria atualizada com sucesso!")
      } else {
        await cadastrar("/categoria", categoria, setCategoria, {
          headers: { Authorization: token }
        })
        toastSucesso("Categoria cadastrada com sucesso!")
      }
    } catch (error) {
      toastErro("Erro ao salvar categoria")
    }

    setIsLoading(false)
    navigate("/categorias")
  }

  return (
    <div className="w-full bg-emerald-50/30 pt-12">
      <div className="container mx-auto px-4 py-12">


        <div className="text-center mb-10">

          <h1 className="text-emerald-700">
            {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
          </h1>
          <p className="text-slate-600 mt-2">
            Preencha os dados para organizar o cardápio do NutriLeve.
          </p>
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur shadow-sm p-8">
          <form className="flex flex-col gap-6" onSubmit={gerarCategoria}>

            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="text-slate-700 font-medium">
                Nome da Categoria
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                value={categoria.nome}
                onChange={atualizarEstado}
                placeholder="Ex: Vegano, Low Carb, Sem Glúten..."
                className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="descricao" className="text-slate-700 font-medium">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={categoria.descricao}
                onChange={(e) => atualizarEstado(e as any)}
                placeholder="Descreva rapidamente essa categoria..."
                className="min-h-[110px] rounded-xl border border-emerald-200 bg-white px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition resize-none"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/categorias")}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-100 transition hover:cursor-pointer"
              >
                Voltar
              </button>

              <button
                type="submit"
                className="rounded-xl bg-emerald-600 text-white px-6 py-3 font-medium hover:bg-emerald-700 transition flex items-center justify-center min-w-[170px] hover:cursor-pointer"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={22} />
                ) : (
                  <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )

}

export default FormCategoria
