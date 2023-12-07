import React, { useState, useEffect } from 'react';

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
        top: '0%',
        right: '76%',
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
                <div style={{ marginBottom: '0.5rem' }}>Роботи</div>
                <div style={{ marginBottom: '0.5rem' }}>Резюме</div>
                <div style={{ marginBottom: '0.5rem' }}>Блог</div>
                <div style={{ marginBottom: '0.5rem' }}>Відгуки</div>
                <div style={{ marginBottom: '0.5rem' }}>Контакти</div>
            </div>
        </div>
    );
};

export default Navbar;
