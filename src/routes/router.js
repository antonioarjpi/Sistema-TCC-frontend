import React from "react";
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import SaveAluno from "../views/alunos/saveAluno";
import SearchAluno from "../views/alunos/searchAluno";
import SaveBanca from "../views/bancas/saveBanca";
import SearchBanca from "../views/bancas/searchBanca";
import SaveDefesa from "../views/defesas/saveDefesa";
import SearchDefesa from "../views/defesas/searchDefesa";
import SaveDevolutiva from "../views/devolutiva/saveDevolutiva";
import SearchDevolutiva from "../views/devolutiva/searchDevolutiva";
import SaveEquipe from "../views/equipes/saveEquipe";
import SearchEquipe from "../views/equipes/searchEquipe";

import Home from "../views/home";
import Login from "../views/login";
import SaveOrientacao from "../views/orientacao/saveOrientacao";
import SearchOrientacao from "../views/orientacao/searchOrientacao";
import SaveOrientador from "../views/orietadores/saveOrientador";
import SearchOrientador from "../views/orietadores/searchOrientador";
import SignUp from "../views/signup";



function Router (){
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Navigate to="/login" />} /> */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />

                <Route path="/cadastro-aluno" element={<SaveAluno />} />
                <Route path="/alunos" element={<SearchAluno />} />
                <Route path="/alunos/:id" element={<SaveAluno />} />

                <Route path="/cadastro-orientador" element={<SaveOrientador />} />
                <Route path="/orientadores" element={<SearchOrientador />} />
                <Route path="/orientadores/:id" element={<SaveOrientador />} />

                <Route path="/equipes" element={<SearchEquipe />} />
                <Route path="/cadastro-equipe" element={<SaveEquipe />} />
                <Route path="/cadastro-equipe/:id" element={<SaveEquipe />} />

                <Route path="/bancas" element={<SearchBanca />} />
                <Route path="/cadastro-banca" element={<SaveBanca />} />
                <Route path="/defesas" element={<SearchDefesa />} />
                <Route path="/cadastro-defesa" element={<SaveDefesa />} />
                <Route path="/orientacao" element={<SearchOrientacao />} />
                <Route path="/cadastro-orientacao" element={<SaveOrientacao />} />
                <Route path="/devolutivas" element={<SearchDevolutiva />} />
                <Route path="/cadastro-devolutiva" element={<SaveDevolutiva />} />
                
            </Routes>      
        </BrowserRouter>
        )
}

export default Router;