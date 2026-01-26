import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/about/About";
import { Navbar } from "./components/navbar/Navbar";

import { ProdutoModal } from "./components/produto/Produto";

function App() {
  return (
    <>
      <BrowserRouter >
       <Navbar />
        <Routes >
          <Route path="/about" element={<About />} />

          <Route />
        </ Routes>
      </ BrowserRouter>
    </>
  );
}

export default App;
