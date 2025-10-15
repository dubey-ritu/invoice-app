import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateInvoice from "./pages/create-invoice";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-invoice" element={<CreateInvoice />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
