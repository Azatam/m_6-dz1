import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contacs } from "./pages/Contacts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
