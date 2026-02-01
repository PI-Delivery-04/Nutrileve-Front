import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/about/About";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { Profile } from "./pages/profile/Profile";
import { Produto } from "./components/produto/Produto";
import ListaCategorias from "./components/categoria/listacategorias/ListaCategorias";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import { Register } from "./pages/cadastro/Cadastro";
import { Login } from "./pages/login/Login";
import { Toaster } from "sonner";

function App() {
  return (
    <>

      <BrowserRouter >
        <Navbar />
        <Navbar />
        <Toaster richColors position="top-right" />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/produtos" element={<Produto />} />
          <Route path="/perfil" element={<Profile />} />

          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/cadastrarcategoria" element={<FormCategoria />} />
          <Route path="/editarcategoria/:id" element={<FormCategoria />} />
          <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />


          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route />
        </ Routes >
        <Footer />
      </ BrowserRouter >
      <ToastContainer />
    </>
  );
}

export default App;
