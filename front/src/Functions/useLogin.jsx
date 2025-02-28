import React from "react";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ValidarEntrada from "./ValidarUsuario.js";
import { UserContext } from "./UserContext.jsx";

export function useLogin() 
{
    const navigate = useNavigate();
    const { login, passwordRef } = useContext(UserContext);
    
    const emailRef = useRef(null);

    function Validar(event) 
    {
        event.preventDefault();

        const email = emailRef.current ? emailRef.current.value.trim() : null;
        const password = passwordRef.current ? passwordRef.current.value.trim() : null;

        ValidarEntrada(email, password)
            .then((response) => {
                if (response.status === 202) 
                {
                    if (response.data && (response.data.userId === 0 || response.data.userId)) 
                    {
                        login(response.data.email);
                    }

                    toast.success("Login realizado com sucesso!", 
                    {
                        position: "top-center",
                        style: {
                            backgroundColor: "transparent",
                            color: "green",
                            fontSize: "16px",
                            borderRadius: "10px",
                            border: "3px solid rgb(37, 209, 77)",
                        },
                    });

                    setTimeout(() => {
                        navigate("/explorar");
                    }, 1000);
                } else if (response.status === 204) 
                {
                    toast.error("Email ou senha incorretos.", 
                    {
                        position: "top-center",
                        autoClose: 5000,
                        style: {
                            backgroundColor: "transparent",
                            color: "red",
                            fontSize: "16px",
                            borderRadius: "10px",
                            border: "3px solid rgb(223, 40, 40)",
                        },
                    });
                }
            })
            .catch((error) => 
            {
                console.error(error);
                toast.error("Erro Interno, tente novamente mais tarde.", {
                    position: "top-center",
                    autoClose: 5000,
                    style: {
                        backgroundColor: "transparent",
                        color: "red",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: "3px solid rgb(223, 40, 40)",
                    },
                });
            });
    }

    return { Validar, emailRef, passwordRef };
}