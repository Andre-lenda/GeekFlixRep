import React from "react";
import Axios from "axios";

const API_URL = "http://localhost:4000";

// Função para obter o token do usuário
const getHeaders = () => 
{
    const token = localStorage.getItem("token");
    console.log(token);
    return token ? { Authorization: `Bearer ${token}` } : null;
};

// Função genérica para requisições GET
export const apiGet = async (endpoint) => 
{
    try 
    {
        const response = await Axios.get(`${API_URL}${endpoint}`, 
        {
            headers: getHeaders(),
        });

        console.log(`Resposta recebida de ${API_URL}${endpoint}:`, response);

        return response.data;
    } catch (error) 
    {
        console.log(`Erro ao buscar ${endpoint}:`, error);
        throw error;
    }
};

// Função genérica para requisições POST
export const apiPost = async (endpoint, data) => 
{
    try 
    {
        const response = await Axios.post(`${API_URL}${endpoint}`, data,
        {
            headers: getHeaders(),
        });

        console.log(`Resposta recebida de ${API_URL}${endpoint}:`, response);
        console.log(response.data)

        return response;
    } catch (error) 
    {
        console.error(`Erro ao enviar para ${endpoint}:`, error);
        throw error;
    }
};