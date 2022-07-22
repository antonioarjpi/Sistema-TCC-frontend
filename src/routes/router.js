import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DisplayAluno from "../views/alunos/visualizarAluno";

import ConsultaAluno from "../views/alunos/consultaAluno";
import CadastraBanca from "../views/bancas/cadastraBanca";
import AgendamentoBanca from "../views/bancas/agendamentoDeBanca";
import ConsultaBanca from "../views/bancas/consultaBanca";

import Home from "../views/home";
import Login from "../views/login/login";
import SignUp from "../views/signup/signup";
import NotFound from "../views/paginaNaoEncontrada/notFound";
import Forbidden from "../views/forbidden/forbidden";
import Navbar from "../components/navbar/navbar";
import CadastroAluno from './../views/alunos/cadastroAluno';
import CadastroOrientador from './../views/orietadores/cadastroOrientador';
import ConsultaOrientador from './../views/orietadores/consultaOrientador';
import VisualizaOrientador from "../views/orietadores/visualizaOrientador";
import ConsultaEquipe from "../views/equipes/consultaEquipe";
import CadastraEquipe from "../views/equipes/cadastraEquipe";
import VisualizaEquipe from "../views/equipes/visualizaEquipe";
import ConsultaOrientacao from "../views/orientacao/consultaOrientacao";
import CadastraOrientacao from "../views/orientacao/cadastraOrientacao";
import ConsultaDevolutiva from "../views/devolutiva/consultaDevolutiva";
import CadastroDevolutiva from "../views/devolutiva/cadastroDevolutiva";
import { useAuth } from "../context/AuthContext";

function Router() {

    const { autenticado } = useAuth();

    const PrivateRoute = () => {
        return autenticado === true ? <><Navbar /><Outlet /></> : <Navigate to="/login" />;
    };

    const AccessDenied = () => {
        return autenticado === false ? <Outlet /> : <Navigate to="/" />;
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/*Página não encontrada */}
                <Route path='*' element={<NotFound />} />

                {/*Página para erro de acesso negado(403) */}
                <Route path='/acesso_negado' element={<AccessDenied />}>
                    <Route path="/acesso_negado" element={<Forbidden />} />
                </Route>

                {/* Rotas protegidas */}
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cadastro-aluno" element={<CadastroAluno />} />
                    <Route path="/alunos" element={<ConsultaAluno />} />
                    <Route path="/atualizacao-aluno/:id" element={<CadastroAluno />} />
                    <Route path="/aluno/:id" element={<DisplayAluno />} />

                    <Route path="/cadastro-orientador" element={<CadastroOrientador />} />
                    <Route path="/orientadores" element={<ConsultaOrientador />} />
                    <Route path="/atualizacao-orientador/:id" element={<CadastroOrientador />} />
                    <Route path="/orientador/:id" element={<VisualizaOrientador />} />

                    <Route path="/equipes" element={<ConsultaEquipe />} />
                    <Route path="/cadastro-equipe" element={<CadastraEquipe />} />
                    <Route path="/atualizacao-equipe/:id" element={<CadastraEquipe />} />
                    <Route path="/equipe/:id" element={<VisualizaEquipe />} />

                    <Route path="/bancas" element={<ConsultaBanca />} />
                    <Route path="/cadastro-banca" element={<CadastraBanca />} />
                    <Route path="/atualizacao-banca/:id" element={<CadastraBanca />} />
                    <Route path="/agendamento-defesa/:id" element={<AgendamentoBanca />} />

                    <Route path="/orientacao" element={<ConsultaOrientacao />} />
                    <Route path="/cadastro-orientacao" element={<CadastraOrientacao />} />
                    <Route path="/atualizacao-orientacao/:id" element={<CadastraOrientacao />} />

                    <Route path="/devolutivas" element={<ConsultaDevolutiva />} />
                    <Route path="/cadastro-devolutiva" element={<CadastroDevolutiva />} />
                    <Route path="/atualizacao-devolutiva/:id" element={<CadastroDevolutiva />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
