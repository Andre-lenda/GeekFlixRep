import express, { request, response } from "express";
import sqlite from "sqlite3";
import {open} from "sqlite";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

const ROUTES = express.Router();
const OK = 200;
const PAGE_NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

async function GetDatabase(dbType)
{
    return await open(
    {
        filename: `./DB/GeekFlixDB.db`,
        driver: sqlite.Database,
    });
}

const SECRET_KEY = "Smog5^Playful^Antacid^Capitol^Uphold^Sizing^Mullets^Playlist^Radiated^Lesser^Briar^Tablet";

const autenticarToken = (request, response, next) => 
{
    const token = request.headers["authorization"];

    if (!token) 
    {
        return response.status(203).json({ message: "Token não fornecido" });
    }

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => 
    {
        if (err) 
        {
            return response.status(204).json({ message: "Token inválido" });
        }

        request.userId = decoded.userId; // Adicionamos o ID do usuário autenticado à requisição
        next();
    });
};

let DB = GetDatabase();

ROUTES.post("/cadastro", async (request, response) =>
{
    const {email, password, name, date, phone, cep} = request.body;

    try 
    {
        const db = await DB;

        const existingUser = await db.get("SELECT * FROM UserInfo WHERE email = ?", [email]);
        if (existingUser)
        {
            response.status(209).json()
        }

        // Criptografar a senha antes de armazenar
        const hashedPassword = await bcrypt.hash(password, 10);


        await db.run("INSERT INTO UserInfo (email, password, name, date, phone, cep) VALUES (?, ?, ?, ?, ?, ?)", 
            [email, hashedPassword, name, date, phone, cep]);
        response.status(201).json({ message: "Cadastrado"})
    }
    catch (error) 
    {
        console.error("Erro ao cadastrar usuário:", error);
        response.status(500).json({ message: "erro" })
    }
});

ROUTES.post("/entrar", async (request, response) =>
{
    console.log("Recebendo requisição em /entrar");
    console.log("Corpo da requisição:", request.body);

    const { email, password } = request.body;

    console.log("E-mail extraído:", email);
    console.log("Senha extraída:", password);

    try
    {
        const db = await GetDatabase();
        console.log("Banco de dados conectado!");

        console.log("Rodando consulta com email:", email);
        const user = await db.get("SELECT * FROM UserInfo WHERE email = ?", [email]);

        console.log("Resultado da consulta:", user);

        if (!user)
        {
            return response.status(222).json({ message: "Usuário não encontrado"})
        }
        
        // Compara a senha inserida com a senha criptografada armazenada no banco
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) 
        {
            console.log("senhaInvalida, 204");
            return response.status(204).json({ message: "Senha incorreta" });
        }

        // Gerar Token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        console.log("senha correta, 202")
        response.status(202).json({ token, userId: user.id, name: user.name, email: user.email, password: user.password });
    }
    catch (error)
    {
        response.status(INTERNAL_SERVER_ERROR)
        console.log(error)
    }
});

ROUTES.get("/catalogo", async(resquest, response) =>
{
    try
    {
        const RESPONSE = await (await DB).all("select * from Catalogo");

        response.status(OK).json(RESPONSE)
    }
    catch (error)
    {
        console.log(error);
        response.status(INTERNAL_SERVER_ERROR);
    }
});

ROUTES.get("/catalogo/:codigo", async (request, response) =>
{
    const {codigo} = request.params;

    try
    {
        const RESPONSE = await (await DB).get("select * from Catalogo where id = ?", codigo);

        response.status(OK).json(RESPONSE)
    }
    catch (error)
    {
        console.log(error);
        response.status(INTERNAL_SERVER_ERROR);
    }
});

ROUTES.get("/generos", async (request, response) =>
{
    try
    {
        const RESPONSE_LIST = await (await DB).all("select gender from Catalogo")

        let listSet = new Set();
        for (let item of RESPONSE_LIST)
        {
            let listTpm = item.gender.split(",");

            for (let genre of listTpm)
            {
                listSet.add(genre.trim());
            }

        }
        let list = Array.from(listSet)
        response.status(OK).json(list)
    }
    catch (error)
    {
        console.log(error);
        response.status(INTERNAL_SERVER_ERROR);
    }
});

ROUTES.get("/generos/:genero", async (request, response) =>
{
    const { genero } = request.params;
    let genreList = genero.split(",");
    let catalogSet = new Set();
    try
    {
        let responseDB = await (await DB).all("select * from Catalogo");
        
        for (let genreParam of genreList)
        {
            for (let item of responseDB)
            {
                let listTpm = item.gender.split(",");

                for (let genre of listTpm)
                {
                    if (genre.trim() === genreParam.trim())
                    {
                        catalogSet.add(response);
                    }
                }
            }
        }
        let catalog = Array.from(catalogSet)
        response.status(OK).json(catalog)
    }
    catch (error)
    {
        console.log(error);
        response.status(INTERNAL_SERVER_ERROR);
    }
});

