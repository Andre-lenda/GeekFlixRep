import Axios from "axios";

export default async function ValidarEntrada(email, password)
{
    try
    {
        const response = await Axios({
            method: "POST",
            url: "http://localhost:4000/entrar",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: email,
                password: password,
            }
        });
        console.log(response.status);

        return response;
    } catch(error)
    {
        console.log(error);
    }
}