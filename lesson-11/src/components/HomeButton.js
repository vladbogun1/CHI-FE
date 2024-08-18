import React from 'react';
import { Button } from '@mui/material';

const HomeButton = () => {
    const redirectToPort = (port, path) => {
        window.location.href = `http://localhost:${port}${path}`;
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => redirectToPort(8000, '/')}
            sx={{ position: 'absolute', top: 10, left: 10 }}
        >
            Home
        </Button>
    );
};

export default HomeButton;
