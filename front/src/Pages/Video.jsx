import React, {useState, useEffect} from "react";
import ObterUnicoConteudo from "../Functions/ObterUnicoConteudo";
import { useParams } from "react-router-dom";
import Principal from "../Components/Principal";
import Reprodutor from "../Components/Reprodutor";
import Navegacao from "../Components/Navegacao";

export default function Video()
{
    const [conteudo, DefinirConteudo] = useState({});
    const {codigo} = useParams();

    useEffect(() =>
    {
        ObterUnicoConteudo(codigo).then((response) =>
            {
                if (response.status == 200)
                {
                    DefinirConteudo(response.data);
                }
            })
    })

    return <>
        { conteudo &&
            <Principal fundo = "/Cinema2.png" tamanho = "780px">
                <Reprodutor conteudo = {conteudo}/>
            </Principal>

        }
    </>
}