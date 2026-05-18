import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Menu from "./componentes/Menu";
import PaginaPlanos from "./componentes/PaginaPlanos";
import PaginaAlugueis from "./componentes/PaginaAlugueis";

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <Routes>
        <Route path="/" element={<PaginaAlugueis />} />
        <Route path="/alugueis" element={<PaginaAlugueis />} />
        <Route path="/planos" element={<PaginaPlanos />} />
        <Route path="*" element={<Navigate to="/alugueis" />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;