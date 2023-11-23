import {Link} from "react-router-dom"
import PathConstants from "../routes/pathConstants";
import "../styles/Header.css"

const Header = () => {
  return (
      <header>
            <div class="topnav">
                <p><Link to={PathConstants.HOME}>Homepage</Link></p>
                <p><Link to={PathConstants.REGISTRATION}>Register</Link></p>
            </div>
      </header>
    );
}

export default Header