import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Home from "./Home";
import Detail from "./Detail";
import AddData from "./AddData";
import EditData from "./editData";

function App() {
  axios.defaults.baseURL = "https://mution-api.vercel.app";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="add" element={<AddData />} />
        <Route path="edit/:id" element={<EditData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
