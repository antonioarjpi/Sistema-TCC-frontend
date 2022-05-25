import React from "react";
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import SaveAluno from "../views/alunos/saveAluno";
import SearchAluno from "../views/alunos/searchAluno";
import SaveBanca from "../views/bancas/saveBanca";
import SearchBanca from "../views/bancas/searchAluno";
import SaveDefesa from "../views/defesas/saveDefesa";
import SearchDefesa from "../views/defesas/searchDefesa";
import SaveEquipe from "../views/equipes/saveEquipe";
import SearchEquipe from "../views/equipes/searchEquipe";
import Home from "../views/home";
import SaveOrientador from "../views/orietadores/saveOrientador";
import SearchOrientador from "../views/orietadores/searchOrientador";



function Router (){
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Navigate to="/login" />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cadastro-aluno" element={<SaveAluno />} />
                <Route path="/alunos" element={<SearchAluno />} />
                <Route path="/cadastro-orientador" element={<SaveOrientador />} />
                <Route path="/orientadores" element={<SearchOrientador />} />
                <Route path="/equipes" element={<SearchEquipe />} />
                <Route path="/cadastro-equipe" element={<SaveEquipe />} />
                <Route path="/bancas" element={<SearchBanca />} />
                <Route path="/cadastro-banca" element={<SaveBanca />} />
                <Route path="/defesas" element={<SearchDefesa />} />
                <Route path="/cadastro-defesa" element={<SaveDefesa />} />
                
            </Routes>      
        </BrowserRouter>
        )
}

export default Router;