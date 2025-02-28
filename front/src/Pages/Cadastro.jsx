import React, {useState} from "react";
import styled from "styled-components";
import Axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div
`
    background: #fff;
    padding: 32px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    width: 400px;
    height: 500px;
    margin: 32px auto;
`

const Title = styled.h1
`
    color: black;
    font-size: 32px;
    text-align: center;
`

const Input = styled.input
`
    text-align: center;
    width: 400px;
    padding: 10px;
    margin: 8px -12px;
    border: 3px solid #ccc;
    border-radius: 10px;
`


const Button = styled.button
`
    text-align: center;
    width: 100%;
    padding: 10px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`

const FormularioTexto = styled.h3
`
    margin: 4px;
    display: inline;
    color: black;
`

const LinkContainer = styled.div
`
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
`

const ModeloLink = styled.a
`
    text-decoration: none;
    color: black;
`

export default function Cadastro()
{
    const navigate = useNavigate()

    const [form, setForm] = useState(
    {
        name: "",
        email: "",
        password: "",
        date: "",
        phone: "",
        cep: ""
    })

    function handleChange(e)
    {
        setForm({...form, [e.target.name]: e.target.value});
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        Axios.post("http://localhost:4000/cadastro", form).then((response) =>
        {
            if (response.status === 201)
            {
                toast.success("Cadastro realizado com sucesso!", 
                {
                    position: "top-center",
                    autoClose: 5000,
                    style: 
                    {
                        backgroundColor: "transparent",
                        color: "green",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: "3px solid rgb(37, 209, 77)"
                    }
                });
                setForm({ name: "", email: "", password: "" });
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            }
            else if (response.status === 209)
            {
                toast.error("Esse email já têm um login, use outro email!",
                {
                    position: "top-center",
                    autoClose: 5000,
                    style: {
                        backgroundColor: "transparent",
                        color: "red",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: "3px solid rgb(223, 40, 40)"
                    }
                });
            }
        }).catch((error) =>
        {
            console.log(error)
            toast.error("Erro Interno, tente novamente mais tarde.", 
            {
                position: "top-center",
                autoClose: 5000,
                style: {
                    backgroundColor: "transparent",
                    color: "red",
                    fontSize: "16px",
                    borderRadius: "10px",
                    border: "3px solid rgb(223, 40, 40)"
                }
            });
        });
    }

    return <FormContainer>
        <Title>Cadastro</Title>
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                name="name"
                placeholder="Digite seu nome completo"
                value={form.name}
                onChange={handleChange}
                required
            />
            <Input
                type="email"
                name="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                required
            />
            <Input
                type="password"
                name="password"
                placeholder="Senha"
                value={form.password}
                onChange={handleChange}
                required
            />
            <Input
                type="date"
                name="date"
                placeholder="Data de nascimento"
                value={form.date}
                onChange={handleChange}
                required
            />
            <Input
                type="tel"
                name="phone"
                placeholder="Telefone"
                value={form.phone}
                onChange={handleChange}
                required
            />
            <Input
                type="text"
                name="cep"
                placeholder="CEP"
                value={form.cep}
                onChange={handleChange}
                required
            />
            <Button type="submit">Cadastrar</Button>
            <LinkContainer>
                <FormularioTexto> Já têm um cadastro?</FormularioTexto>
                <ModeloLink href = "/">Faça seu Login</ModeloLink>
            </LinkContainer>
        </form>
    </FormContainer>
}