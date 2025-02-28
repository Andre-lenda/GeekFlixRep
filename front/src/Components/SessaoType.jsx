import React from "react";
import styled from "styled-components";

const Modelo = styled.div
`
    margin: 32px 0;
    padding: 0 32px;
`

const ModeloTitulo = styled.div
`
    font-size: 32px;
    margin-bottom: 30px;
`
const ModeloInterno = styled.div
`
    display: flex;
    gap: 16px;
`
const Conteudo = styled.img
`
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    height: 160px;
    margin: 16px 0;
    min-width: 256px;
    max-width: 256px;
    object-fit: cover;

    transition: 0.2s;

    &:hover
    {
        transform: scale(110%);
        transition: 0.2s;
    }
`

const ModeloTituloConteudo = styled.div
`
    white-space: nowrap;
    font-size: 18px;
    color: white;
    text-align: center;
    margin-bottom: 2px;
`

export default function SessaoType(props)
{
    return (
        <Modelo>
            <ModeloTitulo> {props.type} </ModeloTitulo>
            <ModeloInterno>
                {props.conteudos.map((conteudo) => (
                    <a href={"/video/" + conteudo.id} key={conteudo.id}>
                        <ModeloTituloConteudo>{conteudo.title}</ModeloTituloConteudo>
                        <Conteudo src = {conteudo.logo} alt="capa" />
                    </a>
                ))}
            </ModeloInterno>
        </Modelo>
    );
}