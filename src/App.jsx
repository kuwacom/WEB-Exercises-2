import { Toolbar } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;