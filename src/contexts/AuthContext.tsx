import { createContext, type ReactNode, useState } from "react"

import type UsuarioLogin from "../models/UsuarioLogin"
import { loginUsuario } from "../services/ServiceLogin"
import { toastErro, toastSucesso } from "../utils/toast"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}
interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        tipo_usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuariologin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await loginUsuario('/usuario/logar', usuariologin, setUsuario)
            toastSucesso("Usuário foi autenticado com sucesso!")
        } catch (error) {
            console.log(error)
            toastErro("Os dados do Usuário estão inconsistentes!")
        }
        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            tipo_usuario: '',
            senha: '',
            foto: '',
            token: ''
        })
    }
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider >
    )
}