import { BrowserRouter, Routes, Route } from "react-router-dom";
import VegetableShop from "./pages/VegetableShop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VegetableShop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
