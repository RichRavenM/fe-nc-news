import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/universal/Header";
import Nav from "./components/universal/Nav";
import Home from "./components/Home";
import Articles from "./components/Articles/Articles";
import SingleArticle from "./components/Articles/SingleArticle/SingleArticle";
import Topics from "./components/Topics";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import AddArticle from "./components/Articles/AddArticle";

function App() {
  return (
    <div className="App">
      <div className="header-nav">
        <Header className="Header" />
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/post" element={<AddArticle />} />
        <Route path="/articles/:article_id" element={<SingleArticle />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
