import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/universal/Header";
import Nav from "./components/universal/Nav";
import Home from "./components/Home";
import Articles from "./components/Articles/Articles";
import SingleArticle from "./components/Articles/SingleArticle/SingleArticle";
import Topics from "./components/Topics";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
