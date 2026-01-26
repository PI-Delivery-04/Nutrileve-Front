import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/about/About";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <>
      <BrowserRouter >
       <Navbar />
        <Routes >
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route />
        </ Routes>
      </ BrowserRouter>
    </>
  );
}

export default App;
