import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/about/About";

function App() {
  return (
    <>
      <BrowserRouter >
        <Routes >
          <Route path="/about" element={<About />} />
        </ Routes>
      </ BrowserRouter>
    </>
  );
}

export default App;
