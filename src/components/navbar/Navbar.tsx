import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link to="/" className="navbarLinks">
          Home
        </Link>
        <Link to="cart" className="navbarLinks">
          Cart
        </Link>
      </div>
    </>
  );
};

export default Navbar;
