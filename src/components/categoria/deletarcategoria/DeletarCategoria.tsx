import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import type Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"

function DeletarCategoria() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

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
      await buscar(`/categoria/${id}`, setCategoria)
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
      await deletar(`/categoria/${id}`)
      alert("Categoria apagada com sucesso!")
    } catch (error) {
      alert("Erro ao deletar categoria")
    }

    setIsLoading(false)
    retornar()
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar categoria</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a categoria a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-green-700 text-white font-bold text-2xl">
          {categoria.nome}
        </header>

        <p className="p-8 text-xl bg-slate-200 h-full">
          {categoria.descricao}
        </p>

        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>

          <button
            className="w-full text-slate-100 bg-green-500 hover:bg-green-700 flex items-center justify-center"
            onClick={deletarCategoria}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Sim</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarCategoria
