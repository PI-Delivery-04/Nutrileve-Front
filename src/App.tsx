import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/about/About";
import { Navbar } from "./components/navbar/Navbar";

import { Produto } from "./components/produto/Produto";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";

import ListaCategorias from "./components/categoria/listacategorias/ListaCategorias";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";



function App() {
  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/produtos" element={<Produto />} />

          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/cadastrarcategoria" element={<FormCategoria />} />
          <Route path="/editarcategoria/:id" element={<FormCategoria />} />
          <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />


          <Route />
        </ Routes>
        <Footer />
      </ BrowserRouter>
    </>
  );
}

export default App;
