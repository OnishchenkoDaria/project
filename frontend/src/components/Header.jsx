import {Link} from "react-router-dom"
import PathConstants from "../routes/pathConstants";
import "../styles/Header.css"

const Header = () => {
  return (
      <header>
            <div className="topnav">
                <p><Link to={PathConstants.HOME}>Homepage</Link></p>
                <p><Link to={PathConstants.REGISTRATION}>Register</Link></p>
                <p><Link to={PathConstants.LOGIN}>Login</Link></p>
                <p><Link to={PathConstants.ACCOUNT}>Account</Link></p>
                <p><Link to={PathConstants.BLOG}>Blog</Link></p>
            </div>
      </header>
    );
}

export default Header