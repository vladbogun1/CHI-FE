import React from 'react';

const HomeButton = () => {
    const redirectToPort = (port, path) => {
        window.location.href = `http://localhost:${port}${path}`;
    };

    return (
        <button
            className="neomorph-button"
            onClick={() => redirectToPort(8000, '/')}
        >
            Home
        </button>
    );
};

export default HomeButton;
