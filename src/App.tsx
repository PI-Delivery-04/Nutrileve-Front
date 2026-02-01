import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/about/About";
import { Navbar } from "./components/navbar/Navbar";
import { Produto} from "./components/produto/Produto";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { Register } from "./pages/cadastro/Cadastro";
import { Login } from "./pages/login/Login";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    
      <BrowserRouter >
       <Navbar />
       <Toaster richColors position="top-right" />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/produtos" element={<Produto />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route />
        </ Routes>
        <Footer />
      </ BrowserRouter>
    </>
  );
}

export default App;
