import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((open) => !open);
  };
  return (
    <nav className="Nav">
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
