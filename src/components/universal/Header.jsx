import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext)
  return (
    <div className="Head">
      <h1>Rich's Northcoders News</h1>
      <p id='mobile-user'>You are logged in as {user}</p>
    </div>
  );
};

export default Header;
