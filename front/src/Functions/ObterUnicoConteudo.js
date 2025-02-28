import Axios from "axios";
import {useParams} from "react-router-dom";
import { apiGet } from "./ApiProvider";

export default function ObterUnicoConteudo(codigo)
{
    return Axios.get(`http://localhost:4000/catalogo/${codigo}`)
}