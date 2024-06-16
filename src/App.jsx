import { Toolbar } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Timer from "./pages/Timer";
import Weather from "./pages/Weather";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;