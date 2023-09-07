import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const Nav = () => {
  const {user} = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((open) => !open);
  };
  return (
    <nav className="Nav">
      <p id='user'>You are logged in as {user}</p>
      <button className="nav-header" onClick={handleClick}>
        Navigation menu
      </button>
      <ul className={`nav-list ${isOpen ? "is-open" : "not-open"}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/topics">Article Topics</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
