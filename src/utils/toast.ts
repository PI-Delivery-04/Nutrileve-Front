import { toast } from "react-toastify"

export const toastSucesso = (mensagem: string) =>
  toast.success(mensagem, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })

export const toastErro = (mensagem: string) =>
  toast.error(mensagem, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })

export const toastInfo = (mensagem: string) =>
  toast.info(mensagem, {
    position: "top-right",
    autoClose: 2500,
  })
