import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';


function ReturnButton(props) {
    const {title, path} = props;
    const navigate = useNavigate();

    const handleNavigation = (path) => {
         navigate(path);
    };
    return (
        <div onClick={() => handleNavigation(path)} 
        style={{ 
            color: '#5c1a1b', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            marginTop: '20px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            fontSize: '20px',
            marginBottom: '50px',
            }}>
            <ArrowBackIosNewIcon sx={{ fontSize: '25px' }} />
            {title}
        </div>
    )
}

export default ReturnButton