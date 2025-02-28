import React from "react";
import styled from "styled-components";
import Principal from "../Components/Principal";

const Model = styled.div
`
    position: relative;
    left: 560px;
    top: 150px;
    background: #fff;
    padding: 32px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    width: 400px;
    height: 200px;
`

const Text = styled.div
`
    text-align: center;
    font-size: 32px;
    font-family: 'Alice', serif;
    color: black;
    font-weight: bold;
`

const Title = styled.div
`

    font-size: 60px;
    text-align: center;
    font-family: 'Alice', serif;
    color: black;
    font-weight: bold;
`

export default function Doacao()
{
    return <Principal fundo = "/Cinema2.png">
        <Model>
            <Title> Pix: </Title>
            <Title> 503.448.608-33 </Title>
            <Text font = "bold"> Me ajude, faça sua doação </Text>
        </Model>
    </Principal>
}