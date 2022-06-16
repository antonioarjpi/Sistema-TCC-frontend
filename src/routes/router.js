import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes  } from 'react-router-dom';
import DisplayAluno from "../views/alunos/displayAluno";
import SaveAluno from "../views/alunos/saveAluno";
import SearchAluno from "../views/alunos/searchAluno";
import SaveBanca from "../views/bancas/saveBanca";
import ScheduleDefesa from "../views/bancas/scheduleBanca";
import SearchBanca from "../views/bancas/searchBanca";
import SaveDevolutiva from "../views/devolutiva/saveDevolutiva";
import SearchDevolutiva from "../views/devolutiva/searchDevolutiva";
import SaveEquipe from "../views/equipes/saveEquipe";
import SearchEquipe from "../views/equipes/searchEquipe";
import SearchEquipeFull from "../views/equipes/displayEquipe";

import Home from "../views/home";
import Login from "../views/login";
import SaveOrientacao from "../views/orientacao/saveOrientacao";
import SearchOrientacao from "../views/orientacao/searchOrientacao";
import DisplayOrientador from "../views/orietadores/displayOrientador";
import SaveOrientador from "../views/orietadores/saveOrientador";
import SearchOrientador from "../views/orietadores/searchOrientador";
import SignUp from "../views/signup";
import NotFound from "../views/notFound";
import Forbidden from "../views/forbidden/forbidden";

 const PrivateRoute = () => {
     const isAuthenticated = localStorage.getItem("@TCC-Usuario") !== null;
     return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
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
                    <Route path="/cadastro-aluno" element={<SaveAluno />} />
                    <Route path="/alunos" element={<SearchAluno />} />
                    <Route path="/atualizacao-aluno/:id" element={<SaveAluno />} />
                    <Route path="/aluno/:id" element={<DisplayAluno />} />

                    <Route path="/cadastro-orientador" element={<SaveOrientador />} />
                    <Route path="/orientadores" element={<SearchOrientador />} />
                    <Route path="/atualizacao-orientador/:id" element={<SaveOrientador />} />
                    <Route path="/orientador/:id" element={<DisplayOrientador />} />

                    <Route path="/equipes" element={<SearchEquipe />} />
                    <Route path="/cadastro-equipe" element={<SaveEquipe />} />
                    <Route path="/atualizacao-equipe/:id" element={<SaveEquipe />} />
                    <Route path="/equipe/:id" element={<SearchEquipeFull />} />

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
