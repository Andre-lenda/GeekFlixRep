import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Inicio from "./Pages/Inicio";
import Explorar from "./Pages/Explorar";
import Painel from "./Pages/Painel";
import Video from "./Pages/Video";
import Cadastrar from "./Pages/Cadastrar";
import Doacao from "./Pages/Doacao";
import Alta from "./Pages/Alta";
import ProtectedRoute from "./Functions/ProtectedRoute";

export default function Rotas()
{
    return <Routes>
        <Route path = "/" element = {<Inicio/>}/>
        <Route path = "/explorar" element = {<ProtectedRoute><Explorar/></ProtectedRoute>}/>
        <Route path = "/video/:codigo" element = {<ProtectedRoute><Video/></ProtectedRoute>}/>
        <Route path = "/painel" element = {<Painel/>}/>
        <Route path = "/cadastro" element = {<Cadastrar/>}/>
        {/* <Route index path = "/perfil" element = {<Perfil/>}/> */}
        <Route path = "/pix" element = {<Doacao/>}/>
        <Route path = "/alta" element = {<ProtectedRoute><Alta/></ProtectedRoute>}/>
    </Routes>
}