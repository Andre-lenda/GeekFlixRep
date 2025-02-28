import React, {useContext} from "react";
import styled from "styled-components";
import { UserContext } from "../Functions/UserContext";
import { useNavigate } from "react-router-dom";

const Modelo = styled.div
`
    align-items: center;
    background: ${props => props.background};
    display: flex;
    gap: 32px;
    height: 32px;
    padding: 32px;
    border-radius: 10px;
`

const ModeloImagem = styled.img
`
    height: 48px;
`

const ModeloLink = styled.a
`
    color: #fff;
    text-decoration: none;
`

const LogoutButton = styled.button
`
    background: red;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`

export default function Navegacao(props)
{
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() 
    {
        logout();
        navigate("/");  // Redireciona para a página de login
    }

    return <Modelo background = {props.background}>
        <ModeloImagem src = "/Logo.png" alt = "logo"/>
        <ModeloLink href = "/explorar">Inicio</ModeloLink>
        <ModeloLink href = "/perfil">Perfil</ModeloLink>
        <ModeloLink href = "/pix">Doação</ModeloLink>
        <ModeloLink href = "/alta">Em Alta</ModeloLink>
        <LogoutButton onClick={handleLogout}> Sair </LogoutButton>
    </Modelo>
}