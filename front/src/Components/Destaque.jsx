import React from "react";
import styled from "styled-components";

const Modelo = styled.div
`
    background: rgb(2,0,36);
    background-size: cover;
    background-position: center;
    height: 100%;
    weight: 100%;
`

export default function Destaque(props)
{
    return <Modelo fundo = {props.fundo}>
        {props.children}
    </Modelo>
}