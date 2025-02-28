import React from "react";
import Principal from "../Components/Principal";
import Entrar from "../Pages/Entrar";
import Navegacao from "../Components/Navegacao";

export default function Inicio()
{
    return <Principal fundo = "/Cinema2.png" tamanho = "480px" padding = "128px 0">
        <Entrar/>
    </Principal>
}   