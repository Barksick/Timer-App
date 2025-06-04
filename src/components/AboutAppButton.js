import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AboutAppButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/about');
    };

    return (
        <Button
            variant="contained" 
            color="info" 
            onClick={handleClick}
            sx={{
                position: 'absolute',
                top: { xs: 8, sm: 16 },
                right: { xs: 8, sm: 16, md: 20 },
                fontSize: { xs: '0.6rem', sm: '0.9rem', md: '1.5rem', lg: '3rem' },
                padding: { xs: '4px 8px', sm: '6px 12px' },
                textTransform: 'none',
                width: { xs: 100, sm: 140, md: 200, lg: 300 },
                height: { xs: 36, sm: 48, md: 60, lg: 70 },
                zIndex: 10,
            }}
        >
            About App
        </Button>
    );
}

export default AboutAppButton;
