import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/about/About";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { Produto } from "./components/produto/Produto";
import ListaCategorias from "./components/categoria/listacategorias/ListaCategorias";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import { Register } from "./pages/cadastro/Cadastro";
import { Login } from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Profile } from "./pages/profile/altprofile";
import { Checkout } from "./pages/pagamento/pagamento";

function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 ">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/produtos" element={<Produto />} />
                  <Route path="/perfil/" element={<Profile />} />
                  <Route path="/checkout" element={<Checkout />} />

                  <Route path="/categorias" element={<ListaCategorias />} />
                  <Route
                    path="/cadastrarcategoria"
                    element={<FormCategoria />}
                  />
                  <Route
                    path="/editarcategoria/:id"
                    element={<FormCategoria />}
                  />
                  <Route
                    path="/deletarcategoria/:id"
                    element={<DeletarCategoria />}
                  />

                  <Route path="/cadastro" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
