import axios from 'axios';

// URL base do backend
// const API_BASE_URL = 'http://localhost:8080/api';
const API_BASE_URL = 'https://nutrilevebackend.onrender.com';

// ⚠️ TOKEN JWT FIXO (TEMPORÁRIO)
// Depois você troca isso por token vindo do login
const FIXED_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb290QHJvb3QuY29tIiwiaWF0IjoxNzcwMDM0MTk3LCJleHAiOjE3NzAwNTIxOTd9.xcl9rc1nypC3jS25R_3My3_Jins4ugpSE8LSmoSeT-I';

// Instância do axios
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${FIXED_JWT_TOKEN}`,
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
