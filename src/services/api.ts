import axios from 'axios';

// Instância do axios
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${FIXED_JWT_TOKEN}`,
    },
});

// Interceptor de resposta (opcional, mas profissional)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error(
                `Erro API [${error.response.status}]:`,
                error.response.data
            );
        } else {
            console.error('Erro de conexão com o backend:', error.message);
        }
        return Promise.reject(error);
    }
);
