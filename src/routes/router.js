import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes  } from 'react-router-dom';
import DisplayAluno from "../views/alunos/visualizarAluno";

import ConsultaAluno from "../views/alunos/consultaAluno";
import SaveBanca from "../views/bancas/saveBanca";
import ScheduleDefesa from "../views/bancas/scheduleBanca";
import SearchBanca from "../views/bancas/searchBanca";
import SaveDevolutiva from "../views/devolutiva/saveDevolutiva";
import SearchDevolutiva from "../views/devolutiva/searchDevolutiva";

import Home from "../views/home";
import Login from "../views/login/login";
import SaveOrientacao from "../views/orientacao/saveOrientacao";
import SearchOrientacao from "../views/orientacao/searchOrientacao";
import SignUp from "../views/signup/signup";
import NotFound from "../views/notFound";
import Forbidden from "../views/forbidden/forbidden";
import Navbar from "../components/navbar/navbar";
import CadastroAluno from './../views/alunos/cadastroAluno';
import CadastroOrientador from './../views/orietadores/cadastroOrientador';
import ConsultaOrientador from './../views/orietadores/consultaOrientador';
import VisualizaOrientador from "../views/orietadores/visualizaOrientador";
import ConsultaEquipe from "../views/equipes/consultaEquipe";
import CadastraEquipe from "../views/equipes/cadastraEquipe";
import VisualizaEquipe from "../views/equipes/visualizaEquipe";

 const PrivateRoute = () => {
     const isAuthenticated = localStorage.getItem("@TCC-Usuario") !== null;   
     return isAuthenticated ? <><Navbar/><Outlet /></> : <Navigate to="/login" />;
};

const AccessDenied = () => {
    const isAuthenticated = localStorage.getItem("@TCC-Usuario") === null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

function Router (){
    return (
    
        <BrowserRouter>
            
            <Routes>
                {/* Rotas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/*Página não encontrada */}
                <Route path='*' element={<NotFound/>} />

                {/*Página para erro de acesso negado(403) */}
                <Route path='/acesso_negado' element={<AccessDenied />}>
                    <Route path="/acesso_negado" element={<Forbidden />}/>
                </Route>
                
                {/* Rotas protegidas */}
                <Route path="/" element={<PrivateRoute/>}>
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

                    <Route path="/bancas" element={<SearchBanca />} />
                    <Route path="/cadastro-banca" element={<SaveBanca />} />
                    <Route path="/atualizacao-banca/:id" element={<SaveBanca />} />
                    <Route path="/agendamento-defesa/:id" element={<ScheduleDefesa />} />

                    <Route path="/orientacao" element={<SearchOrientacao />} />
                    <Route path="/cadastro-orientacao" element={<SaveOrientacao />} />
                    <Route path="/atualizacao-orientacao/:id" element={<SaveOrientacao />} />

                    <Route path="/devolutivas" element={<SearchDevolutiva />} />
                    <Route path="/cadastro-devolutiva" element={<SaveDevolutiva />} />
                    <Route path="/atualizacao-devolutiva/:id" element={<SaveDevolutiva />} />
                </Route>  

            </Routes>      
        </BrowserRouter>
        )
}


export default Router;
