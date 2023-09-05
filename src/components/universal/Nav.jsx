import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <h2>Nav</h2>
      <ul>
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
