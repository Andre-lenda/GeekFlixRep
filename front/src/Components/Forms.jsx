import React, {useState} from "react";
import styled from "styled-components";
import ConteudoInicial from "../Data/ConteudoInicial";

const Modelo = styled.div
`
    background: #ccc;
    border: 4px;
    color: #222;
    padding: 32px;
`

const ModeloInterno = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export default function Forms()
{
    const [conteudo, DefinirConteudo] = useState(ConteudoInicial);

    function Mudar(eventData)
    {
        const campo = eventData.target.name;
        const valor = eventData.target.value;
        DefinirConteudo({...conteudo, [campo]: valor});
    }

    return <Modelo>
        <input
            value = {conteudo.capa}
            onSubmit = {Mudar}
            type = "url"
            name = "capa"
            placeholder = "capa" required/>
        
        <input
            value = {conteudo.trilha}
            onSubmit = {Mudar}
            type = "url"
            name = "trilha"
            placeholder = "trilha" required/>

        <input
            value = {conteudo.titulo}
            onSubmit = {Mudar}
            type = "text"
            name = "titulo"
            placeholder = "titulo" required/>
        
        <input
            value = {conteudo.descricao}
            onSubmit = {Mudar}
            type = "text"
            name = "descricao"
            placeholder = "descricao" required/>

        <input
            value = {conteudo.genero}
            onSubmit = {Mudar}
            type = "text"
            name = "genero"
            placeholder = "genero" required/>

        <input
            value = {conteudo.ano}
            onSubmit = {Mudar}
            type = "number"
            name = "ano"
            placeholder = "ano" required/>

        <input
            value = {conteudo.duracao}
            onSubmit = {Mudar}
            type = "number"
            name = "duracao"
            placeholder = "Duração exemplo: 90mins)"/>

        <input
            value = {conteudo.faixa}
            onSubmit = {Mudar}
            type = "number"
            name = "faixa"
            placeholder = "faixa etária (exemplo: +100 anos)" required/>

        { <ModeloInterno onSubmit={Enviar}/> }
    </Modelo>
}