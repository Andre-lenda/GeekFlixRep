import React, { useContext } from "react";
import styled from "styled-components";
import { useLogin } from "../Functions/useLogin";
import { UserContext } from "../Functions/UserContext";

const Modelo = styled.div
`
    margin: 0 auto; 
    background: #fff;
    border-radius: 10px;
    padding: 32px;
    width: 450px;
    height: 270px;
`

const Formulario = styled.form
`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const FormularioTitulo = styled.div
`
    font-family: 'Alice', serif;
    color: black;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
`

const FormularioTexto = styled.h3
`
    margin: 0px;
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

const Input = styled.input
`
    align-items: center;
    text-align: center;
    width: 450px;
    padding: 10px;
    margin: 3px -10px;
    border: 3px solid #ccc;
    border-radius: 10px;
`

const Button = styled.button
`
    margin: 0 auto;
    text-align: center;
    width: 400px;
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

export default function Entrar()
{
    const { Validar, emailRef} = useLogin();
    const { passwordRef } = useContext(UserContext);

    return<Modelo>
        <Formulario onSubmit = {Validar}>
            <FormularioTitulo> Entrar </FormularioTitulo>
            <Input type = "email" placeholder = "Digite seu email" ref={emailRef} required/>
            <Input type = "password" placeholder = "Digite sua senha" ref={passwordRef} required/>
            <Button type = "submit"> Entrar </Button>
            <LinkContainer>
                <FormularioTexto> Não têm um login?</FormularioTexto>
                <ModeloLink href = "/cadastro">Faça seu cadastro</ModeloLink>
            </LinkContainer>
        </Formulario>
    </Modelo>
    
}