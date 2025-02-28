import React from 'react'
import { createRoot } from 'react-dom/client'
import Rotas from './Rotas';
import { UserProvider } from './Functions/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ROOT_DIV = document.getElementById("root");
const ROOT = createRoot(ROOT_DIV);

ROOT.render(
    <BrowserRouter>
        <UserProvider>
            <Rotas/>
            <ToastContainer/>
        </UserProvider>
    </BrowserRouter>
);