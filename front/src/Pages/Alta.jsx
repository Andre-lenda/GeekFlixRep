import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import SessaoType from "../Components/SessaoType.jsx";
import Destaque from "../Components/Destaque";
import Navegacao from "../Components/Navegacao";

const Title = styled.h1
`
    margin: 16px 0;
    display: flex;
    justify-content: center;
    font-family: 'Alice', serif;
    color: white;
    font-size: 64px;
    font-weight: bold;
    text-align: center;
`

const SubTitle = styled.h2
`
    margin: 16px 0;
    display: flex;
    justify-content: center;
    font-family: 'Alice', serif;
    color: white;
    font-size: 27px;
    font-weight: bold;
    text-align: center;
`

const CSubTitle = styled.h2
`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    font-family: 'Alice', serif;
    color: white;
    font-size: 27px;
    font-weight: bold;
    text-align: center;
`

const List = styled.div
`
    margin: 16px 550px;
    width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const Item = styled.a
`
    text-decoration: none;
    color: white;
    background: #333;
    padding: 15px;
    margin: 10px;
    border-radius: 8px;
    width: 80%;
    text-align: center;
`

export default function EmAlta()
{
    const [top5Geral, setTop5Geral] = useState([]);
    const [tipos, setTipos] = useState({});

    useEffect(() =>
    {
        Axios.get("http://localhost:4000/top5")
            .then(response =>
            {
                setTop5Geral(response.data.top5geral);
                setTipos(response.data.categorias);
            })
            .catch((error) =>
            {
                console.log(error);
                
                toast.error("Erro Interno, tente novamente mais tarde.", 
                {
                    position: "top-center",
                    autoClose: 5000,
                    style: {
                        backgroundColor: "transparent",
                        color: "red",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: "3px solid rgb(223, 40, 40)"
                    }
                });
            });
    }, []);

    return (
        <Destaque>
            <Navegacao background = "rgb(39, 9, 138)"/>
            <Title> 🔥 Em Alta </Title>

            {/* Exibir Top 5 geral */}
            <SubTitle> 🏆 Top 5 Geral </SubTitle>
            <List>
                {top5Geral.map((item, index) =>
                (
                    <Item  href = {"/video/" + item.id} key = {item.id}>
                        <strong>{index + 1}. {item.title}</strong> ({item.type})
                    </Item>
                ))}
            </List>

            {/* Exibir os Top5 de cada categoria */}
            <CSubTitle> 🏆 Top 5 Por Categoria </CSubTitle>
            {Object.keys(tipos).map((tipo) =>
            (
                <SessaoType key = {tipo} type = {tipo} conteudos = {tipos[tipo]}/>
            ))}
        </Destaque>
    )
}