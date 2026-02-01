import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/about/About";
import { Navbar } from "./components/navbar/Navbar";

import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { Profile } from "./pages/profile/Profile";
import { Produto } from "./components/produto/Produto";

function App() {
  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/produtos" element={<Produto />} />
           <Route path="/perfil" element={<Profile />} />
          <Route />
        </ Routes>
        <Footer />
      </ BrowserRouter>
    </>
  );
}

export default App;
