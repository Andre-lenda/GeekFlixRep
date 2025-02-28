import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import Axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../Functions/UserContext";
import { apiGet, apiPost } from "../Functions/ApiProvider";

const Modelo = styled.div
`
    position: relative;
    left: 200px;
    height: 600px;
    background: #222;
    border-radius: 8px;
    box-shadow: 4px 4px 16px rgba(0,0,0,0.4);
    overflow: hidden;
`

const ModeloTrailer = styled.iframe
`
    border: none;
    height: 385px;
    width: 100%;
`

const ModeloDados = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px;
`

const Titulo = styled.div
`
    font-family: 'Alice', serif;
    font-size: 22px;
    font-weight: bold;
`

const Descricao = styled.div
`
    text-align: justify;
`

const Organizador = styled.div
`
    display: flex;
    justify-content: space-around;
`

const Like = styled.img
`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    object-fit: cover;
    height: 50px;
    width: 50px;
    margin: -10px;
    cursor: pointer;

    transition: 0.2s;

    &:hover
    {
        transform: scale(120%);
        transition: 0.2s;
    }
`

const A = styled.a
`
    display: flex;
    gap: 32px;
    margin: -8px 0;
`

export default function Reprodutor(props)
{
    const { userId } = useContext(UserContext); // obter id do usuário do context
    const [interaction, setInteraction] = useState(null); //like ou dislike
    const [counts, setCounts] = useState({likes: 0, dislikes: 0})//quantidade de likes ou dislikes

    useEffect(() => // Recupera a última ação do usuário do localStorage
    { 
        const savedInteraction = localStorage.getItem(`interaction-${userId}-${props.conteudo.id}`);
        if (savedInteraction) 
        {
            console.log("Recuperando interação salva:", savedInteraction);
            setInteraction(savedInteraction);
        }
    }, [userId, props.conteudo.id]); 

    // Esse useEffect é ativado sempre que a interação(like ou dislike) mudar
    useEffect(() => {
        console.log("Interaction mudou para:", interaction);
    }, [interaction]);
    
    // Esse useEffect é ativado sempre que a contagem mudar
    useEffect(() => {
        console.log("Atualizando interface - contagem mudou:", counts);
    }, [counts]);

    useEffect(() =>
    {
        console.log(props.conteudo.id); 
        Axios.get(`http://localhost:4000/interacao/${props.conteudo.id}`)
            .then((response) =>
            {
                console.log(response.data);
                setCounts(
                {
                    likes: response.data.likes || 0,
                    dislikes: response.data.dislikes || 0,
                });
            })
            .catch((error) =>
            {
                console.log(error)
            });
    }, [props.conteudo.id, interaction]);

    function handleInteraction(action) // Registrar a interação de like ou dislike
    {
        if (userId === null || userId === undefined)
        {
            toast.error("Você precisa estar logado", 
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
            return;
        }
        console.log(action);
        console.log(userId);
        apiPost("/interacao", 
        {
            movieId: props.conteudo.id, // id do filme
            action, // ação de like ou dislike
        })
            .then((response) =>
            {
                console.log(response.status, response.data);
                if(response.status === 298) // status de mesma ação
                {
                    
                    toast.error(`Você já deu ${action}`, 
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
                    return
                }

                setInteraction(action);

                localStorage.setItem(`interaction-${userId}-${props.conteudo.id}`, action);
        
                setCounts(prev => (
                {
                    likes: action === "like" ? prev.likes + 1 : prev.likes - (interaction === "like" ? 1 : 0),
                    dislikes: action === "dislike" ? prev.dislikes + 1 : prev.dislikes - (interaction === "dislike" ? 1 : 0),
                }));

                let toastType = action === "like" ? "success" : "error";

                toast[toastType](`${action === "like" ? "Like" : "Dislike"} realizado com sucesso!`, 
                {
                    position: "top-center",
                    autoClose: 5000,
                    style: {
                        backgroundColor: "transparent",
                        color: `${action === "like" ? "green" : "red"}`,
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: `${action === "like" ? "3px solid rgb(37, 209, 77)" : "3px solid rgb(223, 40, 40)"}`
                    }
                });
                
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
        console.log(counts);
    };  

    return <Modelo>
        <ModeloTrailer src = {props.conteudo.trail}/>
        <ModeloDados>
            <Titulo>{props.conteudo.title}</Titulo>
            <Organizador>
                <div>{props.conteudo.age}</div>
                <div>{props.conteudo.duration} minutos</div>
                <div>faixa etária: +{props.conteudo.requiredAge} anos</div>
                <A>
                    <Like  
                        key = {`like-${interaction}-${counts.likes}`}
                        src = {interaction == "like" ? "/Like.png" : "/LikeWhite.png"}
                        onClick={() => handleInteraction("like")}
                        alt="Like"/>
                    <p>{counts.likes}</p>
                    <Like
                        key = {`dislike-${interaction}-${counts.dislikes}`}
                        src={interaction == "dislike" ? "/Deslike.png" : "/DeslikeWhite.png"}
                        onClick={() => handleInteraction("dislike")}
                        alt="Dislike"/>
                    <p>{counts.dislikes}</p>
                </A>
            </Organizador>
            <Descricao>{props.conteudo.description}</Descricao>
        </ModeloDados>
    </Modelo>
}