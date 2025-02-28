import React from "react";
import styled from "styled-components";
import Navegacao from "./Navegacao";

const Modelo = styled.div
`
    background-image: url(${props => props.fundo});
    background-size: cover;
    height: 720px;
`

const Barra = styled.div
`
    border-radius: 10px;
`

const BarraImagem = styled.img
`
    display: block;
    margin: 0 auto;
    height: 48px;
`

const Mensagem = styled.div
`
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4);
    margin: 0px auto;
    padding: ${props => props.padding};
    text-align: center;
    border-radius: 10px;
    width: ${props => props.tamanho};
`

export default function Principal(props)
{
    return <Modelo fundo = {props.fundo}>
        <Barra>
            <Navegacao background = "rgb(39, 9, 138)"/>
        </Barra>

        <Mensagem padding = {props.padding} tamanho = {props.tamanho}>
            {props.children}
        </Mensagem>
    </Modelo>
}