ROUTES.get("/nomes", async (request, response) =>
{
    try
    {
        const RESPONSE = await (await DB).all("select id, title from Catalogo")
        response.status(OK).json(RESPONSE)
    }
    catch (error)
    {
        console.log(error);
        response.status(INTERNAL_SERVER_ERROR);
    }
});

ROUTES.get("/nomes/:nome", async (request, response) =>
{
    try
    {
        const { names } = request.params;
        let nameList = names;
        let NameSet = new Set();
    
        const RESPONSE_NAME = await (await DB).all("select * from Catalogo")

        for (let name of nameList)
        {
            for (let item of RESPONSE_NAME)
            {    
                if (item === name)
                {
                    NameSet.add(item)
                    console.log(item)
                }
            }
        }
        let name = Array.from(NameSet)
        response.status(OK).json(name)
    }
    catch (error)
    {
        console.log(error);
        response.status(INTERNAL_SERVER_ERROR);
    }
});

ROUTES.post("/interacao", autenticarToken, async(request, response) =>
{
    const { movieId, action } = request.body;
    const userId = request.userId;

    try
    {
        const db = await DB

        // Verifica se o usuário já deu like ou dislike
        const existingInteraction  = await db.get("SELECT * FROM LikesDislikes WHERE userId = ? AND movieId = ?", [userId, movieId]);

        if (existingInteraction) // se existir algo na const vai verificar
        {
            if (existingInteraction.action === action) // se a ação for a mesma, retorna um status que será usado como erro no front-end
            {
                return response.status(298).json({ message: "Ação já registrada" });
            }
            else // atualiza a ação para like ou dislike
            {
                await db.run("UPDATE LikesDislikes SET action = ? WHERE userId = ? AND movieId = ?", [action, userId, movieId]);
                response.status(200).json({message: "Atualizou"});
            }
        }
        else 
        {
            await db.run("INSERT INTO LikesDislikes (userId, movieId, action) VALUES (?, ?, ?)", [userId, movieId, action]);
            response.status(201).json({message: "Inserido"});
        }
    } catch(error)
    {
        console.log(error)
        response.status(INTERNAL_SERVER_ERROR);
    }

});

ROUTES.get("/interacao/:movieId", async(request, response) =>
{
    const {movieId} = request.params;

    try
    {
        const db = await DB

        const likes = await db.get("SELECT COUNT(*) AS total FROM LikesDislikes WHERE movieId = ? AND action = 'like'", [movieId]);
        const dislikes = await db.get("SELECT COUNT(*) AS total FROM LikesDislikes WHERE movieId = ? AND action = 'dislike'", [movieId]);

        response.status(200).json({likes: likes.total, dislikes: dislikes.total});
    } catch (error)
    {
        console.log(error);
        response.status(INTERNAL_SERVER_ERROR);
    }
});

ROUTES.get("/top5", async(request, response) =>
{
    try 
    {
        const db = await DB;

        // Consulta para pegar os Top 5 mais curtidos no geral
        const top5geral = await db.all
        (`
            SELECT c.id, c.title, c.type, (COUNT(CASE WHEN l.action = 'like' THEN 1 END) - COUNT(CASE WHEN l.action = 'dislike' THEN 1 END)) AS totalScore
            FROM Catalogo c
            LEFT JOIN LikesDislikes l ON c.id = l.movieId
            GROUP BY c.id
            ORDER BY totalScore DESC
            LIMIT 5
        `);

        // Consulta para pegar os Top 5 de cada categoria(Ex: Filme, série, etc...)
        const top5PorCategoria = await db.all
        (`
            SELECT c.id, c.title, c.type, c.logo, (COUNT(CASE WHEN l.action = 'like' THEN 1 END) - COUNT(CASE WHEN l.action = 'dislike' THEN 1 END)) AS totalScore
            FROM Catalogo c
            LEFT JOIN LikesDislikes l ON c.id = l.movieId
            GROUP BY c.id, c.type
            ORDER BY c.type, totalScore DESC
        `);

        // Organizar os dados por categoria
        const categorias = {};
        top5PorCategoria.forEach((item) => 
        {
            if (!categorias[item.type]) 
            {
                categorias[item.type] = [];
            }
            if (categorias[item.type].length < 5) 
            {
                categorias[item.type].push(item);
            }
        });

        response.status(200).json({ top5geral, categorias})

    } catch (error)
    {
        console.log(error);
        response.status(INTERNAL_SERVER_ERROR).json({ message: "Erro Interno"})
    }
});


ROUTES.get("*", (resquest, response) =>
{
    response.sendStatus(PAGE_NOT_FOUND);
});

export default ROUTES