import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import ProductModal from "./components/produto/Produto";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/produto" element={<ProductModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
