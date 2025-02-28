import React, {useEffect, useState} from "react"
import styled from "styled-components"
import Navegacao from "../Components/Navegacao"
import Destaque from "../Components/Destaque"
import Sessao from "../Components/Sessao"
import ObterConteudos from "../Functions/ObterConteudos"

export default function Explorar()
{
    const [conteudos, DefinirConteudos] = useState([]);
    const [generos, DefinirGeneros] = useState([]);
    const [name, DefinirName] = useState([]);

    function obterConteudosComNomes(conteudos, nomes) 
    {
        return conteudos.map((conteudo) => 
        {
            const nomeEncontrado = nomes.find((nome) => nome.id === conteudo.id);
            return { ...conteudo, nome: nomeEncontrado ? nomeEncontrado.title : "Nome não disponível" };
        });
    }

    useEffect(() =>
    {
        ObterConteudos("catalogo").then(function(response)
        {
            if (response.status == 200)
            {
                DefinirConteudos(response.data);
            }
            else
            {
                console.log(response);
            }
        })

        ObterConteudos("generos").then(function(response)
        {
            if (response.status == 200)
            {
                console.log(response.data)   
                DefinirGeneros(response.data);
            }
            else
            {
                console.log(response);
            }
        })

        ObterConteudos("nomes").then(function(response)
        {
            if (response.status == 200)
            {
                console.log("Nomes:", response.data)
                DefinirName(response.data);
            }
            else
            {
                console.log(response);
            }
        })
    }, []);

    const conteudosComNomes = obterConteudosComNomes(conteudos, name);

    return <>
        <Destaque>
            <Navegacao background = "rgb(39, 9, 138)"/>
            {generos.length > 0 &&

                    generos.map((genero) =>
                    {
                        return <Sessao
                                key = {genero.id}
                                gender = {genero}
                                conteudos = {conteudosComNomes}/>
                    })
            }
        </Destaque>
    </>
}