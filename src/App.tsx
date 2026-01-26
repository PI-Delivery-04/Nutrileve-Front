import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { ProdutoModal } from "./components/produto/Produto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/produto" element={<ProdutoModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
