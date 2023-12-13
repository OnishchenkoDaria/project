import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import PathConstants from "../routes/pathConstants";

const gotoLogin = () => {
    window.location.href = PathConstants.LOGIN;
};

const SignInIcon = () => (
    <div onClick={gotoLogin} style={{ fontSize: '1.5rem', cursor: 'pointer', marginTop: '0.5rem', position: 'absolute', top: 0, right: 10 }}>
        <FontAwesomeIcon icon={faSignInAlt} />
    </div>
);

const HomeHeader = () => {
    const headerStyle = {
        position: 'relative',
        background: '#222',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center',
        borderBottom: '1px solid #444',

        logo: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0',
        },
    };

    

    return (
        <header style={headerStyle}>
            <div style={headerStyle.logo}>KURYLENKO</div>
            <div style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>Професійний фотограф</div>
            <SignInIcon />
        </header>
    );
};

export default HomeHeader;
