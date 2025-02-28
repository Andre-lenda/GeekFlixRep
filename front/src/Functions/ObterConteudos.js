import Axios from "axios";
import { apiGet } from "./ApiProvider";

export default function ObterConteudos(tipoASerBuscado)
{
    return Axios.get("http://localhost:4000/" + tipoASerBuscado);
}