import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/universal/Header";
import Nav from "./components/universal/Nav";
import Home from "./components/Home";
import Articles from "./components/Articles/Articles";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/articles' element={<Articles/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
