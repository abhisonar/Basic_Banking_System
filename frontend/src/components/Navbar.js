import React,{useState} from 'react'
import {  Link, NavLink } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    return (
      <>
        <nav className="mynavbar">
          <div className="mynavbar-container">
            <Link to="/" className="mynavbar-logo" onClick={closeMobileMenu}>
              <img className="logo" src="./images/logo.png" alt="" />
              Sparks Bank of India
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "mynav-menu active" : "mynav-menu"}>
              <li className="mynav-item">
                <NavLink
                  exact
                  to="/"
                  className="mynav-links"
                  activeClassName="active"
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="mynav-item">
                <NavLink
                  exact
                  to="/view_customers"
                  className="mynav-links"
                  activeClassName="active"
                  onClick={closeMobileMenu}
                >
                  View Customer
                </NavLink>
              </li>
              <li className="mynav-item">
                <NavLink
                  exact
                  to="/view_transactions"
                  className="mynav-links"
                  activeClassName="active"
                  onClick={closeMobileMenu}
                >
                  Transactions
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
}

export default Navbar
