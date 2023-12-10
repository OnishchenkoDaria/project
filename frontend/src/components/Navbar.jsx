import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import PathConstants from "../routes/pathConstants";

const Navbar = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const containerRef = React.useRef(null);

    const containerStyle = {
        position: 'relative',
    };

    const buttonStyle = {
        cursor: 'pointer',
        fontSize: '2rem',
        padding: '1rem',
    };

    const menuStyle = {
        display: menuVisible ? 'block' : 'none',
        position: 'absolute',
        top: '70px',
        left: '19px',
        transform: 'translateX(0%)',
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        width: '200px',
        padding: '1rem',
        boxSizing: 'border-box',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        zIndex: '1',
        borderRadius: '8px', // добавленные скругленные углы
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleOutsideClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div ref={containerRef} style={containerStyle}>
            <div style={buttonStyle} onClick={toggleMenu}>
                &#9776; Меню
            </div>


            <div style={menuStyle}>
                <p><Link to={PathConstants.HOME} style={{textDecoration: 'none', color: 'white'}}>Homepage</Link></p>
                <p><Link to={PathConstants.REGISTRATION} style={{textDecoration: 'none', color: 'white'}}>Register</Link></p>
                <p><Link to={PathConstants.LOGIN} style={{textDecoration: 'none', color: 'white'}}>Login</Link></p>
                <p><Link to={PathConstants.BLOG} style={{textDecoration: 'none', color: 'white'}}>Blog</Link></p>
            </div>
        </div>
    );
};

export default Navbar;
