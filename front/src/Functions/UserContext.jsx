import React, {createContext, useState, useEffect, useRef} from "react";
import ValidarEntrada from "./ValidarUsuario";

export const UserContext = createContext();

export function UserProvider({ children })
{
    const [userId, setUserId] = useState(() => //recuperar o id quando atulizar a página
    {
        const storedId = localStorage.getItem("userId");
        return storedId !== null ? Number(storedId) : null;
    });

    const [token, setToken] = useState(() =>
    {
        return localStorage.getItem("token") || null;
    });

    const passwordRef = useRef(null);
    
    useEffect(() => 
    {
        if(userId !== null)
        {
            localStorage.setItem("userId", userId); //salvar o id
        }
        if(token !== null)
        {
            localStorage.setItem("token", token); // salva o token
            
        }
        console.log(userId)
    }, [userId, token]);

    const login = (email) => 
    {
        const password = passwordRef.current ? passwordRef.current.value : null;

        ValidarEntrada(email, password).then((response) => 
        {
                console.log("Resposta da API no UserContext:", response);
                
                if (response.data.token)
                {
                    //reforça o salvamento
                    localStorage.setItem("userId", userId); //salvar o id
                    localStorage.setItem("token", token); // salva o token
            
                    console.log("oi")
                    console.log(response.data.token);
                    console.log(response.data.userId);
                    setUserId(response.data.userId); 
                    setToken(response.data. token);
                }
        }) .catch((error) => 
        {
                console.error("Erro no login:", error);
        });
    };
    // const login = async (email, password) => 
    // {
    //     try 
    //     {
    //         const response = await apiPost("/entrar", { email, password });

    //         console.log();
    //         if (response.token)
    //         {
    //             //reforça o salvamento
    //             localStorage.setItem("userId", userId); //salvar o id
    //             localStorage.setItem("token", Token); // salva o token

    //             console.log("oi")
    //             console.log(response.token);
    //             console.log(response.userId);
    //             setUserId(response.userId); 
    //             setToken(response.token);
    //         }
    //     } catch (error) 
    //     {
    //         console.error("Erro no login:", error);
    //     }
    // };

    function logout()
    {
        setUserId(null);
        setToken(null);
        localStorage.removeItem("userId"); //remover se não tiver logado
        localStorage.removeItem("token");
    }


    return (
        <UserContext.Provider value ={{ userId, setUserId, token, login, logout, passwordRef }}> { children } </UserContext.Provider>
    );
}